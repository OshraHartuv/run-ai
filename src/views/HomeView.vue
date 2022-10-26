<template>
  <section class="home full">
    <div class="wrapper">
      <div>
      <h3>Welcome!</h3>
      <button class="add-btn btn" @click="moveToComp">Get started</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods:{
    moveToComp(){
      this.$router.push( `/comp/${this.$store.getters.comps[0]._id}/emp`)
    }
  }
}
</script>
