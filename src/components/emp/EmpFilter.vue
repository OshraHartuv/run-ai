<template>
  <section class="filter">
    <label>
      Search by department:
      <el-select @change="setFilter" v-model="filterBy.deps" multiple>
        <el-option v-for="dep in deps" :key="dep._id" :label="dep.name" :value="dep._id">{{dep.name}}</el-option>
      </el-select>
    </label>
    <label>
      name:
      <el-input type="text" @input="setFilter" v-model="filterBy.name" placeholder="Search by name" />
    </label>
  </section>
</template>

<script>
import {utilService} from "../../services/util.service.js";
export default {
  name: "EmpFilter",
  props: { deps: { type: Array } },
  data() {
    return {
      filterBy: {
        deps: [],
        name: ''
      }
    };
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter,100);
  },
  methods: {
    setFilter() {
      this.$emit("set-filter", this.filterBy);
    }
  }
};
</script>