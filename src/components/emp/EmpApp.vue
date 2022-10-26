<template>
  <section class="app" v-if="compId">
    <button class="add-btn">
      <RouterLink :to="`/comp/${compId}/emp/edit`">Add a new Employee</RouterLink>
    </button>
    <emp-list :emps="emps" @remove="removeEmp" v-if="emps && emps.length"></emp-list>
    <routerView></routerView>
  </section>
</template>

<script>
import EmpList from "./EmpList.vue";
export default {
  computed: {
    emps() {
      return this.$store.getters.currComp?.emps;
    },
      compId() {
      return this.$store.getters.currCompId;
    }
  },
  methods: {
    async removeEmp(id) {
      try {
        var compToSave = JSON.parse(
          JSON.stringify(this.$store.getters.currComp)
        );
        var idx = compToSave.emps.findIndex(emp => emp._id === id);
        compToSave.emps.splice(idx, 1);
        await this.$store.dispatch({ type: "saveComp", comp: compToSave });
      } catch (err) {
        console.log("Cannot remove  employee " + id, err);
      }
    }
  },
  components: {
    EmpList
  }
};
</script>