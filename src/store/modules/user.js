import { getImageCode, UserLogin } from '@/api/public'
import router from '@/router'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    verifyCodeImg: '',
    ClientToken: '',
    UserInfo: ''
  },
  mutations: {
    getverifyCode(state, payload) {
      // console.log(data)
      state.verifyCodeImg = payload
    },
    setClientToken(state, payload) {
      state.ClientToken = payload
    },
    setUserInfo(state, payload) {
      state.UserInfo = payload
    }
  },
  actions: {
    async getverifyCode({ commit }) {
      // console.log(111)
      const data = Math.floor(Math.random() * 10000000)
      const res = await getImageCode(data)
      console.log(res)
      const imgBanner = URL.createObjectURL(res.data)
      commit('getverifyCode', imgBanner)
      commit('setClientToken', data)
    },
    async getUserInfo({ commit }, payload) {
      const { data } = await UserLogin(payload)
      console.log(data)
      commit('setUserInfo', data.token)
      if (data.success) {
        router.push('/')
      } else {
        Message.error(data.msg)
      }
    }
  }
}
