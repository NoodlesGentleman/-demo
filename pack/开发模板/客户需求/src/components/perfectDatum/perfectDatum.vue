<template>
	<transition name="prefect">
		<div id="prefect">
			<my-title title="完善业务资料" :toUrl="toUrl"></my-title>
			<div class="container">
				<div>
					<div class="user-info">
						<div class="row">
							<span class="label">报备单号：</span>
							<span class="text">{{reportid}}</span>
						</div>
						<div class="row">
							<span class="label">带看项目：</span>
							<span class="text">{{projectName}}</span>
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
            <div class="feedback" v-show="fade01">
								<span style="margin-right:0.5rem">反馈:</span>
                <span class="feedback-text" v-if="audittype == '-2'">{{responce01}}(财务）</span>
                  <span class="feedback-text" v-else-if="audittype == '-1'">{{responce01}}(项目对接人:{{auditPersonName}}）</span>
								<span class="feedback-text" v-else>{{responce01}}5555</span>
							</div>
						<div class="btn" @click="consummate">完善个人信息</div>
					</div>
					<div class="line"></div>
					<div class="content">
						<div style="width: 100%">
							<div :class="showclass">
								<i class="icon icon-money"></i>
								<span>佣金结算方式</span>
							</div>
							<div class="change">
								<span>垫佣：</span>
                <label for="r1">
                  	<input type="radio" name="commission" value="1" v-model="picked" id="r1" style="left:1rem"><b></b>是（70%佣金）
                </label>
							<label for="r2">
                <input type="radio" name="commission" value="0" v-model="picked" id="r2"  style="left:1rem"><b></b>否（80%佣金）
              </label>
								
							</div>
							<div class="feedback" v-show="fade02">
								<span style="margin-right:0.5rem">反馈:</span>
                <span class="feedback-text" v-if="audittype=='-2'">{{responce02}}(财务）</span>
                  <span class="feedback-text" v-else-if="audittype=='-1'">{{responce02}}(项目对接人:{{auditPersonName}}）</span>
								<span class="feedback-text" v-else>{{responce02}}</span>
							</div>
						</div>
						<div style="width: 100%">
							<div :class="showclass">
								<i class="icon icon-eye"></i>
								<span>完善带看资料</span>
							</div>
							<div class="content-title">
								<i class="icon-s icon-clock"></i>带看单（限一张图片）
							</div> 
							<div class="vue-uploader">
		                     <div class="file-list">
			                  <section v-for="(file, index) in imgsrc01" class="file-item draggable-item" :key="index" v-show="imgsrc01">
				               <img :src='configurl+"/checkoutCommission/tem/"+ reportid +"/"+file' alt="" ondragstart="return false;" @click="previewimg">
				                <span class="file-remove" @click="remove01(index)" v-show="showsubmit">+</span>
			                  </section>
			                 <section class="file-item">
				               <div class="add" @click="chooseImage">
					            <span style="color:#ccc;font-size:3rem;">+</span>
				              </div>
                             <input type="file" @change="changeFn01($event)"  accept="image/*" />
			                </section>
		                  </div>
	                     </div>
							<div class="feedback" v-show="fade03">
								<span style="margin-right:0.5rem">反馈：</span>
                	<span class="feedback-text" v-if="audittype=='-2'">{{responce03}}(财务）</span>
                  <span class="feedback-text" v-else-if="audittype=='-1'">{{responce03}}(项目对接人:{{auditPersonName}}）</span>
								<span class="feedback-text" v-else>{{responce03}}</span>
							</div>
						</div>
						<div style="width: 100%">
							<div :class="showclass">
								<i class="icon icon-cart"></i>
								<span>完善订购资料</span>
							</div>
							<div class="content-title">
								<i class="icon-s icon-clock"></i>
								<span>订购单（最多2张图片）</span>
							</div>
		                    <div class="vue-uploader">
		                     <div class="file-list">
			                 <section v-for="(file, index) in  imgsrc02" class="file-item draggable-item" :key="index" ref="upload02">
				              <img :src='configurl+"/checkoutCommission/tem/"+ reportid +"/"+file' alt="" ondragstart="return false;" @click="previewimg">
				              <span class="file-remove" @click="remove02(index)" v-show="showsubmit">+</span>
			                 </section>
			                 <section class="file-item">
				              <div class="add" @click="chooseImage">
					           <span style="color:#ccc;font-size:3rem;">+</span>
				              </div>
                              <input type="file" @change="changeFn02($event)"  accept="image/*"/>
			                </section>
		                    </div>
	                       </div>
							<div class="feedback" v-show="fade04">
								<span style="margin-right:0.5rem">反馈：</span>
                <span class="feedback-text" v-if="audittype=='-2'">{{responce04}}(财务）</span>
                  <span class="feedback-text" v-else-if="audittype=='-1'">{{responce04}}(项目对接人:{{auditPersonName}}）</span>
								<span class="feedback-text" v-else>{{responce04}}</span>
							</div>
						</div>
						<div style="width: 100%">
							<div :class="showclass">
								<i class="icon icon-edit"></i>
								<span>完善签约资料</span>
							</div>
							<div class="content-title">
								<i class="icon-s icon-clock"></i>
								<span style="width: 95%">签约（提供合同的访问信息页图片，客户信息页图片，付款方式页，签字页，收款收据或发票，限6张图）
								</span>
							</div>
							<div class="vue-uploader vue-uploader03">
		                     <div class="file-list">
			                  <section v-for="(file, index) in imgsrc03" class="file-item draggable-item" :key="index" rel="upload03">
				               <img :src='configurl+"/checkoutCommission/tem/"+ reportid +"/"+file'  alt="" ondragstart="return false;" @click="previewimg">
				               <span class="file-remove" @click="remove03(index)" v-show="showsubmit">+</span>
			                 </section>
			                 <section class="file-item">
				             <div class="add" @click="chooseImage">
					          <span style="color:#ccc;font-size:3rem;">+</span>
				             </div>
                             <input type="file" @change="changeFn03($event)"  accept="image/*"/>
			                 </section>
		                    </div>
	                        </div>
							<div class="feedback" v-show="fade05" style="margin-bottom:3rem">
								<span style="margin-right:0.5rem">反馈：</span>
                <span class="feedback-text" v-if="audittype=='-2'">{{responce05}}(财务）</span>
                  <span class="feedback-text" v-else-if="audittype=='-1'">{{responce05}}(项目对接人:{{auditPersonName}}）</span>
								<span class="feedback-text" v-else>{{responce05}}</span>
							</div>
						</div>
						<div class="btn" @click="submitdata" v-show="showsubmit" style="margin-bottom:15px">提交</div>
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
import { showDetail, uploadImg, msgsubmit } from 'api/perfectDatum'
import Confirm from 'base/confirm/confirm'
import Uploader from 'base/image-uploader/inputupload'
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Toast from 'base/toast/toast'
import Gallary from 'base/gallary/gallary'
export default {
  data: () => ({
    files: [],
    reportid: '',
    projectName: '',
    realName: '',
    idcard: '',
    bank: '',
    creditcard: '',
    picked: 0,
    confirmText: '',
    datumDetail: [],
    auditperson: '',
    imgsrc01: [],
    imgsrc02: [],
    imgsrc03: [],
    datas: {},
    audittype: '',
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
    auditPersonName: '',
    toUrl: 'toUrl'
  }),
  created () {
    console.log(this.audittype)
    let uri = document.referrer
    var arrurl = uri.split('/')
    console.log(arrurl[arrurl.length - 1])
    this.configurl = baseUrl
    console.log(this.configurl)
  },
  components: {
    Confirm,
    Uploader,
    MyTitle,
    Scroll,
    Toast,
    Gallary
  },
  computed: {
    newbank: function () {
      if (this.creditcard) {
        return this.creditcard.replace(/\s/g, '').replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
      }
    },
    show: function () {
      if (this.audittype === '') {
        return true
      }
      if (this.audittype > 0) {
        return false
      }
      if (this.audittype < 0) {
        return true
      }
    },
    fade01: function () {
      if (this.audittype < 0 && this.responce01) {
        return true
      } else {
        return false
      }
    },
    fade02: function () {
      if (this.audittype < 0 && this.responce02) {
        return true
      } else {
        return false
      }
    },
    fade03: function () {
      if (this.audittype < 0 && this.responce03) {
        return true
      } else {
        return false
      }
    },
    fade04: function () {
      if (this.audittype < 0 && this.responce04) {
        return true
      } else {
        return false
      }
    },
    fade05: function () {
      if (this.audittype < 0 && this.responce05) {
        return true
      } else {
        return false
      }
    },
    showsubmit: function () {
      if (this.audittype > 0) {
        return false
      } else {
        return true
      }
    },
    showclass: function () {
      console.log(this.audittype)
      if (this.audittype === 1 || this.audittype === 2) {
        return 'active'
      } else {
        return 'title'
      }
    }
  },
  mounted() {
    this._showDetail()
  },
  methods: {
    _showDetail() {
      showDetail(location.search.split('=')[1]).then(res => {
        console.log(res.data.data.auditPersonName)
        this.projectName = res.data.data.projectName
        this.reportid = res.data.data.reportid
        this.realName = res.data.data.realName
        this.idcard = res.data.data.idcard
        this.bank = res.data.data.bank
        this.creditcard = res.data.data.creditcard
        this.auditperson = res.data.data.userid
        if (res.data.data.audittype) {
          this.audittype = res.data.data.audittype
        }
        if (res.data.data.auditPersonName) {
          this.auditPersonName = res.data.data.auditPersonName
        }
        if (res.data.data.datas) {
          this.datas = Object.assign({}, {}, res.data.data.datas)
          console.log(this.datas.group0.response)
          console.log(this.responce01)
          this.picked = this.datas.group1.checkbox
          if (this.datas.group0.response) {
            console.log(this.responce01)
            this.responce01 = this.datas.group0.response
            console.log(this.responce01)
          }
          if (this.datas.group1.response) {
            this.responce02 = this.datas.group1.response
          }
          if (this.datas.group2.response) {
            this.responce03 = this.datas.group2.response
          }
          if (this.datas.group3.response) {
            this.responce04 = this.datas.group3.response
          }
          if (this.datas.group4.response) {
            this.responce05 = this.datas.group4.response
          }
          if (this.datas.group2.urls) {
            this.imgsrc01 = this.datas.group2.urls
          }
          if (this.datas.group3.urls) {
            this.imgsrc02 = this.datas.group3.urls
          }
          console.log(this.datas.group4.urls)
          if (this.datas.group4.urls) {
            this.imgsrc03 = this.datas.group4.urls
          }
          console.log(this.datas.group0.responce)
        }
      })
    },
    consummate() {
      // window.location.href = 'http://localhost:8080/registration'
      window.location.href = '/registration'
    },
    changeFn01(e) {
      /* var self = this
      console.log('1111')
      console.log(self._imgsrc01)
      self._imgsrc01.push('aaaaa')
      console.log(self._imgsrc01) */
      let self = this
      /* console.log(self.imgsrc01)
      let files = e.target.files || e.dataTransfer.files
      let formdata = new FormData()
      for (let i = 0; i < files.length; i++) {
        formdata.append('files', files[i])
      }
      console.log(files)
      formdata.append('reportid', this.reportid)
      formdata.append('flag', '2')
      console.log(self.imgsrc01) */
      if (self.imgsrc01.length >= 1) {
        self.toastText = '图片不能超过一张'
        self.showToast = true
        setTimeout(function () {
          self.showToast = false
        }, 1000)
        e.preventDefault()
        return
      } else {
        console.log(self.imgsrc01)
        let files = e.target.files || e.dataTransfer.files
        let formdata = new FormData()
        for (let i = 0; i < files.length; i++) {
          formdata.append('files', files[i])
        }
        console.log(files)
        formdata.append('reportid', this.reportid)
        formdata.append('flag', '2')
        console.log(self.imgsrc01)
        uploadImg(formdata).then(res => {
          self.imgsrc01.push(res.data.data[0])
        })
        console.log(self.imgsrc01)
      }
    },
    changeFn02(e) {
      console.log('1111')
      let self = this
      let files = e.target.files || e.dataTransfer.files
      let formdata = new FormData()
      for (let i = 0; i < files.length; i++) {
        formdata.append('files', files[i])
      }
      console.log(self.imgsrc02)
      formdata.append('reportid', this.reportid)
      formdata.append('flag', '3')
      if (self.imgsrc02.length >= 2) {
        self.toastText = '图片不能超过两张'
        self.showToast = true
        setTimeout(function () {
          self.showToast = false
        }, 1000)
        e.preventDefault()
        return
      } else {
        uploadImg(formdata).then(res => {
          self.imgsrc02.push(res.data.data[0])
        })
        console.log(self.imgsrc02)
      }
    },
    changeFn03(e) {
      let self = this
      let files = e.target.files || e.dataTransfer.files
      let formdata = new FormData()
      for (let i = 0; i < files.length; i++) {
        formdata.append('files', files[i])
      }
      console.log(files)
      formdata.append('reportid', this.reportid)
      formdata.append('flag', '3')
      if (self.imgsrc03.length >= 6) {
        self.toastText = '图片不能超过六张'
        self.showToast = true
        setTimeout(function () {
          self.showToast = false
        }, 1000)
        e.preventDefault()
        return
      } else {
        uploadImg(formdata).then(res => {
          self.imgsrc03.push(res.data.data[0])
        })
        console.log(self.imgsrc03)
      }
    },
    remove01(i) {
      console.log('1111')
      // this.newsrc.splice(i, 1)
      // this._imgsrc02 = this._imgsrc02.splice(i, 1)
      this.imgsrc01.splice(i, 1)
      console.log(this.imgsrc01.splice(i, 1))
      console.log(this.imgsrc01)
    },
    remove02(i) {
      console.log('1111')
      // this.newsrc.splice(i, 1)
      // this._imgsrc02 = this._imgsrc02.splice(i, 1)
      this.imgsrc02.splice(i, 1)
      console.log(this.imgsrc02.splice(i, 1))
      console.log(this.imgsrc02)
    },
    remove03(i) {
      console.log('1111')
      // this.newsrc.splice(i, 1)
      // this._imgsrc02 = this._imgsrc02.splice(i, 1)
      this.imgsrc03.splice(i, 1)
      console.log(this.imgsrc03.splice(i, 1))
      console.log(this.imgsrc03)
    },
    submitdata() {
      let postdata = {}
      postdata.auditperson = this.auditperson
      postdata.audittype = '0'
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
      msgsubmit(postdata).then(res => {
        let self = this
        console.log(res)
        console.log(res.data.code)
        if (res.data.code === 0) {
          self.toastText = '发送成功'
          self.showToast = true
          setTimeout(function () {
            self.showToast = false
          }, 1000)
          window.history.go(-1)
        } else {
          self.toastText = '发送失败'
          self.showToast = true
          setTimeout(function () {
            self.showToast = false
          }, 1000)
        }
      })
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
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/upload.css';

#prefect {
	width: 100%;
	height: 100%;
	background: #fff;
  overflow-x: hidden;
	.container {
		top: 50px;
		bottom: 55px;
		width: 100%;
		padding-top: 70px;
		z-index: -1

		.icon {
			display: inline-block;
			width: 23px;
			height: 23px;
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
			width: 20px;
			height: 20px;
		}
	}

	.user-info {
		padding-bottom: 0.8rem;
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
		margin-top: 1rem;
		margin-bottom: 1rem;
		color: rgba(0, 0, 0, 0.6);

		input[type='radio'] {
			/* margin-right: 0.6rem; */
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
			right: 2rem;
			width: 12px;
			height: 12px;
			border-top: 2px solid rgba(0, 0, 0, 0.6);
			border-right: 2px solid rgba(0, 0, 0, 0.6);
			transform: rotate(135deg);
		}
	}

  .active{
    height: 45px;
		background: #f07632;
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
			right: 2rem;
			width: 12px;
			height: 12px;
			border-top: 2px solid rgba(0, 0, 0, 0.6);
			border-right: 2px solid rgba(0, 0, 0, 0.6);
			transform: rotate(135deg);
		}
  }

	.content-title {
		font-size: 0.85rem;
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

	.btn {
		background: #f07632;
		width: 96%;
		height: 40px;
		font-size: 1rem;
		color: #fff;
		text-align: center;
		line-height: 40px;
		margin: 0 auto;
		border-radius: 2px;
    bottom: 0;

	}

}
</style>