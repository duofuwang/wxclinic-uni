import {postRequest, getRequest, postJsonRequest} from '@/api/request.js'

export const saveAppointment = (params) => {
	return postJsonRequest('/appointment/save', params)
}