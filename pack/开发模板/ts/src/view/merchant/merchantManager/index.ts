import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import Merchant from './model/Merchant'
import MerchantForm from './dialog/MerchantForm.vue'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import { assert } from '../../../shared/util/logger'
import ContactForm from '../../current/contact/ContactForm.vue'
import _ from 'lodash'
import ContactModel from '../../current/contact/ContactModel'
import { getMerchantState } from '../../../shared/util/service'

@Component({
  components: {
    MainComponent,
    MerchantForm,
    ContactForm
  }
})
export default class MerchantManager extends Vue {
  currentRow: Merchant
  dialogShowDetail = false
  dialogFormInsert = false
  merchant: Merchant = new Merchant()
  tabActive = 'baseInfo'
  signedStatuses: OptionItem[] = []
  systemTypes: OptionItem[] = []
  title = ''
  forms: QueryForm[] = [
    {
      prop: 'merchantName',
      label: '商户名称'
    },
    {
      prop: 'brandId',
      label: '品牌名称',
      type: 'typeahead',
      remoteUrl: '/merchant/getBrandListByName',
      remoteFormatter: (data) => data.map(v => ({ value: v.id, displayValue: v.name }))
    },
    {
      prop: 'state',
      label: '商户状态',
      type: 'select',
      options: getMerchantState()
    },
    {
      prop: 'merchantCode',
      label: '商户编号'
    },
    {
      prop: 'warehouseId',
      label: '商品库',
      type: 'typeahead',
      remoteUrl: '/merchant/getWarehouseListByName',
      remoteFormatter: (data) => data.map(v => ({ value: v.id, displayValue: v.name }))
    }
    // ,
    // {
    //   prop: 'testStatus',
    //   label: '测试状态',
    //   type: 'select',
    //   options: getMerchantTestStatus()
    // }
  ]

  columns: TableColumn[] = [
    {
      prop: 'code',
      label: '商户编号'
    },
    {
      prop: 'name',
      label: '商户名称'
    },
    {
      prop: 'shortName',
      label: '简称'
    },
    {
      prop: 'brandName',
      label: '商户品牌'
    },
    {
      prop: 'areaListForDisplay',
      label: '区域'
    },
    {
      prop: 'warehouseName',
      label: '商品库'
    },
    {
      prop: 'state',
      label: '商户状态',
      filter: 'merchantStatusFilter'
    },
    // {
    //   prop: 'testStatus',
    //   label: '测试状态',
    //   filter: 'merchantTestFilter'
    // },
    {
      prop: 'shopCount',
      label: '门店数'
    },
    {
      prop: 'completeShopCount',
      label: '已上线门店数'
    }
  ]

  $refs: {
    pkMain: MainComponent
  }
  contact: ContactModel = new ContactModel()

  openFormDialogInsert () {
    this.merchant = new Merchant()
    this.title = '新增'
    this.dialogFormInsert = true
  }

  closeFormDialogInsert () {
    this.dialogFormInsert = false
  }

  openFormDialogUpdate () {
    this.title = '修改'
    this.merchant = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.merchant), '请先选择一行')
    this.dialogFormInsert = true
  }


  openDialogShowDetail () {
    this.merchant = this.$refs.pkMain.getSelectedRow()
    this.contact.type = 4
    this.contact.foreignId = this.merchant.id
    assert(!_.isEmpty(this.merchant), '请先选择一行')
    this.dialogShowDetail = true
  }

  closeDialogShowDetail () {
    this.dialogShowDetail = false
  }

  async submitInsert () {
    let url = ''
    if (this.title === '修改') {
      url = '/merchant/updateMerchant'
    } else {
      url = '/merchant/addMerchant'
    }
    delete this.merchant['shopCount']
    delete this.merchant['completeShopCount']
    delete this.merchant['warehouseName']
    delete this.merchant['brandName']
    await this.$http.post<number>(url, this.merchant)
    this.closeFormDialogInsert()
    this.$refs.pkMain.query()
  }

  async changeOnline () {
    this.merchant = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.merchant), '请先选择一行')
    let state = 0
    if (this.merchant.state === 0) {
      state = 1
    } else {
      state = 0
    }
    await this.$http.postParams<number>('/merchant/updateMerchant', {
      id: this.merchant.id,
      state: state
    })
    this.$refs.pkMain.query()
  }

}
