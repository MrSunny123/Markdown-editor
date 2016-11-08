import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store.js'

import './assets/less/common.less'
import './assets/less/markdown.less'
import './assets/iconfont/iconfont.css'
import 'highlight.js/styles/ocean.css'

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
