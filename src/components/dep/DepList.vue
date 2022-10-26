<template>
  <div class="list">
    <table>
      <thead>
        <th>Name</th>
        <th></th>
      </thead>
      <tbody v-for="dep in deps" :key="dep._id">
        <dep-preview :dep="dep" @remove="remove"></dep-preview>
      </tbody>
    </table>
  </div>
</template>

<script>
import DepPreview from "./DepPreview.vue";
export default {
  name: "DepList",
  props: {
    deps: Array,
    default: []
  },
  components: {
    DepPreview
  },
  methods: {
    remove(id) {
      this.$emit("remove", id);
    }
  }
};
</script>