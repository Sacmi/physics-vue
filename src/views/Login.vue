<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field
        v-model="email"
        label="Почта"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        :error-messages="emailErrors"
        :disabled="isFetching"
      />
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="Пароль"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        type="password"
        :disabled="isFetching"
      />
      <v-btn
        block
        class="button"
        color="primary"
        @click="submit"
        :disabled="isFetching"
        >Войти</v-btn
      >
    </v-form>
    <v-snackbar bottom v-model="isFetching" :timeout="0"
      >Выполняется вход...</v-snackbar
    >
    <v-snackbar :timeout="5000" bottom v-model="isError" color="red">{{
      errorMessage
    }}</v-snackbar>
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import apiFetch from "@/utils/api";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  data: () => ({
    email: null,
    password: null,
    valid: null,
    isFetching: false,
    isError: false,
    errorMessage: null
  }),
  mounted() {
    this.$store.commit("setAppBarTitle", "Вход");
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Это поле должно быть почтой");
      !this.$v.email.required && errors.push("Это поле необходимо.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Пароль должен содержать 6 символов и более");
      !this.$v.password.required && errors.push("Это поле необходимо.");
      return errors;
    }
  },
  methods: {
    async submit() {
      await this.$v.$touch();

      if (this.valid) {
        this.isFetching = true;
        const fetched = await apiFetch("getAuthData", {
          email: this.email,
          password: this.password
        });
        const res = await fetched.json();

        if (fetched.status !== 200 || !res.authCookie) {
          this.errorMessage = res.message
            ? res.message
            : "Неверный логин или пароль";
          this.isError = true;
          this.isFetching = false;
          return;
        }
        const { authCookie, verificationCookie } = res;

        this.$store.commit("setCookies", { authCookie, verificationCookie });
        this.$router.push({ name: "Home" });
        this.isFetching = false;
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
