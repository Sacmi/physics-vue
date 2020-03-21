<template>
  <v-container>
    <v-alert type="warning">
      Это прототип. Может не работать.
    </v-alert>
    <v-form>
      <v-subheader class="pl-0">
        Количество уже отправленных ответов
      </v-subheader>
      <v-slider
        v-model="current"
        min="1"
        max="10"
        thumb-label
        :disabled="isSpamming"
      />
      <v-subheader class="pl-0">Сколько раз необходимо отправить</v-subheader>
      <v-slider
        v-model="toSpam"
        :min="current + 1"
        max="10"
        thumb-label
        :disabled="isSpamming"
      />
      <v-btn
        block
        color="primary"
        class="button"
        :disabled="isSpamming"
        @click="startSpamming"
      >
        Начать спам
      </v-btn>
      <v-btn @click="sheet = !sheet" block :disabled="isSpamming">
        Данные для спама
      </v-btn>
    </v-form>

    <v-bottom-sheet v-model="sheet">
      <v-sheet>
        <v-list>
          <SpamListItems />
          <v-list-item v-ripple @click="sheet = !sheet">
            <v-list-item-content>
              <v-list-item-title>Закрыть</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>

    <v-snackbar bottom v-model="isSpamming" :timeout="0">
      Спамминг ответа... ({{ current + iter }}/{{ toSpam }})
    </v-snackbar>
    <v-snackbar :timeout="5000" bottom v-model="isError" color="red">
      Не удалось заспаммить ответ
    </v-snackbar>
  </v-container>
</template>

<script>
import SpamListItems from "@/components/SpamListItems";
import { sendAnswer, getTask } from "@/utils/api";

export default {
  components: {
    SpamListItems
  },
  data: () => ({
    iter: 0,
    current: 1,
    toSpam: 1,
    sheet: false,
    isSpamming: false,
    isError: false
  }),

  mounted: function() {
    this.$store.commit("setAppBarTitle", "Спам ответа");
  },
  methods: {
    startSpamming: async function() {
      this.isSpamming = true;
      this.iter = 0;

      for (this.iter = 0; this.iter < this.toSpam - this.current; this.iter++) {
        const { taskId, topicId, answer } = this.$store.state.lecture;
        let sessionCookie = null;

        while (!sessionCookie) {
          const fetched = await getTask({ topicId });

          if (fetched.status !== 200) {
            this.isSpamming = false;
            this.isError = true;

            return;
          }

          const res = await fetched.json();

          if (res.taskId === taskId) sessionCookie = res.sessionCookie;
        }

        const fetched = await sendAnswer({
          taskId,
          topicId,
          answer,
          sessionCookie
        });

        if (fetched.status !== 200) {
          this.isSpamming = false;
          this.isError = true;
          return;
        }
      }

      this.isSpamming = false;
      this.current = this.toSpam;
    }
  }
};
</script>

<style scoped>
.button {
  margin-bottom: 8px;
}
</style>
