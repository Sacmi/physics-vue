<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon v-if="showDrawer" @click="drawer = !drawer" />
      <v-toolbar-title>{{ appBarTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app :touchless="showDrawer" temporary>
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
  created: function() {
    const url = localStorage.getItem("apiUrl");

    if (url) this.$store.commit("setApiUrl", url);
  },
  computed: {
    showDrawer: function() {
      const { name } = this.$route;
      return name === "Login" || name === "Offline" ? false : true;
    },
    ...mapState({ appBarTitle: "appBarTitle" })
  }
};
</script>
