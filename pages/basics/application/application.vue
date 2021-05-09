<template>
	<view class="bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的申请</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav" style="position: relative;">
			<view class="flex text-center">
				<view class="cu-item flex-sub text-xl" :class="index==TabCur?'text-orange cur':''"
					v-for="(item,index) in list" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>

		<view class="wrap" :style="'height: calc(100vh - ' + navHeight + 'px - ' + CustomBar + 'px);'">
			<!-- <view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view> -->
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition"
				@animationfinish="animationfinish" :duration="300">
				<!-- 全部 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in applicationList" :key="index">
								<view class="top text-xl">
									<view class="left">
										<view class="store" v-if="item.type==1">预约申请</view>
										<view class="store" v-if="item.type==2">出诊申请</view>
									</view>
									<view class="right text-xl">
										<view class="text-green" v-if="item.status==1">通过</view>
										<view class="text-red" v-else-if="item.status==0">拒绝</view>
										<view class="text-grey" v-else-if="item.status==-1">已撤销</view>
										<view class="text-orange" v-else>审核中</view>
									</view>
								</view>
								<view class="item text-xl">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">描述：</text>
											{{ format(item.description) }}
										</view>
									</view>
								</view>
								<view class="item text-xl" v-if="item.type==2">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">位置：</text>
											{{ item.address }}
										</view>
									</view>
								</view>
								<view class="item text-xl">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">时间：</text>
											{{ item.time }}
										</view>
									</view>
								</view>
								<view class="bottom">
									<view class="logistics btn" @click="deleApplication(item.id)">删除</view>
									<view class="logistics btn" style="float: left;" @click="revokeApplication(item.id)"
										v-if="item.status!=0&&item.status!=1&&item.status!=-1">撤销</view>
									<view class="evaluate btn" @click="viewProgress(item)">查看</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="bg-light-light" class="margin"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 审核中 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in applicationList" :key="index"
								v-if="item.status!=0&&item.status!=1&&item.status!=-1">
								<view class="top text-xl">
									<view class="left">
										<view class="store" v-if="item.type==1">预约申请</view>
										<view class="store" v-if="item.type==2">出诊申请</view>
									</view>
									<view class="right text-xl">
										<view class="text-green" v-if="item.status==1">通过</view>
										<view class="text-red" v-else-if="item.status==0">拒绝</view>
										<view class="text-grey" v-else-if="item.status==-1">已撤销</view>
										<view class="text-orange" v-else>审核中</view>
									</view>
								</view>
								<view class="item text-xl">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">描述：</text>
											{{ format(item.description) }}
										</view>
									</view>
								</view>
								<view class="item text-xl" v-if="item.type==2">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">位置：</text>
											{{ item.address }}
										</view>
									</view>
								</view>
								<view class="item text-xl">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">时间：</text>
											{{ item.time }}
										</view>
									</view>
								</view>
								<view class="bottom">
									<view class="logistics btn" @click="deleApplication(item.id)">删除</view>
									<view class="logistics btn" style="float: left;" @click="revokeApplication(item.id)"
										v-if="item.status!=0&&item.status!=1&&item.status!=-1">撤销</view>
									<view class="evaluate btn">查看</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="bg-light-light" class="margin"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 已通过 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in applicationList" :key="index"
								v-if="item.status==1">
								<view class="top text-xl">
									<view class="left">
										<view class="store" v-if="item.type==1">预约申请</view>
										<view class="store" v-if="item.type==2">出诊申请</view>
									</view>
									<view class="right text-xl">
										<view class="text-green" v-if="item.status==1">通过</view>
										<view class="text-red" v-else-if="item.status==0">拒绝</view>
										<view class="text-grey" v-else-if="item.status==-1">已撤销</view>
										<view class="text-orange" v-else>审核中</view>
									</view>
								</view>
								<view class="item text-xl">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">描述：</text>
											{{ format(item.description) }}
										</view>
									</view>
								</view>
								<view class="item text-xl" v-if="item.type==2">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">位置：</text>
											{{ item.address }}
										</view>
									</view>
								</view>
								<view class="item text-xl">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">时间：</text>
											{{ item.time }}
										</view>
									</view>
								</view>
								<view class="bottom">
									<view class="logistics btn" @click="deleApplication(item.id)">删除</view>
									<view class="logistics btn" style="float: left;" @click="revokeApplication(item.id)"
										v-if="item.status!=0&&item.status!=1&&item.status!=-1">撤销</view>
									<view class="evaluate btn">查看</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="bg-light-light" class="margin"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 已拒绝 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in applicationList" :key="index"
								v-if="item.status==0">
								<view class="top text-xl">
									<view class="left">
										<view class="store" v-if="item.type==1">预约申请</view>
										<view class="store" v-if="item.type==2">出诊申请</view>
									</view>
									<view class="right text-xl">
										<view class="text-green" v-if="item.status==1">通过</view>
										<view class="text-red" v-else-if="item.status==0">拒绝</view>
										<view class="text-grey" v-else-if="item.status==-1">已撤销</view>
										<view class="text-orange" v-else>审核中</view>
									</view>
								</view>
								<view class="item text-xl">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">描述：</text>
											{{ format(item.description) }}
										</view>
									</view>
								</view>
								<view class="item text-xl" v-if="item.type==2">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">位置：</text>
											{{ item.address }}
										</view>
									</view>
								</view>
								<view class="item text-xl">
									<view class="content">
										<view class="title u-line-2">
											<text class="text-bold">时间：</text>
											{{ item.time }}
										</view>
									</view>
								</view>
								<view class="bottom">
									<view class="logistics btn" @click="deleApplication(item.id)">删除</view>
									<view class="logistics btn" style="float: left;" @click="revokeApplication(item.id)"
										v-if="item.status!=0&&item.status!=1&&item.status!=-1">撤销</view>
									<view class="evaluate btn">查看</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="bg-light-light" class="margin"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- <swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode="">
									</image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item> -->
			</swiper>
		</view>

	</view>
</template>

<script>
	import {
		getApplicationList,
		deleApplication,
		revokeApplication
	} from "@/api/modules/application.js"
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,

				applicationList: [],
				list: [{
						name: '全部'
					},
					{
						name: '审核中'
					},
					{
						name: '已通过'
					},
					{
						name: '已拒绝'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
				navHeight: 0,
				CustomBar: this.CustomBar
			};
		},
		onLoad() {
			this.getApplicationList();

			let that = this;
			uni.createSelectorQuery().select('.nav').boundingClientRect(data => {
				that.navHeight = data.height
			}).exec()
		},
		computed: {
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				console.log("tabSelect: ", e.currentTarget.dataset.id)
				this.swiperCurrent = this.TabCur;
			},

			reachBottom() {
				console.log("reachBottom")
			},


			// 获取数据
			getApplicationList() {
				getApplicationList({
					userId: uni.getStorageSync('userInfo').id
				}).then(res => {
					console.log("getApplicationList success: ", res)
					this.applicationList = res.data
					this.loadStatus.splice(this.swiperCurrent, 1, "nomore")
				}).catch(data => {
					console.log("getApplicationList error: ", data)
				})
			},
			// tab栏切换
			change(index) {
				console.log("change: ", index)
				this.swiperCurrent = index;
			},
			transition(e) {},
			// 动画结束
			animationfinish({
				detail: {
					current
				}
			}) {
				this.swiperCurrent = current;
				this.current = current;
				this.TabCur = current
			},
			format(str) {
				return str.replace(/<br\/>/g, " ")
			},
			// 查看详情
			viewProgress(item) {
				console.log("viewProgress: ", item)
				uni.navigateTo({
					url: '/pages/basics/application/progress?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			// 删除申请
			deleApplication(id) {
				console.log(id)
				uni.showModal({
					title: '确认要删除吗?',
					confirmText: '删除',
					success: (e) => {
						console.log(e)
						if (e.confirm) {
							deleApplication({
								ids: id
							}).then(res => {
								if (res.success) {
									// 更新数据
									this.getApplicationList();

									uni.showToast({
										title: '删除成功',
										icon: 'success'
									})
								}
							}).catch(data => {
								console.log(data)
							})
						}
					}
				})
			},
			// 撤销
			revokeApplication(id) {
				uni.showModal({
					title: '确认要撤销申请吗?',
					confirmText: '撤销',
					success: (e) => {
						console.log(e)
						if (e.confirm) {
							console.log(id)
							revokeApplication({
								ids: id
							}).then(res => {
								if (res.success) {
									// 更新数据
									this.getApplicationList();

									uni.showToast({
										title: '撤销成功',
										icon: 'success'
									})
								}
							}).catch(data => {
								console.log(data)
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					// font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				margin-right: 20rpx;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					// font-size: 28rpx;
					font-size: 32rpx;
					line-height: 50rpx;
					margin-left: 10rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 30rpx;
			padding: 0 10rpx;
			justify-content: flex-end;
			align-items: center;

			.btn {
				line-height: 58rpx;
				width: 160rpx;
				border-radius: 5000rpx;
				border: 2rpx solid $u-border-color;
				font-size: 30rpx;
				text-align: center;
				color: $u-type-info-dark;
				margin-left: 20rpx;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 64rpx;
			line-height: 128rpx;
			color: #ffffff;
			font-size: 30rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		// height: calc(100vh - var(--window-top));

		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100vh;
	}
</style>
