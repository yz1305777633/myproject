import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import 'highlight.js/styles/dracula.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://8.131.64.158:3000/'
Vue.use(ElementUI)
Vue.use(mavonEditor)

//前置拦截
axios.interceptors.request.use(config => {
  return config
})

// 后置拦截
axios.interceptors.response.use(response => {
  let res = response.data
  if (res.status == 200) {
    return response
  }else{
    ElementUI.Message.error( response.data.status + '：' + response.data.msg )
    return Promise.reject(response.data.msg + response.data.status)
  }
}, error => {

  console.log(error);

  if (error.response.data) {
    error.message = error.response.data.msg
  }

  if (error.response.status === 401) {
    store.commit('REMOVE_INFO')
    router.push('/login')
  }

  ElementUI.Message.error(error.message)
  return Promise.reject(error)
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
