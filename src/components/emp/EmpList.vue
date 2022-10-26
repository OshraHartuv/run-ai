<template>
  <div class="emp-list">
    <button>Add Employee</button>
    <table>
      <thead>
        <th>Name</th>
        <th>Department</th>
        <th>Actions</th>
      </thead>
      <tbody v-for="emp in emps" :key="emp._id">
        <emp-preview :emp="emp"></emp-preview>
        <!-- <tr>
          <td>{{emp.name}}</td>
          <td>{{getDeptName(emp)}}</td>
          <td>...</td>
        </tr> -->
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
  data() {
    return {};
  },
  created() {
  },
  methods: {
    getDeptName(emp) {
      const deps = this.$store.getters.currComp.deps
      const dep = deps.find(dep=> dep._id===emp.depId)
      return dep.name
    }
  },
  computed: {
  },
  unmounted() {}
};
</script>