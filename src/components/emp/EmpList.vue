<template>
  <div class="list">
    <table>
      <thead>
        <th>Name</th>
        <th>Department</th>
        <th></th>
      </thead>
      <tbody v-for="emp in emps" :key="emp._id">
        <emp-preview :emp="emp" @remove="remove"></emp-preview>
      </tbody>
    </table>
  </div>
</template>

<script>
import EmpPreview from './EmpPreview.vue'
export default {
  name: "EmpList",
  props: {
    emps: Array,
    default: []
  },
  components: {
      EmpPreview

  },
  methods: {
    getDeptName(emp) {
      const deps = this.$store.getters.currComp.deps
      const dep = deps.find(dep=> dep._id===emp.depId)
      return dep.name
    },
      remove(id) {
      this.$emit("remove", id);
    }
  },

};
</script>