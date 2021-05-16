<template name="basics">
	<view style="background-color: #F8FBFF;">
		<scroll-view scroll-y class="page margin-top-sm">
			<cu-custom bgColor="bg-green-new" :isBack="false">
				<block slot="content">首页</block>
			</cu-custom>
			<view class="padding-lr-sm padding-bottom-sm bg-white">
				<u-swiper :list="swiperList" mode="dot" indicator-pos="bottomRight"></u-swiper>
			</view>

			<view class="flex flex-wrap margin-top justify-between">
				<navigator hover-class="none" url="/pages/basics/appointment/appointment">
					<view class="flex flex-wrap bg-white margin-left-sm padding"
						style="border-radius: 15rpx; padding-right: 0; width: 350rpx;">
						<view class="basis-xs radius">
							<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
								<image src="/static/icon/appointment.png" mode="widthFix" class="view-image"></image>
							</view>
						</view>
						<view class="content padding-left-sm">
							<view class="text-xl text-bold">
								<text>预约医生</text>
							</view>
							<view class="text-gray">
								<view>门诊免排队</view>
							</view>
						</view>
					</view>
				</navigator>

				<navigator hover-class="none" url="/pages/basics/visit/visit">
					<view class="flex flex-wrap bg-white margin-right-sm padding"
						style="border-radius: 15rpx; width: 350rpx;">
						<view class="basis-xs radius">
							<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
								<image src="/static/icon/visit.png" mode="widthFix" class="view-image"></image>
							</view>
						</view>
						<view class="padding-left-sm">
							<view class="text-xl text-bold">
								<text class="margin-right-xs">申请出诊</text>
							</view>
							<view class="text-gray">
								<view>医生上门问诊</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>

			<view class="padding-lr-sm padding-bottom-sm margin-top">
				<view class="text-xl text-bold margin-left-sm padding-top-sm"><text>我的服务</text></view>
			</view>

			<view class="flex flex-wrap justify-between">
				<view class="flex flex-wrap bg-white margin-left-sm padding"
					style="border-radius: 15rpx; padding-right: 0; width: 350rpx;" @click="goConsult">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/consult.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="content padding-left-sm">
						<view class="text-xl text-bold">
							<text>在线问诊</text>
						</view>
						<view class="text-gray">
							<view>在线咨询医生</view>
						</view>
					</view>
				</view>

				<navigator hover-class="none" url="/pages/basics/record/record">
					<view class="flex flex-wrap bg-white margin-right-sm padding"
						style="border-radius: 15rpx; width: 350rpx;">
						<view class="basis-xs radius">
							<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
								<image src="/static/icon/record.png" mode="widthFix" class="view-image"></image>
							</view>
						</view>
						<view class="padding-left-sm">
							<view class="text-xl text-bold">
								<text class="margin-right-xs">病历查询</text>
							</view>
							<view class="text-gray">
								<view>我的病历查询</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>

			<view class="flex flex-wrap justify-between margin-top-sm">
				<view class="flex flex-wrap bg-white margin-left-sm padding"
					style="border-radius: 15rpx; padding-right: 0; width: 350rpx;" @click="viewProgress">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/loading.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="content padding-left-sm">
						<view class="text-xl text-bold">
							<text>申请进度</text>
						</view>
						<view class="text-gray">
							<view>查看申请进度</view>
						</view>
					</view>
				</view>
				<navigator hover-class="none" url="/pages/basics/emergency/emergency">
					<view class="flex flex-wrap bg-white margin-right-sm padding"
						style="border-radius: 15rpx; width: 350rpx;">
						<view class="basis-xs radius">
							<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
								<image src="/static/icon/lightning.png" mode="widthFix" class="view-image"></image>
							</view>
						</view>
						<view class="padding-left-sm">
							<view class="text-xl text-bold">
								<text>紧急呼救</text>
							</view>
							<view class="text-gray">
								<view>发送信息/定位</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>

			<view class="padding-lr-sm padding-bottom-sm margin-top">
				<view class="text-xl text-bold margin-left-sm padding-top-sm"><text>其他</text></view>
			</view>

			<view class="flex flex-wrap justify-between">
				<navigator hover-class="none" url="/pages/basics/suggestion/suggestion">
					<view class="flex flex-wrap bg-white margin-left-sm padding"
						style="border-radius: 15rpx; padding-right: 0; width: 350rpx;">
						<view class="basis-xs radius">
							<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
								<image src="/static/icon/feedback.png" mode="widthFix" class="view-image"></image>
							</view>
						</view>
						<view class="content padding-left-sm">
							<view class="text-xl text-bold">
								<text>意见反馈</text>
							</view>
							<view class="text-gray">
								<view>帮助改进服务</view>
							</view>
						</view>
					</view>
				</navigator>
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
	export default {
		name: "basics",
		data() {
			return {
				swiperList: [{
						image: '/static/banner/banner_1.jpg',
					},
					{
						image: '/static/banner/banner_2.jpg',
					},
					{
						image: '/static/banner/banner_3.jpg',
					}
				],
				elements: [{
						title: '布局',
						name: 'layout',
						color: 'cyan',
						cuIcon: 'newsfill'
					},
					{
						title: '背景',
						name: 'background',
						color: 'blue',
						cuIcon: 'colorlens'
					}
				],
			};
		},
		onShow() {
			console.log("success")
		},
		methods: {
			// 进入问诊页
			goConsult() {
				this.$emit("changeTab", "component");
			},

			// 申请进度
			viewProgress() {
				console.log("申请进度")
				uni.navigateTo({
					url: '/pages/basics/application/application'
				})
			},
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
