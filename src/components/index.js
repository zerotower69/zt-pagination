import ZtPagination from './zt-pagination.vue';
import AlibabaIcon from "./alibaba-icon.vue";

const components = {
    install(Vue) {
        Vue.component("zt-pagination", ZtPagination);
        Vue.component("alibaba-icon", AlibabaIcon);
        if (typeof window !== undefined && window.Vue) {
            window.Vue.use(components);
        }
    }
}

export default components