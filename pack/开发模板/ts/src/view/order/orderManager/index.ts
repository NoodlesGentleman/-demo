/**
 * Created by slipkinem on 3/7/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm, { Params } from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import { getOrderStatus } from '../../../shared/util/service'
import _ from 'lodash'
import { assert } from '../../../shared/util/logger'

@Component({
  components: {
    MainComponent
  }
})
export default class MerchantManager extends Vue {
  signedStatuses: OptionItem[] = []
  systemTypes: OptionItem[] = []
  params: Params
  dialogShowDetail = false
  order: any = []
  result: any = []
  details: any = []
  claims: any = []
  pays: any = []
  forms: QueryForm[] = [
    {
      prop: 'orderCode',
      label: '订单编号'
    },
    {
      prop: 'beginTime',
      label: '起始时间',
      type: 'datetime'
    },
    {
      prop: 'endTime',
      label: '结束时间',
      type: 'datetime'
    },
    {
      prop: 'merchantId',
      label: '订单商户',
      type: 'typeahead',
      remoteUrl: '/merchant/getMerchantListByName',
      typeaheadProp: {
        value: 'id',
        label: 'name',
        query: 'query'
      }
    },
    {
      prop: 'shopId',
      label: '订单门店',
      type: 'typeahead',
      remoteUrl: '/merchant/getShopListByName',
      typeaheadProp: {
        value: 'id',
        label: 'name',
        query: 'query'
      }
    },
    {
      prop: 'personName',
      label: '客户姓名'
    }
    ,
    {
      prop: 'accountCode',
      label: '账户编号'
    },
    {
      prop: 'status',
      label: '订单状态',
      type: 'select',
      options: getOrderStatus()
    },
    {
      prop: 'merchantCode',
      label: '第三方交易号'
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'code',
      label: '订单编号'
    },
    {
      prop: 'createTime',
      label: '订单时间'
    },
    {
      prop: 'merchantName',
      label: '订单商户'
    },
    {
      prop: 'shopName',
      label: '订单门店'
    },
    {
      prop: 'personName',
      label: '客户姓名'
    },
    {
      prop: 'accountCode',
      label: '账户编号'
    },
    {
      prop: 'totalAmt',
      label: '订单金额'
    },
    {
      prop: 'actualAmt',
      label: '付款金额'
    },
    {
      prop: 'status',
      label: '订单状态',
      filter: 'OrderStatusFilter'
    },
    {
      prop: 'merchantOrdercode',
      label: '三方交易号'
    },
    {
      prop: 'rrn',
      label: '交易参考号'
    }
  ]

  $refs: {
    pkMain: MainComponent
  }

  doSomething (params: Params) {
    this.params = params
    return params
  }

  refund () {
    console.log()
  }

  async cancelOrder () {
    this.order = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.order), '请先选择一行')
    let result = await this.$http.get('/order/cancelOrder?orderId=' + this.order.id)
    if (result) {
      this.$alert(result.toString())
    } else {
      this.$alert('请求失败')
    }
  }

  async showDetail () {
    this.order = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.order), '请先选择一行')
    this.result = await this.$http.get('/order/getOrderDetail?orderId=' + this.order.id)
    this.details = this.result['detailList']
    this.pays = this.result['payList']
    this.claims = this.result['claimList']
    this.dialogShowDetail = true
  }

  closeDetail () {
    this.dialogShowDetail = false
  }


}
