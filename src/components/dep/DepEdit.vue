<template>
  <div class="modal-wrapper" v-if="comp">
    <section class="emp-edit wrapped-modal" v-click-outside="closeModal">
      <h3>Add a new '{{ comp.name }}' department</h3>
      <form v-if="depToEdit" @submit.prevent="save" class="emp-edit-form">
        <input type="text" placeholder="Department name" v-model="depToEdit.name" />
        <button>Save</button>
      </form>
    </section>
  </div>
</template>
<script>
import compService from "../../services/comp.service.js";
export default {
  components: {},
  data() {
    return {
      depToEdit: null
    };
  },
  created() {
    this.depToEdit = compService.getDep();
  },
  methods: {
    async save() {
      try {
        var compToSave = JSON.parse(JSON.stringify(this.comp));
        var empToSave = JSON.parse(JSON.stringify(this.depToEdit));
        if (!empToSave.name) return;
        compToSave.deps.push(empToSave);
        await this.$store.dispatch({
          type: "saveComp",
          comp: compToSave
        });
        this.closeModal();
      } catch (err) {
        console.log("can't add employee ", err);
      }
    },
    closeModal() {
      this.depToEdit = null;
      this.$router.go(-1);
    }
  },
  computed: {
    comp() {
      return this.$store.getters.currComp;
    }
  }
};
</script>