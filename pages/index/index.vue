<template>
	<view>
		<basics v-if="PageCur=='basics'" @changeTab="changeTab"></basics>
		<components v-if="PageCur=='component'"
			@signMsg="signMsg"
			@updateContactList="updateContactList"
			:unreadMsgList="unreadMsgList"
			:unreadNum="unreadNum"
			:contactList="contactList"></components>
		<plugin v-if="PageCur=='plugin'"></plugin>
		<account v-if="PageCur=='account'"></account>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class="action border-title">
					<view class="cuIcon-cu-image">
						<text :class="PageCur=='basics'?'text-green-new':'text-gray'" class="text-xl">首页</text>
						<!-- <view class="cu-tag badge" style="right: -25rpx;">22</view> -->
					</view>
					<text :class="PageCur=='basics'?'bg-green-new':'bg-gray'" class="round" style="left: 50%;transform: translate(-50%, 50%);"></text>
				</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class="action border-title">
					<view class="cuIcon-cu-image">
						<text :class="PageCur=='component'?'text-green-new':'text-gray'" class="text-xl">问诊</text>
						<view class="cu-tag badge" v-if="newMsg" style="right: -25rpx;">{{newMsg?unreadNum:''}}</view>
					</view>
					<text :class="PageCur=='component'?'bg-green-new':'bg-gray'" class="round" style="left: 50%;transform: translate(-50%, 50%);"></text>
				</view>

			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class="action border-title">
					<view class="cuIcon-cu-image">
						<text :class="PageCur=='plugin'?'text-green-new':'text-gray'" class="text-xl">百科</text>
						<!-- <view class="cu-tag badge" style="right: -25rpx;">22</view> -->
					</view>
					<text :class="PageCur=='plugin'?'bg-green-new':'bg-gray'" class="round" style="left: 50%;transform: translate(-50%, 50%);"></text>
				</view>
			</view>
			<view class="action" @click="NavChange" data-cur="account">
				<view class="action border-title">
					<view class="cuIcon-cu-image">
						<text :class="PageCur=='account'?'text-green-new':'text-gray'" class="text-xl">我的</text>
						<!-- <view class="cu-tag badge" style="right: -25rpx;">22</view> -->
					</view>
					<text :class="PageCur=='account'?'bg-green-new':'bg-gray'" class="round" style="left: 50%;transform: translate(-50%, 50%);"></text>
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
	}
	from '@/api/modules/message.js'
	
	export default {
		data() {
			return {
				PageCur: 'basics',
				socketOpen: false,
				newMsg: false,
				unreadNum: 0,
				unreadMsgList: [],
				contactList: [],
				hide: false
			}
		},
		onLoad() {
			// 进行 websocket 连接
			this.connectSocket()
			this.getUnreadMsg()
			this.getContactList()
		},
		onHide() {
			console.log("index hide")
			this.hide = true
		},
		onShow() {
			console.log("index show")
			// 从下级页面点返回露出当前页面，更新数据
			if(this.hide) {
				this.getContactList()
				this.getUnreadMsg()
			}
			
			// 进入其他页面时，uni.onSocketMessage会被覆盖
			// 所以返回页面时重新启动消息监听
			this.onSocketMessage()
		},
		onUnload() {
			// 关闭 websocket 连接
			this.closeSocket()
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
			
			// 进行 websocket 连接
			connectSocket() {
				uni.connectSocket({
					url: 'ws://localhost:1024/channel'
				});
				uni.onSocketOpen(res => {
					console.log('WebSocket连接已打开！');
					this.socketOpen = true
					this.initConnect(),
						this.onSocketMessage()
				});

				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
				});
			},

			// 告诉后端是初始化连接
			initConnect() {
				console.log("初始化WebSocket连接")
				var dataContent = this.GLOBAL.dataContent;
				var msg = this.GLOBAL.message;
				// 带上用户 id 用来处理和 channel 的关联关系
				msg.from_id = uni.getStorageSync("userInfo").id;
				dataContent.action = this.GLOBAL.action.CONNECT;
				dataContent.message = msg;
				
				uni.sendSocketMessage({
					data: JSON.stringify(dataContent)
				});
			},

			// 监听消息接收
			onSocketMessage() {
				let that = this;
				uni.onSocketMessage(function(res) {
					console.log("index: ", JSON.parse(res.data))
					// that.$store.commit("updateLastMsg", JSON.parse(res.data).message)
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
					userId: uni.getStorageSync('userInfo').id
				}).then(res => {
					if(res.data.length > 0) {
						this.newMsg = true
						this.unreadNum = res.data.length
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
				getContactList({
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					if(res.success) {
						console.log("getContactList success: ", res)
						this.contactList = res.data
					}
				}).catch(data =>{
					console.log("getContactList error: ", data)
				})
			}
			
			
		}
	}
</script>

<style>

</style>
