<template>
   <div>
    <my-title :title="'平台消息'"></my-title>
    <div class="gladwallimag">
      <!-- <img class="titleImg" src="./title.png" alt=""> -->
      <!-- <img class="noteImg" src="./note.png" alt=""> -->
      <img class="bgImg" :src="'http://sofimage.richest007.com/' + backimg" alt="">
      <carousel-3d v-if="flag" ref="carousel" :autoplay="autoplay" :height="'480'" :space="space" :inverseScaling=30>
        <slide v-for="(item, i) in wallpaper" :index="i" :key="i">
          <img class="slideImage" :src="item.src" @click="onSlideClick(i)" :alt="item.src">
        </slide>
      </carousel-3d>
    </div>
   </div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
import { getWallPaper } from 'api/gladTidingsWall'
import MyTitle from 'base/title/title'
const baseUrl = ''
export default {
  data() {
    return {
      wallpaper: [],
      autoplay: false,
      space: 200,
      flag: false,
      backimg: ''
    }
  },
  components: {
    Carousel3d,
    Slide,
    MyTitle
  },
  mounted() {
    getWallPaper(this.$route.query.id).then(res => {
      let data = res.data.data.content.split('|')
      for (let i = 0; i < data.length; i++) {
        this.wallpaper.push({
          src: baseUrl + data[i],
          flag: true
        })
      }
      this.backimg = baseUrl + res.data.data.backimg
      this.flag = true
    })
  },
  methods: {
    onSlideClick(index) {
      let currentIndex = this.$refs.carousel.currentIndex
      if (index === currentIndex) {
        console.log(this.wallpaper[index])
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.carousel-3d-slide {
  width 76% !important
  height 100% !important
  left 12%
}

.gladwallimag {
  font-size 0
  text-align center
  .bgImg {
    width 100%
  }
  .carousel-3d-container {
    position absolute
    top 43%
  }
}

.slideImage {
  height 100%
}
</style>
