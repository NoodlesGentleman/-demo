/**
 * Created by slipkinem on 3/7/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import Brand from './model/Brand'
import BrandForm from './dialog/BrandForm.vue'
import BrandMainForm from './dialog/BrandMainForm.vue'
import { getSignedStatuses, getSystemType } from '../../../shared/util/service'
import BrandMain from './model/BrandMain'
import _ from 'lodash'
import { assert } from '../../../shared/util/logger'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import { BrandFormModel } from '../../../typings/BrandForm'

@Component({
  components: {
    MainComponent,
    BrandForm,
    BrandMainForm
  }
})
export default class BrandManager extends Vue {
  tabActive = 'brandForm'
  $refs: {
    pkMain: MainComponent,
    pkMain2: MainComponent,
    brandForm: BrandFormModel
  }
  brandMainFormVisible = false
  brandFormVisible = false
  brandMainFormTitle = '新增'
  brandFormTitle = '新增'
  brandFormUrl = ''
  systemType: Promise<OptionItem[]> = getSystemType()
  signedStatus: Promise<OptionItem[]> = getSignedStatuses()
  brandForms: QueryForm[] = [
    {
      prop: 'name',
      label: '品牌名称'
    },
    {
      prop: 'systemType',
      label: '系统模式',
      type: 'select',
      options: this.systemType
    },
    {
      prop: 'signStatus',
      label: '签约状态',
      type: 'select',
      options: this.signedStatus
    }
  ]

  brandColumns: TableColumn[] = [
    {
      prop: 'name',
      label: '品牌名称'
    },
    {
      prop: 'shortName',
      label: '品牌简称'
    },
    {
      prop: 'systemTypeDisplay',
      label: '系统模式'
    },
    {
      prop: 'signedStatusDisplay',
      label: '签约状态'
    },
    {
      prop: 'logo',
      label: '商标',
      filter: 'logoFilter'
    }
  ]

  brandMainForms: QueryForm[] = [
    {
      prop: 'name',
      label: '大品牌名称'
    }
  ]

  brandMainColumns: TableColumn[] = [
    {
      prop: 'name',
      label: '大品牌名称'
    },
    {
      prop: 'shortName',
      label: '大品牌简称'
    }
  ]

  brand: Brand = new Brand()
  brandMain: BrandMain = new BrandMain()
  brandMainUrl = ''


  insertBrand () {
    this.brandFormTitle = '新增'
    this.brandFormUrl = 'merchant/addBrand'
    this.brand = new Brand()
    this.brandFormVisible = true
  }

  async showBrand () {
    this.brand = this.$refs.pkMain2.getSelectedRow()
    assert(!_.isEmpty(this.brand), '请先选择一行')
    const temp = await this.$http.postParams<BrandMain>('/merchant/getBrandMain', { id: this.brand.mainId })
    this.brand.mainName = temp.name
    this.brandFormTitle = '查看'
    this.brandFormVisible = true
  }

  async updateBrand () {
    this.brand = this.$refs.pkMain2.getSelectedRow()
    assert(!_.isEmpty(this.brand), '请先选择一行')
    const temp = await this.$http.postParams<BrandMain>('/merchant/getBrandMain', { id: this.brand.mainId })
    this.brandFormUrl = '/merchant/updateBrand'
    this.brand.mainName = temp.name
    this.brandFormTitle = '修改'
    this.brandFormVisible = true
  }

  insertBrandMain () {
    this.brandMainFormTitle = '新增'
    this.brandMain = new BrandMain()
    this.brandMainUrl = '/merchant/addBrandMain'
    this.brandMainFormVisible = true
  }

  updateBrandMain () {
    this.brandMain = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.brandMain), '请先选择一行')
    this.brandMainFormTitle = '修改'
    this.brandMainUrl = '/merchant/updateBrandMain'
    this.brandMainFormVisible = true
  }

  closeBrandMainForm () {
    this.brandMainFormVisible = false
  }

  closeBrandForm () {
    this.brandFormVisible = false
  }

  async submitBrandFrom () {
    delete this.brand['signedStatusDisplay']
    delete this.brand['systemTypeDisplay']
    delete this.brand['mainName']
    await this.$http.post(this.brandFormUrl, this.brand)
    this.$refs.pkMain2.query()
    this.brandFormVisible = false
  }

  async submitBrandMainFrom () {
    await this.$http.post<string>(this.brandMainUrl, this.brandMain)
    this.$refs.pkMain.query()
    this.brandMainFormVisible = false
  }

  async brandHandleResponseData (data: Brand[]) {
    const signedStatuses = await getSignedStatuses()
    const systemTypes = await getSystemType()
    return data.map((v, k) => {
      signedStatuses.forEach((signedStatus) => {
        if (v.signedStatus === Number(signedStatus.value)) {
          v.signedStatusDisplay = signedStatus.displayValue
        }
      })
      systemTypes.forEach((systemType) => {
        if (v.systemType === Number(systemType.value)) {
          v.systemTypeDisplay = systemType.displayValue
        }
      })
      return v
    })
  }

}
