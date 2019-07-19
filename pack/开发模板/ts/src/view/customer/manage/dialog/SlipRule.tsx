/**
 * Created by slipkinem on 4/19/2018 at 10:48 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import MainComponent from '../../../../components/main'
import TableColumn from '../../../../components/main/model/Table'
import { default as QueryForm } from '../../../../components/main/model/Form'
import FormBuilder from '../../../../components/form-builder'
import Customer from '../model/Customer'
import { format } from '../../../../shared/util/format'
import { getShopTypes } from '../../../../shared/util/service'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import { SlipRuleInfo } from '../model/SlipRuleInfo'

@Component({
  components: {
    MainComponent,
    FormBuilder
  }
})
export default class SlipRule extends Vue {
  columns: TableColumn[] = [
    {
      label: '保单号',
      prop: 'slipCode'
    },
    {
      label: '投保公司',
      prop: 'coverCompany',
      filter: 'getCorpById'
    },
    {
      label: '投保期间',
      prop: 'coverDate',
      filter: (coverDate: string) => {
        let s = coverDate.split('-')
        return `${format(new Date(s[0]))}-${format(new Date(s[1]))}`
      }
    }
  ]

  ruleForms: QueryForm[][] = [
    [
      {
        prop: 'dateDeductible',
        label: '日免赔',
        disabled: true
      },
      {
        prop: 'yearDeductible',
        label: '年免赔',
        disabled: true
      },
      {
        prop: 'dateLimitAmt',
        label: '日限额',
        disabled: true
      },
      {
        prop: 'numberLimitAmt',
        label: '次限额',
        disabled: true
      }
    ]
  ]

  slipRule = new SlipRuleInfo()

  $refs: {
    pkMain: MainComponent
  }

  shopTypes: OptionItem[] = []

  isShowDetail = false

  async created () {
    this.shopTypes = await getShopTypes()
  }

  async query (customer: Customer) {
    return this.$refs.pkMain.query({
      personId: customer.id
    })
  }

  checkDetail () {
    this.isShowDetail = true
    this.slipRule = this.$refs.pkMain.getSelectedRow()
    console.log(this.$refs.pkMain.getSelectedRow())
  }

  render () {
    return (
        <div class={'SlipRule'}>
          <MainComponent
              ref='pkMain'
              showPagination={false}
              columns={this.columns}
              url='/insurance/getSlipRule'>
            <span/>
            <el-button-group slot='dispose'>
              <el-button size='mini' onClick={() => this.checkDetail()} type='success'>查看</el-button>
            </el-button-group>
          </MainComponent>
          <div style='margin-top: 30px' v-show={this.isShowDetail}>
            <h5>基金规则</h5>
            <FormBuilder forms={this.ruleForms} model={this.slipRule}/>
            <h5>适用范围</h5>
            <el-row>
              <el-col offset={1}>
                <el-checkbox-group disabled v-model={this.slipRule.applyRangeList}>
                  {
                    this.shopTypes.map(shopType => (
                        <el-checkbox
                            key={shopType.id}
                            label={Number(shopType.value)}>
                          {shopType.displayValue}
                        </el-checkbox>
                    ))
                  }
                </el-checkbox-group>
              </el-col>
            </el-row>
          </div>
        </div>
    )
  }
}
