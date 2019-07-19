/**
 * Created by slipkinem on 5/16/2018 at 4:26 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import FormBuilder from '../../../../components/form-builder'
import QueryForm from '../../../../components/main/model/Form'
import { CustomerService } from '../model/CustomerService'
import { getQuotaAscription, getSlipFullType } from '../../../../shared/util/service'
import MainComponent from '../../../../components/main'
import TableColumn from '../../../../components/main/model/Table'
import { QuotaChange } from '../model/QuotaChange'
import { PersonChange } from '../model/PersonChange'

@Component({
  components: {
    MainComponent
  }
})
class PreserveDetail extends Vue {
  isShowDialog = false
  private forms: QueryForm<CustomerService>[][] = [
    [
      {
        label: '保单号',
        prop: 'slipCode'
      },
      {
        label: '保全类型',
        prop: 'slipFullType',
        type: 'select',
        options: getSlipFullType()
      }
    ],
    [
      {
        label: '保险公司',
        prop: 'insuCompanyName'
      },
      {
        label: '投保公司',
        prop: 'coverCompanyName'
      }
    ],
    [
      {
        label: '其他公司',
        prop: 'otherCompanyId'
      },
      {
        label: '额度归属',
        prop: 'quotaAscription',
        type: 'select',
        options: getQuotaAscription()
      }
    ],
    [
      {
        label: '变动数量',
        prop: 'slipCode',
        span: 12
      }
    ]
  ]
  private model: CustomerService = Object.create(null)

  private quotaColumns: TableColumn<QuotaChange>[] = [
    {
      label: '人员名称',
      prop: 'name'
    },
    {
      label: '变动类型',
      prop: 'changeType',
      filter: 'insuranceSlipQuotaChangeTypeFilter'
    },
    {
      label: '变动前保额',
      prop: 'beforChangeAmt'
    },
    {
      label: '变动额度',
      prop: 'changeAmt'
    },
    {
      label: '变动后保额',
      prop: 'changeAfterAmt'
    },
    {
      label: '额度变动只针对直付',
      prop: 'changeAfterAmt'
    }
  ]

  private personColumns: TableColumn<PersonChange>[] = [
    {
      label: '人员名称',
      prop: 'name'
    },
    {
      label: '变动类型',
      prop: 'changeType',
      filter: 'insuranceSlipPersonChangeTypeFilter'
    },
    {
      label: '日期',
      prop: 'date'
    }
  ]

  private quotaList: QuotaChange[] = []
  private personList: PersonChange[] = []

  cancel () {
    this.isShowDialog = false
  }

  success () {
    this.cancel()
  }

  open (preserve: CustomerService) {
    this.model = preserve
    this.getSlipFullList(preserve.slipFullId)
    this.isShowDialog = true
  }

  async getSlipFullList (slipFullId: number) {
    const res = await this.$http.postParams<CustomerService>('/slipFull/getSlipFullListById', { slipFullId })

    this.quotaList = res.quotaChangeList || []
    this.personList = res.personChangeList || []
  }

  render () {
    let {
      personColumns,
      quotaColumns,
      quotaList,
      personList
    } = this

    return (
        <div className={'PreserveDetail'}>
          <el-dialog
              title='查看'
              close-on-press-escape={true}
              close-on-click-modal={true}
              visible$sync={this.isShowDialog}
          >
            <FormBuilder ref={'form'} forms={this.forms} model={this.model} disabled={true}/>
            <div class='h5'>额度变更表格</div>
            <MainComponent data={quotaList} columns={quotaColumns}>
              <span slot='dispose'/>
            </MainComponent>
            <div class='h5'>人员变更表格</div>
            <MainComponent data={personList} columns={personColumns}>
              <span slot='dispose'/>
            </MainComponent>
            <div slot='footer' class='dialog-footer'>
              <el-button size='small' onClick={this.cancel}>取 消</el-button>
              <el-button size='small' type='primary' onClick={this.success}>关 闭</el-button>
            </div>
          </el-dialog>
        </div>
    )
  }
}

export default PreserveDetail
