<template>
	<view class="bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">详情</block>
		</cu-custom>

		<view>
			<view class="cu-card">
				<view class="cu-item shadow" style="margin: 10rpx 20rpx 10rpx 20rpx;">
					<view class="cu-bar bg-white radius">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text class="text-xl text-bold">患者</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ record.patientName}}
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
							<text class="text-xl text-bold">年龄</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ record.patientAge }}
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
							<text class="text-xl text-bold">住址</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ record.patientAddress }}
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
							<text class="text-xl text-bold">主诉</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ record.chiefComplaint }}
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
							<text class="text-xl text-bold">病史</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ record.medicalHistory }}
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
							<text class="text-xl text-bold">诊断</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ record.doctorDiagnosis }}
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
							<text class="text-xl text-bold">治疗方法</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ record.treatmentMethod }}
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
							<text class="text-xl text-bold">处方</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ record.prescription }}
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
							<text class="text-xl text-bold">时间</text>
						</view>
					</view>
					<view class="content text-xl">
						<view class="margin">
							<text>
								{{ record.createTime }}
							</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-tabbar-height"></view>
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
				record: {},
				user: {}
			};
		},
		onLoad(option) {
			this.record = JSON.parse(decodeURIComponent(option.item))
			console.log(this.record)
			this.user = uni.getStorageSync("userInfo");
		},
		methods: {
		}
	}
</script>

<style>
	.page {}
</style>
