<template>
  <div class="show-detail">
    <div class="title" id="dom" v-if="detailList.length">
      <my-title :title="'项目详情'"></my-title>
    </div>
    <scroll ref="scroll" class="list" :data="detailList">
      <div class="detail-list">
        <div class="detail-child" v-if="detailList.length" ref="htmlToImg">
          <div :key="item" v-for="item in detailList">
            <div class="slider-wrapper" v-if="item.homePage != null ? true : false">
              <img :src="'http://sofmanager.fangsir007.com/image/' + item.homePage[0]" alt="">
            </div>
            <div class="item-title">
              <div class="item-addr">
                <h3 class="pink">{{item.projectName}} </h3>
              </div>
            </div>
            <div class="item-sell" v-if="item.sellingPoint != null ? (item.sellingPoint.length > 1 ? true : false) : false">
              <div>
                <div class="pro-sell">
                  项目卖点
                </div>
                <div class="item-sell-child" :key="sellItem" v-for="sellItem in item.sellingPoint" v-if="sellItem.length > 3">
                  <span class="sell-l">
                    <i class="icon-star"></i>
                  </span>
                  <span class="sell-r">{{sellItem}}</span>
                </div>
              </div>
            </div>
            <div class="item-sell">
              <div v-if="item.dynamic != null">
                <div class="pro-sell">
                  最新动态
                </div>
                <div class="item-sell-child">
                  <span class="sell-l">
                    <i class="icon-star"></i>
                  </span>
                  <span class="sell-r">{{item.dynamic}}</span>
                </div>
              </div>
            </div>
            <div class="item-info">
              <div class="info-title" ref="infoDesc">
                <div>
                  项目信息
                </div>
              </div>
              <div class="info-desc">
                <h3>楼盘信息</h3>
                <p v-if="item.projectPame != null">楼盘名称：{{item.projectPame}}</p>
                <p v-if="item.unitPrice != null">单价：{{item.unitPrice}}</p>
                <p v-if="item.hux != null">户型：{{item.hux}}</p>
                <p v-if="item.area != null">面积：{{item.area}}</p>
                <p v-if="item.totalPrice != null">总价：{{item.totalPrice}}万起</p>
                <p v-if="item.downPays != null">首付比例：{{item.downPays}}万起</p>
                <p v-if="item.deliveryTime != null">交房时间：{{item.deliveryTime}}</p>
                <p v-if="item.renovation != null">交房标准：{{item.renovation}}</p>
              </div>
              <div class="info-list">
                <span>
                  <img :src="heartImg" alt="">
                </span>
                <div v-if="item.regionalIntroduction != null">
                  <h3>区域介绍</h3>
                  <p :key="index" v-for="(regItem, index) in item.regionalIntroduction">{{regItem}}</p>
                </div>
                <span>
                  <img :src="heartImg" alt="">
                </span>
                <div v-if="item.projectIntroduction != null">
                  <h3>项目介绍</h3>
                  <p :key="index" v-for="(proItem, index) in item.projectIntroduction">{{proItem}}</p>
                </div>
                <span>
                  <img :src="heartImg" alt="">
                </span>
                <div>
                  <h3 v-if="item.supportingFacilities != null ? true : false">配套设施</h3>
                  <p :key="index" class="sup-sty" v-if="item.supportingFacilities != null && item.supportingFacilities.length >= 1" v-for="(supItem, index) in item.supportingFacilities">{{supItem}}</p>
                </div>
              </div>
            </div>
            <div class="item-photo" v-if="item.propertyAlbum != null ? (item.propertyAlbum.length >= 1 ? true : false) : false">
              <div class="photo-title" ref="infophoto">
                <div>
                  楼盘效果图
                </div>
              </div>
              <div class="photo-list" :key="photoItem" v-for="photoItem in item.propertyAlbum">
                <img @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + photoItem" alt="">
              </div>
            </div>
            <div class="item-photo" v-if="item.huxingImg != null ? (item.huxingImg.length >= 1 ? true : false) : false">
              <div class="photo-title" ref="infoHuxing">
                <div>
                  户型图
                </div>
              </div>
              <div class="photo-list" :key="huItem" v-for="huItem in item.huxingImg" v-if="item.huxingImg != null ? true : false">
                <img @load="loadImage"   :src="'http://sofmanager.fangsir007.com/image/' + huItem" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/babel">
  import Scroll from 'base/scroll/scroll'
  import MyTitle from 'base/title/title'
  import TYPE from 'common/js/buryingpointType'
  import { addLog } from 'api/buryingpoint'
  import { getProjectDetail } from 'api/detail'
  import { wechatlib } from '../../config/wxJDK'
  import { getoverdetails } from 'api/overseasList'
  export default {
    data() {
      return {
        exportImg: require('common/image/export.png'),
        isToImg: false,
        detailList: [],
        heartImg: require('common/image/heart_07.png'),
        id: this.$route.query.id,
        isover: this.$route.query.isover
      }
    },
    components: {
      Scroll,
      MyTitle
    },
    created() {
      setTimeout(() => {
        if (this.isover === 'over') {
          addLog(TYPE.OVERSEASEXPORT, '', '', '', window.USERMSG)
        } else {
          addLog(TYPE.PROJECTEXPORTPAGE, '', '', '', window.USERMSG)
        }
      }, 1500)
      // this._getDetail()
      this._isover()
    },
    methods: {
      _isover () {
        if (this.isover === 'over') {
          this._getoverdetails()
        } else {
          this._getDetail()
        }
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
        }
        this.$refs.scroll.refresh()
      },
      _getDetail() {
        getProjectDetail(this.id).then(res => {
          if (res.data.code !== 0) {
            this.text = '正在整理此项目数据'
            this.$refs.confirm.show()
            return
          }
          if (res.status === 200) {
            this.sliderImg = res.data.data.homePage
            this.phone = res.data.data.phone
            this.title = res.data.data.projectName
            document.title = this.title
            this.homeImgUrl = 'http://sofmanager.fangsir007.com/image/' + res.data.data.homePage[0]
            this.detailList.push(res.data.data)
            this._wxconfig()
          }
        })
      },
      _getoverdetails () {
        getoverdetails(this.id).then(res => {
          if (res.data.code !== 0) {
            this.text = '正在整理此项目数据'
            this.$refs.confirm.show()
            return
          }
          if (res.data.data) {
            this.sliderImg = res.data.data.homePage
            this.phone = res.data.data.phone
            this.title = res.data.data.projectName
            document.title = this.title
            this.homeImgUrl = 'http://sofmanager.fangsir007.com/image/' + res.data.data.homePage[0]
            this.detailList.push(res.data.data)
            this._wxconfig()
          }
        })
      },
      async _wxconfig () {
        const link = window.location.href
        const district = this.detailList[0].district ? this.detailList[0].district : ''
        const totalPrice = this.detailList[0].totalPrice ? this.detailList[0].totalPrice : ''
        const area = this.detailList[0].area ? this.detailList[0].area : ''
        const desc = `${this.title}位于${district}，总价 ${totalPrice} 万起，主力面积：${area}`
        var metaEl = document.getElementsByTagName('meta')
        var metaItems = [...metaEl]
        metaItems.filter((item, index) => {
          if (item.getAttribute('itemprop') === 'description') {
            item.content = desc
          }
          if (item.getAttribute('itemprop') === 'name') {
            item.content = this.title
          }
          if (item.getAttribute('itemprop') === 'image') {
            item.content = this.homeImgUrl
          }
        })
        let uri = location.href.split('#')[0]
        uri = encodeURIComponent(uri)
        await wechatlib(this, uri)
        const self = this
        self.wx.ready(function() {
          self.wx.onMenuShareTimeline({
            title: self.title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: self.homeImgUrl, // 分享图标
            success: function (res) {
              console.dir('success', res)
              addLog(TYPE.PROJECTEXPORTPAGE, '', TYPE.PROJECTTOFRIEND, '', window.USERMSG).then(res => {
                console.log(res)
              })
            },
            cancel: function (res) {
              (TYPE.PROJECTEXPORTPAGE, '', TYPE.PROJECTTOFRIENDBAD, '', window.USERMSG).then(res => {
                console.log(res)
              })
            }
          })
        })
        self.wx.onMenuShareAppMessage({
          title: self.title, // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: self.homeImgUrl, // 分享图标
          success: function (res) {
            console.dir('success', res)
            addLog(TYPE.PROJECTEXPORTPAGE, '', TYPE.PROJECTTOCIRCLEOFFRIENDS, '', window.USERMSG).then(res => {
              console.log(res)
            })
          },
          cancel: function (res) {
            addLog(TYPE.PROJECTEXPORTPAGE, '', TYPE.PROJECTTOCIRCLEOFFRIENDSBAD, '', window.USERMSG).then(res => {
              console.log(res)
            })
          }
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
    z-index: 888
    background: #eee
    font-size: $font-size-medium
    img
      width: 100%
    .title
      position: fixed
      z-index: 999
      width: 100%
      text-align: center
      line-height: 40px
      font-size: $font-size-large-x
      color: white
      background: rgba(0, 0, 0, 0.5)
      top: 0
      .export-img
        position: absolute
        z-index: 1001
        top: 8px
        right: 16px
        img
          width: 24px
    .list
      position: fixed
      top: 0
      bottom: 55px
      width: 100%
      padding-top: 50px
      .detail-list
        background: #eee
        .detail-child
          background: #eee
          img
            height: 100%
            width: 100%
      .slider-wrapper
        position: relative
        width: 100%
        height: 200px
        img
          width: 100%
          height: 200px
      .item-title
        position: relative
        width: 100%
        margin: 0 auto
        height: 30px
      .item-addr
        position: absolute
        top: -30px
        left: 6%
        width: 80%
        padding-top: 20px
        overflow: hidden
        border-radius: 10px
        background: white
        text-align: center
        overflow: hidden
        padding: 4%
        span
          line-height: 20px
        .pink
          font-size: $font-size-large-x
          line-height: 30px
          color: #333
          font-weight: 700
    .item-motto
      padding: 0 10px
      background: white
      color: #e57b00
      line-height: 17px
    .item-desc
      padding: 0 10px
      margin: 10px 0
      p
        line-height: 22px
        text-indent: 2em
    .item-sell
      padding: 20px 10px
      background: white
      margin-top: 10px
      >div
        border-left: none
        padding: 10px 10px 20px 0
        .pro-sell
          color: #ff5f00
          display: inline-block
          position: relative
          top: -15px
          border-left: 4px solid  #ff5f00
          padding-left: 20px
          height: $font-size-large
          font-size: $font-size-large
        .item-sell-child
          display: flex
          .sell-l
            padding-top: 2px
            width: 15px
            line-height: 28px
            color: #e57b00
          .sell-r
            line-height: 30px
            color: #036ed9
            padding-left: 10px
    .item-info
      padding: 20px 10px
      background: white
      margin-top: 10px
      .info-title
        color: #fe4b42
        height: 30px
        font-size: $font-size-large
        border-bottom 1px solid #ccc
        >div
          display: inline-block
          height: 29px
          padding: 0 10px
          border-bottom: 2px solid #fe4b42
      .info-desc
        padding-left 10px
        margin-top: 10px
        h3
          text-align: center
          font-size: $font-size-medium-x
          line-height: 40px
        p
          line-height: 30px
      .info-clcik
        width: 180px
        text-align: center
        margin: 0 auto
        margin-top: 10px
        padding: 10px
        background: #f0664c
        border-radius: 5px
        span
          color: #fff
          padding: 10px
          img
            width: $font-size-medium-x
      .info-list
        span
          display: inline-block
          padding: 10px 0
        div
          border-left: 1px solid black
          padding-left: 10px
          h3
            color: #666
            font-size: $font-size-medium-x
            line-height: 60px
          p
            font-size: $font-size-medium
            line-height: 20px
            text-indent: 2em
          span
            padding: 10px
            color: #044cd1
          .sup-sty
            text-indent: 0
    .item-photo
      padding: 20px 10px
      background: white
      margin-top: 10px
      .hide-span
        display: inline-block
        color: #044cd1
        padding: 15px
      .photo-title
        color: #fe4b42
        height: 30px
        font-size: $font-size-large
        border-bottom 1px solid #ccc
        >div
          display: inline-block
          height: 29px
          padding: 0 10px
          border-bottom: 2px solid #fe4b42
      .info-clcik
        width: 153px
        margin: 0 auto
        margin-top: 10px
        padding: 10px
        background: #f0664c
        border-radius: 5px
        span
          color: #fff
          padding: 10px
          img
            width: $font-size-medium-x
      .photo-list
        padding: 10px 0 0 0
        width: 100%
        height: 100%
        span
          color: #fff
          padding: 10px
        img
          width: 100%
  .button-phone
    width: 100%
    background: white
    border-top: 1px solid #ccc
    position: fixed
    bottom: 0
    display: flex
    padding: 10px
    margin-left: -10px
    justify-content: space-around
    .btn
      display: inline-block
      line-height: 34px
      text-decoration: none
      text-align: center
      border-radius: 4px
      border: none
      color: white
      width: 45%
      font-size: $font-size-medium-x
      padding: 1px
      span
        display: inline-block
        font-size: $font-size-medium-x
        i
          font-size: $font-size-medium
    .btn-danger
      background: #0077ec
    .btn-success
      background: #ff4e00
  .toimgpromtp
    position: fixed
    width: 100%
    height: 100%
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0, 0, 0, .7)
    padding-top: 50%
    z-index: 999999999
    p
      text-align: center
      color: rgba(255, 255, 255, .7)
      font-size: 15px
  .detail-enter-active, .detail-leave-active
    transition: all 0.3s
  .detail-enter, .detail-leave-to
    transform: translate3d(100%, 0, 0)
</style>
