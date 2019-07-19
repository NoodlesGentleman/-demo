/**
 * Created by slipkinem on 4/18/2018 at 11:39 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

import { Component } from '../../../../ext-nb'
import FormBuilder from '../../../../components/form-builder'
import QueryForm, { Params } from '../../../../components/main/model/Form'
import { UploadVue } from '../../../../factory/UploadVue'
import { CreateElement } from 'vue'
import { BaseInsuSlip } from '../../../../components/slip/model/BaseInsuSlip'
import { baseURL, MagicCode } from '../../../../constant'
import { FileListItem } from 'element-ui/types/upload'
import { HttpResponse } from '../../../../shared/interceptor/httpMeta'
import TableColumn from '../../../../components/main/model/Table'
import MainComponent from '../../../../components/main'

@Component({
  components: {
    FormBuilder,
    MainComponent
  }
})
class SetAccount extends UploadVue {
  showDialog = false

  forms: QueryForm[][] = [
    [
      {
        label: '保险公司',
        prop: 'insuCompanyId',
        disabled: true
      },
      {
        label: '保单号',
        prop: 'slipCode',
        disabled: true
      }
    ],
    [
      {
        label: 'EXCEL上传',
        prop: 'file',
        render: (h: CreateElement) => this.genUpload()
      }
    ],
    [
      {
        label: '备注',
        prop: 'mask',
        type: 'textarea'
      }
    ]
  ]

  insuSlip: BaseInsuSlip = new BaseInsuSlip()

  uploadData: BaseInsuSlip = Object.create(null)

  billId: number
  private tabActive = 'accountDetail'
  private detailForms: QueryForm[] = [
    {
      label: '开通情况',
      prop: 'accountOpenState',
      type: 'select',
      options: [
        {
          value: 1,
          displayValue: '已开通'
        },
        {
          value: 0,
          displayValue: '未开通'
        }
      ]
    }
  ]

  private detailColumns: TableColumn[] = [
    {
      label: '姓名',
      prop: 'name'
    },
    {
      label: '开通情况',
      prop: 'accountOpenState'
    },
    {
      label: '主要直付方式',
      prop: 'mainPayType'
    },
    {
      label: '次要支付方式1',
      prop: 'secondaryPayTypeOne'
    },
    {
      label: '次要支付方式2',
      prop: 'secondaryPayTypeTwo'
    },
    {
      label: '次要支付方式3',
      prop: 'secondaryPayTypeThree'
    },
    {
      label: '次要支付方式4',
      prop: 'secondaryPayTypeFour'
    },
    {
      label: '次要支付方式5',
      prop: 'secondaryPayTypeFive'
    }
  ]

  private queryParams: Params = Object.create(null)

  genUpload () {
    return (
        <el-form-item label='Excel上传'>
          {
            this.genUploadXml(`${baseURL}/account/uploadAccountExcel`)
          }
        </el-form-item>
    )
  }

  open (insuSlip: BaseInsuSlip) {
    this.insuSlip = insuSlip
    this.showDialog = true
    this.$nextTick(() => {
      (this.$refs.accountDetail as MainComponent).query()
    })
  }

  cancel () {
    this.showDialog = false
  }

  submitUpload () {
    this.uploadData.slipId = this.insuSlip.slipId
    this.uploadData.slipCode = this.insuSlip.slipCode
    this.$refs.upload.submit()
  }

  onSuccess (response: HttpResponse<{
    code: number,
    customerAccountBillId: number
  }>, file: FileListItem, fileList: FileListItem[]) {
    if (response.responseData.code === MagicCode.SuccessCode) {
      this.$message.success('上传成功')
      this.billId = response.responseData.customerAccountBillId
    }
  }

  async submit () {
    await this.$http.postParams('/account/saveAccount', {
      customerAccountBillId: this.billId,
      slipId: this.insuSlip.slipId
    })
    this.cancel()
  }

  handleQueryParams (params: Params) {
    params.slipId = this.insuSlip.slipId
    this.queryParams = params
    return params
  }

  render () {
    return (
        <el-dialog width='75%' title='账户设定' visible$sync={this.showDialog}>
          <el-tabs v-model={this.tabActive}>
            <el-tab-pane label='账户详情' name='accountDetail'>
              <MainComponent
                  handleQueryParams={this.handleQueryParams}
                  url='/account/getAccountDetailByOpenState'
                  ref={'accountDetail'}
                  initialize={false}
                  forms={this.detailForms}
                  columns={this.detailColumns}
                  showPagination={false}>
                <el-button-group slot='dispose'>
                  <el-button size='mini' type='success' onClick={() => this.export()}>导出</el-button>
                </el-button-group>
              </MainComponent>
            </el-tab-pane>
            <el-tab-pane label='账户设定' name='setAccount'>
              <FormBuilder forms={this.forms} model={this.insuSlip}/>
            </el-tab-pane>
          </el-tabs>

          <div slot='footer' class='dialog-footer'>
            <el-button size='small' type='primary' onClick={this.submit}>保 存</el-button>
            <el-button size='small' type='warning' onClick={this.cancel}>取 消</el-button>
          </div>
        </el-dialog>
    )
  }

  private async export () {
    const res = await this.$http.postParams<string>('/account/exportAccountDetailByOpenState', {
      slipId: this.insuSlip.slipId,
      accountOpenState: this.detailForms[0].value
    })
    console.log('export', res)
  }
}

export default SetAccount
