import Vue from "vue";
import { TAGS, TAG_PATHs } from "@/store/mutation-types";
export default {
  state: {
    pages: [],
    fullPaths: []
  },
  mutations: {
    SET_TAGS(state, page) {
      if (state.fullPaths.indexOf(page.fullPath) < 0) {
        state.fullPaths.push(page.fullPath);
        state.pages.push(page);
      }
      Vue.st.set(TAGS, state.pages);
      Vue.st.set(TAG_PATHs, state.fullPaths);
    }
  },
  actions: {}
};
