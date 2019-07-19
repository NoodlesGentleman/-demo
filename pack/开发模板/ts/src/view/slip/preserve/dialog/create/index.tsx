/**
 * Created by slipkinem on 4/8/2018 at 5:59 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component } from '../../../../../ext-nb'
import FormBuilder from '../../../../../components/form-builder'
import { CustomerService } from '../../model/CustomerService'
import { CreateElement } from 'vue'
import { MagicCode } from '../../../../../constant'
import { FileListItem } from 'element-ui/types/upload'
import { HttpResponse } from '../../../../../shared/interceptor/httpMeta'
import { PreserveUploadResponse, UploadResponse } from '../../../../../components/slip/model/UploadResponse'
import { BaseInsuSlip } from '../../../../../components/slip/model/BaseInsuSlip'
import { UploadVue } from '../../../../../factory/UploadVue'
import QueryForm from '../../../../../components/main/model/Form'
import { RequestMethod } from '../../../../../enum/RequestMethod'
import { multiDownloadFile } from '../../../../../shared/util/multiDownloadFile'
import { assert } from '../../../../../shared/util/logger'
import { getQuotaAscription, getSlipFullType } from '../../../../../shared/util/service'
import { Validate } from '../../../../../enum/Validate'
import { PKUpload } from '../../../../../typings/PKUpload'
import { pipe } from '../../../../../shared/mixin/filter'

@Component({
  components: {
    FormBuilder
  }
})
export default class PreserveDialogCreate extends UploadVue {
  isShowDialog = false
  createModel: CustomerService = new CustomerService()

  forms: QueryForm<CustomerService>[][] = [
    [
      {
        prop: 'slipId',
        label: '保单号',
        type: 'typeahead',
        remoteUrl: '/insurance/getInsuSlipList',
        validator: [Validate.Required],
        typeaheadProp: {
          value: 'slipId',
          label: 'slipCode',
          query: 'slipCode'
        },
        method: RequestMethod.POST,
        selectChange: async (val: number, row: BaseInsuSlip) => {
          console.log(val, row)
          this.createModel.insuCompanyName = await pipe.getInsuranceById(row.insuCompanyId!)
          this.createModel.coverCompanyName = await pipe.getCorpById(row.coverCompanyId!)
          this.createModel.slipId = row.slipId
          console.log(this.createModel)
        }
      },
      {
        prop: 'slipFullType',
        label: '保全类型',
        type: 'select',
        options: getSlipFullType()
      }
    ],
    [
      {
        prop: 'insuCompanyName',
        label: '保险公司',
        validator: [Validate.Required]
      },
      {
        prop: 'coverCompanyName',
        label: '投保公司',
        validator: [Validate.Required]
      }
    ],
    [
      {
        prop: 'quotaAscription',
        label: '额度归属',
        type: 'select',
        options: getQuotaAscription()
      }
    ],
    [
      {
        render: (h: CreateElement) => this.genUploadEl()
      }
    ]
  ]

  $refs: {
    form: FormBuilder
    upload: PKUpload
  }

  changeData: UploadResponse[] = []
  uploadData: CustomerService = Object.create(null)
  uploadResponse: PreserveUploadResponse = Object.create(null)

  genUploadEl () {
    return (
        <el-form-item label={'人员变更上传'}>
          {
            this.genUploadXml()
          }
        </el-form-item>
    )
  }

  submitUpload () {
    assert(!!this.createModel.slipId, 'slipId不能为空')
    this.uploadData.slipId = this.createModel.slipId
    this.uploadData.slipFullType = this.createModel.slipFullType
    this.$refs.upload.submit()
  }

  onSuccess (response: HttpResponse<PreserveUploadResponse>, file: FileListItem, fileList: FileListItem[]) {
    console.log(response, fileList)
    let data = response.responseData
    this.changeData.push({
      path: data.path,
      code: data.code,
      codeDisplay: data.code === 0 ? '成功' : '校验失败'
    })
    if (response.responseData.code !== MagicCode.SuccessCode) {
      return this.$message.error('上传失败，请重试')
    }
    this.uploadResponse = response.responseData
  }

  async success () {
    await this.$refs.form.validate()
    console.log('this')
    assert(!!this.uploadResponse.billCustomerId, '请先上传excel')
    const res = await this.$http.postParams<number>('/slipFull/addSlipFull', this.createModel)
    await this.$http.postParams<number>('/account/saveBill', Object.assign(this.uploadResponse, {
      slipFullId: res
    }))
  }

  cancel () {
    this.isShowDialog = false
  }

  openDialog () {
    this.isShowDialog = true
  }

  render () {
    return (
        <el-dialog
            title='新增'
            close-on-press-escape={true}
            close-on-click-modal={true}
            visible$sync={this.isShowDialog}>
          <FormBuilder ref={'form'} forms={this.forms} model={this.createModel}/>
          <el-table data={this.changeData} border size='mini'>
            <el-table-column label='校验' prop='codeDisplay'/>
            <el-table-column label='操作'>
              {
                (props: any) =>
                    <el-button
                        size='mini'
                        type='primary'
                        onClick={() => this.exportFile(props.row)}>
                      导出
                    </el-button>
              }
            </el-table-column>
          </el-table>
          <div slot='footer' class='dialog-footer'>
            <el-button size='small' onClick={this.cancel}>取 消</el-button>
            <el-button size='small' type='primary' onClick={this.success}>保 存</el-button>
          </div>
        </el-dialog>
    )
  }

  private exportFile (row: UploadResponse) {
    if (row.path) {
      multiDownloadFile(row.path)
    }
  }
}
