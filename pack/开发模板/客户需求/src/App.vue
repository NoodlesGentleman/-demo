<template>
  <div id="app">
    <!-- <div id="huijin" class="animated" v-if="($route.path === '/' || $route.path === '/detail') && huijinshow">
      <router-link to="/huijin">
        <img src="./common/image/huijin.gif" alt="">
      </router-link>
      <div class="time">将在 {{time}} 秒后自动消失</div>
      <div class="close">
        <img src="./common/image/close.svg" alt="">
      </div>
    </div>
    <div id="huijinxt" class="animated" v-if="($route.path === '/' || $route.path === '/detail') && huijinshow">
      <router-link to="/huijin">
        <img src="./common/image/huijinxt.png" alt="">
      </router-link>
    </div> -->
    <!-- <router-link to="/bigWheel" v-show="($route.path === '/recommendList' || $route.path === '/detail') && dazhuanpanshow">
      <div class="zhuanpanrukou">
        <img src="./common/image/zhuanpan.gif" alt="">
      </div>
    </router-link> -->
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </transition>
  </div>
</template>

<script>
import { isShowTurntable } from 'api/warprize'
// import { isShowAdvertising } from 'api/huijin'
export default {
  name: 'app',
  data: () => ({
    time: 5,
    huijinshow: true,
    dazhuanpanshow: false
  }),
  mounted() {
    // 是否显示大转盘广告图标
    isShowTurntable().then(res => {
      if (res.data.code === 0) {
        this.dazhuanpanshow = true
      }
    })
    // isShowAdvertising({pageNo: 'P003'}).then(res => {
    //   console.log(res)
    // })
    // let huijin = document.getElementById('huijin')
    // let huijinxt = document.getElementById('huijinxt')
    // let closeBtn = document.getElementsByClassName('close')[0]
    // let timer = setTimeout(() => {
    //   animated(huijin, huijinxt)
    // }, 5000)
    // let count = setInterval(() => {
    //   this.time--
    //   if (this.time === 1) {
    //     clearInterval(count)
    //   }
    // }, 1000)
    // function close(btn) {
    //   btn.onclick = function() {
    //     clearTimeout(timer)
    //     animated(huijin, huijinxt)
    //   }
    // }
    // close(closeBtn)
    // // 动画效果
    // function animated(dom1, dom2) {
    //   dom1.classList.add('zoomOut')
    //   setTimeout(() => {
    //     dom1.style.zIndex = -1
    //     dom2.style.display = 'block'
    //     dom2.classList.add('slideInLeft')
    //     setTimeout(() => {
    //       dom2.classList.remove('slideInLeft')
    //       dom2.classList.add('tada')
    //     }, 500)
    //   }, 500)
    // }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.weui-actionsheet__action {
  padding: 10px;
}

#huijin {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 99999;

  img {
    width: 100%;
    height: 70%;
  }

  .close {
    text-align: center;
    margin-top: 2rem;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .time {
    font-size: 1rem;
    color: #eaeaea;
    text-align: center;
  }
}

#huijinxt {
  display: none;
  width: 85px;
  height: 85px;
  position: fixed;
  z-index: 99999;
  top: 280px;
  right: 0rem;

  img {
    width: 100%;
  }
}
</style>
