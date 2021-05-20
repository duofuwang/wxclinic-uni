<template>
	<view class="bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的订单</block>
		</cu-custom>
		<view class="wrap" :style="'height: calc(100vh - ' + CustomBar + 'px);'">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
				<view class="page-box">
					<view class="order" v-for="(item, index) in userOrderList" :key="index">
						<view class="top text-xl">
							<view class="left">
								<view class="store">出诊订单</view>
							</view>
							<view class="right text-xl">
								<view class="text-green" v-if="item.paid==1">已支付</view>
								<view class="text-orange" v-else-if="item.paid==0&&!item.expired">待支付</view>
								<view class="text-red" v-else-if="item.paid==2">已取消</view>
								<view class="text-grey" v-else-if="item.expired">已过期</view>
							</view>
						</view>
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">费用：</text>
									<text class="text-price text-red">{{ item.fee }}</text>
								</view>
							</view>
						</view>
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">创建时间：</text>
									{{ item.createTime }}
								</view>
							</view>
						</view>
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">过期时间：</text>
									{{ item.expirationTime }}
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="logistics btn" v-if="item.paid==1 || item.expired || item.paid==2"
								@click="deleteOrder(item.id)">删除</view>
							<view class="logistics btn" style="float: left;" @click="cancelOrder(item.id)"
								v-if="item.paid==0&&!item.expired">取消订单</view>
							<view class="evaluate btn" @click="viewOrder(item)">查看</view>
						</view>
					</view>
					<u-loadmore :status="loadStatus" :load-text="loadText" bgColor="bg-light-light" class="margin">
					</u-loadmore>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import {
		getApplicationById
	} from "@/api/modules/application.js"
	import {
		getUserOrderList,
		deleteOrder,
		cancelOrder
	} from "@/api/modules/order.js"
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,

				userOrderList: [],
				pageNum: 1,
				pageSize: 5,
				noStepping: false,

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
				loadStatus: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				navHeight: 0,
				CustomBar: this.CustomBar
			};
		},
		onLoad() {
			this.getUserOrderList();
		},
		computed: {},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				console.log("tabSelect: ", e.currentTarget.dataset.id)
				this.swiperCurrent = this.TabCur;
			},

			reachBottom() {
				console.log("reachBottom")
				this.pageNum++;
				this.getUserOrderList();
			},

			getUserOrderList() {
				this.loadStatus = 'loading'
				getUserOrderList({
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					var records = res.data.records
					if (records.length == 0) {
						this.loadStatus = 'nomore'
						this.pageNum--;
						return
					}
					this.userOrderList = [...this.userOrderList, ...records]
					this.loadStatus = 'loadmore'
				}).catch(err => {
					this.pageNum--;
					this.loadStatus = 'nomore'
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
			viewOrder(item) {
				getApplicationById(item.applicationId).then(res => {
					var application = res.data
					uni.navigateTo({
						url: '/pages/account/order/detail?item=' + encodeURIComponent(JSON.stringify(application))
					})
				})
			},
			// 删除订单
			deleteOrder(id) {
				console.log(id)
				uni.showModal({
					title: '确认要删除吗?',
					confirmText: '删除',
					success: (e) => {
						console.log(e)
						if (e.confirm) {
							deleteOrder({
								ids: id
							}).then(res => {
								if (res.success) {
									// 更新数据
									this.userOrderList.forEach((item, index) => {
										if (item.id == id) {
											this.userOrderList.splice(index, 1)
										}
									})

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
			// 取消
			cancelOrder(id) {
				uni.showModal({
					title: '确认要取消订单吗?',
					confirmText: '确定',
					success: (e) => {
						console.log(e)
						if (e.confirm) {
							console.log(id)
							cancelOrder({
								ids: id
							}).then(res => {
								if (res.success) {
									// 更新数据
									this.userOrderList.forEach((item, index) => {
										if (item.id == id) {
											this.userOrderList.splice(index, 1)
										}
									})

									uni.showToast({
										title: '取消成功',
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
