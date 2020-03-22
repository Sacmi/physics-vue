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
      >
        Войти
      </v-btn>
    </v-form>
    <v-snackbar bottom v-model="isFetching" :timeout="0">
      Выполняется вход...
    </v-snackbar>
    <v-snackbar
      :timeout="error.timeout"
      bottom
      v-model="error.isError"
      color="red"
    >
      {{ error.message }}
    </v-snackbar>
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import { signIn } from "@/utils/api";

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
    error: {
      isError: false,
      message: "",
      timeout: 5000
    },
    isFetching: false,

    autoSignIn: false
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
      this.error.isError = false;
      let fetched, res;

      try {
        fetched = await signIn({
          email: this.email,
          password: this.password
        });

        res = await fetched.json();
      } catch (error) {
        if (error instanceof SyntaxError)
          this.setError("Сервер вернул некорректные данные");
        else this.setError("Не удалось выполнить запрос к серверу");

        return;
      }

      if (fetched.status !== 200 || !res.authCookie) {
        this.setError(res.message ? res.message : "Неверный логин или пароль");
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
    },
    setError: function(message) {
      this.isFetching = false;
      this.error.message = message;
      this.error.isError = true;
    }
  }
};
</script>
