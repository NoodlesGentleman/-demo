<template>
  <div class="contract">
    <el-form-item label="姓名">
      <el-input type="textarea"
                placeholder="请输入上传人姓名"
                v-model="data.name"/>
    </el-form-item>
    <MainComponent
        url="/getEnclosure"
        :handleQueryParams="handleQueryParams"
        :forms="forms"
        ref="pkMain"
        @handleCurrentRowChange="handleCurrentRowChange"
        :columns="columns">
      <template slot="dispose">
        <el-upload
            class="upload-demo"
            ref="upload"
            :on-success="submitSuccess"
            :on-change="onFileChange"
            :auto-upload="false"
            :action="actionUrl"
            :data="data"
        >
          <el-button slot="trigger" size="small" v-if="operationType == 'show'" type="primary">选取文件</el-button>
          <el-button size="small" type="success" v-if="operationType == 'show'" @click="submitUpload">上传到服务器</el-button>
          <el-button size="small" type="success" v-if="operationType == 'show'" @click.native="download">下载</el-button>
        </el-upload>
      </template>
    </MainComponent>
  </div>
</template>


<script lang="ts">
import MainComponent from '../../../../components/main'
import { Component, Prop, Vue } from '../../../../ext-nb'
import ContractModel from '../model/ContractModel'
import { ElUploadInternalFileDetail } from 'element-ui/types/upload'
import { Upload } from 'element-ui'
import { Params } from '../../../../components/main/model/Form'
import Enclosure from '../model/Enclosure'
import { multiDownloadFile } from '../../../../shared/util/multiDownloadFile'

interface ElUpload extends Upload {
  submit: () => void
  clearFiles: () => void
}

class Data {
  contractId: number
  name: string
}

@Component({
  components: {
    MainComponent
  }
})


export default class ContractDownloadForm extends Vue {
  currentRow: ContractDownloadForm
  dialogFormParams: Enclosure = new Enclosure()
  @Prop({
    default: () => new ContractModel()
  })
  contractModel: ContractModel
  @Prop()
  operationType: string
  data: Data = new Data()
  @Prop({
    default: () => 'add'
  })
  type: string
  params: Params
  fileUrl = '0'
  tabActive = 'enclosure'
  actionUrl: string = ''
  $refs: {
    upload: ElUpload
    pkMain: MainComponent
  }
  columns = [
    {
      prop: 'enclosurename',
      label: '附件名称'
    },
    {
      prop: 'enclosurepeople',
      label: '附件标识'
    },
    {
      prop: 'enclosuredate',
      label: '上传时间'
    }
  ]

  handleQueryParams (params: Params) {
    this.params = params
    params.enclosurecontract = this.contractModel.contractid
    return params
  }

  handleCurrentRowChange (row: Enclosure) {
    this.dialogFormParams = row
  }

  async mounted () {
    await this.$refs.pkMain.query()
  }

  submitSuccess (response: any, file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail) {
    if (response !== null) {
      this.fileUrl = response
      this.$alert('上传成功', '提示', {
        confirmButtonText: '确定'
      })
    } else {
      this.$alert('上传失败', '提示', {
        confirmButtonText: '确定'
      })
    }
    this.$refs.pkMain.query()
  }

  onFileChange (file: ElUploadInternalFileDetail, fileList: ElUploadInternalFileDetail[]) {
    this.actionUrl = '/api/uploadLogo'
  }

  async submitUpload () {
    this.data.contractId = this.contractModel.contractid
    this.$refs.upload.submit()
    await this.$refs.pkMain.query()
  }

  async download () {
    const url = '/excel/' + this.dialogFormParams.enclosurepeople
    multiDownloadFile(url)
  }
}
</script>
