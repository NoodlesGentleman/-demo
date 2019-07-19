<template>
  <transition name="detail">
   <div class="banner-detail">
     <div class="title">
        <my-title :title="'买房贷款'"></my-title>
      </div>
      <scroll
        ref="scroll"
        class="scroll"
        >
          <div>
            <div class="detail-content">
              <img :src="banner" @load="loadImage" alt="">
            </div>
             <div class="detail-content">
              <img :src="content1" @load="loadImage" alt="">
            </div>
            <div class="detail-content">
              <img :src="content2" @load="loadImage" alt="">
            </div>
            <div class="detail-content">
              <a  href="javascript:;" @touchstart="callPhone"><img @load="loadImage" :src="content3" alt=""></a>
            </div>
          </div>
      </scroll>
   </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MyTitle from 'base/title/title'
  import Scroll from 'base/scroll/scroll'
  import { countNum } from 'api/bannerDetail'
  export default {
    components: {
      MyTitle,
      Scroll
    },
    data () {
      return {
        banner: require('common/image/dk_banner.jpg'),
        content1: require('common/image/title_1.jpg'),
        content2: require('common/image/title_2.jpg'),
        content3: require('common/image/title_3.jpg')
      }
    },
    created () {
      this._countNum()
    },
    methods: {
      showProject () {
        this.$emit('showProject')
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
        }
        this.$refs.scroll.refresh()
      },
      callPhone () {
        window.location.href = 'tel: 021-6298-5128'
      },
      _countNum () {
        countNum().then(res => {})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .banner-detail
    position: fixed
    width: 100%
    top: 0px
    bottom: 0
    z-index: 10000
    background: #eee
    font-size: $font-size-medium
    .scroll
      position: fixed
      top: 50px
      bottom: 0
      width: 100%
      overflow: hidden
      .detail-content
        width: 100%
        height: 100%
        img
          width: 100%
          height: 100%
          vertical-align: text-top
  .detail-enter-active, .detail-leave-active
    transition: all 0.3s
  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)
</style>
