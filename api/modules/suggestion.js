import {postRequest, getRequest, postJsonRequest, uploadRequest} from '@/api/request.js'

export const saveSuggestion = (params) => {
	return postJsonRequest('/suggestion/save', params)
}