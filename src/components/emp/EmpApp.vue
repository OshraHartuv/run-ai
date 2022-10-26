<template>
  <section class="app" v-if="compId">
    <button class="add-btn btn">
      <a @click="openEditModal">Add a new Employee</a>
      <!-- <RouterLink :to="`/comp/${compId}/emp/edit`">Add a new Employee</RouterLink> -->
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
    },
    comp(){
      return this.$store.getters.currComp
    }
  },
  methods: {
    async removeEmp(id) {
      try {
        var compToSave = JSON.parse(
          JSON.stringify(this.comp)
        );
        var idx = compToSave.emps.findIndex(emp => emp._id === id);
        compToSave.emps.splice(idx, 1);
        await this.$store.dispatch({ type: "saveComp", comp: compToSave });
      } catch (err) {
        console.log("Cannot remove  employee " + id, err);
        this.$notify({
        text: "Oops... Something went wrong",
        title: "Error",
        type: "error"
      });
      }
    },
    openEditModal(){
      console.log('this.comp.deps ',this.comp.deps);
      if (!this.comp.deps || !this.comp.deps.length) this.$notify({text:"This company has no departments. Please add a department first", title:'Error', type: 'error' });
      else this.$router.push(`/comp/${this.compId}/emp/edit`)
    }
  },
  components: {
    EmpList
  }
};
</script>