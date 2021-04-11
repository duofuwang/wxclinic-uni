import {postRequest, getRequest, postJsonRequest, uploadRequest} from '@/api/request.js'

export const saveEmergency = (params) => {
	return postJsonRequest('/basic/emergency/save', params)
}