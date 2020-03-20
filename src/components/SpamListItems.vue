<template>
  <div>
    <v-subheader>Список данных</v-subheader>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Номер темы</v-list-item-title>
        <v-list-item-subtitle>{{ lecture.topicId }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Номер задания</v-list-item-title>
        <v-list-item-subtitle>{{ lecture.taskId }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Ответ</v-list-item-title>
        <v-list-item-subtitle>{{ lecture.answer }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Сессия</v-list-item-title>
        <v-list-item-subtitle>{{ lecture.sessionCookie }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["lecture"])
};
</script>
