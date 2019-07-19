<template>
  <transition name="detail">
    <div class="show-detail">
      <div v-transfer-dom>
        <x-dialog v-model="dialogShow" :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
          <img style="width: 80%;" :src="`http://sofimage.richest007.com/对接人二维码/${detailList[0].dockingPersonId}.jpg`" alt="">
          <br>
          <br>
          <x-icon type="ios-close-outline" style="fill:#fff;" @click="dialogShow = false"></x-icon>
        </x-dialog>
      </div>
      <div class="mengceng-img" v-if="mengcengFlag">
        <img :src="mengcengImg" alt="" @click="hideMengceng" />
      </div>
      <div class="title" v-if="detailList.length">
        <my-title :title="'项目介绍'"></my-title>
        <div @click="toExprot" class="export-img"><img :src="exportImg" alt="" /><br/>生成客户版</div>
      </div>
      <scroll ref="scroll" :beforeScroll="true" @beforeScroll="beforeScroll" :pullup="pullup" class="list" :data="detailList">
        <div class="detail-list">
          <div v-if="detailList.length">
            <div :key="item" v-for="item in detailList">
              <div class="slider-wrapper">
                <slider :styleBottom="'40px'" v-if="item.homePage != null ? true : false">
                  <div :key="childItem" v-for="childItem in item.homePage" v-if="childItem.indexOf('.') > -1">
                    <div>
                      <img class="needsclick" @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + childItem" />
                    </div>
                  </div>
                </slider>
              </div>
              <div class="item-title">
                <div class="item-addr">
                  <h3 class="pink">{{title}}</h3>
                  <p v-if="$route.query.isover === 'over'">{{item.province}} {{item.city}}</p>
                  <span>{{item.address}}</span>
                </div>
              </div>
              <div class="item-comm" v-if="item.commission != null">
                <div v-if="item.commission != null" class="comm-t">
                  <div class="l">佣金标准</div>
                  <div class="r">
                    <p v-if="item.brokerage != null">{{item.brokerage}}(项目佣金)</p>
                    <p v-if="item.commission != null">{{item.commission}}(个人佣金)</p>
                  </div>
                </div>
                <div v-if="item.commissionJunction.length > 0 && item.commissionJunction[0].length > 0" class="comm-b">
                  <span class="l">结佣说明</span>
                  <div class="r">
                    <p :key="commItem" v-for="commItem in item.commissionJunction">{{commItem}}</p>
                  </div>
                </div>
              </div>
              <div class="item-butt-man" v-if="item.name != null">
                <div class="butt-man-l">
                  <div class="butt-img" v-if="item.img != null">
                    <img :src="'http://sofmanager.fangsir007.com/image/' + item.img" alt="" />
                  </div>
                  <div class="qrcode" @click.prevent="dialogShow = true">
                    <img :src="`http://sofimage.richest007.com/对接人二维码/${detailList[0].dockingPersonId}.jpg`" alt="">
                    <p>项目负责人</p>
                    <p style="margin-top: 5px;">二维码</p>
                  </div>
                </div>
                <div class="butt-man-r">
                  <div>
                    <span class="butt-name">{{item.name}} </span>
                    <!-- <span class="butt-color"> 电话</span> -->
                  </div>
                  <div>
                    <span class="butt-color">{{item.workingLife}} | </span>
                    <span class="butt-color"> 擅长:</span>
                    <br>
                    <span class="butt-color"> {{item.goodAt}}</span>
                  </div>
                </div>
                <div style="margin-left: 10px;" v-if="item.label != null ? (item.label.length > 1 ? true : false) : false">
                  <span class="butt-color" :class="[index % 2 === 0 ? 'butt-first-color' : 'butt-second-color']" :key="labelItem" v-for="(labelItem, index) in item.label">
                    <i class="icon-gou ic-color">
                    </i> {{labelItem}} </span>
                </div>
                <div v-if="item.motto != null" class="item-motto">
                  <p>{{item.motto}}</p>
                </div>
                <div v-if="item.selfEvaluation != null" class="item-desc">
                  <p>{{item.selfEvaluation}}</p>
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
              <div class="item-sell" v-if="item.policy != null && item.policy.length > 0">
                <div>
                  <div class="pro-sell">
                    政策法规
                  </div>
                  <div class="item-sell-child" :key="poItem" v-for="poItem in item.policy">
                    <span class="sell-l">
                      <i class="icon-star"></i>
                    </span>
                    <span class="sell-r">{{poItem}}</span>
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
                  <p v-if="item.projectName != null && item.projectName !== ''">楼盘名称：{{item.projectName}}</p>
                  <p v-if="item.unitPrice != null && item.unitPrice !== ''">单价：{{item.unitPrice}}</p>
                  <p v-if="item.huxing != null && item.huxing !== ''">户型：{{item.huxing}}</p>
                  <p v-if="item.area != null && item.area !== ''">面积：{{item.area}}</p>
                  <p v-if="$route.query.isover !== 'over' && item.totalPrice != null && item.totalPrice !== ''">总价：{{item.totalPrice}}万起</p>
                  <p v-if="$route.query.isover === 'over' && item.totalPrice != null && item.totalPrice !== ''">总价：{{item.totalPrice}}万欧元起</p>
                  <p v-if="item.downPays != null && item.downPays !== ''">首付比例：{{item.downPays}}万起</p>
                  <p v-if="item.deliveryTime != null && item.deliveryTime !== ''">交房时间：{{item.deliveryTime}}</p>
                  <p v-if="item.renovationCode != null && item.renovationCode !== ''">交房标准：{{item.renovationCode}}</p>
                </div>
                <div class="info-clcik" v-if="!isShow" @click="showMove">
                  <span>点击查看更多信息
                    <i class="icon-arrow"></i>
                  </span>
                </div>
                <div class="info-list" v-if="isShow">
                  <span>
                    <img :src="heartImg" alt="" />
                  </span>
                  <div v-if="item.regionalIntroduction != null">
                    <h3>区域介绍</h3>
                    <p :key="regItem" v-for="regItem in item.regionalIntroduction">{{regItem}}</p>
                  </div>
                  <span>
                    <img :src="heartImg" alt="" />
                  </span>
                  <div v-if="item.projectIntroduction != null">
                    <h3>项目介绍</h3>
                    <p :key="proItem" v-for="proItem in item.projectIntroduction">{{proItem}}</p>
                  </div>
                  <span>
                    <img :src="heartImg" alt="" />
                  </span>
                  <div>
                    <h3 v-if="item.supportingFacilities != null ? true : false">配套设施</h3>
                    <p class="sup-sty" v-if="item.supportingFacilities != null && item.supportingFacilities.length >= 1" :key="supItem" v-for="supItem in item.supportingFacilities">{{supItem}}</p>
                    <span @click="hideMove">折叠以上信息</span>
                  </div>
                </div>
              </div>
              <div class="item-photo" v-if="item.propertyAlbum != null ? (item.propertyAlbum.length >= 1 ? true : false) : false">
                <div class="photo-title" ref="infophoto">
                  <div>
                    楼盘效果图
                  </div>
                </div>
                <div class="photo-list">
                  <img @load="loadImage" v-lazy="'http://sofmanager.fangsir007.com/image/' + item.propertyAlbum[0]" alt="" />
                </div>
                <div v-if="item.propertyAlbum.length > 1">
                  <div class="info-clcik" v-if="!isShowPhoto" @click="showMove('photo')">
                    <span>点击查看更多信息
                      <i class="icon-arrow"></i>
                    </span>
                  </div>
                </div>
                <div v-if="isShowPhoto">
                  <div class="photo-list" :key="photoItem" v-for="(photoItem, index) in item.propertyAlbum" v-if="index === 0 ? false : true && photoItem.indexOf('.') > -1">
                    <img @load="loadImage" v-lazy="'http://sofmanager.fangsir007.com/image/' + photoItem" alt="" />
                  </div>
                  <span class="hide-span" @click="hideMove('photo')">{{item.propertyAlbum.length > 1 ? '折叠以上信息' : '没有更多了'}}</span>
                </div>
              </div>
              <div class="item-photo" v-if="item.huxingImg != null ? (item.huxingImg.length >= 1 ? true : false) : false">
                <div class="photo-title" ref="infoHuxing">
                  <div>
                    户型图
                  </div>
                </div>
                <div class="photo-list" v-if="item.huxingImg != null ? true : false">
                  <img @load="loadImage" v-lazy="'http://sofmanager.fangsir007.com/image/' + item.huxingImg[0]" alt="" />
                </div>
                <div v-if="item.huxingImg.length > 1">
                  <div class="info-clcik" v-if="!isShowHuxing" @click="showMove('huxing')">
                    <span>点击查看更多信息
                      <i class="icon-arrow"></i>
                    </span>
                  </div>
                </div>
                <div v-if="isShowHuxing">
                  <div class="photo-list" :key="huItem" v-for="(huItem, index) in item.huxingImg" v-if="index === 0 ? false : true && huItem.indexOf('.') > -1">
                    <img @load="loadImage" v-lazy="'http://sofmanager.fangsir007.com/image/' + huItem" alt="" />
                  </div>
                  <span class="hide-span" @click="hideMove('huxing')">{{item.huxingImg.length > 1 ? '折叠以上信息' : '没有更多了'}}</span>
                </div>
              </div>
              <div class="item-rule">
                <div v-if="item.nameStandard != null">
                  <h3>
                    <i class="icon-book"></i>项目报备规则：</h3>
                  <p>项目报备途径：提前{{item.way}}小时报备'房先生创图经纪人平台'</p>
                  <p>系统报备客户姓名标准：{{item.nameStandard}}</p>
                  <p>系统报备客户电话标准：{{item.telStandard}}</p>
                  <p>报备有效时间：{{item.protectDate}}天</p>
                  <h3>
                    <i class="icon-book"></i>客户确认规则：与客户同时到场</h3>
                  <p>系统确认客户姓名标准：{{item.nameStandard}}</p>
                  <p>系统确认客户电话标准：{{item.telStandard}}</p>
                  <p>确认客户保护期：{{item.customerprotectDate}}天</p>
                </div>
              </div>
            </div>
            <div class="item-msg">
              <div class="msg-title">
                <div>
                  精选留言
                </div>
              </div>
              <div class="msg-wall">
                <img :src="messageWall" alt="" />
              </div>
              <div class="write-msg" v-if="!msgIsShow">
                <span @click="showMsg">写留言<img :src="writeImg" alt="" /></span>
              </div>
              <div class="msg" ref="msg" v-if="msgIsShow">
                <!-- :value="textaream" -->
                <div class="msg-text">
                  <textarea ref="textareas" class="text" v-model="textaream" placeholder='请输入'></textarea>
                </div>
                <div class="msg-btn" ref="msgSend">
                  <div>
                    <button type="button" ref="send" :disabled="_trim(textaream) !== '' ? false : 'disabled'" :class="_trim(textaream) !== '' ? 'btn' : 'disabled'" @click="send">{{_trim(textaream) === '' ? '请填写留言' : '发送'}}</button>
                  </div>
                </div>
              </div>
              <div v-if="userMsg.length">
                <div class="user-msg" :key="item" v-for="item in userMsg">
                  <h3>{{item.username}}</h3>
                  <p>{{item.content}}</p>
                  <p class="user-msg-time">{{item.createtime ? item.createtime.split(' ')[0] : ''}}</p>
                </div>
              </div>
              <div v-else class="no-msg">
                还没有留言哦，快去发布吧~
              </div>
              <div style="height: 100px">
              </div>
            </div>
          </div>
          <div v-else>
            <loading title=""></loading>
          </div>
        </div>
      </scroll>
      <div>
        <confirm ref="confirm" @confirm="confirmClear" @cancel="cancel" :text="text" :confirmBtnText="confirmBtnText"></confirm>
      </div>
      <div v-if="detailList.length">
        <div class="button-phone" v-if="inStock === 0">
          <!-- <a class="btn btn-danger" :href="'tel:' + phone">
            <span>
              <i class="icon-phone"></i> 报备带看咨询</span>
          </a>
          <a v-if="recordPhone" class="btn btn-danger" :href="'tel:' + recordPhone">
            <span>
              <i class="icon-phone"></i> 项目详情咨询</span>
          </a>
          <a class="btn btn-success" style="margin-right: 10px;" @click.prevent="addLog(id)">
            <span>
              <i class="icon-report"></i> 我要报备</span>
          </a> -->
          <div class="btn1" @click="actionsheetShow = true">详情咨询</div>
          <div class="btn2" @click="addLog(id)">我要报备</div>
        </div>
        <div class="button-phone hezuo" v-else>
          <a class="btn btn-primary" @click.prevent="projectnewest(id)">
            <span>求合作</span>
          </a>
        </div>
      </div>
      <actionsheet v-model="actionsheetShow" show-cancel>
        <p slot="header">
          <ul class="call-actionsheet">
            <li style="border-bottom: 1px solid #EDEDED; padding-top: 10px; " v-if="recordPhone">
              <a class="btn btn-danger" :href="'tel:' + recordPhone">
                <div class="fl">
                  <div class="name">售楼部</div>
                  <div>楼盘详情咨询（如房源、价格、库存等）</div>
                </div>
                <div class="fr" style="top: 0rem;">
                  <img src="./../../common/image/call.png" alt="">
                </div>
              </a>
            </li>
            <li style="padding-top: 15px">
              <a class="btn btn-danger" :href="'tel:' + phone">
                <div class="fl">
                  <div class="name">平台</div>
                  <div>平台业务咨询（如报备、带看、结佣流程等）</div>
                </div>
                <div class="fr">
                  <img src="./../../common/image/call.png" alt="">
                </div>
              </a>
            </li>
          </ul>
        </p>
      </actionsheet>
    </div>
  </transition>
</template>
<script type="text/babel">
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import confirm from 'base/confirm/confirm'
import Loading from 'base/loading/loading'
import MyTitle from 'base/title/title'
import TYPE from 'common/js/buryingpointType'
import { addLog } from 'api/buryingpoint'
import { getProjectDetail, getCommentlist, addComment } from 'api/detail'
import { getoverdetails } from 'api/overseasList'
import { projectnewest } from 'api/recommendList'
import { getFirstVisited } from 'api/getFirstVisited'
import { Actionsheet, XDialog, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      dialogShow: false,
      actionsheetShow: false,
      mengcengImg: require('common/image/mengceng001.jpg'),
      mengcengFlag: false,
      exportImg: require('common/image/export.png'),
      pullup: true,
      detailList: [],
      sliderImg: [],
      messageWall: require('common/image/message_wall.png'),
      heartImg: require('common/image/heart_07.png'),
      writeImg: require('common/image/xie.png'),
      isShow: false,
      isShowPhoto: false,
      isShowHuxing: false,
      msgIsShow: false,
      userMsg: [],
      id: this.$route.query.id,
      textaream: '',
      text: '',
      confirmBtnText: '确定',
      title: '',
      phone: '',
      isover: this.$route.query.isover,
      inStock: 0,
      projectnewestData: {},
      recordPhone: ''
    }
  },
  components: {
    Scroll,
    Slider,
    confirm,
    Loading,
    MyTitle,
    Actionsheet,
    XDialog
  },
  created() {
    // 判断是否是首次访问
    getFirstVisited('recommendListDetail').then(res => {
      if (res.data.data === 0) {
        this.mengcengFlag = true
      }
    })
    setTimeout(() => {
      if (this.$route.query.isover === 'over') {
        addLog(TYPE.OVERSEASXPAGE, '', '', '', window.USERMSG)
      } else {
        addLog(TYPE.PROJECTDETAIL, '', '', '', window.USERMSG)
      }
    }, 1500)
    this._isover()
  },
  methods: {
    _isover() {
      if (this.isover === 'over') {
        this._getoverdetails()
      } else {
        this._getDetail()
        this._getCommentlist()
      }
    },
    // 点击求分销然后所做的事
    // 求分销
    projectnewest(id) {
      this.projectnewestData.projectname = this.title
      this.projectnewestData.id = id
      this.text = '我们会尽快与该项目合作，签定分销协议'
      this.$refs.confirm.show()
    },
    // 点击隐藏蒙层
    hideMengceng() {
      this.mengcengFlag = false
    },
    // 分享页面
    toExprot() {
      if (this.$route.query.isover === 'over') {
        addLog(
          TYPE.OVERSEASXPAGE,
          '',
          TYPE.OVERSEASHARE,
          TYPE.OVERSEASEXPORT,
          window.USERMSG
        ).then(res => {
          console.log(res)
        })
      } else {
        addLog(
          TYPE.PROJECTDETAIL,
          '',
          TYPE.PROJECTEXPORT,
          TYPE.PROJECTEXPORTPAGE,
          window.USERMSG
        ).then(res => {
          console.log(res)
        })
      }
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      console.log(isAndroid)
      console.log(isiOS)
      if (isiOS) {
        window.location.href = `/exportPage?id=${this.id}&isover=${this.isover}`
      } else {
        this.$router.push({
          path: '/exportPage',
          query: { id: `${this.id}`, isover: `${this.isover}` }
        })
      }
      // :to="{path:'/exportPage',query: {id: `${id}`}}"
    },
    // 添加打点
    addLog(id) {
      if (this.$route.query.isover === 'over') {
        addLog(
          TYPE.OVERSEASXPAGE,
          '',
          TYPE.PROJECTDETAILBTN,
          TYPE.BAOBEIPAGE,
          window.USERMSG
        ).then(res => {
          console.log(res)
        })
      } else {
        addLog(
          TYPE.PROJECTDETAIL,
          '',
          TYPE.PROJECTDETAILBTN,
          TYPE.BAOBEIPAGE,
          window.USERMSG
        ).then(res => {
          console.log(res)
        })
      }
      window.location.href = '/recommend?id=' + id
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
      }
      this.$refs.scroll.refresh()
    },
    showMove(name) {
      if (name === 'photo') {
        this.isShowPhoto = true
      } else if (name === 'huxing') {
        this.isShowHuxing = true
      } else {
        this.isShow = true
      }
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },
    hideMove(name) {
      if (name === 'photo') {
        this.isShowPhoto = false
        if (!this.$refs.infophoto[0]) {
          return
        }
        this.$refs.scroll.scrollToElement(this.$refs.infophoto[0], 600)
      } else if (name === 'huxing') {
        this.isShowHuxing = false
        if (!this.$refs.infoHuxing[0]) {
          return
        }
        this.$refs.scroll.scrollToElement(this.$refs.infoHuxing[0], 600)
      } else {
        this.isShow = false
        if (!this.$refs.infoDesc[0]) {
          return
        }
        this.$refs.scroll.scrollToElement(this.$refs.infoDesc[0], 600)
      }
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },
    showMsg() {
      this.msgIsShow = true
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },
    send() {
      if (this.textaream === '') {
        this.text = '请输入内容'
        this.$refs.confirm.show()
        return
      }
      this.text = '发送成功，请等待留言审核..'
      this.$refs.confirm.show()
      addComment(this.id, this.textaream).then(res => {
        if (res.data.code !== 0) {
          this.text = '网络异常..'
          this.$refs.confirm.show()
        }
      })
      this.textaream = ''
    },
    confirmCancel() {
      if (this.text === '正在整理此项目数据') {
        window.location.href = '/recommendList'
      }
    },
    confirmClear() {
      if (this.text === '正在整理此项目数据') {
        window.location.href = '/recommendList'
      }
      if (this.text === '我们会尽快与该项目合作，签定分销协议') {
        addLog(
          TYPE.PROJECTDETAIL,
          '',
          TYPE.HEZUOBTNCONFIRM,
          TYPE.PROJECTDETAIL,
          window.USERMSG
        )
        projectnewest(
          this.projectnewestData.projectname,
          this.projectnewestData.id
        ).then(res => {
          if (res.data.code === 2) {
            this.text = '请先注册！'
            this.$refs.confirm.show()
          }
        })
      }
      if (this.text === '请先注册！') {
        window.location.href = '/registration'
      }
    },
    cancel() {
      if (this.text === '正在整理此项目数据') {
        window.location.href = '/recommendList'
      }
      if (this.text === '我们会尽快与该项目合作，签定分销协议') {
        addLog(
          TYPE.PROJECTDETAIL,
          '',
          TYPE.HEZUOBTNCONCEL,
          TYPE.PROJECTDETAIL,
          window.USERMSG
        )
      }
    },
    beforeScroll() {
      if (this.$refs.textareas) {
        this.$refs.textareas.blur()
      }
    },
    _getoverdetails() {
      getoverdetails(this.id).then(res => {
        if (res.data.code !== 0) {
          this.text = '正在整理此项目数据'
          this.$refs.confirm.show()
          return
        }
        if (res.data.data) {
          const data = res.data.data
          this.sliderImg = data.homePage
          this.phone = data.phone
          this.title = data.projectName
          this.inStock = data.inStock
          this.detailList.push(data)
        }
      })
    },
    _getDetail() {
      getProjectDetail(this.id).then(res => {
        if (res.data.code !== 0) {
          this.text = '正在整理此项目数据'
          this.$refs.confirm.show()
          return
        }
        if (res.data.data) {
          const data = res.data.data
          this.sliderImg = data.homePage
          this.phone = data.phone
          this.title = data.projectName
          this.inStock = data.inStock
          this.recordPhone = data.recordPhone
          this.detailList.push(data)
        }
      })
    },
    _getCommentlist() {
      getCommentlist(this.id).then(res => {
        if (res.data.data) {
          const data = res.data.data
          this.userMsg = data
        }
      })
    },
    _trim(str) {
      return str.replace(/(^\s+)|(\s+$)/g, '')
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.show-detail {
  position: fixed;
  height: 100%;
  width: 100%;
  bottom: 0;
  height: 100%;
  z-index: 1000;
  background: #eee;
  font-size: $font-size-medium;

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

  .title {
    position: fixed;
    z-index: 10002;
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large-x;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    top: 0;

    .export-img {
      position: absolute;
      z-index: 1001;
      top: 8px;
      right: 16px;
      font-size: 12px;
      height: 37px;
      overflow: hidden;
      line-height: 16px;
      text-align: center;

      img {
        width: 24px;
      }
    }
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 55px;
    width: 100%;
    padding-top: 50px;

    .detail-list {
      background: #eee;
    }

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 200px;

      img {
        width: 100%;
        height: 200px;
      }
    }

    .item-title {
      position: relative;
      width: 100%;
      margin: 0 auto;
      height: 80px;
    }

    .item-addr {
      position: absolute;
      top: -30px;
      left: 6%;
      width: 80%;
      padding-top: 20px;
      overflow: hidden;
      border-radius: 10px;
      background: white;
      text-align: center;
      height: 100%;
      overflow: hidden;
      padding: 4%;

      p {
        font-size: 20px;
        margin: 3px 0;
      }

      span {
        line-height: 20px;
      }

      .pink {
        font-size: $font-size-large-x;
        line-height: 30px;
        color: #333;
        font-weight: 700;
      }
    }

    .item-comm {
      margin-top: 10px;
      background: white;
      padding-bottom: 10px;
      z-index: 99999;

      .comm-t, .comm-b {
        text-align: center;
        border-radius: 10px;
        overflow: hidden;
        margin: 10px 10px 0;
      }

      .l {
        display: block;
        width: 100%;
        background: #ff5f00;
        line-height: 35px;
        color: white;
        font-size: $font-size-medium-x;
      }

      .r {
        display: block;
        text-align: left;
        line-height: 30px;
        text-indent: 2em;
        border-radius: 0 0 10px 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-top: none;

        p {
          line-height: 20px;
        }
      }
    }
  }

  .item-butt-man {
    margin: 10px 0;
    padding-bottom: 10px;
    // text-align: center;
    background: white;
    position: relative;

    .butt-man-l {
      width: 30%;
      height: 80px;
      display: inline-block;
      margin: 20px 0;

      // margin: 15px auto;
      // padding-top: 10px;
      // position: relative;
      .butt-img {
        border-radius: 50%;
        overflow: hidden;
        width: 80px;
        height: 80px;
        margin: 0 auto;
      }

      .qrcode {
        position: absolute;
        width: 90px;
        height: 90px;
        right: 1rem;
        top: 20px;
        p {
          text-align: center
        }
      }

      img {
        width: 100%;
      }
    }

    .butt-man-r {
      width: 35%;
      display: inline-block;
      position: absolute;
      top: 20px;

      span {
        line-height: 25px;
      }

      .butt-name {
        font-size: $font-size-medium-x;
      }

      .butt-color {
        color: #949494;
      }
    }

    .butt-second-color {
      border: 1px solid #f39800;
      margin-right: 10px;
      padding: 3px;
      border-radius: 5px;
    }

    .butt-first-color {
      border: 1px solid #89c997;
      margin-right: 10px;
      padding: 3px;
      border-radius: 5px;
    }

    i {
      display: inline-block;
      vertical-align: middle;
      color: #b5b0d3;
      font-size: 20px;
      height: 20px;
    }
  }

  .item-motto {
    padding: 0 10px;
    background: white;
    color: #e57b00;
    line-height: 17px;
    margin-top: 15px;
  }

  .item-desc {
    padding: 0 10px;
    margin: 10px 0;

    p {
      line-height: 22px;
    }
  }

  .item-sell {
    padding: 20px 10px;
    background: white;
    margin-top: 10px;

    >div {
      border-left: none;
      padding: 10px 10px 20px 0;

      .pro-sell {
        color: #ff5f00;
        display: inline-block;
        position: relative;
        top: -15px;
        border-left: 4px solid #ff5f00;
        padding-left: 20px;
        height: $font-size-large;
        font-size: $font-size-large;
      }

      .item-sell-child {
        display: flex;

        .sell-l {
          padding-top: 2px;
          width: 15px;
          line-height: 28px;
          color: #e57b00;
        }

        .sell-r {
          line-height: 30px;
          color: #036ed9;
          padding-left: 10px;
        }
      }
    }
  }

  .item-info {
    padding: 20px 10px;
    background: white;
    margin-top: 10px;

    .info-title {
      color: #fe4b42;
      height: 30px;
      font-size: $font-size-large;
      border-bottom: 1px solid #ccc;

      >div {
        display: inline-block;
        height: 29px;
        padding: 0 10px;
        border-bottom: 2px solid #fe4b42;
      }
    }

    .info-desc {
      padding-left: 10px;
      margin-top: 10px;

      h3 {
        text-align: center;
        font-size: $font-size-medium-x;
        line-height: 40px;
      }

      p {
        line-height: 30px;
      }
    }

    .info-clcik {
      width: 180px;
      text-align: center;
      margin: 0 auto;
      margin-top: 10px;
      padding: 10px;
      background: #f0664c;
      border-radius: 5px;

      span {
        color: #fff;
        padding: 10px;

        img {
          width: $font-size-medium-x;
        }
      }
    }

    .info-list {
      span {
        display: inline-block;
        padding: 10px 0;
      }

      div {
        border-left: 1px solid black;
        padding-left: 10px;

        h3 {
          color: #666;
          font-size: $font-size-medium-x;
          line-height: 60px;
        }

        p {
          font-size: $font-size-medium;
          line-height: 20px;
          text-indent: 2em;
        }

        span {
          padding: 10px;
          color: #044cd1;
        }

        .sup-sty {
          text-indent: 0;
        }
      }
    }
  }

  .item-photo {
    padding: 20px 10px;
    background: white;
    margin-top: 10px;

    .hide-span {
      display: inline-block;
      color: #044cd1;
      padding: 15px;
    }

    .photo-title {
      color: #fe4b42;
      height: 30px;
      font-size: $font-size-large;
      border-bottom: 1px solid #ccc;

      >div {
        display: inline-block;
        height: 29px;
        padding: 0 10px;
        border-bottom: 2px solid #fe4b42;
      }
    }

    .info-clcik {
      width: 153px;
      margin: 0 auto;
      margin-top: 10px;
      padding: 10px;
      background: #f0664c;
      border-radius: 5px;

      span {
        color: #fff;
        padding: 10px;

        img {
          width: $font-size-medium-x;
        }
      }
    }

    .photo-list {
      padding: 10px 0 0 0;
      width: 100%;
      height: 100%;

      span {
        color: #fff;
        padding: 10px;
      }

      img {
        width: 100%;
      }
    }
  }

  .item-rule {
    padding: 20px 10px;
    background: white;
    margin-top: 10px;

    div {
      border: 1px dotted #b6e4fd;
      border-radius: 15px;
      padding: 20px 10px;

      h3 {
        font-size: $font-size-medium-x;
        font-weight: both;
        color: black;
        line-height: 50px;

        i {
          margin-right: 10px;
          font-size: $font-size-medium-x;
          color: #ff4e00;
        }
      }

      p {
        height: 35px;
        line-height: 15px;
        color: #7f7f7f;
      }
    }
  }

  .item-msg {
    padding: 20px 10px;
    background: white;
    margin-top: 10px;

    .msg-title {
      color: #fe4b42;
      height: 30px;
      font-size: $font-size-large;
      border-bottom: 1px solid #ccc;

      >div {
        display: inline-block;
        height: 29px;
        padding: 0 10px;
        border-bottom: 2px solid #fe4b42;
      }
    }

    .msg-wall {
      width: 100px;
      margin: 10px auto;

      img {
        width: 100%;
      }
    }

    .write-msg {
      text-align: right;

      img {
        width: $font-size-medium;
        vertical-align: middle;
      }
    }

    .msg {
      .msg-text {
        padding: 20px 20px 0;

        .text {
          resize: vertical;
          line-height: 15px;
          width: 100%;
          color: #1f2d3d;
          background-color: #fff;
          background-image: none;
          border: 1px solid #ff4e00;
          border-radius: 4px;
          transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          height: 70px;
        }
      }

      .msg-btn {
        width: 100%;
        margin: 10px 0;

        >div {
          width: 40%;
          margin: 0 55%;
        }

        .btn {
          background: #20a0ff;
          border: none;
          border-color: #20a0ff;
          border-radius: 4px;
          width: 100%;
          color: white;
          padding: 10px 0;
          font-size: $font-size-medium;
        }

        .disabled {
          background: #FF4949;
          border: none;
          border-color: #FF4949;
          border-radius: 4px;
          width: 100%;
          color: white;
          padding: 10px 0;
          font-size: $font-size-medium;
        }
      }
    }

    .user-msg {
      margin-top: 20px;

      h3 {
        color: #533f80;
        font-size: $font-size-medium-x;
        line-height: 30px;
      }

      p {
        line-height: 20px;
      }

      .user-msg-time {
        color: #ccc;
        font-size: $font-size-small-s;
      }
    }

    .no-msg {
      color: #ccc;
      text-align: center;
    }
  }
}

.button-phone {
  width: 100%;
  background: white;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  display: flex;

  // padding: 10px;
  // margin-left: -10px;
  // justify-content: space-around;
  .btn1 {
    width: 50%;
    height: 50px;
    display: inline-block;
    background: #1EA7FF;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 1rem;
  }

  .btn2 {
    width: 50%;
    height: 50px;
    display: inline-block;
    background: #FF5F00;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 1rem;
  }

  .btn {
    flex-grow: 1;
    display: inline-block;
    line-height: 34px;
    text-decoration: none;
    text-align: center;
    border-radius: 4px;
    border: none;
    color: white;
    font-size: $font-size-medium-x;
    padding: 1px;
    margin-left: 10px;

    span {
      display: inline-block;
      font-size: $font-size-medium-x;

      i {
        font-size: $font-size-medium;
      }
    }
  }

  .btn-danger {
    background: #0077ec;
  }

  .btn-success {
    background: #ff4e00;
  }

  .btn-primary {
    background: #0077ed;
  }
}

.hezuo {
  .btn {
    width: 70%;
  }
}

.detail-enter-active, .detail-leave-active {
  transition: all 0.3s;
}

.detail-enter, .detail-leave-to {
  transform: translate3d(100%, 0, 0);
}

.call-actionsheet {
  padding: 10px 15px;
  padding-bottom: 0;

  li {
    text-align: left;
    padding-bottom: 15px;
    position: relative;

    .fl {
      font-size: 0.85rem;
      color: #747474;

      .name {
        font-size: 1rem;
        color: #333;
        margin-bottom: 10px;
      }
    }

    .fr {
      position: absolute;
      right: 0.1rem;
      top: 1.3rem;
      width: 40px;
      height: 40px;

      img {
        width: 100%;
      }
    }
  }
}
</style>
