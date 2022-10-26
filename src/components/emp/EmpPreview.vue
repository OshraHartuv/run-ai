<template>
  <tr class="emp-preview" @click.stop>
    <td>{{emp.name}}</td>
    <td>{{getDeptName(emp)}}</td>
    <td class="actions">
      <el-dropdown>
        <span class="el-dropdown-link">Actions</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="remove(emp._id)">Delete Employee</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </td>
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
  methods: {
    getDeptName(emp) {
      const deps = this.$store.getters.currComp.deps;
      const dep = deps.find(dep => dep._id === emp.depId);
      return dep.name;
    },
      remove(id) {
      this.$emit("remove", id);
    }
  }
};
</script>

