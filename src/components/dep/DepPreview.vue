<template>
  <tr class="preview" @click.stop>
    <td>{{dep.name}}</td>
    <td class="actions">
      <el-dropdown>
        <span class="el-dropdown-link">Actions</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="remove(dep._id)">Delete Employee</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </td>
  </tr>
</template>

<script>
export default {
  name: "DepPreview",
  props: {
    dep: {
      type: Object,
      required: true
    }
  },
  methods: {
      remove(id) {
      this.$emit("remove", id);
    }
  }
};
</script>