<template>
  <div class="uploadSys">
    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
      <template v-if="item.status === 'finished'">
        <img style="width:100%" :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="md-arrow-round-up" @click.native="positionUp(item,uploadList)"/>
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          <Icon type="md-arrow-round-down" @click.native="positionDown(item,uploadList)"/>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload ref="upload" multiple type="drag" style="display:flex;"
     :show-upload-list="false" 
     :default-file-list="uploadList" 
     :on-success="handleSuccess" :format="['jpg','jpeg','png']" 
     :max-size="2048" :on-format-error="handleFormatError" 
     :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" 
     :data="uploadData"
     :action="host">
      <div style="width:100px;min-height:100px;line-height:100px;">
        <Icon type="ios-camera" size="28"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width:100%">
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "@/ext-nb";
import { HttpResponse } from "@/model/http/httpResponse";
import { getProgrammeAliUploadAccess } from "@/api/aliOss";
import { _getFileName, getAliImageUrlWithLocal } from "@/libs/AliSign";

@Component({})
export default class UploadSys extends Vue {
  $refs!: {
    upload: any;
  };
  @Prop() defaultList!: any[] // 修改时已上传的数据
  exlist: any[] = []
  filename: string = ''
  accessid: string = ''
  signature: string = ''
  expire: string = ''
  host: string = ''
  dir: string = ''
  policy: string = ''
  uploadData = {}
  // 查看
  imgUrl: string = "";
  visible: boolean = false; // 查看图片模态框
  uploadList: any[] = []; // 待提交列表
  @Watch('uploadList') 
  changeUpLoadList(newValue: any) {
    this.$emit('pullUploadList', newValue)
  }
  @Watch('defaultList') 
  init(newValue: any) {
    this.uploadList = newValue
  }
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this._getProgrammeAliUploadAccess()
  }
  async handleBeforeUpload(file: any, fileList: any[]) { // 上传之前
    this.filename = await _getFileName(file.name, this.dir)
    this.uploadData = {
      key: this.filename,
      policy: this.policy,
      OSSAccessKeyId: this.accessid,
      success_action_status: '200',
      signature: this.signature
    }
  }
  handleSuccess(res: any, file: any) { // 上传成功之后
    file.url = getAliImageUrlWithLocal(this.filename);
    this.uploadList.push(file)
  }
  handleView(item: any) { // 查看
    this.imgUrl = item.url;
    this.visible = true;
  }
  handleRemove(file: any) { // 删除
    this.uploadList.splice(this.uploadList.indexOf(file), 1);
  }
  _getAliImageUrlWithLocal(name: string) {
    return getAliImageUrlWithLocal(name)
  }
  // 位置调整
  positionUp(file: any, list: any) { // 上移
    if (list.indexOf(file) === 0) {
      return
    }
    this.changearr(list, list.indexOf(file), list.indexOf(file) - 1)
  }
  positionDown(file: any, list: any) { // 下移
    if (list.indexOf(file) === list.length - 1) {
      return
    }
    this.changearr(list, list.indexOf(file), list.indexOf(file) + 1)
  }
  changearr(arr: any[], index1: number, index2: number) {// 改变数组下标实现上下移动
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr
  }
  async _getProgrammeAliUploadAccess() { // 获取签名凭证
    const res: HttpResponse = await getProgrammeAliUploadAccess()
    if (res.responseCode === 0) {
      this.host = res.responseData.host
      this.accessid = res.responseData.accessid
      this.expire = res.responseData.expire
      this.dir = res.responseData.dir
      this.policy = res.responseData.policy
      this.signature = res.responseData.signature
    }
  }
  handleFormatError(file: any) { // 上传错误
    this.$Notice.warning({
      title: "错误",
      desc:
        "您上传的 " +
        file.name +
        " 格式不正确"
    });
  }
  handleMaxSize(file: any) { // 大小超出
    this.$Notice.warning({
      title: "文件大小不规范",
      desc: "您上传的  " + file.name + "的大小不符合规范 "
    });
  }
}
</script>


<style>
  .demo-upload-list {
    display:inline-block;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    margin-left: 5px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }
  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .ivu-upload{
    display: flex;
  }
</style>

