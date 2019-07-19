<!-- 
  @user slipkinem
  @date 3/14/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <el-form :model="cardBinForm"
           size="small"
           label-width="80px">
    <el-form-item label="卡类型名称">
      <el-input v-model="cardBinForm.cardBinName"
                :disabled="operationType === 'view'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="卡bin号">
      <el-input v-model="cardBinForm.cardBin"
                :disabled="operationType === 'view'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="保险公司">
      <el-select
          :disabled="operationType === 'view'"
          v-model="cardBinForm.insuranceName"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="getInsuranceListByName"
          :loading="loading">
        <el-option
            v-for="item in insuranceList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="卡样图片">
      <el-upload
          class="upload-demo"
          :show-file-list="false"
          ref="upload"
          :on-change="onFileChange"
          :on-success="onSuccess"
          :on-error="onError"
          :data="cardBinForm"
          :file-list="fileList"
          action="/api/stock/uploadTemplate">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
    </el-form-item>
    <el-form-item><img width="50%" :src="cardBinForm.templateUrl" v-if="cardBinForm.templateUrl">
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import CardBin from '../model/CardBin'
import { ElUploadInternalFileDetail, FileListItem } from 'element-ui/types/upload'
import { assert } from '../../../../shared/util/logger'
import { Upload } from 'element-ui'

interface ElUpload extends Upload {
  submit: () => void
  clearFiles: () => void
}

@Component
export default class CardBinForm extends Vue {
  @Prop()
  cardBinForm: CardBin

  @Prop({
    default: () => 'edit'
  })
  operationType: string

  fileList = []

  genders: OptionItem[] = []
  idCardTypes: OptionItem[] = []
  loading: boolean = false
  showImage = false
  insuranceList: any[] = []
  actionUrl = ''
  fileUrl: string = ''

  $refs: {
    upload: ElUpload
  }


  async getInsuranceListByName (query: string) {
    if (query !== '') {
      this.loading = true
      const res = await this.$http.get<OptionItem[]>('/getInsuranceListByName', { query: query })
      this.insuranceList = res
      this.loading = false
    } else {
      this.insuranceList = []
    }
  }

  onFileChange (file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail[]) {
    assert(file.raw.type.startsWith('image'), '只能选择图片格式的文件!')
  }

  onSuccess (response: any, file: FileListItem, fileList: FileListItem[]) {
    if (response.responseCode !== 0) {
      this.$alert('上传失败' + response.responseMessage, '提示', {
        confirmButtonText: '确定'
      })
    } else {
      this.cardBinForm.templateUrl = response.responseData
    }
  }

  onError (err: any, file: any, fileList: any) {
    console.log(err)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
