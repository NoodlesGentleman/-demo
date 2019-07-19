<template>
  <div id="bgcolor">
    <div id="bgimg">
        <div class="headerimg"></div>
        <div class="war-wrape">
            <div class="flower"></div>
            <div class="luckword"></div>   
            <div class="money-big"></div>
            <div class="money-samll"></div>
        </div>
        <div class="prize-list">
            <div class="commonlist mywarlist1"></div>
            <table text-align="center">
                <tr class="tit">
                    <th>分类</th>
                    <th>奖品数量</th>
                    <th>待领取</th>
                </tr>
                <tr :key="i" v-for="(data,i) in mywarNewspaper">
                     <td>{{data.prizeName}}</td>
                     <td>{{data.count}}</td>
                     <td>{{data.unCount}}</td>
                </tr>
            </table>
            <div class="commonlist mywarlist1 mywarlist2"></div>
            <table text-align="center">
                <tr class="tit">
                    <th>时间</th>
                    <th>奖品</th>
                    <th>兑换/领取与否</th>
                </tr>
                <tr :key="index" v-for="(item,index) in defaultOrder[0]">
                     <td>{{item.createTime}}</td>
                     <td>{{item.prizeName}}</td>
                     <td>{{item.get_code}}</td>
                </tr>
            </table>
            <div class="lookmore">
                <input type="button" v-if="flag" @click='lookmore' value="查看更多"/>
            </div>
            <Loading v-if="btnShow"/>
        </div>
    </div>
  </div>
</template>
<script>
import Loading from '@/base/loading/loading'
import { getmywarNewspaper, getmyorder } from '@/api/warprize'
export default {
  data() {
    return {
      mywarNewspaper: [], // 战报数据
      myorder: [], // 订单数据
      btnShow: false, // loading 是否显示
      flag: false, // ‘更多’按钮是否显示
      defaultOrder: []
    }
  },
  components: {
    Loading
  },
  mounted() {
    document.getElementsByTagName('html')[0].style.background = '#e8453d' // 设置背景颜色，防止战报长度过长出现灰度
    getmywarNewspaper().then(res => {
      // 获取后台的战报数据
      this.mywarNewspaper = res.data.data
    })
    getmyorder().then(res => {
      // 获取后台的我的清单数据
      this.myorder = res.data.data
      console.log(this.myorder)
      if (this.myorder.length <= 5) {
        this.defaultOrder.push(this.myorder)
        console.log(this.defaultOrder[0])
      } else {
        this.flag = true
        this.defaultOrder.push(this.myorder.slice(0, 5))
      }
    })
  },
  methods: {
    lookmore() {
      this.btnShow = true
      this.flag = false
      getmyorder().then(res => {
        this.defaultOrder = []
        this.defaultOrder.push(this.myorder)
        this.btnShow = false
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
#bgimg
  background #e8453d
  height 100vh
  .war-wrape
    width 100%
    height 100%
    margin 0 auto
    position absolute
  .headerimg
    position absolute
    width 100%
    height 5%
    background url('../../common/image/warprize/yuan.png') repeat-x
    background-size contain
    margin 0 auto
  .war-wrape
    width 100%
    padding 0 10%
    box-sizing border-box
  .flower
    position absolute
    height 50px
    width 83%
    background url('../../common/image/warprize/suipian.png') no-repeat
    background-size contain
    margin 0 10px
    z-index 5
    margin 0 auto
    margin-top 5%
  .luckword
    position absolute
    height 17%
    width 93%
    background url('../../common/image/warprize/headerword.png') no-repeat
    top 5%
    background-size contain
    z-index 8
    margin 0 -5%
  .money-big
    position absolute
    width 90px
    height 90px
    background url('../../common/image/warprize/tuceng.png') no-repeat
    background-size contain
    top 18%
    left 0
    z-index 10
  .money-samll
    position absolute
    width 50px
    height 90px
    background url('../../common/image/warprize/qianbi.png') no-repeat
    background-size contain
    top 50%
    right -1%
    z-index 8
  .prize-list
    overflow auto
    position absolute
    width 90%
    background #fff
    top 25%
    left 6%
    border-radius 15px
    margin-bottom 15px
  .mywarlist1
    background url('../../common/image/warprize/mywarlist.png') no-repeat
  .mywarlist2
    background url('../../common/image/warprize/mylist.png') no-repeat
  .commonlist
    width 50%
    height 35px
    margin 30px auto
    background-size contain
  table
    font-size 1em
    width 80%
    height 5%
    border 1px solid #aaa
    border-radius 5%
    margin 0 auto
    margin-bottom 10px
    text-align center
  table tr td
    color gray
  th, td
    padding 5% 0
    box-sizing border-box
    width 100px
    height 10px
    border 1px solid #aaa
    font-size 0.8em
  th
    font-weight bold
  .tit
    font-family '宋体'
    font-size 16px
    color #e8453d
  .lookmore
    margin 0 auto
    text-align center
    width 100px
    height 35px
    font-size 1em
    background #fff
    margin-bottom 10px
  .lookmore input
    background-color #fff
    border none
    color #808080
    padding 5px 20px
    text-align center
    text-decoration none
    display inline-block
    font-size 14px
    margin 4px 2px
    cursor pointer
    // box-shadow 1px 4px #999
  // .lookmore input:active
  //   background-color #909090 
  //   box-shadow 0 5px #666
  //   transform translateY(3px)
</style>
