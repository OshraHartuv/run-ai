<template>
  <section class="app-header full">
    <nav v-for="comp in comps" :key="comp._id">
      <RouterLink
        :to="`/comp/${comp._id}/emp`"
        :style="{'text-decoration' : isActive(comp._id) ? 'underline': '' }"
      >{{comp.name}}</RouterLink>
    </nav>
  </section>
</template>

<script>
export default {
  computed: {
    comps() {
      return this.$store.getters.miniComps;
    }
  },
  methods:{
    isActive(compId) {
      return this.$route.params.id === compId;
    }

  }
};
</script>
