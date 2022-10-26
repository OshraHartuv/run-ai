<template>
    <tr class="emp-preview" @click.stop>
      <td>{{emp.name}}</td>
      <td>{{getDeptName(emp)}}</td>
      <td>...</td>
    </tr>
</template>

<script>
export default {
  name: "EmpPreview",
  props: {
    emp: {
      type: Object,
      required: true
    }
  },
  components: {},
  data() {
    return {};
  },
  created() {
  },
  methods: {
    getDeptName(emp) {
      const deps = this.$store.getters.currComp.deps;
      const dep = deps.find(dep => dep._id === emp.depId);
      return dep.name;
    }
  },
};
</script>