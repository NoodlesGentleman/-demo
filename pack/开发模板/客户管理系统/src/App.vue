<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.ivu-spin-fix {
  position: fixed;
  top: 50px;
  left: 150px;
  width: calc(100% - 170px);
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
  -webkit-text-fill-color: #495060 !important;
}
#app {
  width: 100vw;
  height: 100vh;
  font-family: 'Microsoft YaHei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
