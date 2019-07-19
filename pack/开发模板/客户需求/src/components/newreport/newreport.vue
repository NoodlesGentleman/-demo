<template>
    <div class="report_container">
        <div class="fixed_img" @click="backtopage">
            <img :src="backto" alt="">
        </div>
        <div class="header">
            <div :class="flag=='1'? 'active' : '' " @click="changebaobei">报备</div>
            <div :class="flag=='2'? 'active' : '' " @click="changedaikan">带看</div>
        </div>
        <div class="baobei_content" v-if="flag=='1'">
            <div class="video">
                <video src="http://sofvideo.richest007.com/video/03964175afe6f32710d445d7102565f4.mp4" :poster="daikanbg" controls="controls" style="width:100%;" muted>

                </video>
            </div>
            <div class="list_tip">
                报备列表中只展示最新的15条记录
            </div>
            <div v-if="baobeilen">
                <div class="baobei_list" v-for="(item,index) in baobeilist">
                    <div class="report_title">
                        <img :src="Shape" alt=""> 报备单号：{{item.reportid}}
                    </div>
                    <div class="list_detail">
                        <ul class="left_detail">
                            <li class="name">{{item.projectName}}</li>
                            <li class="date">{{item.creatTime.substring(0,16)}}</li>
                            <li class="commom">项目对接人
                                <span class="djrname">{{item.name}}</span>
                            </li>
                            <li class="commom">对接人电话
                                <a class="djrphone" :href="'tel:' + item.phone">{{item.phone}}</a>
                            </li>
                            <li class="commom">经&nbsp;&nbsp;&nbsp;纪&nbsp;&nbsp;&nbsp;人
                                <span class="nickname">{{item.username}}</span>
                            </li>
                        </ul>
                        <div class="right_img">
                            <img :src="'http://sofmanager.fangsir007.com/image/' + item.projectImg" style="width:100%;height:100px" alt="">
                        </div>
                    </div>
                </div>
                <div style="text-align:center;margin-top:20px;padding-bottom:20px">
                    已经到底了~\(≧▽≦)/~
                </div>

            </div>
            <div v-else class="n_data">
                暂无数据
            </div>

        </div>
        <div class="daikan_content" v-if="flag=='2'">
            <div class="video">
                <video src="http://sofvideo.richest007.com/video/55528852ca0f06cde0d5ffa4b348e076.mp4" :poster="baobeibg" controls="controls" style="width:100%;" muted>

                </video>
            </div>
            <div class="list_tip">
                带看列表中只展示最新的15条记录
            </div>
            <div v-show="daikanlen">
                <div v-for="(item,index) in daikanlist">
                    <div class="daikan_list">
                        <div class="welcome_title">【{{item.customerName}}】亲临 【{{item.projectName}}】
                        </div>
                        <div class="canguan">
                            <span class="c_left">进行现场参观</span>
                            <span class="daikan_date">{{item.creatTime.substring(0,16)}}</span>
                        </div>
                        <div class="daikan_detail">
                            <div class="daikan_left">
                                <li class="commom_daikan">项目对接人
                                    <span class="djrname">{{item.name}}</span>
                                </li>
                                <li class="commom_daikan">对接人电话
                                    <a class="djrphone" :href="'tel:' + item.phone" @click="add_Log">{{item.phone}}</a>
                                </li>
                                <li class="commom_daikan">经&nbsp;&nbsp;&nbsp;纪&nbsp;&nbsp;&nbsp;人
                                    <span class="nickname">{{item.username}}</span>
                                </li>
                            </div>
                            <div class="daikan_right">
                                <img :src="'http://sofmanager.fangsir007.com/image/' + item.projectImg" style="width:100px;height:75px" alt="">
                            </div>
                        </div>
                    </div>

                </div>
                <div style="text-align:center;margin-top:20px;padding-bottom:20px">
                    已经到底了~\(≧▽≦)/~
                </div>
            </div>

            <div v-if="!daikanlist.length" style="" class="n_data">
                暂无数据
            </div>
        </div>

    </div>
    </div>
</template>
<script>
import { showDetail } from 'api/newreport'
import daikanbg from 'common/image/daikanbg.png'
import baobeibg from 'common/image/baobeibg.png'
import Shape from 'common/image/Shape.png'
import backto from 'common/image/backto.png'
import TYPE from 'common/js/buryingpointType'
import { addLog } from 'api/buryingpoint'
export default {
  data() {
    return {
      daikanbg: daikanbg,
      baobeibg: baobeibg,
      Shape: Shape,
      flag: '1',
      backto: backto,
      baobeilist: [],
      daikanlist: [],
      baobeilen: '',
      daiaknlen: ''
    }
  },
  created() {
    this.showbaobeilist()
    this.showdaikanlist()
  },
  mounted() {
    setTimeout(function() {
      addLog(TYPE.JIEBAOPAGE, '', '', '', window.USERMSG)
    }, 1500)
  },
  beforeDestroy() {},
  methods: {
    add_Log() {
      addLog(TYPE.JIEBAOPAGE, '', TYPE.JIEBAO_CALL_BTN, '', window.USERMSG)
    },
    changebaobei() {
      this.flag = '1'
    },
    changedaikan() {
      this.flag = '2'
      console.log(this.flag)
    },
    backtopage() {
      window.location.href = '/recommendList'
    },
    showbaobeilist() {
      showDetail(0).then(res => {
        console.log(res.data)
        this.baobeilist = res.data.data
        this.baobeilen = res.data.data.length
        console.log(this.baobeilist)
      })
    },
    showdaikanlist() {
      showDetail(1).then(res => {
        console.log(res.data)
        this.daikanlist = res.data.data
        this.daikanlen = res.data.data.length
        console.log(this.daikanlen)
      })
    }
  }
}
</script>
<style scoped>
body {
  background: #ededed;
}
.report_container {
  width: 100%;
  top: 0px;
  bottom: 0;
  font-size: 14px;
  background: #ededed;
  color: #666666;
}
.header {
  height: 50px;
  line-height: 50px;
  display: flex;
  width: 100%;
  background: #fff;
  font-size: 15px;
}
.header > div {
  width: 50%;
  text-align: center;
}
.active {
  color: #fe4b42;
  border-bottom: 1px solid #fe4b42;
}
.baobei_list {
  background: #fff;
  width: 100%;
  margin-bottom: 0.5rem;
}
.report_title {
  font-size: 12px;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #ededed;
  height: 2.2rem;
  line-height: 2.2rem;
  color: #aaaaaa;
}
.report_title > img {
  width: 11px;
  position: relative;
  top: 1px;
}
.list_detail {
  width: 90%;
  margin: 0 auto;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.left_detail {
  width: 100%;
}
.name {
  font-size: 17px;
  color: #333a40;
}
.date {
  font-size: 10px;
  color: #747474;
  margin-bottom: 0.6rem;
  height: 1rem;
  line-height: 1rem;
}
.djrname,
.nickname {
  color: #000;
  font-size: 14px;
  margin-left: 0.5rem;
}
.djrphone {
  color: #1ea7ff;
  font-size: 14px;
  text-decoration: underline;
  margin-left: 0.5rem;
}
.commom {
  color: #747474;
  font-size: 12px;
  height: 1.2rem;
  line-height: 1.2rem;
}
.commom_daikan {
  color: #747474;
  font-size: 12px;
  height: 1.3rem;
  line-height: 1.3rem;
}
.right_img {
  width: 60%;
}
.fixed_img {
  position: fixed;
  z-index: 999999;
  top: 30rem;
  left: 0;
  padding: 10px 10px 10px 0;
}
.daikan_detail {
  display: flex;
  justify-content: space-between;
}
.daikan_list {
  background: #fff;
  padding-top: 6%;
  padding-bottom: 4%;
  margin-bottom: 0.5rem;
}
.welcome_title {
  color: #333a40;
  font-size: 16px;
  margin-left: 2%;
}
.canguan {
  font-size: 16px;
  color: #000;
  display: flex;
  height: 1.5rem;
  line-height: 1.5rem;
  margin-bottom: 0.8rem;
  justify-content: space-around;
  margin-left: 4%;
  margin-right: 4%;
}
.c_left {
  width: 50%;
  text-align: left;
}
.daikan_date {
  color: #747474;
  font-size: 12px;
  text-align: right;
  width: 45%;
}
.daikan_detail {
  margin-left: 4%;
}
.daikan_right {
  background: #ddd;
  margin-right: 10%;
  width: 85px;
  height: 75px;
}
.daikan_left {
  height: 75px;
}
.n_data {
  text-align: center;
  height: 22rem;
  line-height: 22rem;
}
.list_tip {
  background: #fff;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-bottom: 1px solid #ededed;
  color: #aaaaaa;
  font-size: 13px;
}
</style>


