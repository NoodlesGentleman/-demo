<template>
  <div>
    <div class="title">
      <i class="icon-back" @click.stop="back"></i>
      <h1>{{title}}</h1>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      toUrl: {
        type: String,
        default: ''
      }
    },
    methods: {
      back() {
        if (this.toUrl) {
          window.location.href = '/brokerList'
        } else {
          this.$router.back()
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .title
      position fixed
      top 0
      width 100%
      text-align: center
      height: 50px
      line-height: 50px
      background: rgba(243, 107, 67, .8)
      display: flex
      z-index: 1000;
      i
        width: 50px
        line-height: 50px
        font-size: 20px
        color: white
      h1
        width: 75%
        color: white
        font-size: 20px
</style>