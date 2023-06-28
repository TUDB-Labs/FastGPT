import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate'
const { v4: uuidv4 } = require("uuid");

Vue.use(Vuex);

// const getLocaItem = (key) => {
//   let obj = localStorage.getItem(key)
//   if (!obj) return
//   try {
//     obj = JSON.parse(obj)
//   } catch(e) {
//     obj = {}
//   }
//   return obj
// }

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
    userInfo(state) {
      // 判断是否登录，如果没有就用默认用户信息
      if (state.userInfo.id) return state.userInfo
      const id = localStorage.getItem('uuid') || uuidv4()
      return { id }
    }
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  },
  actions: {
    setUserInfo({commit}, userInfo) {
      commit('SET_USER_INFO', userInfo)
    }
  },
  plugins: [persistedState()]
})
