<template>
  <v-container>
    <TopicsList v-if="!isLoading" v-model="topics" />

    <v-snackbar v-model="isLoading" bottom :timeout="0">
      Получение данных...
    </v-snackbar>
    <v-snackbar :timeout="timeout" bottom v-model="isError" color="red">
      {{ errorMessage }}
    </v-snackbar>
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
    errorMessage: null,
    timeout: 5000
  }),
  mounted: async function() {
    this.$store.commit("setAppBarTitle", "Выбор темы");

    if (this.topics) return;

    try {
      const fetched = await getTopics();

      if (fetched.status !== 200) throw new Error("not OK");
      this.$store.commit("setLectureTopics", await fetched.json());
    } catch (error) {
      this.errorMessage = "Произошла ошибка. Необходимо авторизоваться заново";
      this.isError = true;

      setTimeout(() => this.$router.push({ name: "Logout" }), this.timeout);
      return;
    }

    this.isLoading = false;
  },
  computed: mapState({ topics: ({ lecture }) => lecture.topics })
};
</script>
