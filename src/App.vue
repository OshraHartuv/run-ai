<template>
  <section class="main-layout">
    <app-header />
    <side-nav />
    <RouterView />
  </section>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import SideNav from "./components/SideNav.vue";
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppHeader,
    SideNav
  }
};
</script>
