import {postRequest, getRequest} from '@/api/request.js'

export const hello = (params) => {
	return postRequest('/sys/user/hello', params)
}

export const wxlogin = (params) => {
	return postRequest('/sys/user/wxlogin', params)
}

export const wxlogin2 = (params) => {
	return postRequest('/sys/user/wxlogin2', params)
}

export const getAllUser = (params) => {
	return postRequest('/sys/user/getAllItems', params)
}