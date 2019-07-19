/**
 * Created by slipkinem on 4/19/2018 at 10:30 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

import { Component, Vue } from '../../../../ext-nb'
import MainComponent from '../../../../components/main'
import _ from 'lodash'
import TableColumn from '../../../../components/main/model/Table'
import Customer from '../model/Customer'

@Component({
  components: {
    MainComponent
  }
})
class SlipInfo extends Vue {

  $refs: {
    pkMain: MainComponent
    relatedMainComponent: MainComponent
    planInfoMainComponent: MainComponent
  }

  customer: Customer = new Customer()

  showFiled = ''

  columns: TableColumn[] = [
    {
      label: '保单号',
      prop: 'slipCode'
    },
    {
      label: '投保公司',
      prop: 'coverCompanyId',
      filter: 'getCorpById'
    },
    {
      label: '保险公司',
      prop: 'insuCompanyId',
      filter: 'getInsuranceById'
    },
    {
      label: '保险期限',
      prop: ''
    },
    {
      label: '所属计划',
      prop: 'planName'
    },
    {
      label: '连带关系',
      prop: 'jointRelationship'
    },
    {
      label: '保单状态',
      prop: 'slipState'
    },
    {
      label: '客户号码',
      prop: ''
    },
    {
      label: '凭证号',
      prop: ''
    }
  ]

  relatedColumns: TableColumn[] = [
    {
      label: '姓名',
      prop: 'name'
    },
    {
      label: '连带关系',
      prop: 'jointRelationship'
    },
    {
      label: '证件类型',
      prop: 'certificatesType',
      filter: 'certificateTypeFilter'
    },
    {
      label: '证件号码',
      prop: 'certificatesNumber'
    },
    {
      label: '联系方式',
      prop: 'contactInformation'
    }
  ]

  planInfoColumns: TableColumn[] = [
    {
      label: '责任名称',
      prop: 'dutyName'
    },
    {
      label: '责任额度',
      prop: 'dutyQuota'
    },
    {
      label: '赔付比例',
      prop: 'reimbursementRatio'
    },
    {
      label: '剩余额度',
      prop: 'surplusAmount'
    },
    {
      label: '已使用额度',
      prop: 'readyUsedAamount'
    }
  ]

  async query (customer: Customer) {
    this.customer = customer
    return this.$refs.pkMain.query({
      principalInsuredId: customer.id,
      masterInsuCustomerCardType: customer.certificateType,
      masterInsuCustomerCardNumber: customer.certificate
    })
  }

  async getRelated (customer: Customer) {
    this.showFiled = 'related'
    await this.$refs.relatedMainComponent.query({
      principalInsuredId: customer.id,
      masterInsuCustomerCardType: customer.certificateType,
      masterInsuCustomerCardNumber: customer.certificate
    })
  }

  getPlanInfo () {
    let data = this.$refs.pkMain.getSelectedRow<any>()
    this.$refs.planInfoMainComponent.query({
      pSlipId: data.slipId,
      planId: data.planId
    })
    this.showFiled = 'planInfo'
    console.log(data)
  }

  spanMethod ({ row, column, rowIndex, columnIndex }: any) {
    // console.log(row, column, rowIndex, columnIndex)
  }

  render () {
    let { customer } = this
    return (
        <div class={'SlipInfo'}>
          <MainComponent
              style='margin-bottom: 30px'
              ref='pkMain'
              showPagination={false}
              columns={this.columns}
              url='/insurance/getInsuSlipDetail'>
            <el-button-group slot='dispose'>
              <el-button size='mini' onClick={() => _.noop} type='success'>变更详情</el-button>
              <el-button size='mini' onClick={() => this.getPlanInfo()} type='info'>计划信息</el-button>
              <el-button size='mini' onClick={() => this.getRelated(customer)} type='warning'>
                连带信息
              </el-button>
            </el-button-group>
          </MainComponent>

          <MainComponent
              v-show={this.showFiled === 'related'}
              ref='relatedMainComponent'
              showPagination={false}
              columns={this.relatedColumns}
              url='/insurance/getRelatedDetails'>
            <span slot='dispose'/>
          </MainComponent>

          <MainComponent
              ref='planInfoMainComponent'
              showPagination={false}
              spanMethod={this.spanMethod}
              columns={this.planInfoColumns}
              url='/insurance/getPlanDetails'
              v-show={this.showFiled === 'planInfo'}
          >
            <span slot='dispose'/>
          </MainComponent>

        </div>
    )
  }
}

export default SlipInfo
