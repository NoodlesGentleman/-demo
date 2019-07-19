/**
 * Created by slipkinem on 3/22/2018 at 11:00 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../../ext-nb'
import PkSteps from '../../../../../packages/steps/steps.vue'
import PkStep from '../../../../../packages/steps/step.vue'
import SlipBaseInfo from '../../../../../components/slip/SlipBaseInfo'
import SlipRuleManage from '../../../../../components/slip/rule/index.vue'
import SlipRuleManageModel from '../../../../../components/slip/rule'
import { Prop, Watch } from 'vue-property-decorator'
import { Slip } from '../../model/Slip'
import SlipPerson from '../../../../../components/slip/person/index.vue'
import { Getter, State } from 'vuex-class'
import { slipOperationType } from '../../../../../store/model/state'
import { RuleOperationType } from '../../../../../enum/RuleOperationType'
import { operationSlip } from '../../service'
import { eventBus } from '../../../../../factory/EventBus'
import { BaseInsuSlip } from '../../../../../components/slip/model/BaseInsuSlip'
import { assignPure } from '../../../../../shared/util/assignPure'

@Component({
  components: {
    PkSteps,
    PkStep,
    SlipBaseInfo,
    SlipRuleManage,
    SlipPerson
  }
})
export default class EditSlip extends Vue {
  $refs: {
    slipRuleManage: SlipRuleManageModel
  }

  @Getter slipDisabledGetters: boolean

  @State slipOperation: slipOperationType

  private isShowEditSlip = false
  private active = 0
  @Prop({
    default: () => new Slip()
  })
  private slip: Slip

  private nextOperation = [
    async () => {
      console.log(this.slip, console.log(BaseInsuSlip.toString()))
      if (!this.slip.baseInfo.slipId) {
        await this.$confirm('确定新增保单？', '提示', {
          type: 'warning'
        })
        const res = await this.$http.post<number>('/insurance/addInsuSlip', this.slip.baseInfo)
        this.slip.baseInfo.slipId = res
        this.slip.slipRule.slipPolicy.slipId = res
        this.slip.slipRule.slipPolicy.slipCode = this.slip.baseInfo.slipCode
        // this.$refs.slipRuleManage.data[0].label = this.slip.baseInfo.slipCode
      } else {
        await this.$confirm('确定更新保单？', '提示', {
          type: 'warning'
        })
        await this.$http.post<number>('/insurance/updateInsuSlipByslipId', assignPure(new BaseInsuSlip(), this.slip.baseInfo))
        this.slip.slipRule.slipPolicy.slipId = this.slip.baseInfo.slipId
        this.slip.slipRule.slipPolicy.slipCode = this.slip.baseInfo.slipCode
      }
      this.next()
    },
    async () => {
      await this.$confirm('确定将责任添加完毕？', '提示', {
        type: 'warning'
      })
      this.next()
    },
    () => {
      this.fetchData()
      eventBus.publish('editClose')
    }
  ]

  fetchData () {
    this.active = 0
  }

  @Watch('active')
  onActiveChange (val: number) {
    if (this.active === 2) {
      eventBus.publish('getPersonList')
    }
  }

  next () {
    this.active += 1
    if (this.active >= 3) {
      this.active = 0
    }
  }

  doPrevClick () {
    this.active -= 1
  }

  async doNextClick () {
    this.nextOperation[this.active]()
  }

  openEditSlip () {
    this.isShowEditSlip = true
  }

  closeEditSlip () {
    this.isShowEditSlip = false
  }

  goStep (step: number) {
    if (this.slipDisabledGetters) {
      this.active = step
    }
  }

  /**
   * 确认审核
   */
  async submitAudit () {
    await operationSlip(this.slip.baseInfo, RuleOperationType.Check)
    this.closeEditSlip()
  }
}
