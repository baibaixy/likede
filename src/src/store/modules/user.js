import { login } from "@/api/user";
import router from "@/router";
import { Message } from "element-ui";
export default {
  namespaced: true,
  state: {
    token: "",
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async getToken(context, payload) {
      const { data } = await login(payload);
      context.commit("setToken", data.token);
      if (data.success) {
        router.push("/");
      } else {
        Message.error(data.msg);
      }
    },
  },
};
