<template>
	<view class="bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">紧急呼救</block>
		</cu-custom>

		<view class="flex flex-wrap bg-white margin padding justify-between radius-xl">
			<view class="flex flex-wrap">
				<view class="flex basis-xs radius">
					<view class="cu-avatar round bg-white" style="height: 120rpx; width: 120rpx;">
						<image :src="userInfo.avatarUrl" mode="widthFix" class="round"></image>
					</view>
				</view>

				<view class="flex align-center margin-left">
					<view class="content">
						<view class="text-xl text-bold">
							<text>{{ userInfo.realName || userInfo.nickname}}</text>
						</view>
						<view class="text-gray">
							<view class='cu-tag round'>{{ userInfo.phoneNumber }}</view>
						</view>
					</view>
				</view>
			</view>


			<navigator hover-class="none" url="/pages/basics/emergency/record">
				<view class="flex align-center">
					<view class="content">
						<view class="cu-avatar bg-white">
							<image src="/static/icon/report.png" mode="widthFix"></image>
						</view>
						<view class="text-gray align-center">
							<view>记录</view>
						</view>
					</view>
				</view>
			</navigator>
		</view>

		<!-- 紧急呼救面板 -->
		<view class="margin padding bg-white radius-xl">
			<view class="grid col-1">
				<view class="flex align-center justify-center sos-container">
					<view class="flex round bg-gradual-blue shadow-blur align-center justify-center"
						@click="emergencyCall">
						<view class="container align-center justify-center">
							<view class="circle bg-gradual-blue"></view>
							<view class="circle bg-gradual-blue"></view>
							<view class="circle bg-gradual-blue"></view>
							<view class="circle bg-gradual-blue"></view>
							<view class="circle bg-gradual-blue"></view>
						</view>
						<view class="u-absolute">
							<text class="text-xxl">
								{{ isCalling ? "呼救中..." : "SOS"}}
							</text>
						</view>
					</view>
				</view>

				<view class="flex justify-center align-center text-xl" style="width: 90%;">
					<text class="cuIcon-locationfill text-green-new text-center">
						<text class="text-bold text-black">
							{{ location.address }}
						</text>
					</text>
				</view>
			</view>
		</view>

		<view class="padding-lr-sm padding-bottom-sm margin-top">
			<view class="text-xl text-bold margin-left-sm padding-top-sm"><text>快速拨打</text></view>
		</view>
		<view class="flex flex-wrap justify-between">
			<view class="flex flex-wrap bg-white margin-left-sm padding"
				style="border-radius: 15rpx; padding-right: 0; width: 350rpx;" @click="makePhoneCall('110')">
				<view class="basis-xs radius">
					<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
						<image src="/static/icon/ring.png" mode="widthFix" class="view-image"></image>
					</view>
				</view>
				<view class="content padding-left-sm">
					<view class="text-xl text-bold">
						<text>报警求助</text>
					</view>
					<view class="text-gray">
						<view>110</view>
					</view>
				</view>
			</view>

			<view class="flex flex-wrap bg-white margin-right-sm padding" style="border-radius: 15rpx; width: 350rpx;"
				@click="makePhoneCall('119')">
				<view class="basis-xs radius">
					<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
						<image src="/static/icon/fire.png" mode="widthFix" class="view-image"></image>
					</view>
				</view>
				<view class="padding-left-sm">
					<view class="text-xl text-bold">
						<text class="margin-right-xs">火灾</text>
					</view>
					<view class="text-gray">
						<view>119</view>
					</view>
				</view>
			</view>
		</view>

		<view class="flex flex-wrap justify-between margin-top-sm">
			<view class="flex flex-wrap bg-white margin-left-sm padding"
				style="border-radius: 15rpx; padding-right: 0; width: 350rpx;" @click="makePhoneCall('120')">
				<view class="basis-xs radius">
					<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
						<image src="/static/icon/hospital.png" mode="widthFix" class="view-image"></image>
					</view>
				</view>
				<view class="content padding-left-sm">
					<view class="text-xl text-bold">
						<text>医疗救护</text>
					</view>
					<view class="text-gray">
						<view>120</view>
					</view>
				</view>
			</view>

			<view class="flex flex-wrap bg-white margin-right-sm padding" style="border-radius: 15rpx; width: 350rpx;"
				@click="makePhoneCall('122')">
				<view class="basis-xs radius">
					<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
						<image src="/static/icon/car.png" mode="widthFix" class="view-image"></image>
					</view>
				</view>
				<view class="padding-left-sm">
					<view class="text-xl text-bold">
						<text class="margin-right-xs">交通事故</text>
					</view>
					<view class="text-gray">
						<view>122</view>
					</view>
				</view>
			</view>
		</view>


		<view class="padding-tb">
			<u-divider bg-color="#F8FBFF" fontSize="30">呵护生命 绿色健康</u-divider>
		</view>
	</view>
</template>

<script>
	import {
		getLocation
	} from "@/api/location.js"

	import {
		saveEmergency,
		getCurrentCall,
		stopEmergencyCall
	} from "@/api/modules/emergency.js"

	// 播放器
	const innerAudioContext = uni.createInnerAudioContext();

	export default {
		data() {
			return {
				location: {
					address: '获取定位中...'
				},
				message: "我遇到了紧急情况，当前位置在",
				emergency: {},
				userInfo: {},
				modalName: "",

				isCalling: false
			}
		},

		watch: {
			isCalling(val) {
				if (val) {
					this.playWarningAudio()
				} else {
					this.stopPlay()
				}
			}
		},

		onLoad() {
			console.log("emergency onload")

			this.userInfo = uni.getStorageSync("userInfo");

			// 获取定位
			this.getLocation()
		},

		onShow() {
			console.log("emergency page show")
			this.getCurrentCall();
		},

		methods: {
			playWarningAudio() {
				innerAudioContext.loop = true;
				innerAudioContext.src = require('../../../static/audio/alert.mp3');
				innerAudioContext.play();
			},
			stopPlay() {
				innerAudioContext.stop();
			},

			getLocation() {
				wx.showLoading({
					title: '定位中',
					mask: true
				});
				getLocation().then(res => {
					console.log("location", res)
					this.location = res
					wx.hideLoading()
				}).catch(err => {
					wx.hideLoading()
					wx.showToast({
						title: '请打开授权',
						icon: 'error'
					})
				})
			},

			// 点击 SOS 球
			emergencyCall() {
				// 当前正在呼救
				if (this.isCalling) {
					wx.showModal({
						title: '提示',
						content: '要停止呼救吗？',
						confirmText: '停止',
						success: res => {
							if (res.confirm) {
								this.stopEmergencyCall()
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
					return
				}

				// 当前未发出呼救
				console.log("呼救...")
				console.log(this.message + "【" + this.location + "】附近")
				this.emergency.userId = this.userInfo.id;
				this.emergency.location = this.location.address;
				this.emergency.latitude = this.location.location.lat;
				this.emergency.longitude = this.location.location.lng;
				this.emergency.message = this.message + "【" + this.location.address + "】附近";
				console.log("emergency", this.emergency)


				wx.showLoading({
					title: '发送呼救信息中...'
				});

				saveEmergency(this.emergency).then(res => {
					console.log(res)
					if (res.success) {
						wx.showToast({
							title: '发送成功',
							icon: 'success'
						})

						this.emergency = res.data;

						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/basics/emergency/success?emergency=" +
									encodeURIComponent(JSON.stringify(this.emergency))
							})
						}, 1000)
					}

				}).catch(err => {
					console.log("save emergency error", err)
					wx.showToast({
						title: '发送失败',
						icon: 'error'
					})
				})
			},

			getCurrentCall() {
				getCurrentCall({
					userId: this.userInfo.id
				}).then(res => {
					if (res.success) {
						if (res.data != null) {
							this.isCalling = res.data.status == 1;
							this.emergency = res.data
						} else {
							this.isCalling = false;
							this.emergency = {}
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},

			stopEmergencyCall() {
				console.log("停止紧急呼救")
				wx.showLoading({
					title: "停止呼救中",
					mask: true
				})
				stopEmergencyCall({
					userId: this.userInfo.id
				}).then(res => {
					if (res.success) {
						wx.showToast({
							title: "停止成功",
							icon: "success"
						})
						this.getCurrentCall()
					}
				}).catch(err => {
					console.log(err);

				})

			},

			makePhoneCall(phoneNumber) {
				wx.makePhoneCall({
					phoneNumber: phoneNumber
				}).catch(err => {})
			}
		}
	}
</script>

<style scoped>
	.radius-xl {
		border-radius: 20rpx;
	}

	.sos-container {
		height: 650rpx;
	}

	.container {
		width: 400rpx;
		height: 400rpx;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10%;
	}

	.circle {
		position: absolute;
		width: 400rpx;
		height: 400rpx;
		border-radius: 50%;
	}

	.circle:nth-child(1) {
		animation: anim 3s linear infinite;
	}

	.circle:nth-child(2) {
		animation: anim 3s linear 0.8s infinite;
	}

	.circle:nth-child(3) {
		animation: anim 3s linear 1.6s infinite;
	}

	.circle:nth-child(4) {
		animation: anim 3s linear 2.4s infinite;
	}

	@keyframes anim {
		from {
			opacity: 1;
			transform: scale(0);
		}

		to {
			opacity: 0;
			transform: scale(1.33);
		}
	}
</style>
