<template>
	<view class="bg-white page">
		<cu-custom bgColor="bg-green-new" :isBack="false">
		</cu-custom>
		<view class="padding-xs flex align-center margin-top">
			<view class="flex-sub text-center">
				<view class="text-xsl padding">
					<text class=" cuIcon-roundcheckfill text-green-new"></text>
				</view>
				<view class="text-xxl text-bold padding">预约成功</view>
				<view class="text-xl margin-bottom">医生将尽快处理您的请求~</view>
			</view>
		</view>
		<view class="solid-top text-lg" style="width: 90%; margin: 0 auto;">
			<view class="flex justify-start">
				<view class="title text-grey-grey padding-sm margin-xs">预约人</view>
				<view class="padding-sm margin-xs radius">{{appointment.nickName}}</view>
			</view>
			<view class="flex justify-start">
				<view class="title text-grey-grey padding-sm margin-xs">手机号码</view>
				<view class="padding-sm margin-xs radius">{{appointment.phoneNumber}}</view>
			</view>
			<view class="flex justify-start">
				<view class="title text-grey-grey padding-sm margin-xs">就诊日期</view>
				<view class="padding-sm margin-xs radius">{{appointment.time}}</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
		<view class="cu-tabbar-height"></view>
		<navigator hover-class="none" class="cu-bar btn-group" url="/pages/index/index">
			<button class="cu-btn bg-green-new round lg">回到首页</button>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appointment: {}
			}
		},
		onLoad(option) {
			this.appointment = JSON.parse(decodeURIComponent(option.item));
		},
		methods: {

		}
	}
</script>

<style>
	.title {
		min-width: calc(4em + 15px);
	}
</style>
