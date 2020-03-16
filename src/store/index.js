import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lecture: {
      taskId: null,
      answer: null,
      counter: 0,
      isSpaming: false,
      topics: null
    },
    appBarTitle: "Загрузка...",
    authCookie: null,
    verificationCookie: null
  },
  mutations: {
    setAppBarTitle(state, title) {
      state.appBarTitle = title;
    },
    setLectureTopics(state, topics) {
      state.lecture.topics = topics;
    },
    setCookies(state, { authCookie, verificationCookie }) {
      state.verificationCookie = verificationCookie;
      state.authCookie = authCookie;
    }
  },
  actions: {},
  modules: {}
});
