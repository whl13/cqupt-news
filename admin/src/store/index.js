import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    isGetRouter: false,
    isCollapse: true,
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    setGetRouter(state, data) {
      state.isGetRouter = data
    },
    setCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    setUserInfo(state, data) {
      state.userInfo = { ...state.userInfo, ...data }
    },
    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        isCollapse: state.isCollapse,
        userInfo: state.userInfo
      }
    }
  })]
})
