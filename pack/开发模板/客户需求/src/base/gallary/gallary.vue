<template>
  <div class="gllary_container" @click="handleclick">
      <div class="wrapper">
          <img :src="gallarysrc" alt="">
      </div>
  </div>
</template>
<script>
export default {
  props: {
    gallarysrc: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleclick () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.gllary_container{
    display: flex;
    flex-direction: column;
    justify-content:center;
    z-index: 99;
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background: #000;
}
.wrapper{
    background: #fff;
}
.wrapper img{
    width:100%;
}
</style>


