import {postRequest, getRequest, postJsonRequest} from '@/api/request.js'

export const hello = (params) => {
	return postRequest('/user/hello', params)
}

export const wxlogin = (params) => {
	return postRequest('/user/wxlogin', params)
}

export const wxlogin2 = (params) => {
	return postRequest('/user/wxlogin2', params)
}

export const getUserInfo = () => {
	return getRequest('/user/getUserInfo')
}

export const getAllUser = (params) => {
	return postRequest('/user/getAllItems', params)
}

export const saveUser = (params) => {
	return postJsonRequest('/user/save', params)
}
