import {postRequest, getRequest, uploadRequest, postJsonRequest} from '@/api/request.js'

export const saveEvaluate = (params) => {
	return postJsonRequest('/evaluate/save', params)
}
