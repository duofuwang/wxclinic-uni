import {postRequest, getRequest, postJsonRequest, uploadRequest} from '@/api/request.js'

export const saveEmergency = (params) => {
	return postJsonRequest('/basic/emergency/save', params)
}

export const getCurrentCall = (params) => {
	return postRequest('/basic/emergency/getCurrentCall', params)
}

export const stopEmergencyCall = (params) => {
	return postRequest('/basic/emergency/stopEmergencyCall', params)
}