<template>
  <el-form size="small"
           label-width="105px">
    <el-form-item label="商户名称">
      <el-select
          filterable
          v-model="data.merchantId"
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="getMerchantList"
          :loading="loading">
        <el-option
            v-for="item in merchantItem"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否演示">
      <el-select v-model="data.isDemo" placeholder="是否演示">
        <el-option label="是" value="1"/>
        <el-option label="否" value="0"/>
      </el-select>
    </el-form-item>
    <el-form-item label="门店名单">
      <el-upload
          class="upload-demo"
          ref="upload"
          :on-success="submitSuccess"
          :auto-upload="false"
          :data="data"
          :on-change="onFileChange"
          :action="actionUrl">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <a :href="fileUrl" v-if="fileUrl!=='0'">下载错误文件</a>
      </el-upload>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" disabled="true"
                v-model="data.memo"/>
    </el-form-item>
  </el-form>

</template>


<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import ResPage from '../../../../model/ResPage'
import { Upload } from 'element-ui'
import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import _ from 'lodash'

interface ElUpload extends Upload {
  submit: () => void
  clearFiles: () => void
}

class Data {
  merchantId: number
  isDemo: number
  memo: string
}

@Component({
  name: 'ShopEditForm'
})
export default class ShopEditForm extends Vue {

  loading = false
  merchantItem: any[] = []
  data: Data = new Data()
  @Prop({
    default: () => 'add'
  })
  type: string
  fileUrl = '0'
  actionUrl: string = ''
  $refs: {
    upload: ElUpload
  }

  onFileChange (file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail[]) {
    if (this.type === 'update') {
      this.actionUrl = '/api/merchant/uploadShopXlsUpdate'
    } else {
      this.actionUrl = '/api/merchant/uploadShopXls'
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
    if (_.isUndefined(this.data.merchantId)) {
      this.$alert('请选择商家', '提示', {
        confirmButtonText: '确定'
      })
      return
    }
    if (_.isUndefined(this.data.isDemo)) {
      this.$alert('请选择是否演示', '提示', {
        confirmButtonText: '确定'
      })
      return
    }
    this.$refs.upload.submit()
  }

  submitSuccess (response: any, file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail) {
    if (response.responseCode === 0) {
      this.data.memo = response.responseData.message
      this.fileUrl = response.responseData.path
      this.$alert('上传成功', '提示', {
        confirmButtonText: '确定'
      })
    } else {
      this.$alert('上传失败', '提示', {
        confirmButtonText: '确定'
      })
    }
  }

  async getMerchantList (query: string) {
    if (query !== '') {
      this.loading = true
      const res = await this.$http.postParams<ResPage<any>>('/merchant/getMerchantList', { merchantName: query })
      this.merchantItem = res.rows
      this.loading = false
    } else {
      this.merchantItem = []
    }
  }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
