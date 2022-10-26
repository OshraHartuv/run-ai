<template>
  <section class="app" v-if="compId">
    <button class="add-btn">
      <!-- <RouterLink :to="`/comp/${compId}/emp/edit`">Add a new Employee</RouterLink> -->
      <RouterLink to="/">Add a new Department</RouterLink>
    </button>
    <dep-list :deps="deps" @remove="removeDep" v-if="deps && deps.length"></dep-list>
    <!-- <routerView></routerView> -->
  </section>
</template>

<script>
import DepList from "./DepList.vue";
export default {
  computed: {
    deps() {
      return this.$store.getters.currComp?.deps;
    },
      compId() {
      return this.$store.getters.currCompId;
    }
  },
  methods: {
    async removeDep(id) {
      try {
        console.log('dep- id ',id);
        // var compToSave = JSON.parse(
        //   JSON.stringify(this.$store.getters.currComp)
        // );
        // var idx = compToSave.emps.findIndex(emp => emp._id === id);
        // compToSave.emps.splice(idx, 1);
        // await this.$store.dispatch({ type: "saveComp", comp: compToSave });
      } catch (err) {
        console.log("Cannot remove department " + id, err);
      }
    }
  },
  components: {
    DepList
  }
};
</script>