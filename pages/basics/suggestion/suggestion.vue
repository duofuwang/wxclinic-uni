<template>
	<view class="page bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">意见反馈</block>
		</cu-custom>

		<view class="bg-light-light">

			<view class="margin-sm bg-white" style="border-radius: 15rpx;">
				<view class="padding">
					<u-input type="textarea" v-model="suggestion.suggestion" :border="true" :height="500"
						:auto-height="true" :maxlength="200" placeholder="描述您的建议或者功能期望, 我们将认真考虑您的建议哦~" />
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
		saveSuggestion
	} from "@/api/modules/suggestion.js"
	export default {
		data() {
			return {
				suggestion: {},
				userInfo: {}
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo")
		},
		methods: {
			submit() {
				if (this.suggestion == '') {
					wx.showToast({
						title: "还没输入内容",
						icon: "error"
					})
					return
				}

				this.suggestion.userId = this.userInfo.id;
				wx.showLoading({
					title: "提交中",
					mask: true
				})
				saveSuggestion(this.suggestion).then(res => {
					if (res.success) {
						wx.showToast({
							title: '感谢你的反馈',
							icon: 'success'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/index/index'
							})
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
