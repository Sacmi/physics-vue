<template>
  <v-list nav>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ $store.state.session.email }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ $store.state.apiUrl }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <router-link
      v-for="item in items"
      :key="item.title"
      :to="item.to"
      tag="div"
    >
      <v-list-item link>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </router-link>
  </v-list>
</template>
<script>
export default {
  data: () => ({
    items: [
      { title: "Выбор темы", to: "/" },
      { title: "Выйти", to: "/logout" }
    ]
  })
};
</script>
