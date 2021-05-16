<template>
	<view class="page bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的病历</block>
		</cu-custom>

		<view class="bg-light-light">
			<!-- 全部 -->
			<scroll-view scroll-y style="height: 100%; width: 100%;" @scrolltolower="reachBottom">
				<view class="page-box">
					<view class="order" v-for="(item, index) in medicalRecordList" :key="index">
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">诊断：</text>
									{{ item.doctorDiagnosis }}
								</view>
							</view>
						</view>
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">主诉：</text>
									{{ item.chiefComplaint }}
								</view>
							</view>
						</view>
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">治疗方法：</text>
									{{ item.treatmentMethod }}
								</view>
							</view>
						</view>
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">处方：</text>
									{{ item.prescription }}
								</view>
							</view>
						</view>
						<view class="item text-xl">
							<view class="content">
								<view class="title u-line-2">
									<text class="text-bold">时间：</text>
									{{ item.createTime }}
								</view>
							</view>
						</view>
						<view class="bottom">
							<view class="logistics btn" @click="deleteMedicalRecord(item.id)">删除</view>
							<view class="evaluate btn" @click="handleDetail(item)">查看</view>
						</view>
					</view>
					<u-loadmore :status="loadStatus[0]" bgColor="bg-light-light" class="margin"></u-loadmore>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import {
		getUserMedicalRecord,
		deleteMedicalRecord
	} from "@/api/modules/medical-record.js"
	export default {
		data() {
			return {
				medicalRecordList: [],
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			this.getUserMedicalRecord()
		},
		computed: {},
		methods: {
			reachBottom() {
				console.log("reachBottom")
			},
			
			getUserMedicalRecord() {
				getUserMedicalRecord().then(res => {
					this.medicalRecordList = res.data
					this.loadStatus.splice(0, 1, "nomore")
				})
			},
			// 查看详情
			handleDetail(item) {
				console.log("handleDetail: ", item)
				uni.navigateTo({
					url: '/pages/basics/record/detail?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			// 删除申请
			deleteMedicalRecord(id) {
				console.log(id)
				uni.showModal({
					title: '确认要删除吗?',
					confirmText: '删除',
					success: (e) => {
						console.log(e)
						if (e.confirm) {
							deleteMedicalRecord({
								ids: id
							}).then(res => {
								if (res.success) {
									// 更新数据
									this.getUserMedicalRecord();

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
