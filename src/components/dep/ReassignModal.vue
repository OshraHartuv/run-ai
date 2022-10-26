<template>
  <div class="modal-wrapper">
    <section class="edit-modal wrapped-modal" v-click-outside="closeModal">
      <h3>Please reassign employees</h3>
      <form v-if="emps && emps.length" @submit.prevent="save" class="edit-modal-form">
        <div v-for="(emp) in emps" :key="emp._id">
          <h4>{{emp.name}}</h4>
          <el-select v-model="emp.depId">
            <el-option value label="Delete employee">Delete employee</el-option>
            <el-option
              v-for="(dep,idx) in deps"
              :key="dep._id + idx"
              :label="dep.name"
              :value="dep._id"
            >{{dep.name}}</el-option>
          </el-select>
        </div>
        <button class="confirm-btn btn">Reassign</button>
      </form>
    </section>
  </div>
</template>


<script>
export default {
  props: {
    name: { type: String },
    emps: { type: Array },
    deps: { type: Array }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    save() {
      this.$emit("reassign", this.emps);
    }
  },
};
</script>