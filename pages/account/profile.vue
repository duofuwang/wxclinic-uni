<template name="profile">
	<view class="">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的资料</block>
		</cu-custom>

		<form @submit="formSubmit">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="cu-form-group">
					<view class="title text-bold">昵称</view>
					<input :value="userInfo==null?'':userInfo.nickname" placeholder="请填写昵称" name="nickname"></input>
				</view>
				<view class="cu-form-group arrow" @click="chooseAvatar">
					<view class="title text-bold">头像</view>
					<view>
						<view class="cu-avatar round bg-gray" v-if="userInfo!=null"
							:style="{backgroundImage:'url(' + userInfo.avatarUrl + ')'}"></view>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title text-bold">姓名</view>
					<input :value="userInfo==null?'':userInfo.realName" placeholder="请填写真实姓名" name="realName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold">身份证号</view>
					<input :value="userInfo==null?'':userInfo.identityNumber" placeholder="请填写身份证号"
						name="identityNumber"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold">手机号码</view>
					<input :value="userInfo==null?'':userInfo.phoneNumber" placeholder="预留手机号"
						name="phoneNumber"></input>
					<text class='cuIcon-phone text-orange'></text>
				</view>

				<view class="cu-form-group">
					<view class="title text-bold">性别</view>
					<view>
						<radio-group @change="genderRadioChange" name="gender">
							<text class="text-lg">男</text>
							<radio class='blue radio margin-left-sm' :class="userInfo.gender==1?'checked':''"
								:checked="userInfo.gender==1?true:false" value=1></radio>
							<text class="text-lg margin-left-sm">女</text>
							<radio class='blue radio margin-left-sm' :class="userInfo.gender==0?'checked':''"
								:checked="userInfo.gender==0?true:false" value=0></radio>
						</radio-group>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold">出生年月</view>
					<picker mode="date" :value="date" start="1900-1-1" end="2099-12-31" @change="dateChange"
						name="birthday">
						<view class="picker">
							{{ date }}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold">身高</view>
					<input :value="userInfo==null?'':userInfo.height" placeholder="请填写身高（厘米）" name="height"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							厘米
						</view>
						<view class="cu-tag line-blue">
							cm
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold">体重</view>
					<input :value="userInfo==null?'':userInfo.weight" placeholder="请填写体重（千克）" name="weight"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							千克
						</view>
						<view class="cu-tag line-blue">
							kg
						</view>
					</view>
				</view>

				<view class="cu-form-group">
					<view class="title text-bold">地区</view>
					<picker mode="region" :value="region" @change="regionChange" name="region">
						<view class="picker">
							{{region.toString()}}
						</view>
					</picker>
				</view>
				<view class="margin-top">
					<view style="width: 90%; margin: 0 auto;">
						<button class="cu-btn line-green-new round lg shadow" style="width: 100%;"
							form-type="submit">保存</button>
					</view>
				</view>
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		</form>
	</view>
</template>

<script>
	import currentDate from '@/libs/date.js'
	
	import {
		saveUser,
		getUserInfo
	} from '../../api/modules/user.js'

	export default {
		name: 'profile',
		data() {
			return {
				userInfo: null,
				region: [],
				date: "",
				avatarUrl: ""
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo")
			
			console.log("this.userInfo", this.userInfo)

			this.date = this.userInfo == null ? currentDate.getDate() : this.userInfo.birthday;
			this.avatarUrl = this.userInfo.avatarUrl;

			this.region.push(this.userInfo.province)
			this.region.push(this.userInfo.city)
			if (this.userInfo.district != null) {
				this.region.push(this.userInfo.district)
			}
		},
		methods: {
			chooseAvatar() {
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], // 从相册选择
					success: (res) => {
						wx.showToast({
							title: '头像上传中',
							icon: 'loading',
							duration: 1000
						})
						
						const tempFilePaths = res.tempFilePaths;
						// 上传图片文件，后台返回文件链接
						tempFilePaths.forEach(item => {
							console.log("upload image: ", item)
							uni.uploadFile({
								url: this.$api.upload, //仅为示例，非真实的接口地址
								filePath: item,
								name: 'file',
								header: {
									'token': uni.getStorageSync("token")
								},
								formData: {
									'userId': uni.getStorageSync("userInfo").id
								},
								success: (res) => {
									wx.showToast({
										title: '头像上传成功',
										icon: 'success',
										duration: 1000
									})
									console.log(res)
									console.log("uploadFile success: ", JSON.parse(res.data));
									this.userInfo.avatarUrl = JSON.parse(res.data).data
									console.log("userInfo", this.userInfo)
								}
							});
						})
					}
				})
			},
			
			// 性别单选按钮
			genderRadioChange(e) {
				console.log(e)
			},
			
			// date picker
			dateChange(e) {
				console.log(e.detail.value)
				this.date = e.detail.value
			},
			
			// region picker
			regionChange(e) {
				console.log(e.detail.value)
				this.region = e.detail.value
			},
			
			// 提交表单
			formSubmit(e) {
				wx.showToast({
					title: '保存中',
					icon: 'loading',
					duration: 1000
				})
				
				let form = e.detail.value;
				
				// 合并对象，form与userInfo顺序不能更换
				var data = {
					...this.userInfo,
					...form,
				}
				
				data.region.forEach((item, index) => {
					data.province = index == 0 ? item : data.province;
					data.city = index == 1 ? item : data.city;
					data.district = index == 2 ? item : data.district;
				})
				
				console.log("data", data)
				
				// 提交保存
				saveUser(data).then(res => {
					console.log(res)
					if (res.success) {
						wx.showToast({
							title: '保存成功',
							icon: 'success',
							duration: 1000
						})
						
						// 更新用户信息
						this.getUserInfo()
					}
					
				}).catch(data => {
					console.log(data)
					wx.showToast({
						title: '保存失败',
						icon: 'error',
						duration: 1000
					})
				})
			},
			
			// 更新用户信息
			getUserInfo() {
				getUserInfo({
					userId: this.userInfo.id
				}).then(res => {
					console.log("getUserInfo", res)
					if (res.success) {
						uni.setStorageSync("userInfo", res.data)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
