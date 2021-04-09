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
						<image src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" mode="widthFix"
							class="round"></image>
					</view>
				</view>

				<view class="flex align-center margin-left">
					<view class="content">
						<view class="text-xl text-bold">
							<text>wangduofu</text>
						</view>
						<view class="text-gray">
							<view class='cu-tag round'>1760541026</view>
						</view>
					</view>
				</view>
			</view>


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
		</view>

		<!-- 紧急呼救面板 -->
		<view class="margin padding bg-white radius-xl">
			<view class="grid col-1">
				<view class="flex align-center justify-center sos-container">
					<view class="flex round bg-gradual-blue shadow-blur align-center justify-center">
						<view class="container align-center justify-center">
							<view class="circle bg-gradual-blue"></view>
							<view class="circle bg-gradual-blue"></view>
							<view class="circle bg-gradual-blue"></view>
							<view class="circle bg-gradual-blue"></view>
							<view class="circle bg-gradual-blue"></view>
						</view>
						<view class="u-absolute">
							<text class="text-xxl">SOS</text>
						</view>
					</view>
				</view>

				<view class="flex justify-center align-center text-xl" style="width: 90%;">
					<text class="cuIcon-locationfill text-green-new">
						<text class="text-bold text-black">
							{{ location }}
						</text>
					</text>
				</view>
			</view>
		</view>
		
		<view class="padding-lr-sm padding-bottom-sm margin-top">
			<view class="text-xl text-bold margin-left-sm padding-top-sm"><text>快速拨打</text></view>
		</view>
		<view class="flex flex-wrap justify-between">
			<navigator hover-class="none" url="/pages/basics/appointment/appointment">
				<view class="flex flex-wrap bg-white margin-left-sm padding"
					style="border-radius: 15rpx; padding-right: 0; width: 350rpx;">
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
			</navigator>
		
			<navigator hover-class="none" url="/pages/basics/visit/visit">
				<view class="flex flex-wrap bg-white margin-right-sm padding"
					style="border-radius: 15rpx; width: 350rpx;">
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
			</navigator>
		</view>
		
		<view class="flex flex-wrap justify-between margin-top-sm">
			<navigator hover-class="none" url="/pages/basics/appointment/appointment">
				<view class="flex flex-wrap bg-white margin-left-sm padding"
					style="border-radius: 15rpx; padding-right: 0; width: 350rpx;">
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
			</navigator>
		
			<navigator hover-class="none" url="/pages/basics/visit/visit">
				<view class="flex flex-wrap bg-white margin-right-sm padding"
					style="border-radius: 15rpx; width: 350rpx;">
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
			</navigator>
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

	export default {
		data() {
			return {
				location: '福建省厦门市集美区'
			}
		},

		onLoad() {
			console.log("emergency onload")
			// 获取定位
			// this.getLocation()
		},

		methods: {
			getLocation() {
				wx.showLoading({
					title: '定位中'
				});
				getLocation().then(res => {
					console.log(res)
					this.location = res.address
					wx.hideLoading()
				})
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
