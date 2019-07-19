<template>
  <transition name="detail">
    <div class="show-detail">
          <div class="title">
            <my-title :title="'项目详情'"></my-title>
            <div class="title-list">
              <ul>
                <li>日期</li>
                <li>单元号</li>
                <li>总价</li>
                <li>单价</li>
              </ul>
            </div>
          </div>
          <div>
            <div>
              <scroll-to @scrollToTop="scrollToTop" :num="num"></scroll-to>
            </div>
          </div>
          <scroll 
              ref="scroll" 
              :beforeScroll="true" 
              @beforeScroll="beforeScroll"
              :listenScroll="true"
              @scroll="scrollStart"
              :pullup="pullup" 
              class="list" 
              :data="detailList">
            <div class="detail-list">
              <div>
                <div class="list-child" v-for="item in detailList">
                  <ul>
                    <li>{{item.cdate}}</li>
                    <li>{{item.addr}}</li>
                    <li>{{item.total_price}}</li>
                    <li>{{item.price}}</li>
                  </ul>
                </div>
              </div>
              <loading v-show="hasMore" title=""></loading>
              <div v-show="!hasMore" class="no-result-wrapper">
                <p>{{noResultWrapper}}</p>
              </div> 
            </div>
          </scroll>
          <div>
           <confirm ref="confirm" @confirm="confirmClear" @cancel="confirmClear" :text="text" :confirmBtnText="confirmBtnText"></confirm>
          </div>
    </div>
  </transition>
</template>
<script>
  import Scroll from 'base/scroll/scroll'
  import confirm from 'base/confirm/confirm'
  import Loading from 'base/loading/loading'
  import MyTitle from 'base/title/title'
  import ScrollTo from 'base/scroll-to/scroll-to'
  import { getProjectDetail } from 'api/houseDetail'
  export default {
    data() {
      return {
        pullup: true,
        detailList: [],
        project: this.$route.query.id,
        textarea: '',
        text: '',
        confirmBtnText: '确定',
        num: 0,
        hasMore: true,
        noResultWrapper: ''
      }
    },
    components: {
      Scroll,
      confirm,
      Loading,
      MyTitle,
      ScrollTo
    },
    created() {
      this._getDetail()
    },
    methods: {
      confirmClear() {
        if (this.text === '正在整理此项目数据') {
          this.$router.back()
        }
      },
      beforeScroll() {
        if (this.$refs.textareas) {
          this.$refs.textareas.blur()
        }
      },
      scrollToTop () {
        this.$refs.scroll.scrollTo(0, 0, 600)
      },
      scrollStart(pos) {
        const y = Math.abs(Math.floor(pos.y))
        this.num = y / 10000
        if (this.num > 0.7) {
          this.num = 0.7
        }
      },
      _getDetail() {
        getProjectDetail(this.project).then(res => {
          if (!!res.data.code || res.data.code && res.data.code === 1) {
            this.hasMore = false
            this.noResultWrapper = '没有更多了'
            return
          }
          if (res.data.code !== 0) {
            this.text = '正在整理此项目数据'
            this.$refs.confirm.show()
            return
          }
          if (res.data.data) {
            const data = res.data.data
            this.detailList = data
          }
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .show-detail
    position: fixed
    width: 100%
    bottom: 0
    height: 100%
    z-index: 10000
    background: #eee
    font-size: $font-size-medium
    .title
      position: fixed
      z-index: 10002
      width: 100%
      text-align: center
      line-height: 40px
      font-size: $font-size-large-x
      color: white
      background: #eee
      top: 0
      .title-list
        margin: 10px 10px 0
        ul
          border-radius: 4px 4px 0 0
          display: flex
          background: #e3e2e2
          li
            box-sizing: border-box
            border-left: 1px solid white
            border-right: 1px solid #e3e2e2
            width: 25%
            font-size: $font-size-medium-x
            color: #f58246
            line-height: 50px
            &:first-child
              border-left: none
    .list
      position: fixed
      top: 20px
      bottom: 90px
      width: 100%
      padding-top: 90px
      .list-child
        margin: 0 10px
        box-sizing: border-box      
        background: #fff
        ul
          display: flex
          li
            text-align: center
            line-height: 20px
            padding: 2px
            box-sizing: border-box
            border: 1px solid #ccc
            border-top: none
            border-right: none
            width: 25%
            color: #818181
            font-size: $font-size-small
            &:last-child
              border-right: 1px solid #ccc
      .no-result-wrapper
        text-align: center
        z-index: 800
        p
          line-height: 30px
          
  .detail-enter-active, .detail-leave-active
    transition: all 0.3s
  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)             
</style>
