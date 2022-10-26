<template>
  <section>
    <raw>{{comp}}</raw>
  </section>
</template>

<script>
export default {

  computed: {
    comp(){
      return this.$store.getters.currComp
    }
  }
};
</script>