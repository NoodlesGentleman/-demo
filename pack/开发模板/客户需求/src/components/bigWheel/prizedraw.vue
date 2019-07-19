<template>
  <div>
    <div id="bgimg">
      <img id="background" src="../../common/image/bigwheel/backgroud.jpg" alt="" @click.prevent>
    </div>
    <luckwheeldraw v-if='flag' :prizeList='prize_list' :code='code' :imgarr='imgarr' @prizeresult='prizeResult' @nochance='noChance' @unregister='unRegister' @restchance='getRestChance' @sendlogId='getSendlogId' @notbeginning="notBeginning"></luckwheeldraw>
    <p class="loading" v-else>{{loadingMsg}}</p>
    <wheelalert v-if='isShowResult' :showAlertImg='showAlertImg' :isActivityEnd="isActivityEnd" @close='closeAlert'></wheelalert>
    <p class="message">{{msg}}</p>
    <p class="rules">
      1.活动仅限【房先生全民经纪人】注册用户参与。<br>
      2.现金红包即时发放，中奖后请及时领取。<br>
      3.带看奖券自抽取之日起有效期为90天，产生带看平台确认后，奖券即可兑现。<br>
      4.奖券以抽中的先后顺序进行兑换,带看奖券每日仅限兑换一次.<br>
      5.每日活动时间：2:00-24:00。
    </p>
      <div id="btn" @click="toWarprize"><img src="../../common/image/warBtn.png" alt=""></div>
  </div>
</template>
<script>
import luckwheeldraw from '@/base/myroll/luckwheeldraw'
import wheelalert from '@/base/myroll/wheelalert'
import { getPrizeList, setTurnplateId } from '@/api/prizedraw'
export default {
  data() {
    return {
      /**
       * 奖品列表
       * prizeAmount:奖品价值 (单位：分)
       * prizeType:奖品类型(0:未中奖，1:现金红包，2:带看奖券)
       * turnplateId:奖品ID
       */
      prize_list: [], // 存放奖品数据
      flag: false, // 显示转盘的标志位 接口返回数据之后为true显示
      // 奖品对应的图片
      imgarr: [], // 存放 奖品图片数组
      isShowResult: false, // 是否显示弹出框
      isActivityEnd: false, // 活动结束
      showAlertImg: '', // 提示图的路径
      turnplateId: -1, // 奖品ID
      closeFlag: 0,
      loadingMsg: '加载中...',
      msg: '请稍等...',
      resultObj: {},
      prizelogId: 0,
      code: -1
    }
  },
  mounted() {
    getPrizeList().then( // 奖品数据请求
      res => {
        const data = res.data.data.tumplateDatas
        const code = res.data.code
        if (data) {
          this.flag = true
          this.msg = res.data.msg
          this.prize_list = data
          this.code = code
          for (let i = 0; i < data.length; i++) {
            this.imgarr.push(data[i].imgSrc)
          }
          if (code === 1) { // 活动结束
            this.isShowResult = true
            this.isActivityEnd = true
            this.showAlertImg = require('../../common/image/bigwheel/activityend.png')
          }
        } else {
          this.loadingMsg = '数据错误，请稍等~'
        }
      },
      err => {
        this.loadingMsg = '网络错误，请稍等~'
        console.log('error:' + err.message)
      }
    )
  },
  components: {
    luckwheeldraw,
    wheelalert
  },
  methods: {
    notBeginning () {  // 0:00-2:00 活动不开放弹出提示框
      this.isShowResult = true
      this.showAlertImg = require('./../../common/image/bigwheel/notopen.png')
      this.closeFlag = 3
    },
    toWarprize() { // 查看战报
      this.$router.push('/warprize')
    },
    prizeResult(index) { // 显示中奖的信息
      this.resultObj = this.prize_list[index]
      this.resultObj.prizelogId = this.prizelogId
      console.log(this.resultObj, 1)
      console.log(this.resultObj.prizelogId, 2)
      this.isShowResult = true
      this.showAlertImg = this.resultObj.dialogSrc
      this.turnplateId = this.resultObj.turnplateId
    },
    noChance(msg) { // 没有机会显示提示弹出框
      this.msg = msg
      this.isShowResult = true
      this.showAlertImg = require('../../common/image/bigwheel/nochance.png')
      this.closeFlag = 1
    },
    unRegister(msg) { // 未注册
      this.msg = msg
      this.isShowResult = true
      this.showAlertImg = require('../../common/image/bigwheel/unregister.png')
      this.closeFlag = 2
    },
    getSendlogId(id) {
      this.prizelogId = id  // 后台传过来的prizelogId放入obj中，再传回给后台
    },
    closeAlert() {
      // 抽奖次数为0的时候再点击抽奖按钮就不调用接口了
      if (this.closeFlag === 0) {
        setTurnplateId(this.resultObj).then(  // 发送中奖数据给后台
          res => {
          },
          err => {
            console.log('error:' + err.message)
          }
        )
      } else if (this.closeFlag === 2) {
        // 未注册 跳转
        window.location.href = 'http://sofmanager.fangsir007.com/registration'
      }
      this.isShowResult = false
    },
    getRestChance(msg) {
      this.msg = msg
    }
  }
}
</script>
<style lang="stylus" scoped>
body, html
  background #f5d584
#background
  width 100%
  z-index 0
#btn
  position absolute
  width 80px
  height 80px
  right 0.3rem
  top 18%
  img
    width 75px
    height 75px
p.message
  position absolute
  top 56.3%
  width 70%
  left 15%
  color #f1e560
  font-size 4vw
  text-align center
p.rules
    font-size: 3.6vw;
    width: 70%;
    color: #fff;
    position: absolute;
    top: 69%;
    left: 16%;
    line-height: 20px;
    font-weight: 150;
    height: 18%;
    overflow: auto;
p.loading
  position absolute
  top 36%
  left 50%
  transform translate(-50%, -50%)
  color white
  font-size 18px
button.showResult
  position absolute
  top 88%
  left 35%
  width 100px
  height 20px
  color #f1e560
  border none
  font-size 1em
  outline none
  background #e8453d
</style>
