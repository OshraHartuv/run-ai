<template>
  <section class="emp-app" v-if="emps">
    <emp-list :emps="emps"></emp-list>
  </section>
</template>

<script>
import EmpList from "./EmpList.vue";
export default {
  computed: {
    emps() {
      return this.$store.getters.currComp?.emps;
    }

  },
  components: {
    EmpList
  }
};
</script>