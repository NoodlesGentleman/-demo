<template>
    <transition name="maidDatum">
        <div id="maidDatum">
            <my-title title="结佣资料"></my-title>
            <div class="container">
                <div>
                    <div class="title" style="margin-bottom: 1.2rem;">
                        <i class="icon icon-user"></i>
                        <span>经纪人个人资料</span>
                    </div>
                    <div class="user-info">
                        <div class="row">
                            <span class="label">报备单号：</span>
                            <span class="text">{{reportid}}</span>
                        </div>
                        <div class="row">
                            <span class="label">报备项目：</span>
                            <span class="text">{{projectName}}</span>
                        </div>
                        <div class="row">
                            <span class="label">注册名：</span>
                            <span class="text">{{registerName}}</span>
                        </div>
                        <div class="row">
                            <span class="label">注册电话：</span>
                            <span class="text"><a href="tel:registerPhone">{{registerPhone}}</a></span>
                        </div>
                        <div class="row">
                            <span class="label">备注电话：</span>
                            <span class="text"><a href="tel:remarkPhone">{{remarkPhone}}</a></span>
                        </div>
                        <div class="row">
                            <span class="label">姓名：</span>
                            <span class="text">{{realName}}</span>
                        </div>
                        <div class="row">
                            <span class="label">身份证号码：</span>
                            <span class="text">{{idcard}}</span>
                        </div>
                        <div class="row">
                            <span class="label">开户行：</span>
                            <span class="text">{{bank}}</span>
                        </div>
                        <div class="row">
                            <span class="label">卡号：</span>
                            <span class="text">{{newbank}}</span>
                        </div>
                        <div class="change" style="padding-left:4rem;">
                          <label for="radio01">
                            <input type="radio" name="result01" value="1" v-model="check01" id="radio01"><b></b>通过
                          </label>
                          <label for="radio02">
                             <input type="radio" name="result01" value="0" v-model="check01" id="radio02"><b></b>未通过
                            </label>  
                           
                        </div>
                        <input type="text" v-model="responce01" v-show="showinput01" placeholder="不通过请输入反馈信息">
                    </div>
                    <div class="line"></div>
                    <div class="content" style="padding-top:0">
                        <div style="width: 100%">
                            <div class="title">
                                <i class="icon icon-money"></i>
                                <span>佣金结算方式</span>
                            </div>
                            <div class="change">
                                <span>垫佣：</span>
                                <label for="radio03">
                                  <input type="radio" name="commission" value="1" v-model="picked" id="radio03"><b></b>是(70%佣金)
                                </label>
                                <label for="radio04">
                                  <input type="radio" name="commission" value="0" v-model="picked" id="radio04"><b></b>否(80%佣金)
                                </label>
                                
                            </div>
                            <div class="change" style="padding-left:4.3rem;">
                              <label for="radio05">
                                 <input type="radio" name="result02" value="1" v-model="check02" id="radio05"><b></b>通过
                              </label>
                              <label for="radio06">
                                 <input type="radio" name="result02" value="0" v-model="check02" id="radio06"><b></b>未通过
                              </label>
                               
                            </div>
                            <input type="text" v-model="responce02" v-show="showinput02" placeholder="不通过请输入反馈信息">
                        </div>
                        <div style="width: 100%">
                            <div class="title">
                                <i class="icon icon-eye"></i>
                                <span>经纪人带看资料</span>
                            </div>
                            <div class="content-title">
                                <i class="icon-s icon-clock"></i>
                                <span>带看单（限一张图片）</span>
                            </div>
                            <div class="pic">
                                
                                    <img :src="configurl+'/checkoutCommission/tem/'+ reportid +'/'+file " v-for="(file, index) in imgsrc01" :key="index" alt=""  @touchend="previewimg" />
                               
                                
                            </div>
                            <div class="change" style="padding-left:4rem;">
                              <label for="radio07"></label>
                                <input type="radio" name="result03" value="1" v-model="check03" id="radio07"><b></b>通过
                                <label for="radio08">
                                  <input type="radio" name="result03" value="0" v-model="check03" id="radio08"><b></b>未通过
                                </label>
                                
                            </div>
                            <input type="text" v-model="responce03" v-show="showinput03" placeholder="不通过请输入反馈信息">
                        </div>
                        <div style="width: 100%">
                            <div class="title">
                                <i class="icon icon-cart"></i>
                                <span>经纪人订购资料</span>
                            </div>
                            <div class="content-title">
                                <i class="icon-s icon-clock"></i>
                                <span>订购单（最多2张图片）</span>
                            </div>
                            <div class="pic">
                                <img :src='configurl+"/checkoutCommission/tem/"+ reportid +"/"+file' v-for="(file, index) in imgsrc02" :key="index" alt="" ondragstart="return false;" @click="previewimg">
                            </div>
                            <div class="change" style="padding-left:4rem;">
                              <label for="radio09">
                                <input type="radio" name="result04" value="1" v-model="check04" id="radio09"><b></b>通过
                              </label>
                               <label for="radio10">
                                   <input type="radio" name="result04" value="0" v-model="check04" id="radio10"><b></b>未通过
                              </label> 
                              
                            </div>
                            <input type="text" v-model="responce04" v-show="showinput04" placeholder="不通过请输入反馈信息">
                        </div>
                        <div style="width: 100%">
                            <div class="title">
                                <i class="icon icon-edit"></i>
                                <span>经纪人签约资料</span>
                            </div>
                            <div class="content-title">
                                <i class="icon-s icon-clock"></i>
                                <span style="width: 95%">签约（提供合同的访问信息页图片，客户信息页图片，付款方式页，签字页，收款收据或发票，限6张图）
                                </span>
                            </div>
                            <div class="pic">
                                <img :src='configurl+"/checkoutCommission/tem/"+ reportid +"/"+file' v-for="(file, index) in imgsrc03" :key="index" alt="" ondragstart="return false;" @click="previewimg">
                            </div>
                            <div class="change" style="padding-left:4rem;">
                              <label for="radio11">
                                 <input type="radio" name="result05" value="1" v-model="check05" id="radio11"><b></b>通过
                              </label>
                               <label for="radio12">
                                 <input type="radio" name="result05" value="0" v-model="check05" id="radio12"><b></b>未通过
                               </label>
                                
                            </div>
                            <input type="text" v-model="responce05" v-show="showinput05" placeholder="不通过请输入反馈信息"/>
                        </div>
                        <div class="btn-box" v-if="authority==='financial_audit'">
                            <div class="btn fl" @click="reject">驳回</div>
                            <div class="btn fr" @click="passdata">审核通过发放佣金</div>
                        </div>
                        <div class="btn-box" v-else>
                            <div class="btn fl" @click="reject">反馈给经纪人</div>
                            <div class="btn fr" @click="passdata">提交财务审核</div>
                        </div>
                        
                    </div>
                </div>
            </div>
         <confirm ref="confirm" @cancel="cancelConfirm" :text="confirmText" @confirm="confirm"></confirm>
          <toast ref="toast"  :toastText="toastText" :showToast="showToast"></toast>
          <gallary v-show="showGallary" @close="closegallary" :gallarysrc="gallarysrc"></gallary>
        </div>
    </transition>
</template>

<script>
import { baseUrl } from '../../config/env'
import { showDetail, rejectMsg, postMsg } from 'api/maidDatum'
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import Toast from 'base/toast/toast'
import Gallary from 'base/gallary/gallary'
export default {
  data: () => ({
    reportid: '',
    projectName: '',
    remarkPhone: '',
    registerPhone: '',
    registerName: '',
    realName: '',
    idcard: '',
    bank: '',
    creditcard: '',
    picked: 0,
    confirmText: '',
    pic01: [],
    pic02: [],
    pic03: [],
    imgsrc01: [],
    imgsrc02: [],
    imgsrc03: [],
    check01: '0',
    check02: '0',
    check03: '0',
    check04: '0',
    check05: '0',
    responce01: '',
    responce02: '',
    responce03: '',
    responce04: '',
    responce05: '',
    toastText: '',
    showToast: false,
    showGallary: false,
    gallarysrc: '',
    configurl: '',
    usermage: require('common/image/user.png')
  }),
  created () {
    this.configurl = baseUrl
    console.log(this.configurl)
  },
  mounted() {
    this._showDetail()
  },
  methods: {
    _showDetail() {
      showDetail(location.search.split('=')[1]).then(res => {
        console.log(res.data.data.projectName)
        this.projectName = res.data.data.projectName
        this.reportid = res.data.data.reportid
        this.realName = res.data.data.realName
        this.idcard = res.data.data.idcard
        this.bank = res.data.data.bank
        this.creditcard = res.data.data.creditcard
        this.auditperson = res.data.data.userid
        this.registerPhone = res.data.data.registerPhone
        this.remarkPhone = res.data.data.remarkPhone
        this.registerName = res.data.data.registerName
        if (res.data.data.audittype) {
          this.audittype = res.data.data.audittype
        }
        if (res.data.data.datas) {
          this.datas = Object.assign({}, {}, res.data.data.datas)
          if (this.datas.group1.checkbox) {
            this.picked = this.datas.group1.checkbox
          }
          if (this.datas.group2.urls) {
            this.imgsrc01 = this.datas.group2.urls
          }
          if (this.datas.group3.urls) {
            this.imgsrc02 = this.datas.group3.urls
          }
          if (this.datas.group4.urls) {
            this.imgsrc03 = this.datas.group4.urls
          }
        }
      })
    },
    passdata () {
      let that = this
      /* if (this.responce01 || this.responce02 || this.responce03 || this.responce04 || this.responce05) {
        that.toastText = '通过是不需要反馈信息'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else */
      if (this.check01 === '0' || this.check02 === '0' || this.check03 === '0' || this.check04 === '0' || this.check05 === '0') {
        that.toastText = '通过中按钮选中不可以为拒绝'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else {
        let postdata = {}
        postdata.auditperson = this.auditperson
        postdata.audittype = this.passaudittype // 2
        postdata.reportid = this.reportid
        postdata.datas = [{
          'data': '',
          'group': '0',
          'type': 2
        },
        {
          'data': this.picked,
          'group': '1',
          'type': 0
        },
        {
          'data': '',
          'group': '1',
          'type': 2
        },
        {
          'data': '',
          'group': '2',
          'type': 2
        },
        {
          'data': '',
          'group': '3',
          'type': 2
        },
        {
          'data': '',
          'group': '4',
          'type': 2
        }]
        for (let i = 0; i < this.imgsrc01.length; i++) {
          postdata.datas.push({
            'data': this.imgsrc01[i],
            'group': '2',
            'type': 1
          })
        }
        for (let i = 0; i < this.imgsrc02.length; i++) {
          postdata.datas.push({
            'data': this.imgsrc02[i],
            'group': '3',
            'type': 1
          })
        }
        for (let i = 0; i < this.imgsrc03.length; i++) {
          postdata.datas.push({
            'data': this.imgsrc03[i],
            'group': '4',
            'type': 1
          })
        }
        console.log(postdata)
        postMsg(this.showUrl, postdata).then(res => {
          let self = this
          console.log(res)
          console.log(res.data.code)
          if (res.data.code === 0) {
            self.toastText = '发送成功'
            self.showToast = true
            setTimeout(function () {
              self.showToast = false
            }, 1000)
          } else {
            self.toastText = '发送失败'
            self.showToast = true
            setTimeout(function () {
              self.showToast = false
            }, 1000)
          }
        })
      }
    },
    reject () {
      console.log(this.check01)
      console.log(this.check02)
      console.log(this.check03)
      console.log(this.check04)
      console.log(this.check05)
      let that = this
      if (this.check01 === '1' && this.check02 === '1' && this.check03 === '1' && this.check04 === '1' && this.check05 === '1') {
        that.toastText = '不通过中按钮选中不可全为通过'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce01 === '' && this.responce02 === '' && this.responce03 === '' && this.responce04 === '' && this.responce05 === '') {
        that.toastText = '不通过反馈信息不可全为空'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce01 === '' && this.check01 === '0') {
        that.toastText = '资料未通过反馈不能为空'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce02 === '' && this.check02 === '0') {
        that.toastText = '垫佣未通过反馈不能为空'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce03 === '' && this.check03 === '0') {
        that.toastText = '带看单未通过反馈不能为空'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce04 === '' && this.check04 === '0') {
        that.toastText = '订购单未通过反馈不能为空'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce05 === '' && this.check05 === '0') {
        that.toastText = '签约资料未通过反馈不能为空'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce01 && this.check01 === '1') {
        that.toastText = '资料通过不需要给反馈信息'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce02 && this.check02 === '1') {
        that.toastText = '垫佣通过不需要给反馈信息'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce03 && this.check03 === '1') {
        that.toastText = '带看单通过不需要给反馈信息'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce04 && this.check04 === '1') {
        that.toastText = '订购单通过不需要给反馈信息'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce05 && this.check05 === '1') {
        that.toastText = '签约信息通过不需要给反馈信息'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else if (this.responce01.length > 50 || this.responce02.length > 50 || this.responce03.length > 50 || this.responce04.length > 50 || this.responce05.length > 50) {
        that.toastText = '反馈文字不能超过50个字'
        that.showToast = true
        setTimeout(function () {
          that.showToast = false
        }, 1000)
        return
      } else {
        let postdata = {}
        postdata.auditperson = this.auditperson
        postdata.audittype = this.rejectaudittype // -2
        postdata.reportid = this.reportid
        postdata.datas = [{
          'data': this.responce01,
          'group': '0',
          'type': 2
        },
        {
          'data': this.picked,
          'group': '1',
          'type': 0
        },
        {
          'data': this.responce02,
          'group': '1',
          'type': 2
        },
        {
          'data': this.responce03,
          'group': '2',
          'type': 2
        },
        {
          'data': this.responce04,
          'group': '3',
          'type': 2
        },
        {
          'data': this.responce05,
          'group': '4',
          'type': 2
        }]
        for (let i = 0; i < this.imgsrc01.length; i++) {
          postdata.datas.push({
            'data': this.imgsrc01[i],
            'group': '2',
            'type': 1
          })
        }
        for (let i = 0; i < this.imgsrc02.length; i++) {
          postdata.datas.push({
            'data': this.imgsrc02[i],
            'group': '3',
            'type': 1
          })
        }
        for (let i = 0; i < this.imgsrc03.length; i++) {
          postdata.datas.push({
            'data': this.imgsrc03[i],
            'group': '4',
            'type': 1
          })
        }
        console.log(postdata)
        rejectMsg(this.showUrl, postdata).then(res => {
          let self = this
          console.log(res)
          console.log(res.data.code)
          if (res.data.code === 0) {
            self.toastText = '发送成功'
            self.showToast = true
            setTimeout(function () {
              self.showToast = false
            }, 1000)
          } else {
            self.toastText = '发送失败'
            self.showToast = true
            setTimeout(function () {
              self.showToast = false
            }, 1000)
          }
        })
      }
    },
    closegallary () {
      this.showGallary = false
    },
    previewimg (e) {
      e.preventDefault()
      if (e.path) {
        this.gallarysrc = e.path[0].currentSrc
      } else {
        this.gallarysrc = e.srcElement.currentSrc
        console.log(e.srcElement.currentSrc)
      }
      this.showGallary = true
    },
    rejectalert () {
    }
  },
  computed: {
    newbank: function () {
      if (this.creditcard) {
        return this.creditcard.replace(/\s/g, '').replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
      }
    },
    authority: function () { // 返回上级路径
      let uri = document.referrer
      var arrurl = uri.split('/')
      console.log(arrurl[arrurl.length - 1])
      return arrurl[arrurl.length - 1]
    },
    passaudittype: function () {
      let uri = document.referrer
      var arrurl = uri.split('/')
      console.log(arrurl[arrurl.length - 1])
      if (arrurl[arrurl.length - 1] === 'financial_audit') {
        return 2
      } else {
        return 1
      }
    },
    rejectaudittype: function () {
      let uri = document.referrer
      var arrurl = uri.split('/')
      console.log(arrurl[arrurl.length - 1])
      if (arrurl[arrurl.length - 1] === 'financial_audit') {
        return -2
      } else {
        return -1
      }
    },
    showUrl: function () {
      let uri = document.referrer
      var arrurl = uri.split('/')
      console.log(arrurl[arrurl.length - 1])
      if (arrurl[arrurl.length - 1] === 'financial_audit') {
        return '/commission/addcommissionStatus'
      } else {
        return '/report/audit'
      }
    },
    showinput01: function () {
      console.log(this.check01)
      if (this.check01 === '1') {
        return false
      } else {
        return true
      }
    },
    showinput02: function () {
      console.log(this.check02)
      if (this.check02 === '1') {
        return false
      } else {
        return true
      }
    },
    showinput03: function () {
      console.log(this.check03)
      if (this.check03 === '1') {
        return false
      } else {
        return true
      }
    },
    showinput04: function () {
      console.log(this.check04)
      if (this.check04 === '1') {
        return false
      } else {
        return true
      }
    },
    showinput05: function () {
      console.log(this.check05)
      if (this.check05 === '1') {
        return false
      } else {
        return true
      }
    }
  },
  components: {
    MyTitle,
    Scroll,
    Confirm,
    Toast,
    Gallary
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/upload.css';
@import '~common/stylus/variable';

#maidDatum {
    width: 100%;
    height: 100%;
    background: #fff;
    overflow-x:hidden;
    .pic {
        width: 92%;
        margin: 0 auto;
        margin-top: 1rem;
        margin-right: 0;
        img {
            width: 6rem;
            height: 6rem;
            margin-right: 1rem;
            margin-bottom: 1rem;
        }
    }

    .container {
        top: 0;
        bottom: 55px;
        width: 100%;
        padding-top:60px;
        z-index: -1;
        .icon {
            display: inline-block;
            width: 21px;
            height: 21px;
            background-repeat: no-repeat;
            background-size: contain;
            margin-right: 10px;
        }

        .icon-s {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            background-size: contain;
            margin-right: 5px;
        }

        .icon-user {
            background-image: url('./../../common/image/user.png');
        }

        .icon-clock {
            background-image: url('./../../common/image/clock.png');
        }

        .icon-money {
            background-image: url('./../../common/image/money.png');
        }

        .icon-eye {
            background-image: url('./../../common/image/eye.png');
            margin-top: 8px;
        }

        .icon-cart {
            background-image: url('./../../common/image/cart.png');
        }

        .icon-edit {
            background-image: url('./../../common/image/edit.png');
        }
    }

    .user-info {
        padding-bottom: 0.8rem;
    }

    input[type='text'] {
        width: 90%;
        height: 35px;
        border: 1px solid #ccc;
        margin: 0 auto;
        display: block;
        color: rgba(0, 0, 0, 0.6);
        text-indent: 1rem;
        margin-bottom: 1.5rem;
    }

    .row {
        margin-bottom: 1.6rem;

        .label {
            display: inline-block;
            width: 6.5rem;
            text-align: right;
            color: #666;
        }

        .text {
            color: rgba(0, 0, 0, 0.6);
        }
    }

    .line {
        height: 8px;
        background: #eee;
    }

    .content {
        padding-top: 2rem;
    }

    .change {
        padding-left: 1rem;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        color: rgba(0, 0, 0, 0.6);

        input[type='radio'] {
            margin-right: 0.6rem;
            margin-left: 0.6rem;
        }
    }

    .title {
        height: 45px;
        background: #d2d2d2;
        line-height: 45px;
        font-size: 1rem;
        padding-left: 1rem;
        color: rgba(0, 0, 0, 0.6);
        position: relative;
        display: inline-flex;
        align-items: center;
        width: 100%;

        &::before {
            content: '';
            position: absolute;
            top: 11px;
            right: 1.5rem;
            width: 12px;
            height: 12px;
            border-top: 2px solid rgba(0, 0, 0, 0.6);
            border-right: 2px solid rgba(0, 0, 0, 0.6);
            transform: rotate(135deg);
        }
    }

    .content-title {
        font-size: 0.9rem;
        line-height: 1.2rem;
        color: rgba(0, 0, 0, 0.6);
        margin-left: 1rem;
        margin-top: 1rem;
        display: inline-flex;
        align-items: center;
    }

    .feedback {
        font-size: 0.9rem;
        line-height: 1.2rem;
        color: rgba(0, 0, 0, 0.6);
        margin-left: 1rem;
        margin-bottom: 2rem;
    }

    .feedback-text {
        color: rgba(243, 107, 67, 0.8);
    }

    .btn-box {
        width: 96%;
        margin: 0 auto;
        position: relative;
        height:40px;
        margin-bottom: 15px;
    }

    .btn {
        background: #f07632;
        width: 48%;
        height: 40px;
        font-size: 1rem;
        color: #fff;
        text-align: center;
        line-height: 40px;
        margin: 0 auto;
        border-radius: 2px;
        display: inline-block;
        position: absolute;
    }

    .fl {
        left: 0;
    }

    .fr {
        right: 0;
    }
}
</style>