import {postRequest, getRequest, postJsonRequest, deleteRequest} from '@/api/request.js'

export const apply = (params) => {
	return postJsonRequest('/application/apply', params)
}

export const getApplicationList = (params) => {
	return postRequest('/application/getApplicationList', params)
}

export const deleApplication = (params) => {
	return deleteRequest('/application/delete', params)
}

export const revokeApplication = (params) => {
	return postRequest('/application/revoke', params)
}