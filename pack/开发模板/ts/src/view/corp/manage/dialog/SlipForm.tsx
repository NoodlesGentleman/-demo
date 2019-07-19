import { Vue, Component, Prop } from '../../../../ext-nb'
import { Params } from '../../../../components/main/model/Form'
import CorpModel from '../model/CorpModel'
import * as _ from 'lodash'
import MainComponent from '../../../../components/main/index'
import InsuSlip from '../model/InsuSlip'
import { assert } from '../../../../shared/util/logger'
@Component({
  components: {
    MainComponent
  }
})
export default class SlipForm extends Vue {
  currentRow: InsuSlip
  dialogFormVisible = false
  dialogInsertContact = false
  dialogShowDetail = false
  dialogFormParams: InsuSlip = new InsuSlip()
  tabActive = 'contact'
  column = [
    {
      prop: 'slipCode',
      label: '保单号'
    },
    {
      prop: 'slipTakeEffectDate',
      label: '保单期限'
    },
    {
      prop: 'insuCompanyName',
      label: '保险公司'
    },
    {
      prop: 'otherCompanyName',
      label: '其他公司'
    },
    {
      label: '保单详情',
      render: this.genOperate
    }
  ]
  $refs: {
    pkMain: MainComponent
    ContactInsertForm: any
  }
  @Prop({
    default: () => new InsuSlip()
  })
  contactForm: CorpModel
  contactInsertForm: InsuSlip = new InsuSlip()

  @Prop({
    default: () => 'edit'
  })
  operationType: string

  genOperate () {
    return (
        < button type='text' onClick={ this.detail }>查看保单详情</button>
    )
  }
  detail () {
    this.$router.push({ path: '/home/slipManage', query: { coverCompanyId: this.contactForm.id.toString() } })
    this.$refs.pkMain.query()
  }

  async mounted () {
    await this.$refs.pkMain.query()
  }

  handleResponseDataContact (data: InsuSlip[]): InsuSlip[] {
    if (data.length === 0) {
      this.currentRow = new InsuSlip()
      return []
    } else {
      return data
    }
  }


  handleCurrentRowChangeContact (row: InsuSlip) {
    this.dialogFormParams = row
  }

  handleQueryParamsContact (params: Params) {
    params.coverCompanyId = this.contactForm.id
    return params
  }


}
