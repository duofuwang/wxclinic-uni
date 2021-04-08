<template>
	<view class="page">
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
		
		<view class="flex bg-white margin padding align-center justify-center radius-xl panel-container">
			<view class="panel round bg-gradual-blue">
				1111111111111
				
			</view>
			<!-- <view class="round">
				1111111111111
				
			</view> -->
		</view>

		<!-- <h1>紧急呼救</h1> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
.radius-xl {
	border-radius: 20rpx;
}
.panel-container{
	height: 700rpx;
	
}
.panel {
	height: 400rpx;
	width: 400rpx;
}
</style>
