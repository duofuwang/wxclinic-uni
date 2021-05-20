<template>
	<view class="bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">呼救记录</block>
		</cu-custom>
		<view class="wrap" :style="'height: calc(100vh - ' + CustomBar + 'px);'">
			<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
				<view class="page-box">
					<view class="order" v-for="(item, index) in emergencyList" :key="index">
						<view class="top text-xl">
							<view class="left">
							</view>
							<view class="right text-xl">
								<view class="text-green" v-if="item.status==1">进行中</view>
								<view class="text-grey" v-else-if="item.status==0">已结束</view>
							</view>
						</view>
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">位置：</text>
									{{ item.location }}
								</view>
							</view>
						</view>
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">备注：</text>
									{{ item.remark }}
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
						<view class="bottom">
							<view class="logistics btn" v-if="item.status==0" @click="deleteEmergency(item.id)">删除
							</view>
							<view class="logistics btn" style="float: left;" @click="stopEmergencyCall(item.id)"
								v-if="item.status==1">停止</view>
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
		getEmergencyList,
		stopEmergencyCall,
		deleteEmergency
	} from "@/api/modules/emergency.js"
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,

				userOrderList: [],
				emergencyList: [],
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
			this.userInfo = uni.getStorageSync("userInfo")
			this.getEmergencyList()
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
				this.getEmergencyList();
			},

			getEmergencyList() {
				this.loadStatus = 'loading'
				getEmergencyList({
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
					this.emergencyList = [...this.emergencyList, ...records]
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
			// 删除
			deleteEmergency(id) {
				console.log(id)
				uni.showModal({
					title: '确认要删除吗?',
					confirmText: '删除',
					success: (e) => {
						console.log(e)
						if (e.confirm) {
							deleteEmergency({
								ids: id
							}).then(res => {
								if (res.success) {
									// 更新数据
									this.emergencyList.forEach((item, index) => {
										if (item.id == id) {
											this.emergencyList.splice(index, 1)
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
			// 停止
			stopEmergencyCall(id) {
				uni.showModal({
					title: '确认要停止呼救吗?',
					confirmText: '确定',
					success: (e) => {
						console.log(e)
						if (e.confirm) {
							console.log(id)
							stopEmergencyCall({
								userId: this.userInfo.id
							}).then(res => {
								if (res.success) {
									// 更新数据
									this.emergencyList.forEach((item, index) => {
										if (item.id == id) {
											item.status = 0
										}
									})
									wx.showToast({
										title: "停止成功",
										icon: "success"
									})
								}
							}).catch(err => {
								console.log(err);
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
