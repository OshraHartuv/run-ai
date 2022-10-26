<template>
  <section class="side-nav full" v-if="compId">
    <div v-if="isOpen" class="modal-wrapper"></div>
    <section @click.stop>
      <div
        class="nav-menu"
        :style="{'transform': isOpen ?'translateX(0%)': 'translateX(-100%)'}"
        v-click-outside="closeNav"
      >
        <a class="close-btn" @click="closeNav">&times;</a>
        <!-- <div> -->
        <a @click="moveToView('emp')">Employees</a>
        <!-- </div> -->
        <!-- <a> -->
        <a @click="moveToView('dep')">Departments</a>
        <!-- </a> -->
      </div>
      <span v-if="!isOpen" class="open-nav" @click="isOpen= true">&#9776;</span>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      compId: null,
      isOpen: false
    };
  },
  methods: {
    closeNav() {
      console.log("close");
      this.isOpen = false;
    },
    moveToView(view) {
      this.closeNav();
      const navTo = `/comp/${this.compId}/${view}`
      if (navTo === this.$router.currentRoute._value.fullPath) return
      this.$router.push( `/comp/${this.compId}/${view}`);
    }
  },
  watch: {
    $route: {
      handler({ params }) {
        const { id } = params;
        if (id) this.compId = id;
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.compId = this.$route.params.id;
  }
};
</script>