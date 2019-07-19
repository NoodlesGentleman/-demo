<template>
  <div>
   <div class="banner-img">
      <div class="img-list">
          <router-link to="/bannerDetail">
            <img :src="active2" alt="">
          </router-link>
      </div>
   </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        active2: require('common/image/active_03.jpg')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .banner-img
    display: flex
    margin-top: 5px
    .img-list
      width: 100%
      img
        width: 100%
        height: 100%
</style>