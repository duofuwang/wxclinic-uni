import {postRequest, getRequest, uploadRequest, deleteRequest} from '@/api/request.js'

export const getUserMedicalRecord = (params) => {
	return getRequest('/medical-record/getUserMedicalRecord', params)
}

export const deleteMedicalRecord = (params) => {
	return deleteRequest('/medical-record/delete', params)
}
