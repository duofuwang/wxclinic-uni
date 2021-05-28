<template>
	<view>
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{contact.realName||contact.nickname}}</block>
		</cu-custom>
		<view class="cu-chat" id="chatBox">
			<view class="cu-item" :class="messageList[index].fromId==userInfo.id?'self':''"
				v-for="(item, index) in messageList" :key="index">
				<view class="cu-avatar round" v-if="messageList[index].toId==userInfo.id"
					:style="{backgroundImage:'url(' + contact.avatarUrl + ')'}"></view>
				<!-- 文本信息 -->
				<view class="main" v-if="messageList[index].type=='text'">
					<view class="content bg-green shadow" style="word-break: break-all; word-wrap: break-word;">
						<text>{{ messageList[index].content }}</text>
					</view>
				</view>
				<!-- 语音信息 -->
				<view class="main" v-else-if="messageList[index].type=='voice'"
					@click="playVoice(messageList[index].content)">
					<view class="action text-bold text-grey" v-if="messageList[index].fromId==userInfo.id">
						{{ durationTrans(JSON.parse(messageList[index].content).duration) }}
					</view>
					<view class="content shadow">
						<text class="cuIcon-sound text-xxl padding-right-xl"
							:class="messageList[index].fromId==userInfo.id?'mirrorRotateLevel':''">
						</text>
					</view>
					<view class="action text-bold text-grey" v-if="messageList[index].toId==userInfo.id">
						{{ durationTrans(JSON.parse(messageList[index].content).duration) }}
					</view>
				</view>
				<!-- 定位信息 -->
				<view class="main" v-else-if="messageList[index].type=='location'"
					@click="openLocation(messageList[index].content)">
					<view class="action" v-if="messageList[index].fromId==userInfo.id">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						{{ JSON.parse(messageList[index].content).name==''?JSON.parse(messageList[index].content).address:JSON.parse(messageList[index].content).name }}
					</view>
					<view class="action" v-if="messageList[index].toId==userInfo.id">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
				</view>
				<!-- 图片信息 -->
				<view class="main" v-else-if="messageList[index].type=='image'"
					@click="previewImage(messageList[index].content)">
					<image :src="messageList[index].content" class="radius" mode="widthFix"></image>
				</view>
				<view class="date">
					{{messageList[index].createTime.substring(0, messageList[index].createTime.lastIndexOf(":"))}}
				</view>
				<view class="cu-avatar round" v-if="messageList[index].fromId==userInfo.id"
					:style="{backgroundImage:'url(' + userInfo.avatarUrl + ')'}"></view>
				<view class="date">
					{{messageList[index].createTime.substring(0, messageList[index].createTime.lastIndexOf(":"))}}
				</view>
			</view>
		</view>

		<view class="cu-bar foot input" :style="[{bottom:inputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey" v-if="isEdit" @click="toggleEdit(false)"></text>
				<text class="cuIcon-keyboard text-grey" v-else @click="toggleEdit(true)"></text>
			</view>
			<input class="solid-bottom" :value="inputValue" @input="inputChange" :adjust-position="false" :focus="false"
				maxlength="300" cursor-spacing="10" @focus="inputFocus" @blur="inputBlur"
				@keyboardheightchange="keyboardHeightChange" v-if="isEdit"></input>

			<button v-else class="cu-btn line-gray speak" @touchstart="startRecord"
				@touchend="endRecord">{{isRecording?'松开发送':'按住说话'}}</button>

			<view class="action">
				<text class="cuIcon-roundaddfill text-grey" v-if="isDrawer" @click="openDrawer(false)"
					v-show="isEdit"></text>
				<text class="cuIcon-roundadd text-grey" v-else @click="openDrawer(true)" v-show="isEdit"></text>
			</view>
			<button class="cu-btn bg-green shadow" @click="send">发送</button>
		</view>

		<!-- 抽屉内容 -->
		<view id="drawer" v-show="isDrawer" class="cu-bar foot drawer bg-gray">
			<view class="list flex-row">
				<view class="item flex-column" @click="chooseImage()">
					<image src="../../../static/icon/image.png" mode="widthFix" class="icon"></image>
					<view class="text">图片</view>
				</view>
				<view class="item flex-column" @click="getLocation">
					<image src="../../../static/icon/location.png" mode="widthFix" class="icon"></image>
					<view class="text">位置</view>
				</view>
			</view>
		</view>
		<!--语音-->
		<recording v-show="isRecording"></recording>
	</view>
</template>

<script>
	import {
		getRecentMsg,
		upload
	} from '@/api/modules/message.js'

	import currentDate from '@/libs/date.js'

	import recording from '@/components/recording/recording.vue'

	// 获取全局唯一的录音管理器 recorderManager
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();

	export default {
		components: {
			recording
		},
		data() {
			return {
				inputBottom: 0,
				messageList: [],
				userInfo: {},
				inputValue: null,
				messageType: 'text',
				unreadMsgList: null,
				contact: null,

				scrollHeight: 'auto', // 内容区域高度
				drawerHeight: 0,

				isVoice: false,
				isLocation: false,
				isImage: false,
				isKeyboard: true,
				isEdit: true,
				isFocus: false,
				isDrawer: false,

				// 显示录音中
				isRecording: false,
				// 录音缓存路径
				voicePath: '',
				//录音时长
				durationTime: ''
			};
		},
		onLoad(option) {
			this.userInfo = uni.getStorageSync("userInfo");

			// 监听录音动作
			this.onRecordStop()

			// 获取上级页面传来的数据
			this.contact = JSON.parse(decodeURIComponent(option.data)).contact;
			this.unreadMsgList = JSON.parse(decodeURIComponent(option.data)).unreadMsgList

			// 获取近期消息
			this.getRecentMsg(this.contact.friendId)

			// 启动消息监听
			this.onSocketMessage()

			// 过滤掉当前联系人以外的消息
			var unreadMsgList = this.unreadMsgList.filter(item => item.fromId == this.contact.friendId)
			// 若有未读消息 则签收
			if (unreadMsgList.length > 0) {
				var ids = ''
				unreadMsgList.forEach(item => {
					ids += item.id + ","
				})
				this.signMessage(ids)
			}
		},
		watch: {
			// 监听 messageList 的变化，当有新消息发送自动滚动到页面底部
			messageList() {
				console.log("messageList change");
				this.$nextTick(() => {
					uni.createSelectorQuery().select('#chatBox').boundingClientRect(data => {
						uni.pageScrollTo({
							scrollTop: data.height
						})
					}).exec()
				})
			}
		},
		onUnload() {
			console.log("unload")
		},
		onHide() {
			console.log("hide")
		},
		beforeDestroy() {
			// 离开聊天页面时重置 messageList，防止新消息被签收
			this.messageList = null
			console.log("beforeDestroy")
		},
		destroyed() {},
		methods: {
			// 输入框聚焦
			inputFocus(e) {
				this.inputBottom = e.detail.height
				// 关闭抽屉
				this.openDrawer(false)
			},

			// 输入框失去焦点
			inputBlur(e) {
				this.inputBottom = 0
			},

			// 键盘高度变化
			keyboardHeightChange(e) {
				this.inputBottom = e.detail.height
			},

			// 输入框内容改变
			inputChange(e) {
				this.inputValue = e.detail.value
			},

			// 消息类型改变
			messageTypeChange(type) {
				this.messageType = type
			},

			// 切换语音与编辑
			toggleEdit(bool) {
				this.isEdit = bool
				this.isFocus = bool

				// 关闭底部抽屉
				this.openDrawer(false)
			},

			// 打开底部抽屉
			openDrawer(bool) {
				this.isDrawer = bool;

				// 使输入框悬浮在抽屉上方
				setTimeout(() => {
					uni.createSelectorQuery().select('#drawer').boundingClientRect(data => {
						this.drawerHeight = data.height
						console.log("drawerHeight: ", this.drawerHeight)
						this.inputBottom = bool ? this.drawerHeight.toString() : "0"
					}).exec()
				}, )
			},

			// 开始录音
			startRecord() {
				this.isRecording = true
				recorderManager.start()
			},

			// 结束录音
			endRecord() {
				this.isRecording = false
				recorderManager.stop()
			},

			// 播放录音
			playVoice(item) {
				console.log("play voice", JSON.parse(item))
				innerAudioContext.src = JSON.parse(item).path;
				innerAudioContext.play();
			},

			// 监听录音停止
			onRecordStop() {
				let self = this;
				recorderManager.onStop(function(res) {
					console.log('recorder stop: ' + JSON.stringify(res));
					// 保存路径与时长
					self.voicePath = res.tempFilePath;
					self.durationTime = res.duration;
					// 上传录音
					self.upload(self.voicePath)
				});
			},

			// 获取最近消息
			getRecentMsg(friendId) {
				getRecentMsg({
					friendId: friendId,
					num: 100
				}).then(res => {
					console.log("getRecentMsg", res)
					this.messageList = res.data
				}).catch(data => {
					console.log(data)
				})
			},

			// 录音文件上传
			upload(filePath) {
				console.log("upload filePath: ", filePath)
				uni.uploadFile({
					url: this.$api.upload,
					filePath: filePath,
					name: 'file',
					header: {
						'token': uni.getStorageSync("token")
					},
					formData: {
						'userId': uni.getStorageSync("userInfo").id
					},
					success: (uploadFileRes) => {
						console.log("uploadFileRes: ", uploadFileRes);
						console.log(JSON.parse(uploadFileRes.data).data)
						// 文件上传成功则发送消息
						this.sendVoice(JSON.parse(uploadFileRes.data).data, this.durationTime)
					}
				});
			},

			// 发送按钮
			send() {
				if (this.messageType == 'text') {
					this.sendText()
				}
			},

			// 发送文字消息
			sendText() {
				if (this.inputValue == null) {
					wx.showToast({
						title: '还未输入文字哦',
						icon: 'none'
					})
					return
				}
				console.log("sendText: " + this.inputValue)

				// 消息实体
				var msg = this.GLOBAL.message;
				msg.fromId = uni.getStorageSync("userInfo").id;
				msg.content = this.inputValue;
				msg.type = "text";
				msg.toId = this.contact.friendId
				msg.to_id = this.contact.friendId

				msg.createTime = currentDate.getDateTime();

				// 包装
				var dataContent = this.GLOBAL.dataContent;
				dataContent.action = this.GLOBAL.action.CHAT;
				dataContent.message = msg;

				// 发送消息
				uni.sendSocketMessage({
					data: JSON.stringify(dataContent),
					success: (res) => {
						this.messageList.push(JSON.parse(JSON.stringify(msg)))
						this.inputValue = null;
					}
				});
			},

			// 发送语音信息
			sendVoice(path, duration) {
				// 消息实体
				var msg = this.GLOBAL.message;
				msg.fromId = uni.getStorageSync("userInfo").id;
				var content = {
					path: path,
					duration: duration
				}
				msg.content = JSON.stringify(content)
				msg.type = "voice";
				msg.toId = this.contact.friendId
				msg.to_id = this.contact.friendId

				msg.createTime = currentDate.getDateTime();

				// 包装
				var dataContent = this.GLOBAL.dataContent;
				dataContent.action = this.GLOBAL.action.CHAT;
				dataContent.message = msg;

				// 发送消息
				uni.sendSocketMessage({
					data: JSON.stringify(dataContent),
					success: (res) => {
						this.messageList.push(JSON.parse(JSON.stringify(msg)))
						this.inputValue = null;
					}
				});
			},

			// 发送图片信息
			sendImage(content) {
				// 消息实体
				var msg = this.GLOBAL.message;
				msg.fromId = uni.getStorageSync("userInfo").id;
				msg.content = content;
				msg.type = "image";
				msg.toId = this.contact.friendId
				msg.to_id = this.contact.friendId

				msg.createTime = currentDate.getDateTime();

				// 包装
				var dataContent = this.GLOBAL.dataContent;
				dataContent.action = this.GLOBAL.action.CHAT;
				dataContent.message = msg;

				// 发送消息
				uni.sendSocketMessage({
					data: JSON.stringify(dataContent),
					success: (res) => {
						this.messageList.push(JSON.parse(JSON.stringify(msg)))
						this.inputValue = null;
					}
				});
			},

			// 发送定位信息
			sendLocation(content) {
				let {
					latitude,
					longitude,
					address,
					name
				} = content;
				var location = {
					latitude,
					longitude,
					address,
					name
				}
				console.log("location: ", location)

				// 消息实体
				var msg = this.GLOBAL.message;
				msg.fromId = uni.getStorageSync("userInfo").id;
				msg.content = JSON.stringify(location);
				msg.type = "location";
				msg.toId = this.contact.friendId
				msg.to_id = this.contact.friendId

				msg.createTime = currentDate.getDateTime();

				// 包装
				var dataContent = this.GLOBAL.dataContent;
				dataContent.action = this.GLOBAL.action.CHAT;
				dataContent.message = msg;

				// 发送消息
				uni.sendSocketMessage({
					data: JSON.stringify(dataContent),
					success: (res) => {
						this.messageList.push(JSON.parse(JSON.stringify(msg)))
						this.inputValue = null;
					}
				});
			},

			// 选择图片 上传到服务器
			chooseImage() {
				let that = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: that.$api.upload, //仅为示例，非真实的接口地址
								filePath: item,
								name: 'file',
								header: {
									'token': uni.getStorageSync("token")
								},
								formData: {
									'userId': uni.getStorageSync("userInfo").id
								},
								success: (res) => {
									var result = JSON.parse(res.data)
									// 文件上传成功则发送消息
									if (result.success) {
										that.sendImage(result.data)
									}

								}
							});
						})
					},
					complete: () => {
						that.openDrawer(false)
					}
				});
			},

			// 获取位置
			getLocation() {
				uni.getLocation({
					success: res => {
						let {
							latitude,
							longitude
						} = res
						console.log("getLocation success: ", res)
						// 打开地图选择位置
						uni.chooseLocation({
							latitude,
							longitude,
							success: res => {
								console.log("chooseLocation success: ", res)
								// 选择好位置后发送该消息
								this.sendLocation(res)
							},
							complete: () => {
								this.openDrawer(false)
							}
						})
					}
				})
			},

			// 打开地图查看位置
			openLocation(location) {
				location = JSON.parse(location)
				let {
					latitude,
					longitude
				} = location
				uni.openLocation({
					latitude,
					longitude,
					success: res => {
						console.log("openLocation success: ", res)
					}
				})
			},


			// 监听消息接收
			onSocketMessage() {
				let that = this;
				uni.onSocketMessage(function(res) {
					that.websocket.heartCheck.reset().start()
					if (res.data == "PONG") {
						console.log(res.data);
						return
					}
					console.log(JSON.parse(res.data));
					var data = JSON.parse(res.data);
					that.receiveMessage(data.message)
				});
			},

			// 接收消息
			receiveMessage(message) {
				if (this.messageList == null) {
					console.log("message: ", message)
					return
				}
				// 若收到的新消息来自当前会话，则签收
				// 否则啥也不做
				if (message.fromId == this.contact.friendId) {
					this.messageList.push(message)
					this.signMessage(message.id)
				}
			},

			// 将新消息标记为已读
			signMessage(ids) {
				var dataContent = this.GLOBAL.dataContent;
				dataContent.action = this.GLOBAL.action.SIGNED
				dataContent.extend = ids
				console.log(this.messageList)
				// 发送消息
				uni.sendSocketMessage({
					data: JSON.stringify(dataContent),
				});
			},

			// 预览图片
			previewImage(url) {
				var urls = [];
				urls.push(url)
				// 预览图片
				uni.previewImage({
					urls: urls,
				});
			},

			// 时长转换
			durationTrans(duration) {
				if (duration < 1000) {
					return "1''"
				}
				if (duration >= 1000) {
					return parseInt(duration / 1000) + "''"

				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 100rpx;
	}

	.mirrorRotateLevel {
		transform: rotateY(180deg);
		/* 水平镜像翻转 */
	}

	.mirrorRotateVertical {
		transform: rotateX(180deg);
		/* 垂直镜像翻转 */
	}

	.speak {
		flex: 1;
	}

	.drawer {
		padding: 30rpx 20rpx;

		.list {
			overflow: hidden;
			padding-left: 10rpx;
			justify-content: flex-start;
		}

		.item {
			float: left;
			width: 160rpx;
			height: 160rpx;
			border-radius: 10rpx;
			margin-right: 40rpx;
			// background-color: bg-gray;

			.icon {
				width: 70rpx;
			}

			.text {
				font-size: 32rpx;
				margin-top: 4rpx;
			}
		}
	}

	/*flex布局*/
	.flex-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
