<template>
	<view class="page bg-light-light">
		<scroll-view scroll-y class="bg-light-light" style="height: 100%" @scrolltolower="reachBottom">
			<cu-custom bgColor="bg-green-new" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">{{ title }}</block>
			</cu-custom>

			<view v-for="(item,index) in articleList" :key="index" @click="handleInfo(item.id)">
				<view class="cu-card article" :class="isCard?'no-card':''">
					<view class="cu-item shadow">
						<view class="title" v-if="item.title">
							<view class="text-cut">{{item.title}}</view>
						</view>
						<view class="content">
							<image :src="item.banner" mode="aspectFill"></image>
							<view class="desc">
								<view class="text-content">{{item.summary}}</view>
								<view v-if="item.author">
									<view class="cu-tag bg-red light bg round">{{ item.author }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="margin-xl">
				<u-loadmore :status="loadStatus" :load-text="loadText" bgColor="bg-light-light"></u-loadmore>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import {
		getArticlePage
	} from '@/api/modules/article.js'
	export default {
		data() {
			return {
				isCard: true,
				articleList: [],
				type: '',
				title: '',

				// 分页
				current: 1,
				pages: 1, // 总页数
				pageSize: 5, // 一页数量
				pageNum: 1, // 当前页码
				total: 100, // 总数

				loadStatus: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '没有更多了'
				}
			}
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.data))
			this.type = data.type
			this.title = data.title
			console.log(this.type)

			this.loadStatus = 'loading'
			this.getArticlePage()
		},
		methods: {
			getArticlePage() {
				this.loadStatus = 'loading'
				getArticlePage({
					type: this.type,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res.data.records)
					var records = res.data.records
					if (records.length == 0) {
						this.loadStatus = 'nomore'
						this.pageNum--;
						return
					}
					this.articleList = [...this.articleList, ...records]
					this.loadStatus = 'loadmore'
				}).catch(err => {
					this.pageNum--;
					this.loadStatus = 'nomore'
				})
			},

			reachBottom() {
				this.pageNum++
				this.getArticlePage()
			},
			
			handleInfo(id) {
				uni.navigateTo({
					url: '/pages/plugin/article/detail?articleId=' + id
				})
			}
		}
	}
</script>

<style>

</style>
