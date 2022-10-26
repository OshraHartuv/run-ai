<template>
  <section class="side-nav full">
    <div v-if="isOpen" class="modal-wrapper"></div>
    <section @click.stop>
      <div
        class="nav-menu"
        :style="{'transform': isOpen ?'translateX(0%)': 'translateX(-100%)'}"
        v-click-outside="closeNav"
      >
        <a class="close-btn" @click="closeNav">&times;</a>
        <div v-for="label in labels" :key="label">
          <a @click="moveToLabel(label)">{{label}}</a>
        </div>
        <!-- <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>-->
      </div>
      <span v-if="!isOpen" class="open-nav" @click="isOpen= true">&#9776;</span>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      labels: ["Doll", "Battery Powered", "Baby"],
      isOpen: false
    };
  },
  methods: {
    closeNav() {
      console.log("close");
      this.isOpen = false;
    },
    moveToLabel(label){
      this.$router.push('/toy/'+label)
      this.closeNav()
    }
  }
};
</script>