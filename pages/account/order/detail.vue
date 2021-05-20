<template>
	<view class="bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">详情</block>
		</cu-custom>

		<view>
			<view class="cu-card padding-sm">
			</view>

			<view class="cu-card">
				<view class="cu-item shadow" style="margin: 10rpx 20rpx 10rpx 20rpx;">
					<view class="cu-bar bg-white radius">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text class="text-xl text-bold">备注</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ application.remark | remarkFilter }}
							</text>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-card">
				<view class="cu-item shadow" style="margin: 10rpx 20rpx 10rpx 20rpx;">
					<view class="cu-bar bg-white radius">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text class="text-xl text-bold">申请单号</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ application.id }}
							</text>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-card">
				<view class="cu-item shadow" style="margin: 10rpx 20rpx 10rpx 20rpx;">
					<view class="cu-bar bg-white radius">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text class="text-xl text-bold">申请人</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ user.nickname }}
							</text>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-card">
				<view class="cu-item shadow" style="margin: 10rpx 20rpx 10rpx 20rpx;">
					<view class="cu-bar bg-white radius">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text class="text-xl text-bold" v-if="application.type==1">预约时间</text>
							<text class="text-xl text-bold" v-if="application.type==2">出诊时间</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ application.time }}
							</text>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-card" v-if="application.type==2">
				<view class="cu-item shadow" style="margin: 10rpx 20rpx 10rpx 20rpx;">
					<view class="cu-bar bg-white radius">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text class="text-xl text-bold">位置</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ application.address }}
							</text>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-card">
				<view class="cu-item shadow" style="margin: 10rpx 20rpx 10rpx 20rpx;">
					<view class="cu-bar bg-white radius">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text class="text-xl text-bold">描述</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ parseBr(application.description)  }}
							</text>
						</view>
					</view>
				</view>
			</view>

			<view class="cu-card" v-if="application.image">
				<view class="cu-item shadow" style="margin: 10rpx 20rpx 10rpx 20rpx;">
					<view class="cu-bar bg-white radius">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text class="text-xl text-bold">图片</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin" v-for="(item, index) in application.image" :key="index">
							<image :src="item" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
			<view class="cu-tabbar-height"></view>
			<view class="box">
				<view class="cu-bar btn-group foot bg-white">
					<button class="cu-btn line-green-new shadow-blur round lg" @click="cancle">返回</button>
					<button class="cu-btn bg-green-new shadow-blur round lg" v-if="application.type==1"
						@click="applyAgain('appointment')">再次申请</button>
					<button class="cu-btn bg-green-new shadow-blur round lg" v-if="application.type==2"
						@click="applyAgain('visit')">再次申请</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		filters: {
			remarkFilter(remark) {
				return remark == null ? '无' : remark
			}
		},
		data() {
			return {
				application: {},
				user: {}
			};
		},
		onLoad(option) {
			this.application = JSON.parse(decodeURIComponent(option.item))

			if (this.application.image) {
				this.application.image = this.application.image.split(",")
			}
			this.user = uni.getStorageSync("userInfo");
		},
		methods: {
			parseBr(str) {
				if (str != null) {
					return str.replace(/<br\/>/g, "\r\n")
				}
				return str
			},
			cancle() {
				uni.navigateBack()
			},
			applyAgain(type) {
				uni.redirectTo({
					url: '/pages/basics/' + type + '/' + type
				})
			}
		}
	}
</script>

<style>
	.page {}
</style>
