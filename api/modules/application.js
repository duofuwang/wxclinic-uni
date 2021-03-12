import {postRequest, getRequest, postJsonRequest, deleteRequest} from '@/api/request.js'

export const apply = (params) => {
	return postJsonRequest('/sys/application/apply', params)
}

export const getApplicationList = (params) => {
	return postRequest('/sys/application/getApplicationList', params)
}

export const deleApplication = (params) => {
	return deleteRequest('/sys/application/delete', params)
}

export const revokeApplication = (params) => {
	return postRequest('/sys/application/revoke', params)
}