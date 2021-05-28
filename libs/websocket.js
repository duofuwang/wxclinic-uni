import app from '../main.js'

// 连接的url
// const webSocketUrl = "wss://dopoiv.space/wss";
const webSocketUrl = "ws://127.0.0.1:1024/channel";

// socket连接状态
var socketOpen = false;

const connect = () => {
	var promise = new Promise((resolve, reject) => {
		uni.connectSocket({
			url: webSocketUrl,
			fail: () => {
				reject('连接出错！');
			}
		});
		uni.onSocketOpen(res => {
			console.log('WebSocket连接已打开！');
			app.websocket.socketOpen = true
			resolve("WebSocket连接已打开！");
		});

		uni.onSocketError(function(res) {
			console.log('WebSocket连接打开失败，请检查！');
			reject('WebSocket连接打开失败，请检查！');
		});
	});
	return promise;
}

const init = () => {
	var promise = new Promise((resolve, reject) => {
		console.log("初始化WebSocket连接")
		var dataContent = app.GLOBAL.dataContent;
		var msg = app.GLOBAL.message;
		// 带上用户 id 用来处理和 channel 的关联关系
		msg.from_id = uni.getStorageSync("userInfo").id;
		dataContent.action = app.GLOBAL.action.CONNECT;
		dataContent.message = msg;

		uni.sendSocketMessage({
			data: JSON.stringify(dataContent)
		}).then(res => {
			console.log("WebSocket初始化完成！");
			resolve("WebSocket初始化完成！");
		});
		
		// 心跳检测
		heartCheck.reset().start();
	});
	return promise;
}

// 关闭websocket连接
const close = () => {
	var promise = new Promise((resolve, reject) => {
		console.log("关闭WebSocket连接...")
		uni.closeSocket().then(() => {
			app.websocket.socketOpen = false;
		});
		uni.onSocketClose(res => {
			console.log('WebSocket 已关闭！');
		});
	});
	return promise;
}

// 心跳检测
var heartCheck = {
	timeout: 30000, // 30s发送一次心跳
	timeoutObj: null,
	serverTimeoutObj: null,
	reset: function() {
		clearTimeout(this.timeoutObj);
		clearTimeout(this.serverTimeoutObj);
		return this;
	},
	start: function() {
		var self = this;
		this.timeoutObj = setTimeout(function() {
			var dataContent = app.GLOBAL.dataContent;
			var msg = app.GLOBAL.message;
			msg.fromId = uni.getStorageSync("userInfo").id;
			dataContent.message = msg;
			dataContent.action = app.GLOBAL.action.KEEPALIVE;
			// 这里发送一个心跳，后端收到后，返回一个心跳消息
			uni.sendSocketMessage({
				data: JSON.stringify(dataContent)
			}).then(res => {
				console.log("PING");
			});
			self.serverTimeoutObj = setTimeout(function() {
				// 如果超过一定时间还没重置，说明后端主动断开了
				// 这时我们主动关闭连接 等待重连
				close();
			}, self.timeout)
		}, this.timeout)
	}
}

export default {
	connect,
	init,
	close,
	socketOpen,
	heartCheck
}
