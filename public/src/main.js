'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App.vue'
import getStore from './store/index'
Vue.use(Vuex);
const store = new Vuex.Store(getStore);


new Vue({
  el: 'app',
  store,
  components: {App},
  methods: {}
})
