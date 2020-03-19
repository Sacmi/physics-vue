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
      <v-checkbox
        v-model="autoSignIn"
        label="Авто-вход"
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
    errorMessage: null,
    autoSignIn: true
  }),
  mounted: function() {
    this.$store.commit("setAppBarTitle", "Вход");

    this.autoSignIn = localStorage.getItem("autoSignIn") === "true";
    if (!this.autoSignIn) return;

    this.email = localStorage.getItem("email");
    this.password = localStorage.getItem("password");

    this.submit();
  },
  computed: {
    emailErrors: function() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Это поле должно быть почтой");
      !this.$v.email.required && errors.push("Это поле необходимо.");
      return errors;
    },
    passwordErrors: function() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Пароль должен содержать 6 символов и более");
      !this.$v.password.required && errors.push("Это поле необходимо.");
      return errors;
    }
  },
  methods: {
    submit: async function() {
      await this.$v.$touch();

      if (!this.valid) return;

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

      this.$store.commit("setSessionData", {
        authCookie,
        verificationCookie,
        email: this.email
      });

      localStorage.setItem("email", this.email);
      localStorage.setItem("password", this.password);
      localStorage.setItem("autoSignIn", this.autoSignIn);

      this.isFetching = false;
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
