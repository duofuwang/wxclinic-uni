<template>
	<view class="bg-light-light">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">紧急呼救</block>
		</cu-custom>

		<view class="padding-xs flex align-center margin-top">
			<view class="flex-sub text-center">
				<view class="text-xsl padding">
					<text class=" cuIcon-roundcheckfill text-green-new"></text>
				</view>
				<view class="text-xxl text-bold padding">呼救成功</view>
				<view class="text-xl margin-bottom">填写备注信息能让医生更好地做出应对哦~</view>
			</view>
		</view>

		<view class="solid-top text-lg padding-top">
			<view class="margin-top">

				<view class="margin">
					<textarea maxlength="-1" :value="textareaValue" @input="textareaInput"
						:placeholder="textareaPlaceholder" name="description"
						style="width: 100%; height: 200rpx;"></textarea>
				</view>
				<view class="margin"><text>快速描述紧急情况：</text></view>
				<view class="flex flex-wrap margin">
					<view class="flex" v-for="(item, index) in quickAddBtnData" :key="index">
						<button class="cu-btn lg line-green-new margin-right-sm margin-bottom-sm"
							@click="quickAdd(quickAddBtnData[index].content)">{{quickAddBtnData[index].title}}</button>
					</view>
				</view>
			</view>

		</view>
		<view class="cu-tabbar-height">
			
		</view>
		<view class="box margin-top-xs">
			<view class="cu-bar foot bg-light-light">
				<button class="cu-btn bg-green-new shadow-blur round lg margin-lr" style="width: 100%;" @click="submit">完成</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		saveEmergency
	} from "@/api/modules/emergency.js"
	
	export default {
		data() {
			return {
				emergency: {},
				remark: "",
				
				textareaPlaceholder: "简要描述你所处的紧急情况，以便医生快速确定应对措施，我们会尽快处理您的请求",
				textareaValue: '',
				//快速添加按钮
				quickAddBtnData: [{
					title: "溺水事故",
					content: "溺水事故"
				}, {
					title: "中暑",
					content: "中暑"
				}, {
					title: "触电",
					content: "触电"
				}, {
					title: "动物咬伤",
					content: "动物咬伤"
				}, {
					title: "食物中毒",
					content: "食物中毒"
				}, {
					title: "脱臼",
					content: "脱臼"
				}, {
					title: "烧伤",
					content: "烧伤"
				}, {
					title: "呕血",
					content: "呕血"
				}, {
					title: "孕妇生产",
					content: "孕妇生产"
				}, {
					title: "心脏疾病",
					content: "心脏疾病"
				}, {
					title: "意识昏迷",
					content: "意识昏迷"
				}, {
					title: "严重过敏",
					content: "严重过敏"
				}, {
					title: "哮喘发作",
					content: "哮喘发作"
				}, {
					title: "吃东西噎住",
					content: "吃东西噎住"
				},]
			}
		},
		
		onLoad(option) {
			this.emergency = JSON.parse(decodeURIComponent(option.emergency));
			console.log(this.emergency)
		},
		
		methods: {
			textareaInput(e) {
				this.textareaValue = e.detail.value
			},
			
			// 向病情描述输入框快速添加内容
			quickAdd(content) {
				this.textareaValue.length == 0 ? this.textareaValue += content : this.textareaValue += "\r\n" + content
			},
			
			// 提交
			submit() {
				this.emergency.remark = this.textareaValue;
				console.log("呼救信息：", this.emergency)
				
				saveEmergency(this.emergency).then(res => {
					if (res.success) {
						console.log(res.data)
						uni.navigateBack();
						
					}
				}).catch(err => {
					console.log(err)
				})
			}

		}
	}
</script>

<style>
	.sos-container {
		height: 700rpx;
	}

	.container {
		width: 400rpx;
		height: 400rpx;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background: #d8d8d8; */
		border-radius: 10%;
	}

	.circle {
		position: absolute;
		width: 400rpx;
		height: 400rpx;
		border-radius: 50%;
	}

	.circle:nth-child(1) {
		animation: anim 3s linear infinite;
	}

	.circle:nth-child(2) {
		animation: anim 3s linear 0.8s infinite;
	}

	.circle:nth-child(3) {
		animation: anim 3s linear 1.6s infinite;
	}

	.circle:nth-child(4) {
		animation: anim 3s linear 2.4s infinite;
	}

	@keyframes anim {
		from {
			opacity: 1;
			transform: scale(0);
		}

		to {
			opacity: 0;
			transform: scale(1.33);
		}
	}
</style>
