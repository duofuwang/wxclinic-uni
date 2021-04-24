import {postRequest, getRequest, postJsonRequest} from '@/api/request.js'

export const payment = (params) => {
	return postRequest('/order/visit-order/payment', params)
}