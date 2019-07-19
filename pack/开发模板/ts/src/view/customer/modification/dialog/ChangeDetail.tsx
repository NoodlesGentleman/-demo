/**
 * Created by slipkinem on 4/17/2018 at 2:48 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

import { Component, Vue } from '../../../../ext-nb'
import { CreateElement } from 'vue'
import FormBuilder from '../../../../components/form-builder'
import QueryForm from '../../../../components/main/model/Form'
import ChangeInfoModel from '../../manage/model/ChangeInfo'
import ChangeInfo from '../../../customer/manage/dialog/ChangeInfo.vue'
import { BatchInfo } from '../model/BatchInfo'
import { multiDownloadFile } from '../../../../shared/util/multiDownloadFile'

@Component({
  components: {
    FormBuilder,
    ChangeInfo
  }
})
class ChangeDetail extends Vue {
  showDetail = false
  changeInfo: ChangeInfoModel[] = []
  batchInfo: BatchInfo = new BatchInfo()

  forms: QueryForm[][] = [
    [
      {
        prop: 'batchCode',
        label: '批改编号',
        disabled: true
      },
      {
        prop: 'count',
        label: '批改人数',
        disabled: true
      }
    ]
  ]

  cancel () {
    this.showDetail = false
  }

  async open (batchInfo: BatchInfo) {
    this.batchInfo = batchInfo
    this.changeInfo = await this.$http.get<ChangeInfoModel[]>('/customerOperation/list/' + batchInfo.id)
    this.showDetail = true
  }

  render (h: CreateElement) {
    return (
        <el-dialog width='60%' visible$sync={this.showDetail} title='查看'>
          <el-button type='info' onClick={() => multiDownloadFile(this.batchInfo.excelPath)}>批单下载</el-button>
          <FormBuilder forms={this.forms} model={this.batchInfo}/>
          <ChangeInfo data={this.changeInfo}/>
          <div slot='footer' class='dialog-footer'>
            <el-button size='small' type='primary' onClick={this.cancel}>返 回</el-button>
          </div>
        </el-dialog>
    )
  }
}

export default ChangeDetail
