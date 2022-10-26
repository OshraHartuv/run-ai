<template>
  <!-- <section > -->
    <tr class="emp-preview" @click.stop>
      <td>{{emp.name}}</td>
      <td>{{getDeptName(emp)}}</td>
      <td>...</td>
    </tr>
  <!-- </section> -->
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
    console.log('example ');
  },
  methods: {
    // remove(id) {
    //   this.$emit("remove", id);
    // },
    getDeptName(emp) {
      const deps = this.$store.getters.currComp.deps;
      const dep = deps.find(dep => dep._id === emp.depId);
      return dep.name;
    }
  },
  computed: {},
  unmounted() {}
};
</script>