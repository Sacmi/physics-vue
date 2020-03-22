import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lecture: {
      taskId: null,
      topicId: null,
      answer: null,
      topics: null
    },
    session: {
      authCookie: null,
      verificationCookie: null,
      email: null
    },
    appBarTitle: "Загрузка...",
    apiUrl: "https://dry-waters-99332.herokuapp.com"
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
    },
    setTaskData({ lecture }, { taskId, topicId, answer }) {
      lecture.answer = answer;
      lecture.taskId = taskId;
      lecture.topicId = topicId;
    },
    setApiUrl(store, url) {
      store.apiUrl = url;
    }
  },
  actions: {},
  modules: {}
});
