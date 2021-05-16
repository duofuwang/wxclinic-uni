import {postRequest, getRequest, uploadRequest} from '@/api/request.js'

export const getConfig = () => {
	return getRequest('/config')
}
