import Vue from 'vue'
import App from './App.vue'
import "./assets/icons/iconfont.js"
import "./assets/icons/index.css"
import './assets/zt-pagination.scss'
import './assets/theme/index.scss'
// >>>>>>>>>>>>>>>>>>>>>>>>>>
// // import AlibabaIcon from './components/alibaba-icon'
// Vue.component("alibaba-icon", AlibabaIcon);
// import ZtPagination from './components/zt-pagination'
// Vue.component("zt-pagination", ZtPagination);
import components from './components'
Vue.use(components);

new Vue({
    el: '#app',
    render: h => h(App)
})