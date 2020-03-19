<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <div class="text">
      <span class="headline">Вы не в сети</span>
      <p>Без доступа к Интернету, приложение функционировать не может.</p>
    </div>
  </v-container>
</template>

<script>
export default {
  mounted: function() {
    this.$store.commit("setAppBarTitle", "Ошибка");
  }
};
</script>

<style scoped>
.text {
  text-align: center;
}
</style>
