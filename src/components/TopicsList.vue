<template>
  <v-list>
    <v-list-item-group color="primary">
      <router-link
        v-for="(topic, i) in value"
        :key="i"
        :to="{ path: `/task/${i + 1}` }"
        tag="div"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ topic.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ topic.url }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    value: Array
  }
};
</script>
