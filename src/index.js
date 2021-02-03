import ZtPagination from './components/zt-pagination';
import './assets/icons/iconfont';
import './assets/icons/index.css';
import './assets/theme/default-theme.scss'
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('zt-pagination', ZtPagination);
}
ZtPagination.install = function(Vue) {
    Vue.component(ZtPagination.name, ZtPagination);
}

export default ZtPagination