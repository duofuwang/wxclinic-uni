<template>
	<view class="page bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">关于我们</block>
		</cu-custom>
		<view class="margin text-xxl text-bold text-center">
			<text>{{config.name}}</text>
		</view>
		<view class="bg-light-light margin text-xl" style="text-indent: 2em;">
			<view v-html="config.about"></view>
		</view>
		<view class="margin text-xl">
			<text>电话：{{config.tel}}</text>
		</view>
		<view class="margin text-xl">
			<text>地址：{{config.address}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: {}
			}
		},
		onLoad() {
			this.config = uni.getStorageSync("config");
		},
		methods: {

		}
	}
</script>

<style>

</style>
