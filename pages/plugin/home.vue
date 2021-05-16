<template name="components">
	<view style="background-color: #F8FBFF;">
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-green-new" :isBack="false">
				<block slot="content">健康百科</block>
			</cu-custom>
			<view class="padding-lr-sm padding-bottom-sm margin-top">
				<view class="text-xl text-bold margin-left-sm padding-top-sm"><text>健康专区</text></view>
			</view>

			<view class="flex flex-wrap justify-between">
				<view class="flex flex-wrap bg-white margin-left-sm padding"
					style="border-radius: 15rpx; padding-right: 0; width: 350rpx;" @click="toChild(4, '儿童健康')">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/child.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="content padding-left-sm">
						<view class="text-xl text-bold">
							<text>儿童健康</text>
						</view>
						<view class="text-gray">
							<view>守护未来</view>
						</view>
					</view>
				</view>
				<view class="flex flex-wrap bg-white margin-right-sm padding"
					style="border-radius: 15rpx; width: 350rpx;" @click="toChild(5, '老年人健康')">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/old_1.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="padding-left-sm">
						<view class="text-xl text-bold">
							<text class="margin-right-xs">老年人健康</text>
						</view>
						<view class="text-gray">
							<view>爱满夕阳</view>
						</view>
					</view>
				</view>
			</view>

			<view class="padding-lr-sm margin-top">
				<view class="text-xl text-bold margin-left-sm padding-top-sm">
					<text>急救指南</text>
				</view>
			</view>

			<view class="flex flex-wrap justify-between margin-top-sm">
				<view class="flex flex-wrap bg-white margin-left-sm padding"
					style="border-radius: 15rpx; padding-right: 0; width: 350rpx;" @click="toChild(6, '常见急救')">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/first_aid.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="content padding-left-sm">
						<view class="text-xl text-bold">
							<text>常见急救</text>
						</view>
						<view class="text-gray">
							<view>常见急救方法</view>
						</view>
					</view>
				</view>
				<view class="flex flex-wrap bg-white margin-right-sm padding"
					style="border-radius: 15rpx; width: 350rpx;" @click="toChild(7, '家庭急救')">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/home.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="padding-left-sm">
						<view class="text-xl text-bold">
							<text class="margin-right-xs">家庭急救</text>
						</view>
						<view class="text-gray">
							<view>家庭急救知识</view>
						</view>
					</view>
				</view>
			</view>

			<view class="flex flex-wrap justify-between margin-top-sm">
				<view class="flex flex-wrap bg-white margin-left-sm padding"
					style="border-radius: 15rpx; padding-right: 0; width: 350rpx;" @click="toChild(8, '疾病突发')">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/disease.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="content padding-left-sm">
						<view class="text-xl text-bold">
							<text>疾病突发</text>
						</view>
						<view class="text-gray">
							<view>疾病突发防范</view>
						</view>
					</view>
				</view>
				<view class="flex flex-wrap bg-white margin-right-sm padding"
					style="border-radius: 15rpx; width: 350rpx;" @click="toChild(9, '户外急救')">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/outdoor.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="padding-left-sm">
						<view class="text-xl text-bold">
							<text class="margin-right-xs">户外急救</text>
						</view>
						<view class="text-gray">
							<view>户外求生技巧</view>
						</view>
					</view>
				</view>
			</view>

			<view class="padding-lr-sm margin-top">
				<view class="text-xl text-bold margin-left-sm padding-top-sm">
					<text>每日辟谣</text>
				</view>
			</view>

			<view class="cu-card" @click="handleInfo">
				<view class="cu-item bg-img shadow-blur"
					:style="'height: 350rpx; border-radius: 15rpx; background-image: url(' + rumorArticle.banner + ');'">
					<view class="cardTitle text-white">
						{{ rumorArticle.title }}
					</view>
				</view>
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
	import {
		getNewRumorArticle
	} from "@/api/modules/article.js"
	export default {
		name: "components",
		data() {
			return {
				list: [{
					title: '多吃黑芝麻能生发？',
					img: '/static/food.jpg',
					url: '../plugin/home'
				}],
				rumorArticle: {
					banner: ''
				}
			};
		},
		mounted() {
			this.getRumorArticle()
		},
		methods: {
			toChild(type, title) {
				let data = {
					type: type,
					title: title
				}
				uni.navigateTo({
					url: '/pages/plugin/article/article?data=' + encodeURIComponent(JSON.stringify(data))
				})
			},

			getRumorArticle() {
				getNewRumorArticle().then(res => {
					this.rumorArticle = res.data
					console.log(this.rumorArticle)
				})
			},

			handleInfo() {
				uni.navigateTo({
					url: '/pages/plugin/article/detail?articleId=' + this.rumorArticle.id
				})
			}
		},
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.cardTitle {
		padding-left: 25rpx;
		padding-top: 20rpx;
		font-size: 65upx;
		font-weight: 500;
		/* transform: skew(-10deg, 0deg); */
		position: relative;
		/* text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3) */
	}

	.cardTitle::before {
		content: "";
		position: absolute;
		width: 60upx;
		height: 6upx;
		border-radius: 20upx;
		background-color: #fff;
		display: block;
		top: 60upx;
		left: 50upx;
		transform: skew(10deg, 0deg);
		opacity: 0;
	}

	.cardTitle::after {
		content: "";
		position: absolute;
		width: 140upx;
		border-radius: 6upx;
		height: 24upx;
		background-color: #fff;
		display: block;
		bottom: 76upx;
		left: 90upx;
		transform: skew(10deg, 0deg);
		opacity: 0;
	}
</style>
