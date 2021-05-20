import {postRequest, getRequest, uploadRequest} from '@/api/request.js'

export const getMsgById = (params) => {
	return postRequest('/message/getMsgById', params)
}

export const getRecentMsg = (params) => {
	return getRequest('/message/getRecentMsg', params)
}

export const getUnreadMsg = (params) => {
	return postRequest('/message/getUnreadMsg', params)
}

// 获取最近会话列表和最后一条聊天记录
export const getContactList = (params) => {
	return getRequest('/message/getContactList', params)
}

// 上传文件
export const upload = (params) => {
	return uploadRequest('/system/obs/upload', params)
}