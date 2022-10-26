<template>
  <section class="app" v-if="compId">
    <button class="add-btn btn">
      <RouterLink :to="`/comp/${compId}/dep/edit`">Add a new Department</RouterLink>
    </button>
    <dep-list :deps="deps" @remove="showModal" v-if="deps && deps.length"></dep-list>
    <reassign-modal
      v-if="empsToReassign && empsToReassign.length"
      :deps="depsToShow"
      :emps="empsToReassign"
      @close="closeModal"
      @reassign="reassign"
    ></reassign-modal>
    <delete-modal
      v-if="depToDelete"
      :name="depToDelete.name"
      @remove="removeDep"
      @close="closeModal"
      @confirm="removeDep"
    ></delete-modal>
    <routerView></routerView>
  </section>
</template>

<script>
import DepList from "./DepList.vue";
import DeleteModal from "./DeleteModal.vue";
import ReassignModal from "./ReassignModal.vue";
export default {
  data() {
    return {
      depToDelete: null,
      empsToReassign: [],
      depsToShow: [],
      depToDeleteId: null
    };
  },
  computed: {
    deps() {
      return this.$store.getters.currComp?.deps;
    },
    compId() {
      return this.$store.getters.currCompId;
    },
    comp() {
      return this.$store.getters.currComp;
    },
    emps() {
      return this.$store.getters.currComp.emps;
    }
  },
  methods: {
    showModal(depId) {
      this.depToDeleteId = depId;
      if (this.comp.emps.some(emp => emp.depId === depId)) {
        var deps = this.deps.filter(dep => dep._id !== depId);
        this.depsToShow = JSON.parse(JSON.stringify(deps));
        var empsCopy = JSON.parse(JSON.stringify(this.comp.emps));
        var emps = [];
        empsCopy.forEach(emp => {
          if (emp.depId === depId) {
            emp.depId = "";
            emps.push(emp);
          }
        });
        this.empsToReassign = emps;
      } else {
        this.depToDelete = this.deps.find(dep => dep._id === depId);
      }
    },
    async removeDep() {
      try {
        var compToSave = JSON.parse(JSON.stringify(this.comp));
        var idx = compToSave.deps.findIndex(
          dep => dep._id === this.depToDelete._id
        );
        compToSave.deps.splice(idx, 1);
        await this.$store.dispatch({ type: "saveComp", comp: compToSave });
        this.depToDelete = null;
      } catch (err) {
        console.log("Cannot remove department ", err);
        this.$notify({
          text: "Oops... Something went wrong",
          title: "Error",
          type: "error"
        });
      }
    },
    async reassign(emps) {
      try {
        var compToSave = JSON.parse(JSON.stringify(this.comp));
        emps.forEach(emp => {
          var idx = compToSave.emps.findIndex(
            currEmp => currEmp._id === emp._id
          );
          if (emp.depId) {
            compToSave.emps.splice(idx, 1, emp);
          } else {
            compToSave.emps.splice(idx, 1);
          }
        });

        await this.$store.dispatch({ type: "saveComp", comp: compToSave });
        this.empsToReassign = [];
        this.depsToShow = [];
        this.showModal(this.depToDeleteId);
      } catch (err) {
        console.log("can't reassign employees", err);
        this.$notify({
        text: "Oops... Something went wrong",
        title: "Error",
        type: "error"
      });
      }
    },
    closeModal() {
      this.depToDelete = null;
      this.empsToReassign = [];
      this.depsToShow = [];
      this.depToDeleteId = null;
    }
  },
  components: {
    DepList,
    DeleteModal,
    ReassignModal
  }
};
</script>