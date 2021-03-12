<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>
		
		<!-- 微信图标 -->
		<view style="height: 200rpx; width: 200rpx; margin: 0 auto; margin-top: 100rpx;">
			<u-image width="100%" height="100%" src="/static/wechat.png"></u-image>
		</view>
		
		<!-- 分割线 -->
		<view class="solid-bottom" style="margin-top: 20rpx;"></view>
		
		<!-- 提示信息 -->
		<view class="text-xxl padding">
			<text class="text-black text-bold">登录将获取以下权限:</text>
		</view>
		<view class="text-xl padding-left">
			<text class="cuIcon-title text-gray"></text>
			<text class="text-grey">获得你的公开信息(昵称，头像、地区等)</text>
		</view>
		<view class="text-xl padding-left">
			<text class="cuIcon-title text-gray"></text>
			<text class="text-grey">获得你微信绑定的手机号</text>
		</view>
		<view class="padding">
			<u-button class='bottom' shape='circle' type='success' open-type="getUserInfo" withCredentials="true" lang="zh_CN"
			 @getuserinfo="getUserInfo" :loading="logging">
				{{ comfirm }}
			</u-button>
		</view>

		<!-- 请求获取手机号 -->
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">、
				<view class="padding-xl text-xl">
					<text>获取手机号以进行下一步</text>
					<view class="cu-bar btn-group">
						<button class="cu-btn line-green shadow-blur round" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green shadow-blur round" open-type="getPhoneNumber" withCredentials="true" lang="zh_CN"
						 @getphonenumber="getPhoneNumber">授权</button>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		wxlogin, wxlogin2
	} from '../../api/modules/user.js'

	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				logging: false,
				comfirm: '微信一键登录',
				modalName: null,
				phoneLoading: false,

				// code用于获取session_key和openid
				jsCode: null,

				// 用户手机号加密信息
				encryptedData: null,
				iv: null,
				// 解密后的手机号
				phoneNumber: null,

				// 用户公开信息
				userInfo: null,
				rawData: null,
				// 使用 sha1( rawData + sessionkey ) 得到的字符串，用于校验用户信息
				signature: null
			}
		},

		onLoad() {
			// 获取code
			uni.login({
				provider: "weixin",
				success: (res) => {
					console.log(res)
					if (res.code != null) { //微信登录成功 已拿到code
						this.jsCode = res.code
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			})
		},
		methods: {
			getUserInfo(e) {
				const that = this;
				that.logging = true;
				that.comfirm = '登录中';
				// code获取成功后获取用户信息userInfo
				uni.getUserInfo({
					lang: "zh_CN",
					success(info_res) {
						console.log("user info---------------------")
						console.log(info_res);
						console.log("user info---------------------")

						// 更新用户公开信息
						that.rawData = info_res.rawData;
						that.signature = info_res.signature;
						that.userInfo = info_res.userInfo;

						// 进行手机号授权
						that.modalName = "bottomModal"
					}
				})
			},

			getPhoneNumber(e) {
				console.log("getphonenumber")
				this.phoneLoading = true;
				console.log(e.detail)
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
					// 用户取消授权
					console.log("用户取消授权")
				} else {
					// 获取到加密的手机号信息
					this.encryptedData = e.detail.encryptedData;
					this.iv = e.detail.iv;
					// 进行登录
					this.hideModal()
					this.wxLogin()
					
				}

			},

			// 向后台提交信息进行登录
			wxLogin() {
				this.hideModal()
				wx.showLoading({
				  title: '登录中',
				})
				// 将code和用户信息发送至开发者服务器获取token
				wxlogin({
					code: this.jsCode,
					rawData: this.rawData,
					encryptedData: this.encryptedData,
					iv: this.iv,
					signature: this.signature
				}).then(res => {
					console.log(res)
					if (res.success) {
						// 登录成功
						this.userInfo.phoneNumber = res.data.phoneNumber;
						this.userInfo.id = res.data.id;
						console.log(this.userInfo)
						this.$store.commit('login', this.userInfo);
						uni.setStorageSync("token", res.data.token);
						wx.hideLoading()
						wx.showToast({
							title: '登录成功',
							icon: 'success',
							duration: 1000
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '../index/index'
							});
						}, 1000)

					}
				}).catch(data => {
					console.log("服务器异常")
				})


			},

			// 隐藏模态框
			hideModal() {
				this.modalName = null
			},
		}
	}
</script>

<style>

</style>
