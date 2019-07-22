import Vue from "vue";
import store from "@/store/";
import { SIDEBAR_TYPE } from "@/store/mutation-types";

export default function Initializer() {
  store.commit("SET_SIDEBAR_TYPE", Vue.ls.get(SIDEBAR_TYPE, true));
}
