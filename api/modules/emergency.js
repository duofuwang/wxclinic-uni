import {postRequest, getRequest, postJsonRequest, uploadRequest} from '@/api/request.js'

export const saveEmergency = (params) => {
	return postJsonRequest('/emergency/save', params)
}

export const getCurrentCall = (params) => {
	return postRequest('/emergency/getCurrentCall', params)
}

export const stopEmergencyCall = (params) => {
	return postRequest('/emergency/stopEmergencyCall', params)
}