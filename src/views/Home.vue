<template>
  <v-container>
    <TopicsList v-if="!isLoading" v-model="topics" />

    <v-snackbar v-model="isLoading" bottom :timeout="0"
      >Получение данных...</v-snackbar
    >
    <v-snackbar :timeout="5000" bottom v-model="isError" color="red">{{
      errorMessage
    }}</v-snackbar>
  </v-container>
</template>

<script>
import { getTopics } from "@/utils/api";
import { mapState } from "vuex";
import TopicsList from "@/components/TopicsList";

export default {
  components: {
    TopicsList
  },
  data: () => ({
    isLoading: true,
    isError: false,
    errorMessage: null
  }),
  mounted: async function() {
    this.$store.commit("setAppBarTitle", "Выбор темы");

    if (!this.topics) {
      const fetched = await getTopics();

      if (fetched.status !== 200) this.$router.push({ name: "Login" });
      this.$store.commit("setLectureTopics", await fetched.json());
    }

    this.isLoading = false;
  },
  computed: mapState({ topics: ({ lecture }) => lecture.topics })
};
</script>
