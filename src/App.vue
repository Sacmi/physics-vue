<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>{{ appBarTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  computed: {
    appBarTitle: function() {
      return this.$store.state.appBarTitle;
    }
  }
};
</script>
