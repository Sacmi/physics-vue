<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon v-if="showDrawer" @click="drawer = !drawer" />
      <v-toolbar-title>{{ appBarTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer temporary v-model="drawer" app>
      <DrawerList />
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import DrawerList from "@/components/DrawerList.vue";

export default {
  name: "App",
  data: () => ({ drawer: false }),
  components: {
    DrawerList
  },
  computed: {
    showDrawer: function() {
      return this.$route.name === "Login" ? false : true;
    },
    ...mapState({ appBarTitle: "appBarTitle" })
  }
};
</script>
