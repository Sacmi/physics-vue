<template>
  <v-dialog v-model="show" persistent>
    <v-card>
      <v-card-title class="headline">Ответ отправлен</v-card-title>
      <v-card-text>
        Вы можете посмотреть результат (откроется оригинальный сайт), обновить
        задание, заспамить ответ этого задания или ответить еще раз.
        <v-select :items="actions" label="Действие" v-model="selected" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" @click="submit" text>Выбрать</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  model: {
    prop: "modelAction",
    event: "changeAction"
  },
  data: () => ({
    actions: [
      { text: "Обновить", value: "update" },
      { text: "Посмотреть результат", value: "show" },
      //{ text: "Заспамить ответ", value: "spam" },
      { text: "Ответить еще раз", value: "again" }
    ],

    selected: null
  }),
  props: {
    modelAction: String,
    show: Boolean
  },
  methods: {
    submit: function() {
      switch (this.selected) {
        case "update":
        case "again":
          this.$emit("changeAction", this.selected);
          break;
        case "spam":
          break;
        case "show":
          window.open("http://test.apbphysics.ru/User/BallsPokaz", "_blank");
          break;
      }
    }
  }
};
</script>
