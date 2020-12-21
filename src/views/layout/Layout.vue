<template>
  <div class="app-wrapper" :class="classObj">
<!--    <sidebar class="sidebar-container"></sidebar>-->
    <div class="main-container">
<!--      <navbar></navbar>-->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
// import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    // Navbar,
    // Sidebar,
    AppMain
  },
  // mixins: [ResizeMixin],
  computed: {
    // sidebar() {
    //   return null
    // },
    // device() {
    //   return null
    // },
    classObj() {
      return {
        hideSidebar: false,
        withoutAnimation: false,
        mobile: false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
