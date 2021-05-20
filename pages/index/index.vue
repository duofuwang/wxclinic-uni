<template>
	<view>
		<basics v-if="PageCur=='basics'" @changeTab="changeTab"></basics>
		<components v-if="PageCur=='component'" @signMsg="signMsg" @updateContactList="updateContactList"
			:unreadMsgList="unreadMsgList" :unreadNum="unreadNum" :contactList="contactList"></components>
		<plugin v-if="PageCur=='plugin'"></plugin>
		<account v-if="PageCur=='account'"></account>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class="action border-title">
					<view class="cuIcon-cu-image">
						<text :class="PageCur=='basics'?'text-green-new':'text-gray'" class="text-xl">首页</text>
						<!-- <view class="cu-tag badge" style="right: -25rpx;">22</view> -->
					</view>
					<text :class="PageCur=='basics'?'bg-green-new':'bg-gray'" class="round"
						style="left: 50%;transform: translate(-50%, 50%);"></text>
				</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class="action border-title">
					<view class="cuIcon-cu-image">
						<text :class="PageCur=='component'?'text-green-new':'text-gray'" class="text-xl">问诊</text>
						<view class="cu-tag badge" v-if="newMsg" style="right: -25rpx;">{{newMsg?unreadNum:''}}</view>
					</view>
					<text :class="PageCur=='component'?'bg-green-new':'bg-gray'" class="round"
						style="left: 50%;transform: translate(-50%, 50%);"></text>
				</view>

			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class="action border-title">
					<view class="cuIcon-cu-image">
						<text :class="PageCur=='plugin'?'text-green-new':'text-gray'" class="text-xl">百科</text>
						<!-- <view class="cu-tag badge" style="right: -25rpx;">22</view> -->
					</view>
					<text :class="PageCur=='plugin'?'bg-green-new':'bg-gray'" class="round"
						style="left: 50%;transform: translate(-50%, 50%);"></text>
				</view>
			</view>
			<view class="action" @click="NavChange" data-cur="account">
				<view class="action border-title">
					<view class="cuIcon-cu-image">
						<text :class="PageCur=='account'?'text-green-new':'text-gray'" class="text-xl">我的</text>
						<!-- <view class="cu-tag badge" style="right: -25rpx;">22</view> -->
					</view>
					<text :class="PageCur=='account'?'bg-green-new':'bg-gray'" class="round"
						style="left: 50%;transform: translate(-50%, 50%);"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUnreadMsg
	} from '@/api/modules/message.js'

	import {
		getContactList
	} from '@/api/modules/message.js'

	import {
		getUserInfo
	} from '../../api/modules/user.js'
	import {
		getConfig
	} from "@/api/modules/config.js"

	export default {
		data() {
			return {
				PageCur: 'basics',
				socketOpen: false,
				newMsg: false,
				unreadNum: 0,
				unreadMsgList: [],
				contactList: [],
				hide: false,

				userInfo: null
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo")

			console.log("socketOpen: ", this.websocket.socketOpen)

			// 进行 websocket 连接
			if (!this.websocket.socketOpen) {
				this.websocket.connect()
					.then(res => {
						this.websocket.init()
					})
			}

			// 获取未读消息
			this.getUnreadMsg()
			// 获取联系人列表
			this.getContactList()
		},
		onHide() {
			console.log("index hide")
			this.hide = true
		},
		onShow() {
			console.log("index show")
			// 从下级页面点返回露出当前页面，更新数据
			if (this.hide) {
				this.getContactList()
				this.getUnreadMsg()
			}

			// 更新用户信息
			this.getUserInfo()

			// 更新account组件
			this.updateAccountComponent()
			
			this.getConfig()

			// 进入其他页面时，uni.onSocketMessage会被覆盖
			// 所以返回页面时重新启动消息监听
			this.onSocketMessage()
		},
		onUnload() {
			console.log("index unload")
			// 关闭 websocket 连接
			this.websocket.close()
			this.websocket.socketOpen = false
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			changeTab(tab) {
				this.PageCur = tab
			},
			updateContactList() {
				console.log("更新消息列表")
				this.getContactList()
			},

			// 监听消息接收
			onSocketMessage() {
				let that = this;
				uni.onSocketMessage(function(res) {
					console.log("index: ", JSON.parse(res.data))
					that.getUnreadMsg()
					that.getContactList()
				});
			},

			// 关闭 websocket 连接
			closeSocket() {
				uni.closeSocket();
				uni.onSocketClose(function(res) {
					console.log('WebSocket 已关闭！');
				});
			},

			// 获取未读消息
			getUnreadMsg() {
				getUnreadMsg({
					userId: this.userInfo.id
				}).then(res => {
					this.unreadNum = res.data.length
					this.newMsg = false
					if (res.data.length > 0) {
						this.newMsg = true
						this.unreadMsgList = res.data
						// this.getContactList()
						console.log("unreadMsgList: ", this.unreadMsgList)
					}
				}).catch(data => {
					console.log(data)
				})
			},

			signMsg() {
				this.newMsg = false;
				this.unreadNum = 0;
				this.unreadMsgList = []
			},

			// 获取最近会话列表和最后一条聊天记录
			getContactList() {
				getContactList().then(res => {
					if (res.success) {
						console.log("getContactList", res)
						this.contactList = res.data
					}
				}).catch(data => {
					console.log("getContactList error", data)
				})
			},

			// 获取用户信息
			getUserInfo() {
				getUserInfo({
					userId: this.userInfo.id
				}).then(res => {
					console.log("getUserInfo", res)

					if (res.success) {
						uni.setStorageSync("userInfo", res.data)
						this.userInfo = res.data
					}
				}).catch(err => {
					console.log(err)
				})
			},

			// 更新account组件
			updateAccountComponent() {
				uni.$emit('update', {
					msg: '更新account'
				})
			},

			// 获取诊所配置
			getConfig() {
				getConfig().then(res => {
					if(res.success) {
						uni.setStorageSync("config", res.data)
					}
				})
			}
		}
	}
</script>

<style>

</style>
