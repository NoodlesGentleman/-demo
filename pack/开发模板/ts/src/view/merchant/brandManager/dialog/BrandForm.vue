<template>
  <div class="">
    <el-form
        size="small"
        label-width="80px">

      <el-form-item label="品牌名称">
        <el-input v-model="brand.name" :disabled="operationType !== '新增'  && operationType !== '修改'"
                  auto-complete="off" required="required"/>
      </el-form-item>
      <el-form-item label="品牌简称">
        <el-input v-model="brand.shortName" :disabled="operationType !== '新增' && operationType !== '修改'"
                  auto-complete="off"/>
      </el-form-item>
      <el-form-item label="大品牌">
        <el-select
            :disabled="operationType !== '新增' && operationType !== '修改'"
            v-model="brand.mainId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getBreanMainList"
            :loading="loading">
          <el-option v-if="brand.mainName"
                     :key="brand.mainId"
                     :label="brand.mainName"
                     :value="brand.mainId">
          </el-option>
          <el-option
              v-for="item in brandMains"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传图标" v-if="operationType !== '查看'">
        <!--<el-upload-->
        <!--class="upload-demo"-->
        <!--:show-file-list="false"-->
        <!--ref="upload"-->
        <!--:auto-upload="false"-->
        <!--:on-change="onFileChange"-->
        <!--:file-list="fileList"-->
        <!--:data="brand"-->
        <!--:action="actionUrl">-->
        <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
        <!--</el-upload>-->
        <el-upload
            class="upload-demo"
            :on-success="submitSuccess"
            :on-change="onFileChange"
            action="/api/merchant/uploadLogo">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>

      </el-form-item>
      <el-form-item><img width="25%" :src="brand.logo" v-if="showImage || brand.logo"></el-form-item>
      <el-form-item label="签约情况">
        <el-select :value="brand.signedStatus"
                   v-model="brand.signedStatus"
                   :disabled="operationType !== '新增' && operationType !== '修改'"
                   placeholder="签约情况">
          <el-option v-for="(signedStatus, key) in signedStatuses"
                     :label="signedStatus.displayValue"
                     :value="Number(signedStatus.value)" :key="key"/>
        </el-select>

      </el-form-item>
      <el-form-item label="系统模式">
        <el-select :value="brand.systemType"
                   v-model="brand.systemType"
                   :disabled="operationType !== '新增' && operationType !== '修改'"
                   placeholder="系统模式">
          <el-option v-for="(systemType, key) in systemTypes"
                     :label="systemType.displayValue"
                     :value="Number(systemType.value)" :key="key"/>
        </el-select>

      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" :disabled="operationType !== '新增' && operationType !== '修改'" :rows="5"
                  placeholder="请输入简介"
                  v-model="brand.profile"/>
      </el-form-item>
      <el-form-item label="商家评价">
        <el-input type="textarea" :disabled="operationType !== '新增' && operationType !== '修改'" :rows="5"
                  placeholder="请输入商家评价"
                  v-model="brand.evaluate"/>
      </el-form-item>
      <el-form-item label="主营产品">
        <el-input type="textarea" :disabled="operationType !== '新增' && operationType !== '修改'" :rows="5"
                  placeholder="请输入主营产品信息"
                  v-model="brand.mainProduct"/>
      </el-form-item>
      <el-form-item label="商家特色">
        <el-input type="textarea" :disabled="operationType !== '新增' && operationType !== '修改'" :rows="5"
                  placeholder="请输入商家特色"
                  v-model="brand.mainSpecific"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import Brand from '../model/Brand'
import { getSignedStatuses, getSystemType } from '../../../../shared/util/service'
import ResPage from '../../../../model/ResPage'
import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import { Upload } from 'element-ui'
import { assert } from '../../../../shared/util/logger'

interface ElUpload extends Upload {
  submit: () => void
  clearFiles: () => void
}

@Component({
  name: 'BrandForm'
})
export default class BrandForm extends Vue {

  @Prop()
  brand: Brand

  @Prop()
  operationType: string

  brandMains: any[] = []
  actionUrl = ''
  loading: boolean = false
  showImage = false
  fileList = []
  systemTypes: OptionItem[] = []
  signedStatuses: OptionItem[] = []
  $refs: {
    upload: ElUpload
  }

  async getBreanMainList (query: string) {
    if (query !== '') {
      this.loading = true
      const res = await this.$http.postParams<ResPage<any>>('/merchant/getBrandMainList', { name: query })
      this.brandMains = res.rows
      this.loading = false
    } else {
      this.brandMains = []
    }
  }

  async created () {
    this.systemTypes = await getSystemType()
    this.signedStatuses = await getSignedStatuses()
  }

  onFileChange (file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail[]) {
    // this.actionUrl = this.operationType === '新增' ? '/api/merchant/addBrand' : '/api/merchant/updateBrand'
    if (!file.raw.type.startsWith('image')) {
      assert(false, '只能选择图片格式的文件!')
      fileList.splice(this.fileList.length - 1, 1)
    }

  }


  // submit () {
  //   this.$refs.upload.submit()
  // }

  submitSuccess (response: any, file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail[]) {
    if (response !== 'error') {
      console.log(file.url)
      this.showImage = false
      this.brand.logo = response
      this.showImage = true
      this.$alert('图片上传成功', '提示', {
        confirmButtonText: '确定'
      })
    } else {
      this.$alert('图片上传失败', '提示', {
        confirmButtonText: '确定'
      })
    }
    if (fileList.length > 1) {
      fileList.splice(0, 1)
    }
  }


}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
