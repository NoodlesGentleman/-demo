/**
 * Created by slipkinem on 3/7/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm, { Params } from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import Shop from './model/Shop'
import ShopForm from './dialog/ShopForm.vue'
import ShopEditForm from './dialog/ShopEditForm.vue'
import {
  getMerchantState,
  getMerchantTestStatus,
  getShopIsDemo,
  getShopIsShow,
  getShopType
} from '../../../shared/util/service'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import { assert } from '../../../shared/util/logger'
import _ from 'lodash'
import { multiDownloadFile } from '../../../shared/util/multiDownloadFile'

@Component({
  components: {
    MainComponent,
    ShopForm,
    ShopEditForm
  }
})
export default class MerchantManager extends Vue {
  currentRow: Shop
  dialogShowDetail = false
  dialogFormInsert = false
  dialogEditDetail = false
  shop: Shop = new Shop()
  tabActive = 'baseInfo'
  signedStatuses: OptionItem[] = []
  systemTypes: OptionItem[] = []
  title = ''
  data: string = 'add'
  params: Params
  forms: QueryForm[] = [
    {
      prop: 'merchantName',
      label: '商户名称'
    },
    {
      prop: 'shopName',
      label: '门店名称'
    },
    {
      prop: 'state',
      label: '商户状态',
      type: 'select',
      options: getMerchantState()
    },
    {
      prop: 'type',
      label: '门店类型',
      type: 'select',
      options: getShopType()
    },
    {
      prop: 'isDemo',
      label: '是否演示',
      type: 'select',
      options: getShopIsDemo()
    }
    ,
    {
      prop: 'isShow',
      label: '是否隐藏',
      type: 'select',
      options: getShopIsShow()
    }
    ,
    {
      prop: 'isTest',
      label: '是否测试',
      type: 'select',
      options: getMerchantTestStatus()
    }
    ,
    {
      prop: 'isOnline',
      label: '上线状态',
      type: 'select',
      options: getMerchantState()
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'code',
      label: '门店编号'
    },
    {
      prop: 'merchantName',
      label: '商户名称'
    },
    {
      prop: 'name',
      label: '门店名称'
    },
    {
      prop: 'address',
      label: '地址'
    },
    {
      prop: 'type',
      label: '门店类型',
      filter: 'shopTypeFilter'
    },
    {
      prop: 'contact',
      label: '联系人'
    },
    {
      prop: 'mobile',
      label: '联系电话'
    },
    {
      prop: 'isDemo',
      label: '是否演示',
      filter: 'yesOrNoFilter'
    },
    {
      prop: 'isShow',
      label: '是否隐藏',
      filter: 'yesOrNoFilter'
    },
    {
      prop: 'state',
      label: '是否上线',
      filter: 'yesOrNoFilter'
    },
    {
      prop: 'isTest',
      label: '是否测试',
      filter: 'yesOrNoFilter'
    }
  ]

  $refs: {
    pkMain: MainComponent
  }

  doSomething (params: Params) {
    this.params = params
    return params
  }

  openFormDialogInsert () {
    this.shop = new Shop()
    this.title = '新增'
    this.data = 'add'
    this.dialogFormInsert = true
  }

  openFormDialogChange () {
    this.shop = new Shop()
    this.title = '修改'
    this.data = 'update'
    this.dialogFormInsert = true
  }

  closeFormDialogInsert () {
    this.dialogFormInsert = false
  }

  async updateShop () {
    await this.$http.postParams<number>('/merchant/updateShop', this.shop)
    this.dialogEditDetail = false
    this.$refs.pkMain.query()
  }


  openFormDialogUpdate () {
    this.title = '修改'
    this.shop = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.shop), '请先选择一行')
    this.dialogEditDetail = true
  }

  closeFormDialogUpdate () {
    this.dialogEditDetail = false
  }

  openDialogShowDetail () {
    this.shop = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.shop), '请先选择一行')
    this.dialogShowDetail = true
  }

  closeDialogShowDetail () {
    this.dialogShowDetail = false
  }

  async submitInsert () {
    let url = ''
    if (this.title === '修改') {
      url = '/merchant/updateShop'
    } else {
      url = '/merchant/addShop'
    }
    await this.$http.postParams<number>(url, this.shop)
    this.closeFormDialogInsert()
    this.$refs.pkMain.query()
  }

  async changeOnline () {
    this.shop = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.shop), '请先选择一行')
    let state: number = 0
    if (this.shop.state === 1) {
      state = 0
    }
    if (this.shop.state === 0) {
      state = 1
    }
    await this.$http.postParams<number>('/merchant/updateShop', { id: this.shop.id, state: state })
    this.$refs.pkMain.query()
  }

  async changeDemo () {
    this.shop = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.shop), '请先选择一行')
    let state: number = 0
    if (this.shop.isDemo === 1) {
      state = 0
    }
    if (this.shop.isDemo === 0) {
      state = 1
    }
    await this.$http.postParams<number>('/merchant/updateShop', { id: this.shop.id, isDemo: state })
    this.$refs.pkMain.query()
  }

  async changeShow () {
    this.shop = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.shop), '请先选择一行')
    let state: number = 0
    if (this.shop.isShow === 1) {
      state = 0
    }
    if (this.shop.isShow === 0) {
      state = 1
    }
    await this.$http.postParams<number>('/merchant/updateShop', { id: this.shop.id, isShow: state })
    this.$refs.pkMain.query()
  }

  async changeTest () {
    this.shop = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.shop), '请先选择一行')
    let state: number = 0
    if (this.shop.isTest === 1) {
      state = 0
    }
    if (this.shop.isTest === 0) {
      state = 1
    }
    await this.$http.postParams<number>('/merchant/updateShop', { id: this.shop.id, isTest: state })
    this.$refs.pkMain.query()
  }


  async downloadShop () {
    multiDownloadFile('api/merchant/downloadShops', this.params)
  }
}
