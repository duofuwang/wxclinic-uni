import {postRequest, getRequest, uploadRequest, deleteRequest} from '@/api/request.js'

export const getUserMedicalRecord = () => {
	return getRequest('/medical-record/getUserMedicalRecord')
}

export const deleteMedicalRecord = (params) => {
	return deleteRequest('/medical-record/delete', params)
}
