import Vue from 'vue';
import App from './App';
// 引入全局uView
import uView from 'uview-ui';
import Tools from './lib/tools.js';
import './lib/mixin.js';
import fixedHeader from '@/components/fixed-header.vue';

Vue.use(uView);

Vue.component('fixed-header', fixedHeader);
Vue.config.productionTip = false;
Vue.prototype.tools = Tools;

App.mpType = 'app';

const app = new Vue({
    ...App
})
app.$mount();