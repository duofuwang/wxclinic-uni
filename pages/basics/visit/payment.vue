<template>
	<view class="bg-white page">
		<cu-custom bgColor="bg-green-new" :isBack="false">
		</cu-custom>
		<view class="padding-xs flex align-center margin-top">
			<view class="flex-sub text-center">
				<view class="text-xsl padding">
					<text class=" cuIcon-newshot text-green-new"></text>
				</view>
				<view class="text-xxl text-bold padding">订单创建成功</view>
				<view class="text-xl margin-bottom">请在<text class="text-red">{{min + " : " + sec}}</text>内完成支付</view>
			</view>
		</view>
		<view class="solid-top text-lg" style="width: 90%; margin: 0 auto;">
			<view class="flex justify-start">
				<view class="title text-grey-grey padding-sm margin-xs">申请人</view>
				<view class="padding-sm margin-xs radius">{{visit.nickname}}</view>
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
		<view class="cu-bar btn-group">
			<button class="cu-btn bg-green-new round lg" @click="pay">支付<text class="text-price text-white">{{" " + visit_order.fee}}</text></button>
		</view>
		<navigator hover-class="none" class="cu-bar btn-group" url="/pages/index/index">
			<button class="cu-btn line-green-new round lg">回到首页</button>
		</navigator>
	</view>
</template>

<script>
	import {
		payment
	} from '@/api/modules/visit_order.js'

	export default {
		data() {
			return {
				data: {},
				visit: {},
				visit_order: {},
				minutes: 30,
				seconds: 0,
				min: '30',
				sec: '00'
			}
		},
		onLoad(option) {
			this.data = JSON.parse(decodeURIComponent(option.data))
			this.visit = this.data.visit;
			this.visit_order = this.data.visit_order;
			console.log(this.visit)
			console.log(this.visit_order)
			this.timer()
		},
		methods: {
			timer() {
				var _this = this
				var time = setInterval(function() {
					if (_this.seconds === 0 && _this.minutes !== 0) {
						_this.seconds = 59
						_this.minutes -= 1
					} else if (_this.minutes === 0 && _this.seconds === 0) {
						_this.seconds = 0
						clearInterval(time)
					} else {
						_this.seconds -= 1
					}
					_this.min = _this.num(_this.minutes)
					_this.sec = _this.num(_this.seconds)
				}, 1000)
			},
			num(n) {
				return n < 10 ? '0' + n : '' + n
			},

			// 支付
			pay() {
				wx.showLoading({
					title: "支付中"
				})

				payment({
					id: this.visit_order.id
				}).then(res => {
					if (res.success) {
						console.log("payment success: ", res)
						setTimeout(() => {
							wx.hideLoading()
							wx.showToast({
								title: '支付成功'
							})
						}, 500)
						setTimeout(() => {
							// 支付成功 跳转至成功页面
							uni.redirectTo({
								url: 'success?data=' + encodeURIComponent(JSON.stringify(this.data))
							})
						}, 1500)
					} else {
						console.log("payment fail: ", res)
					}
				}).catch(data => {
					console.log("payment error: ", data)
				})
			}
		}
	}
</script>

<style>
	.title {
		min-width: calc(4em + 15px);
	}
</style>
