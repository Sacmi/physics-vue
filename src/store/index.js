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
    session: {
      authCookie: null,
      verificationCookie: null,
      email: null
    },
    appBarTitle: "Загрузка..."
  },
  mutations: {
    setAppBarTitle(state, title) {
      state.appBarTitle = title;
    },
    setLectureTopics({ lecture }, topics) {
      lecture.topics = topics;
    },
    setSessionData({ session }, { authCookie, verificationCookie, email }) {
      session.verificationCookie = verificationCookie;
      session.authCookie = authCookie;
      session.email = email;
    }
  },
  actions: {},
  modules: {}
});
