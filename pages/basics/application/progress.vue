<template>
	<view class="bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">详情</block>
		</cu-custom>

		<view>
			<view class="cu-card padding-sm">
				<view class="bg-red padding text-center shadow-blur light" style="border-radius: 15rpx;" v-if="application.status==0">
					<view class="text-xl">已拒绝。</view>
					<view class="margin-top-sm"></view>
				</view>
				<view class="bg-green padding text-center shadow-blur light" style="border-radius: 15rpx;" v-else-if="application.status==1">
					<view class="text-xl">已通过。</view>
					<view class="margin-top-sm"></view>
				</view>
				<view class="bg-gray padding text-center shadow-blur light" style="border-radius: 15rpx;" v-else-if="application.status==-1">
					<view class="text-xl">已撤销。</view>
					<view class="margin-top-sm"></view>
				</view>
				<view class="bg-orange padding text-center shadow-blur light" style="border-radius: 15rpx;" v-else>
					<view class="text-xl">审核中。</view>
					<view class="margin-top-sm"></view>
				</view>
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
								错误的地址信息
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
							<text class="text-xl text-bold" v-if="application.type=='appointment'">预约时间</text>
							<text class="text-xl text-bold" v-if="application.type=='visit'">出诊时间</text>
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

			<view class="cu-card" v-if="application.type=='visit'">
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
			<view class="cu-tabbar-height"></view>
			<view class="cu-tabbar-height"></view>
			<view class="box">
				<view class="cu-bar btn-group foot bg-white">
					<button class="cu-btn line-green-new shadow-blur round lg" @click="cancle">返回</button>
					<button class="cu-btn bg-green-new shadow-blur round lg" v-if="application.type==1" @click="applyAgain('appointment')">再次申请</button>
					<button class="cu-btn bg-green-new shadow-blur round lg" v-if="application.type==2" @click="applyAgain('visit')">再次申请</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				application: {},
				user: {}
			};
		},
		onLoad(option) {
			this.application = JSON.parse(decodeURIComponent(option.item))
			console.log(this.application)
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
