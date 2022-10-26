<template>
  <div class="modal-wrapper">
    <section class="delete-modal wrapped-modal" v-click-outside="closeModal">
      <h3>Are you sure you want to delete '{{name}}' department?</h3>
      <div class="actions">
        <button class="confirm-btn btn" @click="$emit('confirm')">Confirm</button>
        <button class="cancel-btn btn" @click="closeModal">Cancel</button>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  props: { name: { type: String } },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  },
  created() {
    console.log("name", this.name);
  }
};
</script>