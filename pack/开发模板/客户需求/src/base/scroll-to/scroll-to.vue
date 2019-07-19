<template>
  <div class="scroll-to">
      <div class="scroll-to-top" ref="scrollToTop" @click="scrollToTop">
        <i class="icon-scrollTop"></i>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      num: {
        type: Number,
        default: 0
      }
    },
    created () {},
    watch: {
      num (newVal) {
        if (newVal < 0.15) {
          if (this.$refs.scrollToTop.style.display !== 'none') {
            this.$refs.scrollToTop.style.display = 'none'
          }
        } else {
          if (this.$refs.scrollToTop.style.display !== 'block') {
            this.$refs.scrollToTop.style.display = 'block'
          }
        }
        this.$refs.scrollToTop.childNodes[0].style.color = `rgba(0, 0, 0, ${newVal})`
      }
    },
    mounted () {},
    methods: {
      scrollToTop() {
        this.$emit('scrollToTop')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.scroll-to
  .scroll-to-top
    z-index: 9999
    position: fixed
    bottom: 20px
    right: 50px
    font-size: 40px
    display: none
    i
      color: rgba(0, 0, 0, 0)
</style>