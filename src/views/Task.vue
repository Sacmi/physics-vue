<template>
  <v-container>
    <v-form v-model="valid" v-show="!loader.isLoading">
      <v-img :src="image" transition="fade-transition" contain></v-img>
      <v-text-field
        v-model="answer"
        :error-messages="answerErrors"
        label="Ответ"
        required
        @input="$v.answer.$touch()"
        @blur="$v.answer.$touch()"
        :disabled="loader.isLoading"
      />
      <v-btn
        block
        class="button"
        color="primary"
        @click="submit"
        :disabled="loader.isLoading"
        >Ответить</v-btn
      >
      <v-btn block class="button" @click="loadTask" :disabled="loader.isLoading"
        >Пропустить</v-btn
      >
    </v-form>
    <v-snackbar v-model="loader.isLoading" bottom :timeout="0">{{
      loader.text
    }}</v-snackbar>
    <v-snackbar :timeout="5000" bottom v-model="error.isError" color="red">{{
      error.errorMessage
    }}</v-snackbar>
    <Modal v-model="modalAction" :show="modal" />
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
import apiFetch from "@/utils/api";

import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal
  },
  mixins: [validationMixin],
  validations: {
    answer: { required, numeric }
  },
  data: () => ({
    loader: {
      isLoading: true,
      text: "Получение данных..."
    },

    error: {
      isError: false,
      errorMessage: null
    },

    taskId: null,
    image: "",
    answer: "",
    sessionCookie: null,

    modal: false,
    modalAction: "",
    valid: null
  }),
  computed: {
    answerErrors: function() {
      const errors = [];

      if (!this.$v.answer.$dirty) return errors;
      !this.$v.answer.numeric && errors.push("Ответ должен быть числом");
      !this.$v.answer.required && errors.push("Это поле необходимо.");

      return errors;
    }
  },
  mounted: function() {
    this.loadTask();
  },
  methods: {
    submit: async function() {
      await this.$v.$touch();

      if (!this.valid) return;

      this.loader.text = "Отправка ответа...";
      this.loader.isLoading = true;

      const fetched = await apiFetch(`topic/${this.$route.params.id}/send`, {
        taskId: this.taskId,
        answer: this.answer,
        sessionCookie: this.sessionCookie
      });

      if (fetched.status !== 200) {
        this.loader.isLoading = false;
        this.error.isError = true;
        this.error.errorMessage = "Не удалось отправить ответ.";
        return;
      }

      this.modal = true;
      this.loader.isLoading = false;
      this.modal = true;
    },
    loadTask: async function() {
      this.loader.isLoading = true;
      this.$store.commit("setAppBarTitle", "Загрузка...");
      const fetched = await apiFetch(`topic/${this.$route.params.id}/get`);

      if (fetched.status !== 200) {
        switch (fetched.status) {
          case 302:
            this.error.errorMessage =
              "Сайт не дает получить задание. Возможно, превышен лимит в 10 попыток";
            break;

          default:
            this.error.errorMessage = "Не удалось получить задание.";
            break;
        }
        this.loader.isLoading = false;
        this.error.isError = true;
        return;
      }

      const res = await fetched.json();

      this.image = res.image;
      this.taskId = res.taskId;
      this.sessionCookie = res.sessionCookie;
      this.$store.commit("setAppBarTitle", `Задание №${this.taskId}`);

      this.loader.isLoading = false;
    }
  },
  watch: {
    modalAction: function(action) {
      this.modal = false;

      switch (action) {
        case "spam":
          break;

        case "update":
          this.answer = "";
          this.loadTask();
          break;

        case "again":
          break;

        default:
          this.modal = true;
          break;
      }
    }
  }
};
</script>
<style scoped>
.button {
  margin-top: 8px;
}
</style>
