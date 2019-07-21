import { setStore, getStore } from "@/libs/store";
import { TAGS, TAG_PATHs, TAG_ACTIVE } from "@/store/mutation-types";
export default {
  state: {
    pages: getStore({ name: TAGS }) || [],
    fullPaths: getStore({ name: TAG_PATHs }) || [],
    tagActive: getStore({ name: TAG_ACTIVE }) || ""
  },
  mutations: {
    SET_TAGS(state, page) {
      if (page.name === undefined) {
        return;
      }
      if (state.fullPaths.indexOf(page.fullPath) < 0) {
        const pageDetail = {
          fullPath: page.fullPath,
          label: page.meta.title,
          closeable: page.meta.closeable
        };
        state.fullPaths.push(page.fullPath);
        state.pages.push(pageDetail);
        setStore({ name: TAGS, content: state.pages, type: "session" });
        setStore({
          name: TAG_PATHs,
          content: state.fullPaths,
          type: "session"
        });
      }
      state.tagActive = page.fullPath;
      setStore({ name: TAG_ACTIVE, content: page.fullPath, type: "session" });
    },
    DEL_TAG(state, targetKey) {
      state.pages = state.pages.filter(page => page.fullPath !== targetKey);
      state.fullPaths = state.fullPaths.filter(path => path !== targetKey);
      state.tagActive = state.fullPaths[state.fullPaths.length - 1];
      setStore({ name: TAG_PATHs, content: state.fullPaths, type: "session" });
      setStore({ name: TAGS, content: state.pages, type: "session" });
      setStore({ name: TAG_ACTIVE, content: state.tagActive, type: "session" });

      if (!state.fullPaths.includes(state.tagActive)) {
        state.tagActive = state.fullPaths[state.fullPaths.length - 1];
      }
    },
    SET_TAG_ACTIVE(state, targetKey) {
      state.tagActive = targetKey;
    }
  },
  getters: {
    pages: state => state.pages,
    fullPaths: state => state.fullPaths,
    tagActive: state => state.tagActive
  },
  actions: {}
};
