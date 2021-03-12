<template>
	<view class="bg-white page">
		<cu-custom bgColor="bg-green-new" :isBack="false">
		</cu-custom>
		<view class="padding-xs flex align-center margin-top">
			<view class="flex-sub text-center">
				<view class="text-xsl padding">
					<text class=" cuIcon-roundcheckfill text-green-new"></text>
				</view>
				<view class="text-xxl text-bold padding">支付成功</view>
				<view class="text-xl margin-bottom">医生将尽快处理您的请求~</view>
			</view>
		</view>
		<view class="solid-top text-lg" style="width: 90%; margin: 0 auto;">
			<view class="flex justify-start">
				<view class="title text-grey-grey padding-sm margin-xs">申请人</view>
				<view class="padding-sm margin-xs radius">{{visit.nickName}}</view>
			</view>
			<view class="flex justify-start">
				<view class="title text-grey-grey padding-sm margin-xs">手机号码</view>
				<view class="padding-sm margin-xs radius">{{visit.phoneNumber}}</view>
			</view>
			<view class="flex justify-start">
				<view class="title text-grey-grey padding-sm margin-xs">地址</view>
				<view class="padding-sm margin-xs radius">{{visit.address}}</view>
			</view>
			<view class="flex justify-start">
				<view class="title text-grey-grey padding-sm margin-xs">出诊日期</view>
				<view class="padding-sm margin-xs radius">{{visit.day + " " + visit.time_hh_mm}}</view>
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
				visit: {},
				visit_order: {}
			}
		},
		onLoad(option) {
			var data = JSON.parse(decodeURIComponent(option.data))
			this.visit = data.visit;
			this.visit_order = data.visit_order;
			console.log(this.visit)
			console.log(this.visit_order)
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
