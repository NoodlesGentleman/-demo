/**
 * Created by slipkinem on 4/23/2018 at 11:06 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../ext-nb'
import FormBuilder from '../form-builder'
import QueryForm from '../main/model/Form'
import { Getter } from 'vuex-class'
import { Prop } from 'vue-property-decorator'
import { BaseInsuSlip } from './model/BaseInsuSlip'
import { CreateElement } from 'vue'
import { InsuOtherAmt } from './model/InsuOtherAmt'
import { api } from '../../api'
import { getHandleType } from '../../shared/util/service'

@Component({
  components: {
    FormBuilder
  }
})
class SlipBaseInfo extends Vue {
  @Prop({
    default: () => new BaseInsuSlip()
  })
  baseInfo: BaseInsuSlip

  @Getter slipDisabledGetters: boolean

  private forms: QueryForm[][] = [
    [
      {
        label: '保单号',
        prop: 'slipCode'
      },
      {
        label: '保险公司',
        prop: 'insuCompanyId',
        type: 'typeahead',
        remoteUrl: api.company.getInsuranceListByName,
        typeaheadProp: {
          value: 'id',
          label: 'name',
          query: 'query'
        }
      }
    ],
    [
      {
        label: '投保公司',
        prop: 'coverCompanyId',
        type: 'typeahead',
        remoteUrl: api.company.getCorp,
        typeaheadProp: {
          value: 'id',
          label: 'name',
          query: 'query'
        }
      },
      {
        label: '其他公司',
        prop: 'otherCompanyId'
      }
    ],
    [
      {
        label: '保单类型',
        prop: 'slipType',
        type: 'select',
        options: [
          {
            value: 0,
            displayValue: '新保单'
          },
          {
            value: 1,
            displayValue: '续保'
          }
        ]
      }
    ],
    [
      {
        label: '保单生效区间',
        prop: 'beginDate',
        type: 'date',
        span: 6,
        placeholder: '开始时间'
      },
      {
        label: '---',
        prop: 'endDate',
        type: 'date',
        placeholder: '结束时间',
        labelWidth: '100px'
      }
    ],
    [
      {
        label: '到账保费',
        prop: 'intoAccountInsuFee'
      },
      {
        label: '处理类型',
        prop: 'handleType',
        type: 'select',
        options: getHandleType()
      }
    ],
    [
      {
        label: '其他金额',
        prop: '',
        render: (h: CreateElement) => this.genOtherAmt()
      }
    ]
  ]

  genOtherAmt () {
    return this.baseInfo.insuOtherAmtList.map((otherAmt, key) => (
        <el-row key={key}>
          <el-col span={10}>
            <el-form-item label='其他金额'>
              <el-input v-model={otherAmt.otherName} disabled={this.slipDisabledGetters}>
                <template slot='prepend'>名称</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span={10}>
            <el-row>
              <el-col span={16}>
                <el-form-item label-width='20px'>
                  <el-input v-model={otherAmt.amounts} disabled={this.slipDisabledGetters}>
                    <template slot='append'>元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span={6} offset={1}>
                {
                  key === 0 ?
                      <el-button type='success'
                                 disabled={this.slipDisabledGetters}
                                 size='small'
                                 onClick={() => this.addOtherAmt()}>新 增</el-button> :
                      <el-button type='warning'
                                 size='small'
                                 disabled={this.slipDisabledGetters}
                                 onClick={() => this.deleteOtherAmt(key)}>删 除</el-button>
                }
              </el-col>
            </el-row>
          </el-col>
        </el-row>
    ))
  }

  addOtherAmt () {
    if (!this.baseInfo.insuOtherAmtList) {
      this.baseInfo.insuOtherAmtList = []
    }
    this.baseInfo.insuOtherAmtList.push(new InsuOtherAmt())
  }

  deleteOtherAmt (key: number) {
    this.baseInfo.insuOtherAmtList.splice(key, 1)
  }

  render () {
    return (
        <div className={'SlipBaseInfo'}>
          <FormBuilder forms={this.forms} model={this.baseInfo} disabled={this.slipDisabledGetters}/>
        </div>
    )
  }
}

export default SlipBaseInfo
