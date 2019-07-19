<template>
	<div class="vue-uploader">
		<div class="file-list">
			<section v-for="(file, index) in files" class="file-item draggable-item" :key="file">
				<img :src="file" alt="" ondragstart="return false;" @click="previewImage(file)">
				<span class="file-remove" @click="remove(index)">+</span>
			</section>
			<section class="file-item">
				<div class="add" @click="chooseImage">
					<span style="color:#ccc;font-size:3rem;">+</span>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import { wechatlib } from '../../config/wxJDK'
export default {
  props: {
    max: Number // 图片数量
  },
  data: () => ({
    files: [],
    serverId: [],
    ceshi: ['123', '222', '3333']
  }),
  mounted() {
    this._wxconfig()
  },
  methods: {
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
      this.files.splice(i, 1)
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
  display: none;
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
.vue-uploader > input[type='file'] {
  display: none;
}
</style>