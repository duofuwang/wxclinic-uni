import {postRequest, getRequest, postJsonRequest} from '@/api/request.js'

export const hello = (params) => {
	return postRequest('/user/hello', params)
}

export const wxlogin = (params) => {
	return postRequest('/wxlogin', params)
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
