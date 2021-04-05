import {postRequest, getRequest, postJsonRequest} from '@/api/request.js'

export const hello = (params) => {
	return postRequest('/sys/user/hello', params)
}

export const wxlogin = (params) => {
	return postRequest('/sys/user/wxlogin', params)
}

export const wxlogin2 = (params) => {
	return postRequest('/sys/user/wxlogin2', params)
}

export const getUserInfo = (params) => {
	return postRequest('/sys/user/getUserInfo', params)
}

export const getAllUser = (params) => {
	return postRequest('/sys/user/getAllItems', params)
}

export const saveUser = (params) => {
	return postJsonRequest('/sys/user/save', params)
}
