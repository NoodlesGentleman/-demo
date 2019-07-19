/**
 * Created by slipkinem on 5/28/2018 at 1:36 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import FormBuilder from '../../../form-builder'
import QueryForm from '../../../main/model/Form'
import { AllowanceModel } from '../../model/AllowanceModel'
import { Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  components: {
    FormBuilder
  }
})
class AllowanceRule extends Vue {
  @Prop({
    default: () => new AllowanceModel()
  })
  allowance: AllowanceModel

  @Getter slipDisabledGetters: boolean

  forms: QueryForm<AllowanceModel>[][] = [
    [
      {
        label: '津贴责任名称',
        prop: 'subsidyDutyName'
      }
    ],
    [
      {
        label: '津贴责任代码',
        prop: 'subsidyDutyCode'
      }
    ],
    [
      {
        label: '保额',
        prop: 'quota'
      }
    ],
    [
      {
        label: '日固定',
        prop: 'dateAmount',
        inputAppend: '元'
      }
    ],
    [
      {
        label: '年限时',
        prop: 'yearLimit',
        inputAppend: '天'
      }
    ],
    [
      {
        label: '次限时',
        prop: 'limitNumber',
        inputAppend: '天'
      }
    ],
    [
      {
        label: '免赔天',
        prop: 'deductible',
        inputAppend: '天'
      }
    ],
    [
      {
        label: '给付代码',
        prop: 'payCode'
      }
    ]
  ]

  render () {
    return (
        <div className={'AllowanceRule'}>
          <FormBuilder disabled={this.slipDisabledGetters} forms={this.forms} model={this.allowance}/>
        </div>
    )
  }
}

export default AllowanceRule
