<template>
  <div class="emp-list">
    <button class="add-btn">
        <RouterLink :to="`/comp/${compId}/emp/edit`" >Add a new Employee</RouterLink>
    </button>
    <table>
      <thead>
        <th>Name</th>
        <th>Department</th>
        <th>Actions</th>
      </thead>
      <tbody v-for="emp in emps" :key="emp._id">
        <emp-preview :emp="emp"></emp-preview>
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
  },
  computed: {
    compId(){
      return this.$store.getters.currCompId
    }
  }
};
</script>