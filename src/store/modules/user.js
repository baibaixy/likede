import { getImageCode, UserLogin } from '@/api/public'
import { getUserService } from '@/api/userService'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    verifyCodeImg: '',
    ClientToken: '',
    UserInfo: '',
    UserId: '',
    UserService: {}
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
    },
    setUSerId(state, payload) {
      state.UserId = payload
    },
    setUserService(state, payload) {
      state.UserService = payload
    }
  },
  actions: {
    async getverifyCode({ commit }) {
      // console.log(111)
      const data = Math.floor(Math.random() * 10000000)
      // console.log(data);
      const res = await getImageCode(data)
      // console.log(res)
      const imgBanner = URL.createObjectURL(res.data)
      commit('getverifyCode', imgBanner)
      commit('setClientToken', data)
    },
    async getUserInfo({ commit }, payload) {
      const data = await UserLogin(payload)
      // console.log(data)
      commit('setUserInfo', data.token)
      commit('setUSerId', data.userId)
      setTokenTime()
      router.push('/')
    },
    async getUserService(context) {
      const id = context.state.UserId
      console.log(id)
      const res = await getUserService(id)
      // console.log(res)
      context.commit('setUserService', res.data)
    },
    logout({ commit }) {
      commit('setUserInfo', '')
      commit('setUserService', {})
    }
  }
}
