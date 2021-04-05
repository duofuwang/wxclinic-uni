<template name="account">
	<view class="bg-light-light">
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-green-new" :isBack="false">
				<block slot="content">我的</block>
			</cu-custom>

			<view class="bg-green-new" style="position: absolute; width: 100%; height: 450rpx;"></view>
			<!-- <image src="/static/BasicsBg.png" mode="widthFix" class="response" style="position: absolute;"></image> -->
			<!-- 用户信息卡片 -->
			<view class="cu-list menu sm-border card-menu margin-top-sm">
				<view class="cu-item">
					<view class="content">
						<text>欢迎</text>
					</view>
				</view>
				<view class="cu-item" style="border-bottom: 1px solid #ddd0">
					<view class="content margin-tb">
						<view class="flex flex-wrap" @click="login">
							<view class="basis-xs margin-xs radius">
								<!-- <cmd-avatar shape="circle" size="lg" :src="user.avatarUrl"></cmd-avatar> -->
								<image class="cu-avatar xl round" :src="user.avatarUrl==null?'../../static/wechat.png':user.avatarUrl"></image>
							</view>
							<view class="basis-lg margin-xs radius">
								<!-- <text class="text-xl">{{ user.nickName }}</text>
							<text class="text-xl">{{ user.nickName }}</text> -->
								<view class="content padding-left-sm">
									<view class="text-xxl">
										<text class="margin-right-xs">{{ user.nickName==null?'未登录':user.nickName }}</text>
									</view>
									<view class="text-gray text-xl margin-top-sm">
										<!-- <text class="margin-right-xs">{{ user.phoneNumber }}</text> -->
										<view class="cu-tag line-gray round">{{ user.phoneNumber==null?'点击去授权登录~':user.phoneNumber }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text>身体健康 生活愉快</text>
					</view>
					<view style="float: right;">
						<view><button class="cu-btn bg-green-new round shadow-blur" @click="editProfile">修改资料</button></view>
					</view>
				</view>
			</view>

			<view style="height: 20rpx;"></view>

			<!-- <view class="padding-lr-sm padding-bottom-sm margin-top">
			<view class="text-xl text-bold margin-left-sm padding-top-sm">
				<text>离线服务</text>
			</view>
		</view> -->
			<view class="flex flex-wrap justify-between margin-top">
				<view class="flex flex-wrap bg-white margin-left-sm padding" style="border-radius: 15rpx; padding-right: 0; width: 350rpx;">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/pill.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="content padding-left-sm">
						<view class="text-xl text-bold">
							<text>我的处方</text>
						</view>
						<view class="text-gray">
							<view>看处方防遗忘</view>
						</view>
					</view>
				</view>
				<view class="flex flex-wrap bg-white margin-right-sm padding" style="border-radius: 15rpx; width: 350rpx;">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/bill.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="padding-left-sm">
						<view class="text-xl text-bold">
							<text class="margin-right-xs">结算订单</text>
						</view>
						<view class="text-gray">
							<view>查看诊疗订单</view>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-list menu sm-border card-menu-sm margin-top">
				<view class="cu-item arrow">
					<view class="content">
						<!-- <text class="cuIcon-profile text-cyan"></text> -->
						<image src="/static/icon/profile.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">我的资料</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<button class="cu-btn content" open-type="contact">
						<!-- <text class="cuIcon-mail text-olive"></text> -->
						<image src="/static/icon/message.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">服务评价</text>
					</button>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
						<!-- <text class="cuIcon-discover text-orange"></text> -->
						<image src="/static/icon/leaf.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">关于我们</text>
					</navigator>
				</view>
			</view>

			<view class="margin-top">
				<view style="width: 90%; margin: 0 auto;">
					<!-- <u-button type="error" shape="circle" @click="test">测试</u-button> -->
					<button class="cu-btn line-red round lg shadow" style="width: 100%;" @click="logout">退出登录</button>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>

			<view class="margin-top margin-bottom-xxl">
				<view style="width: 90%; margin: 0 auto;">
					<button class="cu-btn line-red round lg shadow" style="width: 100%;" @click="test">建立WebSocket连接1</button>
				</view>
			</view>

			<view class="margin-top margin-bottom-xl">
				<view style="width: 90%; margin: 0 auto;">
					<button class="cu-btn line-red round lg shadow" style="width: 100%;" @click="send">发送一条信息1</button>
				</view>
			</view>

			<view class="margin-top margin-bottom-xl">
				<view style="width: 90%; margin: 0 auto;">
					<button class="cu-btn line-red round lg shadow" style="width: 100%;" @click="test2">建立WebSocket连接2</button>
				</view>
			</view>

			<view class="margin-top margin-bottom-xl">
				<view style="width: 90%; margin: 0 auto;">
					<button class="cu-btn line-red round lg shadow" style="width: 100%;" @click="send2">发送一条信息2</button>
				</view>
			</view>

			<view class="margin-top margin-bottom-xl">
				<view style="width: 90%; margin: 0 auto;">
					<button class="cu-btn line-red round lg shadow" style="width: 100%;" @click="close">关闭连接1</button>
				</view>
			</view>

			<view class="margin-top margin-bottom-xl">
				<view style="width: 90%; margin: 0 auto;">
					<button class="cu-btn line-red round lg shadow" style="width: 100%;" @click="close2">关闭连接2</button>
				</view>
			</view>
			
			<view class="margin-top margin-bottom-xl">
				<view style="width: 90%; margin: 0 auto;">
					<button class="cu-btn line-red round lg shadow" style="width: 100%;" @click="setStorage()">setStorage</button>
				</view>
			</view>

			<view class="margin-top margin-bottom-xl">
				<view style="width: 90%; margin: 0 auto;">
					<button class="cu-btn line-red round lg shadow" style="width: 100%;" @click="getAllUser()">获取用户信息</button>
				</view>
			</view>

			<view class="margin-top">
				<u-divider bg-color="#F8FBFF" fontSize="30">呵护生命 绿色健康</u-divider>
			</view>
			<view class="cu-tabbar-height"></view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';

	import {
		getAllUser
	} from "@/api/modules/user.js"

	import {
		getMsgById
	} from "@/api/modules/message.js"


	export default {
		name: "account",
		props: {
		},
		data() {
			return {
				user: {},
				socketOpen: false,
				socketMsgQueue: [],
				msg: "测试信息"
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		mounted() {
			this.user = uni.getStorageSync("userInfo")
			
			// 监听更新事件
			this.onUpdate();
		},
		beforeDestroy() {
			// 移除监听事件
			uni.$off('add', this.add)
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '../login/home'
				});
			},

			logout() {
				this.$store.commit("logout");
				uni.showToast({
					title: '退出登录成功',
					icon: 'success',
					duration: 1000
				})
				setTimeout(() => {
					uni.reLaunch({
						url: '../index/index'
					});
				}, 1000)
			},
			
			// 修改资料
			editProfile() {
				uni.navigateTo({
					url: '/pages/account/profile'
				})
			},
			
			// 更新内容
			onUpdate() {
				uni.$on('update', data => {
					this.user = uni.getStorageSync("userInfo")
				})
			},

			getAllUser() {
				getAllUser().then(res => {
					console.log(res)
				})
				getMsgById().then(res => {
					console.log(res)
				})

			},

			test() {
				uni.connectSocket({
					url: 'ws://localhost:1024/channel'
				});
				uni.onSocketOpen(res => {
					console.log('WebSocket连接已打开！');
					this.socketOpen = true
					this.initConnect()
				});

				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
				});
				uni.onSocketMessage(function(res) {
					console.log('收到服务器内容：' + res.data);
				});

			},

			send() {
				var dataContent = this.GLOBAL.dataContent;
				dataContent.action = this.GLOBAL.action.CHAT;
				var msg = this.GLOBAL.message;
				msg.from_id = uni.getStorageSync("userInfo").id;
				msg.content = "测试一下";
				msg.type = "text";
				msg.to_id = "ou-2"
				dataContent.message = msg;

				if (this.socketOpen) {
					uni.sendSocketMessage({
						data: JSON.stringify(dataContent)
					});
				} else {
					socketMsgQueue.push(this.msg);
				}
			},

			initConnect() {
				// 告诉后端是初始化连接
				console.log("初始化连接")
				var dataContent = this.GLOBAL.dataContent;
				var msg = this.GLOBAL.message;
				msg.from_id = uni.getStorageSync("userInfo").id;
				dataContent.action = this.GLOBAL.action.CONNECT;
				dataContent.message = msg;
				console.log(dataContent)

				uni.sendSocketMessage({
					data: JSON.stringify(dataContent)
				});
			},

			close() {
				uni.closeSocket();
				uni.onSocketClose(function(res) {
					console.log('WebSocket 已关闭！');
				});
			},

			// 2
			test2() {
				uni.connectSocket({
					url: 'ws://localhost:1024/channel'
				});
				uni.onSocketOpen(res => {
					console.log('2--WebSocket连接已打开！');
					this.socketOpen = true
					this.initConnect2()
				});

				uni.onSocketError(function(res) {
					console.log('2--WebSocket连接打开失败，请检查！');
				});
				uni.onSocketMessage(function(res) {
					console.log('2--收到服务器内容：' + res.data);
				});

			},

			send2() {
				var dataContent = this.GLOBAL.dataContent;
				dataContent.action = this.GLOBAL.action.CHAT;
				var msg = this.GLOBAL.message;
				msg.from_id = "ou-2";
				msg.content = "2--测试一下";
				msg.type = "text";
				msg.to_id = "ou-fS5gMqbOGVNGGjPjqmm5Vvs9s"
				dataContent.message = msg;

				if (this.socketOpen) {
					uni.sendSocketMessage({
						data: JSON.stringify(dataContent)
					});
				} else {
					socketMsgQueue.push(this.msg);
				}
			},

			initConnect2() {
				// 告诉后端是初始化连接
				console.log("初始化连接")
				var dataContent = this.GLOBAL.dataContent;
				var msg = this.GLOBAL.message;
				msg.from_id = "ou-2";
				dataContent.action = this.GLOBAL.action.CONNECT;
				dataContent.message = msg;
				console.log(dataContent)

				uni.sendSocketMessage({
					data: JSON.stringify(dataContent)
				});
			},

			close2() {
				uni.closeSocket();
				uni.onSocketClose(function(res) {
					console.log('2--WebSocket 已关闭！');
				});
			},
			
			setStorage() {
				uni.setStorage({
					key: 'userInfo',
					data: {
						id: 'ou-2',
						nickName: 'xx',
						avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/7nULdT9goEs9b1voicSIfpIV8ibibRiclMibbl9Z3q67JUdtI2AUib1FofK7YfcgQQIO5wPGrWSCOD9qmFWJcynU1JLA/132',
						toId: 'ou-fS5gMqbOGVNGGjPjqmm5Vvs9s'
					},
					success: (res) => {
						console.log(res)
					}
				})
			}
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
