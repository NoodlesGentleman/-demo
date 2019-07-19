<template>
  <div id="layout">
    <navbar/>
    <sidebar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="stylus" scoped>
#layout {
  width: 100%;
  height: 100%;
  min-width: 1100px;
  background: #FFF;

  .container {
    width: calc(100% - 170px);
    height: 90%;
    overflow-y: auto;
    background: #f8f8f8;
    border-radius: 6px;
    margin-top: 10px;
    position: absolute;
    right: 10px;
  }
}
</style>
