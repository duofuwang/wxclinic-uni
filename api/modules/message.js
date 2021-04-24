import {postRequest, getRequest, uploadRequest} from '@/api/request.js'

export const getMsgById = (params) => {
	return postRequest('/message/getMsgById', params)
}

export const getRecentMsg = (params) => {
	return postRequest('/message/getRecentMsg', params)
}

export const getUnreadMsg = (params) => {
	return postRequest('/message/getUnreadMsg', params)
}

// 获取最近会话列表和最后一条聊天记录
export const getContactList = (params) => {
	return postRequest('/message/getContactList', params)
}

// 上传文件
export const upload = (params) => {
	return uploadRequest('/message/upload', params)
}