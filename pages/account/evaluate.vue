<template>
	<view class="page bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">服务评价</block>
		</cu-custom>

		<view class="bg-light-light">
			<view class="margin-sm bg-white" style="border-radius: 15rpx;">
				<view class="padding">
					<view class="text-xl text-center">
						<text>请为我们的服务个打分吧</text>
						<view class="margin">
							<u-rate :count="count" v-model="evaluate.rate" size="64"></u-rate>
						</view>
						
					</view>
					<u-input type="textarea" v-model="evaluate.reason" :border="true" :height="500" :auto-height="true"
						:maxlength="200" :placeholder="placeholder" />
				</view>
			</view>

			<view class="foot margin-bottom-sm">
				<view style="width: 90%; margin: 0 auto;">
					<button class="cu-btn bg-green-new round lg" style="width: 100%;" @click="submit">提交</button>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		saveEvaluate
	} from "@/api/modules/evaluate.js"
	export default {
		data() {
			return {
				evaluate: {},
				userInfo: {},
				placeholder: '说说您对我们服务感受的原因',
				count: 5,
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo")
		},
		methods: {
			submit() {
				if (this.evaluate.reason == '' || this.evaluate.reason == null) {
					wx.showToast({
						title: "还没输入内容",
						icon: "error"
					})
					return
				}

				this.evaluate.userId = this.userInfo.id;
				wx.showLoading({
					title: "提交中",
					mask: true
				})
				saveEvaluate(this.evaluate).then(res => {
					if (res.success) {
						wx.showToast({
							title: '感谢您的评价',
							icon: 'success'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					}
				})
			}
		}
	}
</script>

<style scoped>
	.foot {
		position: fixed;
		z-index: 1024;
		width: 100%;
		bottom: 0;
		justify-content: space-between;
		align-items: center;
	}
</style>
