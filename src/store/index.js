import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem('token'),
    userinfo: sessionStorage.getItem('userinfo')
  },
  mutations: {
    //set
    //创建token
    SET_TOKEN: (state,token) => {
      state.token = token
      localStorage.setItem('token',token)
    },
    // 创建用户信息
    SET_USERINFO: (state,userinfo) => {
      state.userinfo = userinfo
      sessionStorage.setItem('userinfo',JSON.stringify(userinfo)) 
    },
    // 移除信息
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userinfo = {}
      localStorage.setItem('token','')
      sessionStorage.setItem('userinfo','')
    }
  },
  getters: {
    //get
    // 获取并返回用户信息
    getUser: state => {
      return state.userinfo
    }
  },
  actions: {
  },
  modules: {
  }
})
