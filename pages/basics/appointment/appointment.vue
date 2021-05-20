<template>
	<view>
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">预约</block>
		</cu-custom>

		<form @submit="formSubmit">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="cu-form-group margin-top">
					<view class="title text-bold">预约人</view>
					<input :value="userInfo==null?'':userInfo.realName||userInfo.nickname" placeholder="昵称" disabled
						name="nickname"></input>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold">手机号码</view>
					<input :value="userInfo==null?'':userInfo.phoneNumber" placeholder="预留手机号"
						name="phoneNumber"></input>
					<text class='cuIcon-phone text-orange'></text>
				</view>

				<view class="cu-form-group margin-top">
					<view class="title text-bold">就诊日期</view>
					<picker mode="date" :value="date" :start="date" end="2099-12-31" @change="DateChange" name="date">
						<view class="picker">
							{{date}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold">就诊时间</view>
					<picker mode="time" :value="time" start="00:00" end="23:59" @change="TimeChange" name="time">
						<view class="picker">
							{{time}}
						</view>
					</picker>
				</view>

				<view class="cu-form-group margin-top">
					<textarea maxlength="-1" :disabled="modalName!=null" :value="textareaAValue" @input="textareaAInput"
						placeholder="请简要描述病情……" name="description"></textarea>
				</view>
				<view class="cu-form-group">
					<text>快速添加：</text>
					<scroll-view scroll-x="true" class="kite-classify-scroll">
						<view class="kite-classify-cell" v-for="(item, index) in quickAddBtnData" :key="index">
							<button class="cu-btn round"
								@click="quickAdd(quickAddBtnData[index].content)">{{quickAddBtnData[index].title}}</button>
						</view>
					</scroll-view>
				</view>

				<view class="cu-bar bg-white margin-top">
					<view class="action">
						<text class="text-bold text-black">图片上传（可选）</text>
					</view>
					<view class="action">
						{{imgList.length}}/4
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
							:data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-tabbar-height"></view>
				<view class="cu-tabbar-height"></view>
			</scroll-view>
			<view class="box margin-top-xs">
				<view class="cu-bar btn-group foot bg-white">
					<button class="cu-btn line-green-new shadow-blur round lg" @click="cancle">取消</button>
					<button class="cu-btn bg-green-new shadow-blur round lg" form-type="submit">提交</button>
				</view>
			</view>
		</form>
		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import {
		saveAppointment
	} from '@/api/modules/appointment.js'

	import {
		apply
	} from "@/api/modules/application.js"

	export default {
		data() {
			return {
				userInfo: null,
				index: -1,
				time: '12:00',
				date: '2018-12-25',
				imgList: [],
				modalName: null,
				textareaAValue: '',
				appointment: {},

				//快速添加按钮
				quickAddBtnData: [{
						title: "+发热",
						content: "有发热症状"
					},
					{
						title: "+外伤",
						content: "受到外伤"
					},
					{
						title: "+头晕",
						content: "有头晕症状"
					},
					{
						title: "+感冒",
						content: "有感冒症状"
					},
					{
						title: "+其他",
						content: "其他："
					},
				]
			}
		},
		onLoad() {
			// 获取当前时间
			uni.request({
					url: 'http://quan.suning.com/getSysTime.do'
				})
				.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
					var [error, res] = data;
					// {"sysTime2":"2021-03-02 14:21:35","sysTime1":"20210302142135"}
					// res.data.sysTime2 = 2021-03-02 14:21:35
					this.time = res.data.sysTime2.substring(res.data.sysTime2.lastIndexOf(" ") + 1, res.data.sysTime2
						.lastIndexOf(":"))
					this.date = res.data.sysTime2.substring(0, res.data.sysTime2.lastIndexOf(" "))

				})

			this.userInfo = uni.getStorageSync("userInfo");
		},
		methods: {
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除这张图片吗？',
					cancelText: '再看看',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},

			// 向病情描述输入框快速添加内容
			quickAdd(content) {
				this.textareaAValue.length == 0 ? this.textareaAValue += content : this.textareaAValue += "\r\n" + content
			},

			// 提交请求
			formSubmit(e) {
				wx.showLoading({
					title: '提交中'
				});

				var appointment = e.detail.value;
				appointment.userId = this.userInfo.id;
				appointment.time = appointment.date + " " + appointment.time;
				appointment.type = 1

				// 提交前将换行符替换为<br/>，才能保存到数据库
				appointment.description = appointment.description.replace(/\n|\r\n/g, "<br/>");

				console.log(appointment)
				if (this.checkForm(appointment)) {
					// 未选择图片
					if (this.imgList.length == 0) {
						this.saveApplication(appointment)
						return
					}
					var img = []
					this.imgList.forEach((item, index) => {
						uni.uploadFile({
							url: this.$api.upload,
							filePath: item,
							name: 'file',
							header: {
								'token': uni.getStorageSync("token")
							},
							formData: {
								'userId': uni.getStorageSync("userInfo").id
							},
							success: (res) => {
								img.push(JSON.parse(res.data).data)
								// 等最后一个文件上传完成
								if (index == this.imgList.length - 1) {
									appointment.image = img.join(',')
									this.saveApplication(appointment)
								}
							}
						});
					})
				}
			},

			// 保存
			saveApplication(appointment) {
				apply(appointment)
					.then(res => {
						if (res.success) {
							setTimeout(() => {
								wx.hideLoading()
								wx.showToast({
									title: '提交成功'
								})
							}, 500)
							setTimeout(function() {
								// 提交成功 跳转至成功页面
								uni.redirectTo({
									url: 'success?item=' + encodeURIComponent(JSON.stringify(
										appointment))
								})
							}, 1500)
						} else {
							wx.hideLoading()
							wx.showToast({
								title: res.data == null ? '服务器错误' : res.data,
								icon: "error"
							})
						}
					})
					.catch(data => {
						console.log(data)
					})
			},

			// 校验数据合法性
			checkForm(form) {
				if (form.description.length < 10) {
					uni.showToast({
						title: "病情描述不少于10个字",
						icon: "none"
					})
					return false
				}
				const phoneReg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if (!phoneReg.test(form.phoneNumber)) {
					uni.showToast({
						title: "请填写正确手机号",
						icon: "none"
					})
					return false
				}
				return true
			},

			cancle() {
				uni.navigateBack();
			}

		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
