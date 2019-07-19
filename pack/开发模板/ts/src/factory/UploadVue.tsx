import { FileListItem } from 'element-ui/types/upload'
import { UploadResponse } from '../components/slip/model/UploadResponse'
import { baseURL, MagicCode } from '../constant'
import { Vue } from '../ext-nb'
import { HttpResponse } from '../shared/interceptor/httpMeta'
import { PKUpload } from '../typings/PKUpload'

/**
 * Created by slipkinem on 4/16/2018 at 3:23 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export class UploadVue<T = any> extends Vue {
  fileList: FileListItem[] = []

  $refs!: {
    [key: string]: any
  }

  uploadData: any

  clearFiles () {
    this.$refs.upload.clearFiles()
  }

  handleChange (file: FileListItem, fileList: FileListItem[]) {
    if (fileList.length > 1) {
      fileList.splice(0, 1)
    }
  }

  onError (err: Error, file: FileListItem, fileList: FileListItem[]) {
    console.log(err)
  }

  onSuccess (response: HttpResponse<T | UploadResponse>, file: FileListItem, fileList: FileListItem[]) {
    console.log(response)
  }

  submitUpload () {
    this.$refs.upload.submit()
  }

  genUploadXml (action = `${baseURL}/account/uploadCustomerBillExcel`) {
    let {
      onError,
      onSuccess,
      clearFiles,
      fileList
    } = this

    const data = {
      props: {
        onChange: this.handleChange,
        onSuccess: (response: HttpResponse<T | UploadResponse>, file: FileListItem, fileList: FileListItem[]) => {
          if (response.responseCode !== MagicCode.SuccessCode) {
            return this.$message.error(response.responseMessage || '')
          }
          onSuccess(response, file, fileList)
          clearFiles.call(this)
        },
        onError: (err: Error, file: FileListItem, fileList: FileListItem[]) => {
          this.$message.error('上传失败')
          onError(err, file, fileList)
        },
        data: this.uploadData,
        fileList,
        autoUpload: false,
        action
      }
    }
    return (
        <el-upload {...data} ref='upload'>
          <el-button slot='trigger' size='small' type='primary'>选取文件</el-button>
          <el-button
              style='margin-left: 10px;'
              size='small'
              type='success'
              onClick={this.submitUpload}>
            上 传
          </el-button>
        </el-upload>
    )
  }
}
