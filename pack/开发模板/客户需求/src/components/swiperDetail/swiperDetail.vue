<template>
  <div class="swiper-detail">
    <div class="title">
      <my-title :title="'平台消息'"></my-title>
    </div>
    <div v-html="html" id="img">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getrotation } from 'api/swiperDetail'
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
// import { countNum } from 'api/bannerDetail'
// import TYPE from 'common/js/buryingpointType'
// import { addLog } from 'api/buryingpoint'
export default {
  components: {
    MyTitle,
    Scroll
  },
  data() {
    return {
      html: ''
    }
  },
  created() {
    getrotation(this.$route.query.id).then(res => {
      this.html = res.data.data.content
    })
    // const self = this
    // setTimeout(function() {
    //   if (parseInt(self.$route.query.type) === 1) {
    //     addLog(TYPE.SWIPERDETAIL1, '', '', '', window.USERMSG)
    //   }
    //   if (parseInt(self.$route.query.type) === 2) {
    //     addLog(TYPE.SWIPERDETAIL2, '', '', '', window.USERMSG)
    //   }
    // }, 1500)
    // this._countNum()
  },
  // updated() {},
  methods: {
    // _countNum() {
    //   countNum().then(res => {})
    // }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.swiper-detail {
  padding-top: 50px;
  width: 100%;
  background: #eee;
  font-size: $font-size-medium;
}
</style>
