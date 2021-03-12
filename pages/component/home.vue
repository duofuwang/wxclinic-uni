<template name="components">
	<view style="background-color: #F8FBFF;">
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-green-new" :isBack="false">
				<block slot="content">问诊</block>
			</cu-custom>
			<view class="padding-lr-sm padding-bottom-sm margin-top">
				<view class="text-xl text-bold margin-left-sm padding-top-sm">
					<text>离线服务</text>
				</view>
			</view>
			<view class="flex flex-wrap justify-between">
				<view class="flex flex-wrap bg-white margin-left-sm padding" style="border-radius: 15rpx; padding-right: 0; width: 350rpx;">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/input.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="content padding-left-sm">
						<view class="text-xl text-bold">
							<text>快速留言</text>
						</view>
						<view class="text-gray">
							<view>捎句话给医生</view>
						</view>
					</view>
				</view>
				<view class="flex flex-wrap bg-white margin-right-sm padding" style="border-radius: 15rpx; width: 350rpx;">
					<view class="basis-xs radius">
						<view class="cu-avatar bg-white" style="height: 80rpx; width: 80rpx;">
							<image src="/static/icon/phone.png" mode="widthFix" class="view-image"></image>
						</view>
					</view>
					<view class="padding-left-sm">
						<view class="text-xl text-bold">
							<text class="margin-right-xs">电话问诊</text>
						</view>
						<view class="text-gray">
							<view>交流更方便</view>
						</view>
					</view>
				</view>
			</view>

			<view class="padding-lr-sm margin-top">
				<view class="text-xl text-bold margin-left-sm padding-top-sm">
					<text>我的医生</text>
				</view>
			</view>
			
			<!-- 消息列表 -->
			<view class="padding-sm radius menu">
				<view class="cu-list menu-avatar" style="border-radius: 15rpx;" v-for="(contact, index) in contactList" :key="index" @click="goChat(contact)">
					<view class="cu-item-no-border-bottom">
						<view class="cu-avatar lg bg-white" style="background-image:url(https://s3.ax1x.com/2021/03/07/6uLvgU.png);"></view>
						<view class="content">
							<view class="text-grey">{{contact.nickName}}</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut" v-if="contact.type == 'text'">
									{{ contact == null ? '' : contact.content}}
								</view>
								<view class="text-cut" v-if="contact.type == 'voice'">
									{{ contact == null ? '' : '[语音]'}}
								</view>
								<view class="text-cut" v-if="contact.type == 'image'">
									{{ contact == null ? '' : '[图片]'}}
								</view>
								<view class="text-cut" v-if="contact.type == 'location'">
									{{ contact == null ? '' : '[定位]'}}
								</view>
							</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">{{$u.timeFormat(contact.createTime, 'hh:MM')}}</view>
							<view class="cu-tag round bg-red sm" v-if="contact.unreadNum!=0">{{contact.unreadNum}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="margin-top">
				<u-divider bg-color="#F8FBFF" fontSize="30">呵护生命 绿色健康</u-divider>
			</view>

			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';

	import {
		getContactList
	}
	from '@/api/modules/message.js'

	export default {
		props: ['unreadMsgList', 'unreadNum','contactList'],
		data() {
			return {

			};
		},
		computed: {
			...mapState(['lastMsg'])
		},
		mounted() {
		},
		methods: {
			goChat(contact) {
				this.$emit("signMsg")
				var data = {
					contact: contact,
					unreadMsgList: this.unreadMsgList
				}
				uni.navigateTo({
					url: '../component/consult/chat?data=' + encodeURIComponent(JSON.stringify(data))
				})
			},
			getLastMsg() {
				var msg = uni.getStorageSync("lastMsg");
				return msg
			},
			
			// 获取最近会话列表和最后一条聊天记录
			getContactList() {
				getContactList({
					userId: uni.getStorageSync("userInfo").id
				}).then(res => {
					console.log("getContactList res: ", res)
				}).catch(data =>{
					console.log("getContactList error: ", data)
				})
			}
			
			
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
