<template>
	<view class="page bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">离线留言</block>
		</cu-custom>

		<view class="bg-light-light">

			<view class="margin-sm bg-white" style="border-radius: 15rpx;">
				<view class="padding">
					<u-input type="textarea" v-model="message.message" :border="true" :height="500" :auto-height="true"
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
		saveMessageBoard
	} from "@/api/modules/message-board.js"
	export default {
		data() {
			return {
				message: {},
				userInfo: {},
				placeholder: '请描述您的病情或者诉求，医生将尽快处理哦！'
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo")
		},
		methods: {
			submit() {
				if (this.message == '') {
					wx.showToast({
						title: "还没输入内容",
						icon: "error"
					})
					return
				}

				this.message.userId = this.userInfo.id;
				wx.showLoading({
					title: "提交中",
					mask: true
				})
				saveMessageBoard(this.message).then(res => {
					if (res.success) {
						wx.showToast({
							title: '留言成功~',
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
