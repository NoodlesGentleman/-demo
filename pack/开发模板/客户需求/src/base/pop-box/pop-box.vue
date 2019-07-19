<template>
  <transition name="type-list">
    <div class="show-type-list" ref="showType">
        <scroll :pullup="pullup" class="list" :data="typeList">
          <slot></slot>
        </scroll>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  export default {
    props: {
      pullup: {
        type: Boolean,
        default: true
      },
      showTypeList: {
        type: Boolean,
        default: true
      },
      typeList: {
        type: Array,
        default: []
      },
      posTop: {
        type: Number,
        default: 20
      }
    },
    created() {
      this.touch = {}
    },
    mounted() {
      this.$refs.showType.style.top = this.posTop + 2 + 'px'
    },
    components: {
      Scroll
    },
    methods: {
      isShow() {
        this.$emit('showPopBox', this.showTypeList)
      },
      onShortcutTouchStart(e) {
        let firstTouch = e.touches[0]
        // 获取手指的位置
        this.touch.x1 = firstTouch.pageX
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.x2 = firstTouch.pageX
        if (Math.abs(this.touch.x1 - this.touch.x2) > 100) {
          this.$emit('showPopBox', this.showTypeList)
        }
        this.touch = {}
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .show-type-list
    position: fixed
    bottom: 0
    left: 0
    right: 0
    background: rgba(0, 0, 0, 0.3)
    z-index: 10000
    .list
      position: fixed
      width: 100%
      height: 230px
      overflow: hidden
      top:0
  .type-list-enter-active, .type-list-leave-active
    transition: all 0.3s
  .type-list-enter, .type-list-leave-to
    transform: translate3d(100%, 0, 0)             
</style>
