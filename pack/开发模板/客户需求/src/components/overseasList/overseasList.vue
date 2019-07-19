<template>
<div class="recommend">
  <div class="title">
    <my-title :title="'海外房产'"></my-title>
  </div>
  <div class="scroll">
    <scroll
          ref="scroll"
          class="recommend-content"
          @scroll="scrollStart"
          :listenScroll="true"
          :pullup="pullup"
          :beforeScroll="true"
          @beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          :data="projectList">
      <div>
        <recommend-list @projectnewest="projectnewest" @buryingPoint="buryingPoint" :projectList="projectList"></recommend-list>
        <loading v-show="hasMore" title=""></loading>
        <div v-show="!hasMore" class="no-result-wrapper">
          <p>{{noResultWrapper}}</p>
        </div>
      </div>
    </scroll>
  </div>
  <div class="scroll-to-top" ref="scrollToTop" @click="scrollToTop">
    <i class="icon-scrollTop"></i>
  </div>
  <confirm ref="confirm" @cancel="cancel" @confirm="confirmClear" :text="text"></confirm>

</div>
</template>

<script>
import {
  getProjectList
} from 'api/overseasList'
// import { getFirstVisited } from 'api/recommendList'
import MyTitle from 'base/title/title'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import RecommendList from 'base/recommend-list/recommend-list'
import Banner from 'base/banner/banner'
import Confirm from 'base/confirm/confirm'
import TYPE from 'common/js/buryingpointType'
import { addLog } from 'api/buryingpoint'
export default {
  components: {
    Loading,
    Scroll,
    Confirm,
    RecommendList,
    MyTitle,
    Banner
  },
  data() {
    return {
      noResultWrapper: '暂无所需项目,您可在微信给我们留言',
      recommends: [],
      projectList: [],
      active: 3,
      query: '',
      pullup: true,
      hasMore: true,
      mengcengFlag: false,
      mengcengImg: require('common/image/mengcenghome01.jpg'),
      start: 0,
      length: 10,
      province: 'all',
      city: 'all',
      district: 'all',
      type: 'all',
      pricemin: 'all',
      pricemax: 'all',
      projectName: 'all',
      show: true,
      clientTop: 0,
      text: '',
      projectnewestData: {}
    }
  },
  created() {
    // 判断是否是首次访问
    // getFirstVisited('recommentList').then(res => {
    //   if (res.data.data === 0) {
    //     this.mengcengFlag = true
    //   }
    // })
    setTimeout(function() {
      addLog(TYPE.OVERSEASPAGE, '', '', '', window.USERMSG)
    }, 1500)
    this._getProjectList()
  },
  computed: {},
  methods: {
    // 求分销
    projectnewest(data) {
      this.projectnewestData = data
      this.text = '我们会尽快与该项目合作，签定分销协议'
      this.$refs.confirm.show()
    },
    // 点击隐藏蒙层
    hideMengceng() {
      this.mengcengFlag = false
    },
    addLog(id) {
      console.log(id)
      this.buryingPoint()
      // this.$router.push({
      //   path: '/detail',
      //   query: {
      //     id: id
      //   }
      // })
    },
    confirmClear() {
      if (this.text === '我们会尽快与该项目合作，签定分销协议') {
        addLog(
          TYPE.PROJECT,
          '',
          TYPE.HEZUOBTNCONFIRM,
          TYPE.PROJECT,
          window.USERMSG
        )
        // projectnewest(
        //   this.projectnewestData.projectname,
        //   this.projectnewestData.id
        // ).then(res => {
        //   if (res.data.code === 2) {
        //     this.text = '请先注册！'
        //     this.$refs.confirm.show()
        //   }
        // })
      }
      if (this.text === '请先注册！') {
        window.location.href = '/registration'
      }
    },
    cancel() {
      if (this.text === '我们会尽快与该项目合作，签定分销协议') {
        addLog(
          TYPE.PROJECT,
          '',
          TYPE.HEZUOBTNCONCEL,
          TYPE.PROJECT,
          window.USERMSG
        )
      }
    },
    // 埋点
    buryingPoint(flag) {
      if (flag) {
        addLog(
          TYPE.OVERSEASPAGE,
          '',
          TYPE.PROJECTBTN,
          TYPE.BAOBEIPAGE,
          window.USERMSG
        )
      } else {
        addLog(
          TYPE.OVERSEASPAGE,
          '',
          TYPE.OVERSEASIMG,
          TYPE.OVERSEASXPAGE,
          window.USERMSG
        )
      }
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
      }
      this.$refs.scroll.refresh()
    },
    scrollStart(pos) {
      const y = Math.abs(Math.floor(pos.y))
      let num = y / 10000
      if (num < 0.2) {
        if (this.$refs.scrollToTop.style.display !== 'none') {
          this.$refs.scrollToTop.style.display = 'none'
        }
      } else {
        if (this.$refs.scrollToTop.style.display !== 'block') {
          this.$refs.scrollToTop.style.display = 'block'
        }
      }
      if (num > 0.7) {
        num = 0.7
      }
      this.$refs.scrollToTop.childNodes[0].style.color = `rgba(0, 0, 0, ${num})`
    },
    searchMore() {
      this.hasMore = true
      this.start++
      if (this.projectName !== 'all') {
        getProjectList(
          this.start,
          this.length,
          'all',
          'all',
          'all',
          'all',
          'all',
          'all',
          this.projectName
        ).then(res => {
          if (res.data.recordsTotal === 0) {
            this.hasMore = false
            this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
            return
          }
          if (res.data.data.length < 10) {
            this.hasMore = false
            this.noResultWrapper = '没有更多了'
          }
          this.projectList = this.projectList.concat(res.data.data)
        })
        return
      }
      getProjectList(
        this.start,
        this.length,
        this.province,
        this.city,
        this.district,
        this.type,
        this.pricemin,
        this.pricemax,
        'all'
      ).then(res => {
        if (res.data.recordsTotal === 0) {
          this.hasMore = false
          this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
          return
        }
        if (res.data.data.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = this.projectList.concat(res.data.data)
      })
    },
    scrollToTop() {
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
    beforeScroll() {
      if (this.$refs.searchBox) {
        this.$refs.searchBox.blur()
      }
    },
    _getProjectList(projectName) {
      this.projectList = []
      this.hasMore = true
      getProjectList(
        this.start,
        this.length,
        this.province,
        this.city,
        this.district,
        this.type,
        this.pricemin,
        this.pricemax,
        this.projectName
      ).then(res => {
        if (res.data.recordsTotal === 0) {
          this.hasMore = false
          this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
          return
        }
        if (res.data.data.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = res.data.data
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 0px;
  bottom: 0;
  font-size: $font-size-medium;
  background: #eee;
  .title {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 11111111;
  }
  .mengceng-img {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .provincelist {
    position: fixed;
    top: 0;
    width: 100%;
  }

  .search {
    height: 100px;
    padding: 7px 20px;
    background: #ef654f;
    position: fixed;
    top: -50px;
    width: 100%;
    z-index: 999;
    box-sizing: border-box;
    transition: all 0.3s;

    .search-text {
      height: 50px;

      p {
        line-height: 50px;
        color: white;
      }
    }
  }

  .scroll {
    position: fixed;
    width: 100%;
    top: 45px;
    bottom: 0;
    font-size: $font-size-medium;
  }

  .recommend-content {
    height: 100%;

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;

      .slider-img {
        a {
          width: 100%;
        }

        p {
          z-index: 999999;
          height: 40px;
          line-height: 40px;
          background: rgba(0, 0, 0, 0.4);
          position: absolute;
          text-align: center;
          bottom: 30px;
          color: white;
          font-size: 30px;
          transition: all 0.4s;
        }

        img {
          width: 100%;
          height: 200px;
        }
      }
    }

    .type-list {
      display: flex;
      justify-content: space-around;
      background: $color-highlight-background;
      margin: 5px 0 0;

      li {
        height: 42px;
        line-height: 42px;
        width: 32%;
        text-align: center;
        font-size: $font-size-medium-x;
        box-sizing: border-box;
      }

      .active {
        border-bottom: 2px solid #EA8910;
      }
    }

    .no-result-wrapper {
      text-align: center;
      z-index: 800;

      p {
        line-height: 30px;
      }
    }
  }

  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 50px;
    font-size: 40px;
    z-index: 9999;
    display: none;

    i {
      color: rgba(0, 0, 0, 0);
    }
  }

  .to-one-price {
    position: fixed;
    height: 100px;
    width: 30px;
    bottom: 50px;
    left: 0px;
    font-size: 40px;
    z-index: 9999;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .pop-list-child {
    background: white;
    padding: 10px;

    li {
      text-align: center;
      line-height: 30px;
      color: #7b7b7b;
      width: 33%;
      margin-bottom: 20px;
      box-sizing: border-box;
      display: inline-block;
    }

    .select-type-index {
      background: #f9742a;
      color: white;
    }
  }

  .pop-city-list {
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    height: 100%;
    background: white;

    .pop-city-btn {
      height: 50px;
      background: $color-highlight-background;

      a {
        display: inline-block;
        background: #13CE66;
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
      }
    }

    .pop-city-child {
      background: $color-highlight-background;
      padding: 0 2px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      height: 160px;
      overflow: hidden;
      margin: 10px 0;

      .pop-city-height {
        width: 33%;
        box-sizing: border-box;

        .pop-city-scroll {
          top: 0;
          bottom: 0;
          width: 100%;
          height: 160px;
          overflow: hidden;
        }
      }

      li {
        line-height: 35px;
      }
    }

    .cityActive {
      background: #EA8910;
      color: white;
    }
  }

  .show-loading {
    height: 50px;
    background: white;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .scroll-top-show {
    z-index: 9999;
    position: fixed;
    top: 50px;
    width: 100%;
    display: none;
    transition: all 0.3s;

    .type-list {
      display: flex;
      justify-content: space-around;
      background: $color-highlight-background;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;

      li {
        height: 42px;
        line-height: 42px;
        width: 32%;
        text-align: center;
        font-size: $font-size-medium-x;
        box-sizing: border-box;
      }

      .active {
        border-bottom: 2px solid #EA8910;
      }
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.type-list-enter-active, .type-list-leave-active {
  transition: all 0.3s;
}

.type-list-enter, .type-list-leave-to {
  transform: translate3d(100%, 0, 0);
}

@keyframes type-list-clild-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
