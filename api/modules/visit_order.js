import {postRequest, getRequest, postJsonRequest} from '@/api/request.js'

export const payment = (params) => {
	return postRequest('/sys/visit-order/payment', params)
}