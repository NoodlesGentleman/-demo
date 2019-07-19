/**
 * Created by slipkinem on 4/9/2018 at 11:06 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component } from '../../../ext-nb'
import { FileListItem } from 'element-ui/types/upload'
import { PKUpload } from '../../../typings/PKUpload'
import { Prop } from 'vue-property-decorator'
import { BaseInsuSlip } from '../model/BaseInsuSlip'
import { UploadTypeEnum } from '../../../enum/UploadTypeEnum'
import { PersonUploadData } from '../model/PersonUploadData'
import { HttpResponse } from '../../../shared/interceptor/httpMeta'
import { PreserveUploadResponse, UploadResponse } from '../model/UploadResponse'
import { baseURL } from '../../../constant'
import { multiDownloadFile } from '../../../shared/util/multiDownloadFile'
import { UploadVue } from '../../../factory/UploadVue'
import { Getter } from 'vuex-class'
import MainComponent from '../../main'
import TableColumn from '../../main/model/Table'
import { eventBus } from '../../../factory/EventBus'
import { Person } from '../model/Person'
import { assert } from '../../../shared/util/logger'
import _ from 'lodash'


interface PersonBill {
  personListVoList: Person[],
  path: string
}

@Component({
  components: {
    MainComponent
  }
})
export default class SlipPerson extends UploadVue {
  @Prop({
    default: () => new BaseInsuSlip()
  })
  baseInfo: BaseInsuSlip

  @Getter slipDisabledGetters: boolean

  changeData: PreserveUploadResponse[] = []

  $refs: {
    upload: PKUpload
    main: MainComponent
  }

  uploadData = new PersonUploadData()

  successData: PreserveUploadResponse | null = null

  currentRow: PreserveUploadResponse

  baseURL = baseURL

  columns: TableColumn<Person>[] = [
    {
      label: '姓名',
      prop: 'name'
    },
    {
      label: '性别',
      prop: 'sex'
    },
    {
      label: '被保险人证件类型',
      prop: 'beInsuCustomerCardType'
    },
    {
      label: '被保险人证件号码',
      prop: 'beInsuCustomerCardNumber'
    },
    {
      label: '承保条件（计划）',
      prop: 'underwritingCondition'
    },
    {
      label: '卡号（非必填）',
      prop: 'cardNumber'
    }
  ]

  personList: Person[] = []

  personBill: PersonBill = Object.create(null)

  mounted () {
    eventBus.subscribe('getPersonList', async () => {
      if (this.slipDisabledGetters) {
        this.personBill = await this.$http.postParams<PersonBill>('/insurance/selectPersonList', {
          slipId: this.baseInfo.slipId,
          slipState: this.baseInfo.slipState
        })
        this.personList = this.personBill.personListVoList
      }
    })
  }

  submitUpload () {
    console.log(this.baseInfo)
    this.uploadData.slipId = this.baseInfo.slipId
    this.uploadData.slipFullType = UploadTypeEnum.Underwrite
    this.$refs.upload.submit()
  }

  onSuccess (response: HttpResponse<PreserveUploadResponse>, file: FileListItem, fileList: FileListItem[]) {
    console.log(response, fileList)
    let data = response.responseData
    this.changeData.push({
      path: data.path,
      code: data.code,
      billCustomerId: data.billCustomerId,
      slipFullType: data.slipFullType,
      slipId: data.slipId
    })
    if (response.responseData.code !== 0) {
      return this.$message.error('校验失败，请重试')
    }
    this.successData = data
  }

  handleCurrentRowChange (row: PreserveUploadResponse) {
    this.currentRow = row
  }

  async save () {
    await this.$http.postParams('/account/saveBill', this.successData)
  }

  async exportFile (row: UploadResponse) {
    let url = await this.$http.postParams<string>('/account/exportBill', row)
    multiDownloadFile(url)
  }

  downloadExcel () {
    let { path } = this.personBill
    assert(_.isEmpty(path), 'excel路径不存在')
    multiDownloadFile(path)
  }
}
