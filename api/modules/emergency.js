import {postRequest, getRequest, postJsonRequest, deleteRequest} from '@/api/request.js'

export const saveEmergency = (params) => {
	return postJsonRequest('/emergency/save', params)
}

export const getCurrentCall = (params) => {
	return postRequest('/emergency/getCurrentCall', params)
}

export const stopEmergencyCall = (params) => {
	return postRequest('/emergency/stopEmergencyCall', params)
}

export const getEmergencyList = (params) => {
	return getRequest('/emergency/getEmergencyList', params)
}

export const deleteEmergency = (params) => {
	return deleteRequest('/emergency/delete', params)
}