<template>
  <v-dialog v-model="value" persistent>
    <v-card>
      <v-card-title class="headline">Ответ отправлен</v-card-title>
      <v-card-text>
        Вы можете посмотреть результат (откроется оригинальный сайт), обновить
        задание или заспамить ответ этого задания.
        <v-select :items="actions" label="Действие" v-model="selected" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary darken-1" text>Выбрать</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    actions: ["Обновить", "Посмотреть результат", "Заспамить ответ"],
    selected: null
  }),
  props: {
    value: Boolean
  },
  mounted() {
    this.selected = this.actions[0];
  }
};
</script>
