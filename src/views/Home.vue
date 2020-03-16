<template>
  <v-container>
    <v-list v-show="!isLoading">
      <v-subheader>Список тем</v-subheader>
      <v-list-item-group color="primary">
        <router-link
          v-for="(topic, i) in topics"
          :key="i"
          :to="{ path: `/task/${i + 1}` }"
          tag="span"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ topic.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ topic.url }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
    <v-snackbar v-model="isLoading" bottom :timeout="0"
      >Получение данных...</v-snackbar
    >
    <v-snackbar :timeout="5000" bottom v-model="isError" color="red">{{
      errorMessage
    }}</v-snackbar>
  </v-container>
</template>

<script>
import apiFetch from "@/utils/api";
import { mapState } from "vuex";

export default {
  data: () => ({
    isLoading: true,
    isError: false,
    errorMessage: null
  }),
  async mounted() {
    this.$store.commit("setAppBarTitle", "Выбор темы");

    if (!this.topics) {
      const fetched = await apiFetch("getTopics");

      if (fetched.status !== 200) this.$router.push({ name: "Login" });
      this.$store.commit("setLectureTopics", await fetched.json());
    }

    this.isLoading = false;
  },
  computed: mapState({ topics: state => state.lecture.topics })
};
</script>
