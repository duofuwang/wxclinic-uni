<template>
	<view class="page bg-white">
		<cu-custom bgColor="bg-green-new" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">文章详情</block>
		</cu-custom>

		<view class="padding bg-white">
			<view class="margin-bottom text-xxl text-bold">{{article.title}}</view>
			<view class="flex justify-start align-center text-xl text-center margin-bottom">
				<view class="margin-right-sm">{{article.author}}</view>
				<view class="margin-right-sm">{{article.createTime}}</view>
			</view>
			
			<view v-html="article.content" class="text-xl"></view>
		</view>

	</view>
</template>

<script>
	import {
		getArticleById
	} from "@/api/modules/article.js"
	export default {
		data() {
			return {
				article: {},
			}
		},
		onLoad(options) {
			this.article.id = options.articleId
			this.getArcticle()
		},
		methods: {
			getArcticle() {
				getArticleById(this.article.id).then(res => {
					this.article = res.data
					this.article.content = this.article.content.replace(/\<img/gi, '<img style="width:100%;height:auto" ');
				})
			}
		}
	}
</script>

<style>
</style>
