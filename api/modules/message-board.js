import {postRequest, getRequest, uploadRequest, postJsonRequest} from '@/api/request.js'

export const saveMessageBoard = (params) => {
	return postJsonRequest('/message-board/save', params)
}
