<template>
	<div class="vue-uploader">
		<div class="file-list">
      {{imgsrc}}
			<section v-for="(file, index) in imgsrc" class="file-item draggable-item" :key="index">
				<img :src='"http://192.168.3.9:8080/checkoutCommission/"+ reportid +"/"+file' alt="" ondragstart="return false;" @click="previewImage(file)">
				<span class="file-remove" @click="remove(index)">+</span>
			</section>
			<section class="file-item">
				<div class="add" @click="chooseImage">
					<span style="color:#ccc;font-size:3rem;">+</span>
				</div>
                <input type="file" @change="changeFn($event)"  accept="image/*"/>
			</section>
		</div>
	</div>
</template>

<script>
import { wechatlib } from '../../config/wxJDK'
export default {
  props: {
    max: Number, // 图片数量
    imgid: [],
    imgsrc: Array,
    reportid: String
  },
  // data: () => ({
  //   files: [],
  //   serverId: [],
  //   ceshi: ['123', '222', '3333'],
  //   deviceArray: [],
  //   images: [],
  //   _imgsrc: this.imgsrc
  // }),
  watch: {
    'imgsrc' (curVal, oldVal) {
      console.log(curVal, oldVal)
    }
  },
  mounted() {
    this._wxconfig()
  },
  // computed: {
  //   _imgsrc: function () {
  //     console.log(this.imgsrc)
  //     return this.imgsrc
  //   }
  // },
  methods: {
    changeFn(e) {
      /* let deviceFile = e.target.files
      let formData = new FormData()
      var reader = new FileReader()
      reader.readAsDataURL(deviceFile[0])
      reader.onload = function(e) {
        console.log(this.result)
      }
      for (let i = 0; i < deviceFile.length; i++) {
        formData.append('file', deviceFile[i])
      }
      console.log(deviceFile) */
      let files = e.target.files || e.dataTransfer.files
      let formData = new FormData()
      // console.log(this._imgsrc.length)
      /* if (this._imgsrc.length >= 1) {
        alert('1111')
        return
      } */
      for (let i = 0; i < files.length; i++) {
        formData.append('files', formData)
      }
      this.$emit('imgid', files)
      console.log(files)
      console.log(formData)
      if (!files.length) return
      // this.createImage(files)
    },
    createImage(file) {
      // var image = new Image()
      var vm = this
      var leng = file.length
      for (var i = 0; i < leng; i++) {
        var reader = new FileReader()
        reader.readAsDataURL(file[i])
        reader.onload = function(e) {
          vm.images.push(e.target.result)
        }
      }
    },
    _wxconfig() {
      const url = location.href.split('#')[0]
      wechatlib(this, url)
    },
    // 选择图片
    chooseImage() {
      const self = this
      self.wx.chooseImage({
        count: this.max, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 防止图片超出限制张数
          res.localIds.map(i => {
            if (self.files.length === self.max) {
              self.files.shift()
              self.files.unshift(i)
            } else {
              self.files.push(i)
            }
          })
        }
      })
      self.files.map(function(item, key, ary) {
        self.wx.uploadImage({
          localId: item,
          success: function (res) {
          // alert('已上传：' + i + '/' + length);
            self.serverId.push(res.serverId)
          },
          fail: function (res) {
            alert(JSON.stringify(res))
          }
        })
        console.log(item)
      })
      this.$emit('imgid', this.serverId)
    },
    // 删除图片
    remove(i) {
      this.images.splice(i, 1)
      this.imgid.splice(i, 1)
      this._imgsrc.splice(i, 1)
      console.log(this.imgid)
      this.$emit('newsrc', this._imgsrc)
    },
    // 预览图片
    previewImage(currentImg) {
      const self = this
      self.wx.previewImage({
        current: currentImg, // 当前显示图片的http链接
        urls: self.files // 需要预览的图片http链接列表
      })
    }
  }
}
</script>
<style>
.vue-uploader {
  background: #fff;
  padding: 1rem;
  padding-top: 0;
  padding-bottom: 0;
}
.vue-uploader .file-list {
  padding: 15px 0px;
}
.vue-uploader .file-list:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 100px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 91px;
  height: 91px;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 12px;
  top: 4px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 85px;
  height: 85px;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 75px;
  border: 4px solid #d3d2d3;
  font-size: 30px;
  cursor: pointer;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.vue-uploader  input[type='file'] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>