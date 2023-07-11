import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate'
const { v4: uuidv4 } = require("uuid");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    // 未登录时使用默认token
    token: "",
  },
  getters: {
    userInfo(state) {
      // 判断是否登录，如果没有就用默认用户信息
      if (state.userInfo.id) return state.userInfo
      const id = localStorage.getItem('uuid') || uuidv4()
      return { id }
    },
    token(state) {
      return state.userInfo.token || 'AIOS-123'
    }
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem("token", token);
    },
  },
  actions: {
    setUserInfo({commit}, userInfo) {
      commit('SET_USER_INFO', userInfo)
    },
    setToken({commit}, token) {
      commit('SET_TOKEN', token)
    }
  },
  plugins: [persistedState()]
})
