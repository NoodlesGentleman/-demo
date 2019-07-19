/**
 * Created by slipkinem on 3/7/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm from '../../../components/main/model/Form'
import Customer from './model/Customer'
import TableColumn from '../../../components/main/model/Table'
import { assert } from '../../../shared/util/logger'
import _ from 'lodash'
import CustomerForm from './dialog/CustomerForm'
import ChangeInfo from './dialog/ChangeInfo.vue'
import ChangeInfoModel from './model/ChangeInfo'
import { getChangeFields, getOptionItems } from '../../../shared/util/service'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import BatchChange from './dialog/batch-change/index.vue'
import BatchChangeModel from './dialog/batch-change'
import { exporter } from '../../../shared/util/Csv'
import { multiDownloadFile } from '../../../shared/util/multiDownloadFile'
import SlipInfo from './dialog/SlipInfo'
import SlipRule from './dialog/SlipRule'
import ClaimInfo from './dialog/ClaimInfo'
import CardInfo from './dialog/CardInfo'
import { api } from '../../../api'

@Component({
  components: {
    MainComponent,
    CustomerForm,
    ChangeInfo,
    BatchChange,
    SlipInfo,
    SlipRule,
    ClaimInfo,
    CardInfo
  }
})
export default class CustomerManage extends Vue {
  currentRow: Customer
  dialogFormVisible = false
  dialogShowDetail = false
  dialogFormParams: Customer = new Customer()
  tabActive = 'baseInfo'
  changeInfo: ChangeInfoModel[] = []

  forms: QueryForm[] = [
    {
      prop: 'username',
      label: '姓名'
    },
    {
      prop: 'certificate',
      label: '证件号'
    },
    {
      prop: 'mobile',
      label: '联系方式'
    },
    {
      prop: 'userCorp',
      label: '投保公司',
      type: 'typeahead',
      remoteUrl: api.company.getCorp,
      typeaheadProp: {
        value: 'id',
        label: 'name',
        query: 'query'
      }
    }
  ]

  columns: TableColumn<Customer>[] = [
    {
      prop: 'username',
      label: '姓名'
    },
    {
      prop: 'certificateType',
      label: '证件类型',
      filter: 'certificateTypeFilter'
    },
    {
      prop: 'certificate',
      label: '证件号码'
    },
    {
      prop: 'gender',
      label: '性别',
      filter: 'gendersFilter'
    },
    {
      prop: 'mobile',
      label: '联系方式'
    },
    {
      prop: 'userCorp',
      label: '投保公司'
    }
  ]

  $refs: {
    pkMain: MainComponent
    batchChange: BatchChangeModel
    slipRule: SlipRule
    slipInfo: SlipInfo
    cardInfo: CardInfo
  }

  // onChange (file: any, fileList: any) {
  //   console.log(file.target.files[0])
  //   let result = Papa.parse(file.target.files[0], {
  //     error: function (error: ParseError, file?: File) {
  //       console.log(error, file)
  //       // executed if an error occurs while loading the file,
  //       // or if before callback aborted for some reason
  //     },
  //     complete: function (results: ParseResult, file?: File) {
  //       let object = (list: any, values: any) => {
  //         let result: any = {}
  //         for (let i = 0; i < list.length; i++) {
  //           if (values) {
  //             result[list[i]] = values[i]
  //           } else {
  //             result[list[i][0]] = list[i][1]
  //           }
  //         }
  //         return result
  //       }
  //       let data = results.data
  //       let hash: any[] = []
  //       data.forEach((d, index) => {
  //         if (index >= 1) {
  //           let o = object(data[0], data[index])
  //           hash.push(o)
  //         }
  //       })
  //       console.log(hash)
  //       // executed after all files are complete
  //     }
  //   })
  //   console.log(result)
  // }

  openFormDialog () {
    this.dialogFormVisible = true
  }

  closeFormDialog () {
    this.dialogFormVisible = false
  }

  openDialogShowDetail () {
    this.dialogShowDetail = true
  }

  closeDialogShowDetail () {
    this.dialogShowDetail = false
  }

  handleCurrentRowChange (row: Customer) {
    this.dialogFormParams = row
  }

  update () {
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openFormDialog()
  }

  /**
   * 查看
   */
  showDetail () {
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    let { id } = this.dialogFormParams
    this.openDialogShowDetail()
    this.getChangeList(id)
    this.$nextTick(async () => {
      await Promise.all([
        this.$refs.slipRule.query(this.dialogFormParams),
        this.$refs.slipInfo.query(this.dialogFormParams),
        this.$refs.cardInfo.query(this.dialogFormParams)
      ])
    })
  }

  /**
   * 获取修改信息
   * @param {number} customerId
   * @returns {Promise<void>}
   */
  async getChangeList (customerId: number) {
    const res = await this.$http.postParams<ChangeInfoModel[]>('/customerOperation/list', { customerId })
    const changeFields = await getChangeFields()
    let optionItems: OptionItem[] = []

    this.changeInfo = res.map((row) => {
      changeFields.forEach(async (field) => {
        if (field.value === row.operationField) {
          row.operationField = field.displayValue

          if (!_.isEmpty(field.content)) {
            optionItems = await getOptionItems(field.content)
            optionItems.forEach((optionItem) => {
              if (optionItem.value === row.operationAfter) {
                row.operationAfter = optionItem.displayValue
              }
              if (optionItem.value === row.operationBefore) {
                row.operationBefore = optionItem.displayValue
              }
            })
          }
        }
      })
      return row
    })
  }

  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    await this.$http.post<number>('/customer/update', this.dialogFormParams)
    this.closeFormDialog()
    this.$refs.pkMain.query()
  }

  batchChange () {
    this.$refs.batchChange.openDialog()
  }

  exportData () {
    console.log(this.$refs.pkMain.getSelectedRows())
    let data = this.$refs.pkMain.getSelectedRows<Customer>()
    let header = Object.keys(data[0]).map(name => name)
    exporter.downloadFile('用户数据', data, header)
  }

  downloadTemplate () {
    multiDownloadFile(`/excel/customer.xls`)
  }

}
