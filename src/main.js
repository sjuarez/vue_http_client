// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.min.css';
import VModal from 'vue-js-modal'
import VueFilter from 'vue-filter';

Vue.use(VueResource);
Vue.use(VModal);
Vue.use(VueFilter);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
