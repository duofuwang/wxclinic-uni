import {postRequest, getRequest, uploadRequest, postJsonRequest} from '@/api/request.js'

export const getArticlePage = (params) => {
	return getRequest('/article/page', params)
}

export const getNewRumorArticle = () => {
	return getRequest('/article/newRumor', )
}

export const getArticleById = (id) => {
	return getRequest('/article/' + id)
}
