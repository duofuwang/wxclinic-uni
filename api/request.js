// const baseUrl = "http://localhost:8787/clinic" //公共路径
const baseUrl = "https://dopoiv.space/clinic" //公共路径
const api = {
	upload: baseUrl + "/system/obs/upload"
}

let loading = false;
let requestCount = 0;

function showLoading() {
	if (requestCount === 0 && !loading) {
		loading = true;
		uni.showLoading({
			title: "加载中",
			mask: true
		})
	}
	requestCount++
}

function hideLoading() {
	requestCount--;
	requestCount = Math.max(requestCount, 0)
	if (requestCount === 0) {
		toHideLoading();
	}
}

function toHideLoading() {
	setTimeout(() => {
		if (loading) {
			uni.hideLoading()
			loading = false
		}
	}, 300)
}

// post请求封装
export function postRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		// showLoading()
		uni.request({
			url: baseUrl + url,
			data: postData,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'token': uni.getStorageSync("token")
			},
			success: function(res) {
				// hideLoading()
				if (res.statusCode == 401 || res.statusCode == 403) {
					uni.navigateTo({
						url: "/pages/login/home"
					})
					resolve(res.data);
				}
				if (res.statusCode == 200 && res.data.code == 0) {
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			error: function(e) {
				reject('网络出错');
				// hideLoading()
			}
		})
	});
	return promise;
}

// get请求封装
export function getRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		// showLoading()
		uni.request({
			url: baseUrl + url,
			data: postData,
			method: 'GET',
			header: {
				'content-type': 'application/json',
				'token': uni.getStorageSync("token")
			},
			success: function(res) {
				// hideLoading()
				if (res.statusCode == 401 || res.statusCode == 403) {
					uni.navigateTo({
						url: "/pages/login/home"
					})
					resolve(res.data);
				}
				if (res.statusCode == 200 && res.data.code == 0) {
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			error: function(e) {
				// hideLoading()
				reject('网络出错');
			}
		})
	});
	return promise;
}

// delete请求封装
export function deleteRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		// showLoading()
		uni.request({
			url: baseUrl + url,
			data: postData,
			method: 'DELETE',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'token': uni.getStorageSync("token")
			},
			success: function(res) {
				// hideLoading()
				if (res.statusCode == 401 || res.statusCode == 403) {
					uni.navigateTo({
						url: "/pages/login/home"
					})
					resolve(res.data);
				}
				if (res.statusCode == 200 && res.data.code == 0) {
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			error: function(e) {
				// hideLoading()
				reject('网络出错');
			}
		})
	});
	return promise;
}

// 封装 postRequest-json数据格式
export function postJsonRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		// showLoading()
		uni.request({
			url: baseUrl + url,
			data: postData,
			method: 'POST',
			header: {
				'content-type': 'application/json',
				'token': uni.getStorageSync("token")
			},
			success: function(res) {
				// hideLoading()
				if (res.statusCode == 401 || res.statusCode == 403) {
					uni.navigateTo({
						url: "/pages/login/home"
					})
					resolve(res.data);
				}
				if (res.statusCode == 200 && res.data.code == 0) {
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			error: function(e) {
				// hideLoading()
				reject('网络出错');
			}
		})
	});
	return promise;
}

// 上传文件
export function uploadRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		// showLoading()
		uni.request({
			url: baseUrl + url,
			data: postData,
			method: 'POST',
			header: {
				'content-type': 'multipart/form-data',
				'token': uni.getStorageSync("token")
			},
			success: function(res) {
				// hideLoading()
				if (res.statusCode == 401 || res.statusCode == 403) {
					uni.navigateTo({
						url: "/pages/login/home"
					})
					resolve(res.data);
				}
				if (res.statusCode == 200 && res.data.code == 0) {
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			error: function(e) {
				// hideLoading()
				reject('网络出错');
			}
		})
	});
	return promise;
}

export default api
