<template>
  <div class="">
    <el-form
        size="small"
        label-width="80px">
      <el-form-item label="商品库">
        <el-input v-model="goodVo.name"/>
      </el-form-item>
      <el-form-item label="文件">
        <el-upload
            class="upload-demo"
            ref="upload"
            :on-success="submitSuccess"
            :on-change="onFileChange"
            :auto-upload="false"
            :action="actionUrl"
            :data="goodVo"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea"
                  disabled="true"
                  v-model="memo"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import GoodsVo from '../model/GoodsVo'
import { Upload } from 'element-ui'
import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import * as _ from 'lodash'

interface ElUpload extends Upload {
  submit: () => void
  clearFiles: () => void
}

@Component({
  name: 'GoodsForm'
})
export default class GoodsForm extends Vue {

  @Prop()
  goodVo: GoodsVo

  memo = ''

  operationType: string

  @Prop({
    default: () => 'add'
  })
  type: string
  actionUrl: string = ''
  $refs: {
    upload: ElUpload
  }

  onFileChange (file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail[]) {
    console.log(this.type)
    if (this.type === 'update') {
      this.actionUrl = '/api/merchant/insertWareHouse'
    } else {
      this.actionUrl = '/api/merchant/insertWareHouse'
    }
    if (!(file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))) {
      this.$alert('只能选择xls或者xlsx格式的文件!', '提示', {
        confirmButtonText: '确定'
      })
      fileList.splice(0)
    }
    if (fileList.length > 1) {
      fileList.splice(0, 1)
    }
  }

  async submitUpload () {
    if (_.isUndefined(this.goodVo.name)) {
      this.$alert('请输入药品库名称', '提示', {
        confirmButtonText: '确定'
      })
      return
    }
    this.$refs.upload.submit()
  }

  submitSuccess (response: any, file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail) {
    if (response.responseCode === 0) {
      this.memo = response.responseData
      this.$alert('上传成功', '提示', {
        confirmButtonText: '确定'
      })
    } else {
      this.$alert('上传失败', '提示', {
        confirmButtonText: '确定'
      })
    }
  }


}


</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
