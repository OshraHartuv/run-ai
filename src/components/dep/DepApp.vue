<template>
  <section class="app" v-if="compId">
    <button class="add-btn btn">
      <RouterLink :to="`/comp/${compId}/dep/edit`">Add a new Department</RouterLink>
    </button>
    <dep-list :deps="deps" @remove="showModal" v-if="deps && deps.length"></dep-list>
    <delete-modal v-if="depToDelete" :name="depToDelete.name" @remove="removeDep" @close="depToDelete = null" @confirm="removeDep"></delete-modal>
    <routerView></routerView>
  </section>
</template>

<script>
import DepList from "./DepList.vue";
import DeleteModal from './DeleteModal.vue'
export default {
  data(){
    return{
      depToDelete: null
    }
  },
  computed: {
    deps() {
      return this.$store.getters.currComp?.deps;
    },
    compId() {
      return this.$store.getters.currCompId;
    }
  },
  methods: {
    showModal(depId) {
      if (this.$store.getters.currComp.emps.some(emp => emp.depId === depId)) {
        console.log("yes");
      } else {
        this.depToDelete  = this.$store.getters.currComp.deps.find(dep => dep._id === depId)
        console.log('this.depToDelete ',this.depToDelete);
      }
    },
    async removeDep() {
      try {
        var compToSave = JSON.parse(
          JSON.stringify(this.$store.getters.currComp)
        );
        var idx = compToSave.deps.findIndex(dep => dep._id === this.depToDelete._id);
        compToSave.deps.splice(idx, 1);
        await this.$store.dispatch({ type: "saveComp", comp: compToSave });
        this.depToDelete = null
      } catch (err) {
        console.log("Cannot remove department " + this.depToDelete._id, err);
      }
    }
  },
  components: {
    DepList,
    DeleteModal
  }
};
</script>