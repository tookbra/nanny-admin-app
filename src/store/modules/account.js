import ls from "../../libs/localstorage";
export default {
  state: {
    userName: "",
    token: ls.get("token")
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  }
};
