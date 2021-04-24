import {postRequest, getRequest, postJsonRequest} from '@/api/request.js'

export const saveVisit = (params) => {
	return postJsonRequest('/visit/save', params)
}