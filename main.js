import Vue from 'vue'
import App from './App'
import store from './store'

import api from './api/request.js'
import global from './api/global.js'
Vue.prototype.GLOBAL = global
Vue.prototype.$api = api

import uView from "uview-ui";
Vue.use(uView);

import basics from './pages/basics/home.vue'
Vue.component('basics', basics)

import components from './pages/component/home.vue'
Vue.component('components', components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin', plugin)

import account from './pages/account/home.vue'
Vue.component('account', account)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
