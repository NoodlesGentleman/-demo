/**
 * Created by slipkinem on 4/8/2018 at 4:51 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import { CustomerServiceVo } from './model/CustomerServiceVo'
import PreserveDialogCreate from './dialog/create/index'
import { operateSlipFull } from './service'
import { CustomerService } from './model/CustomerService'
import { PreserveOperationEnum } from '../../../enum/PreserveOperationEnum'
import { getSlipFullHideState, getSlipFullState, getSlipFullType } from '../../../shared/util/service'
import { api } from '../../../api'
import { RequestMethod } from '../../../enum/RequestMethod'
import PreserveDetail from './dialog/PreserveDetail'

@Component({
  components: {
    MainComponent,
    PreserveDialogCreate,
    PreserveDetail
  }
})
export default class Preserve extends Vue {
  forms: QueryForm<CustomerServiceVo>[] = [
    {
      prop: 'slipFullCode',
      label: '保全编号'
    },
    {
      prop: 'slipFullType',
      label: '保全类型',
      type: 'select',
      options: getSlipFullType()
    },
    {
      prop: 'insuCompanyId',
      label: '保险公司',
      type: 'typeahead',
      remoteUrl: api.company.getInsuranceListByName,
      typeaheadProp: {
        value: 'id',
        label: 'name',
        query: 'query'
      }
    },
    {
      prop: 'coverCustomerId',
      label: '投保客户',
      type: 'typeahead',
      remoteUrl: api.customer.getCustomerList,
      method: RequestMethod.POST,
      typeaheadProp: {
        value: 'id',
        label: 'username',
        query: 'username'
      }
    },
    {
      prop: 'slipCode',
      label: '保单号'
    },
    {
      prop: 'slipFullState',
      label: '保全状态',
      type: 'select',
      options: getSlipFullState()
    },
    {
      prop: 'hideState',
      label: '隐藏状态',
      type: 'select',
      options: getSlipFullHideState()
    }
  ]

  columns: TableColumn<CustomerServiceVo>[] = [
    {
      prop: 'slipFullCode',
      label: '保全编号'
    },
    {
      prop: 'slipFullType',
      label: '保全类型',
      filter: 'slipFullTypeFilter'
    },
    {
      prop: 'insuCompanyName',
      label: '保险公司'
    },
    {
      prop: 'coverCompanyName',
      label: '投保公司'
    },
    {
      prop: 'slipCode',
      label: '保单号'
    },
    {
      prop: 'slipFullState',
      label: '保全状态',
      filter: 'slipFullStateFilter'
    },
    {
      prop: 'hideState',
      label: '隐藏状态',
      filter: 'slipFullHideStateFilter'
    }
  ]

  $refs: {
    pkMain: MainComponent
    preserve: PreserveDialogCreate
    preserveDetail: PreserveDetail
  }


  showDetail () {
    this.$refs.preserveDetail.open(this.$refs.pkMain.getSelectedRow<CustomerService>())
  }

  addPreserve () {
    this.$refs.preserve.openDialog()
  }

  async audit () {
    await operateSlipFull(this.$refs.pkMain.getSelectedRow<CustomerService>(), PreserveOperationEnum.Audit)
  }

  async cancellation () {
    await operateSlipFull(this.$refs.pkMain.getSelectedRow<CustomerService>(), PreserveOperationEnum.Cancellation)
  }

  async hideSlipFull () {
    await operateSlipFull(this.$refs.pkMain.getSelectedRow<CustomerService>(), PreserveOperationEnum.Hide)
  }
}
