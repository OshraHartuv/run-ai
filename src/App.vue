<template>
  <section class="main-layout">
    <app-header />
    <side-nav />
    <RouterView />
    <notifications position="bottom right" />
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
  },
  async created() {
    try {
      await this.$store.dispatch({ type: "loadComps" });
    } catch (err) {
      console.log('can\'t load companies',err);
      this.$notify({
        text: "Oops... Something went wrong",
        title: "Error",
        type: "error"
      });
    }
  }
};
</script>
