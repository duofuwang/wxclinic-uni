import {postRequest, getRequest, postJsonRequest, deleteRequest} from '@/api/request.js'

export const payment = (params) => {
	return postRequest('/order/payment', params)
}

export const getUserOrderList = (params) => {
	return getRequest('/order/getUserOrderList', params)
}


export const deleteOrder = (params) => {
	return deleteRequest('/order/delete', params)
}

export const cancelOrder = (params) => {
	return postRequest('/order/cancel', params)
}