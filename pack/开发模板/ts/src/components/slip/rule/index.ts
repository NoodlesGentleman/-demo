/**
 * Created by slipkinem on 3/22/2018 at 4:12 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import { Prop } from 'vue-property-decorator'
import { PkTreeNode } from '../../../typings/PkTreeNode'
import TPARule from './tpa/index.vue'
import TPARuleModel from './tpa/index'
import PolicyRule from './policy/index.vue'
import PublicCoverage from './public/PublicCoverage.vue'
import AllowanceRule from './allowance/AllowanceRule'
import DirectPay from './pay/index.vue'
import DirectPayComponentModel from './pay/index'
import TPAReplenish from './tpa/replenish/index.vue'
import { RuleEnum } from '../../../enum/Rule'
import _ from 'lodash'
import { SlipRuleModel } from '../model/SlipRuleModel'
import { TempTreeNode } from '../model/TempTreeNode'
import { PlanOrCommonAmt } from '../model/PlanOrCommonAmt'
import { DutyModel } from '../model/DutyModel'
import { DirectPayBaseModel } from '../model/DirectPayBaseModel'
import { TPADutyBase } from '../model/TPADutyBase'
import { TPAReplenishModel } from '../model/TPAReplenishModel'
import { AllowanceModel } from '../model/AllowanceModel'
import { DirectPayModel } from '../model/DirectPayModel'
import { nextUid } from '../../../shared/util/uid'
import { TPADuty } from '../model/TPADuty'
import ShareRule from './share/index'
import { Getter } from 'vuex-class'
import { ShareModel } from '../model/ShareModel'
import { assert } from '../../../shared/util/logger'
import {
  addSpecialRule,
  addSpecialRuleSet,
  genderInsuTypeLimitList,
  getDutyByPlanId,
  updateInsuSpecialSet
} from '../service'
import { NotificationSuccess } from '../../../shared/util/NotificationSuccess'
import { eventBus } from '../../../factory/EventBus'
import { ShareDutyModel } from '../model/ShareDutyModel'

@Component({
  components: {
    ShareRule,
    TPARule,
    PolicyRule,
    PublicCoverage,
    AllowanceRule,
    DirectPay,
    TPAReplenish
  }
})
export default class SlipRuleManage extends Vue {
  @Prop()
  slipRule: SlipRuleModel

  RuleEnum = RuleEnum

  currentTreeNode = RuleEnum.Policy

  currentTreeNodeData: TempTreeNode
  // 添加时候的
  planOrCommonAmt: PlanOrCommonAmt = new PlanOrCommonAmt()
  // 点击查看的
  currentPlanOrCommonAmt = new PlanOrCommonAmt()

  duty: DutyModel = new DutyModel()
  // 树节点,由外部调用时初始化
  data: TempTreeNode[] = []

  isShowSaveBtn = true

  @Getter slipDisabledGetters: boolean

  $refs: {
    directPay: DirectPayComponentModel
    tpa: TPARuleModel
    share: ShareRule
  }

  created () {
    console.log('slip.rule is created')
    eventBus.subscribe('operationShare', () => {
      this.operationShare()
    })
  }

  showCurrentNodeTab (nodeId: RuleEnum) {
    return this.currentTreeNode === nodeId
  }

  // 点击节点
  handleNodeClick (data: TempTreeNode) {
    console.log(data)
    this.currentTreeNodeData = data
    this.currentTreeNode = data.treeNodeType
    switch (this.currentTreeNode) {
      case RuleEnum.PublicCoverage:
        if (data.planOrCommonAmt) {
          this.slipRule.publicCoverageAmt.commonCode = data.planOrCommonAmt.Code
          this.slipRule.publicCoverageAmt.commonName = data.planOrCommonAmt.name
          this.slipRule.publicCoverageAmt.commonAmtId = data.planOrCommonAmt.planOrAmtId
        }
        break
      case RuleEnum.Plan:
        if (data.planOrCommonAmt) {
          this.currentPlanOrCommonAmt = _.cloneDeep(data.planOrCommonAmt)
          this.slipRule.plan.planId = data.planOrCommonAmt.planOrAmtId
          this.slipRule.plan.planCode = data.planOrCommonAmt.Code
          this.slipRule.plan.planName = data.planOrCommonAmt.name
        }
        break
      case RuleEnum.AllowanceRule:
        if (data.allowance) {
          this.slipRule.allowance = _.cloneDeep(data.allowance)
        }
        break
      case RuleEnum.DirectPay:
        console.log(data.directPay, this.slipRule)
        if (data.directPay) {
          this.slipRule.directPay.base.directPayDutyName = data.directPay.base.directPayDutyName
          this.slipRule.directPay.base.directPayDutyCode = data.directPay.base.directPayDutyCode
          this.slipRule.directPay.base.directPayDutyId = data.directPay.base.directPayDutyId
        }
        break
      case RuleEnum.TPADuty:
        if (data.tpa) {
          this.slipRule.tpa.base.tpaName = data.tpa.base.tpaName
          this.slipRule.tpa.base.tpaCode = data.tpa.base.tpaCode
          this.slipRule.tpa.base.tpaDutyId = data.tpa.base.tpaDutyId
        }
        break
      case RuleEnum.TPAReplenish:
        if (data.tpaReplenish) {
          this.slipRule.tpaReplenish = _.cloneDeep(data.tpaReplenish)
        }
    }
  }

  /**
   * 添加一个节点，根据当所在节点，判断添加子节点页面是哪个
   * @param {TempTreeNode} data
   */
  appendNode (data: TempTreeNode) {
    this.currentTreeNodeData = data
    switch (data.treeNodeType) {
      case RuleEnum.Policy:
        this.currentTreeNode = RuleEnum.AddPlan
        break
      case RuleEnum.Plan:
        this.currentTreeNode = RuleEnum.AddDuty
        break
      case RuleEnum.TPADuty:
        this.currentTreeNode = RuleEnum.TPAReplenish
        this.slipRule.tpaReplenish = new TPAReplenishModel()
        this.slipRule.tpaReplenish.insuLimitTypeList = genderInsuTypeLimitList()
        break
    }
  }

  /**
   * 删除一个节点
   * @param {PkTreeNode} node
   * @param {TempTreeNode} data
   * @returns {Promise<void>}
   */
  async removeNode (node: PkTreeNode, data: TempTreeNode) {
    await this.$confirm('确定要删除吗？', '提示', {
      type: 'warning'
    })
    console.log('node ===> ', node, data)
    switch (data.treeNodeType) {
      case RuleEnum.AllowanceRule:
        await this.$http.postParams('/duty/deleteSubsidy', {
          subsidyId: data.allowance!.subsidyDutyId
        })
        this.removeNodeForTree(node, data)
        break
      case RuleEnum.PublicCoverage:
        await this.$http.postParams('/insurance/deleteCommonAmt', {
          commonAmtId: data.planOrCommonAmt!.planOrAmtId
        })
        this.removeNodeForTree(node, data)
        break
      case RuleEnum.TPAReplenish:
        await this.$http.postParams('/duty/deletedSmallItem', {
          smallItemId: data.tpaReplenish!.smallItemId
        })
        this.removeNodeForTree(node, data)
        break
      case RuleEnum.TPADuty:
        await this.$http.postParams('/duty/deleteTPADuty', {
          TPADutyId: data.tpa!.base.tpaDutyId
        })
        this.removeNodeForTree(node, data)
        break
      case RuleEnum.DirectPay:
        await this.$http.postParams('/duty/deletedDirectPay', {
          directPayId: data.directPay!.base.directPayDutyId
        })
        this.removeNodeForTree(node, data)
        break
      case RuleEnum.Plan:
        await this.$http.postParams('/insurance/deletePlan', {
          planId: data.planOrCommonAmt!.planOrAmtId
        })
        this.removeNodeForTree(node, data)
        break
    }

  }

  /**
   * 从节点树进行删除
   * @param {PkTreeNode} node
   * @param {TempTreeNode} data
   */
  removeNodeForTree (node: PkTreeNode, data: TempTreeNode) {
    const parent = node.parent
    const children = parent.data.children || parent.data
    // const index = children.findIndex(d => d.id === data.id)
    // children.splice(index, 1)
  }

  /**
   * 保存按钮，根据当前所在页面所选取的treeNodeType
   * 来判断应该添加的是什么类型的节点
   */
  // saveOperation () {
  //   this.duty.planId = this.slipRule.plan.planId
  //   const newChild: TempTreeNode = {
  //     id: nextUid(),
  //     treeNodeType: this.currentTreeNode,
  //     label: '',
  //     children: []
  //   }
  //   let res: number
  //   // TODO: 可能重构拆分
  //   let operations = {
  //     [RuleEnum.Policy]: async () => {
  //       this.slipRule.slipPolicy.exceptDuty.slipId = this.slipRule.slipPolicy.slipId
  //       let slipPolicy = _.cloneDeep(this.slipRule.slipPolicy)
  //       slipPolicy.exceptDuty.optionItemIdStr = slipPolicy.exceptDuty.optionItemIdStr.toString()

  //       if (!slipPolicy.exceptDuty.exceptDutyId) {
  //         res = await this.$http.post<number>('/insurance/addExceptDuty', slipPolicy.exceptDuty)
  //         this.slipRule.slipPolicy.exceptDuty.exceptDutyId = res
  //         console.log(slipPolicy)
  //       } else {
  //         await this.$http.post<number>('/insurance/updateExceptDuty', slipPolicy.exceptDuty)
  //       }
  //       NotificationSuccess()
  //     },
  //     // 如果钱的是添加计划或者公共保额页面
  //     [RuleEnum.AddPlan]: async () => {
  //       // 添加责任页面
  //       console.log(this.planOrCommonAmt)
  //       let planOrCommonAmt = _.cloneDeep(this.planOrCommonAmt)
  //       // 可以通过保单对象拿到slipId
  //       planOrCommonAmt.slipId = this.slipRule.slipPolicy.slipId
  //       res = await this.$http.postParams<number>('/insurance/addPlanOrCommonAmt', planOrCommonAmt)
  //       this.slipRule.plan.planId = res
  //       planOrCommonAmt.planOrAmtId = res
  //       newChild.treeNodeType = planOrCommonAmt.type
  //       newChild.label = planOrCommonAmt.name
  //       newChild.planOrCommonAmt = planOrCommonAmt
  //       this.planOrCommonAmt.name = ''
  //       this.planOrCommonAmt.Code = ''
  //       this.addTreeNode(newChild)
  //       NotificationSuccess()
  //     },
  //     [RuleEnum.AddDuty]: async () => {
  //       console.log(this.duty)
  //       let duty = _.cloneDeep(this.duty)
  //       res = await this.$http.post<number>('/duty/addDuty', this.duty)
  //       duty.dutyId = res
  //       newChild.treeNodeType = duty.dutyType
  //       newChild.label = duty.dutyName

  //       if (duty.dutyType === RuleEnum.AllowanceRule) {
  //         newChild.allowance = new AllowanceModel()
  //         newChild.allowance.subsidyDutyCode = duty.dutyCode
  //         newChild.allowance.subsidyDutyId = res
  //         newChild.allowance.subsidyDutyName = duty.dutyName
  //       }

  //       if (duty.dutyType === RuleEnum.DirectPay) {
  //         newChild.directPay = new DirectPayModel()
  //         newChild.directPay.base.directPayDutyCode = duty.dutyCode
  //         newChild.directPay.base.directPayDutyName = duty.dutyName
  //         newChild.directPay.base.directPayDutyId = duty.dutyId
  //       }

  //       if (duty.dutyType === RuleEnum.TPADuty) {
  //         newChild.tpa = new TPADuty()
  //         newChild.tpa.base.tpaName = duty.dutyName
  //         newChild.tpa.base.tpaCode = duty.dutyCode
  //         newChild.tpa.base.tpaDutyId = duty.dutyId
  //       }

  //       this.duty.dutyCode = ''
  //       this.duty.dutyName = ''
  //       this.addTreeNode(newChild)
  //       NotificationSuccess()
  //     },
  //     [RuleEnum.PublicCoverage]: async () => {
  //       console.log('this.slipRule.publicCoverageAmt', this.slipRule.publicCoverageAmt)
  //       let publicAmt = _.cloneDeep(this.slipRule.publicCoverageAmt)
  //       publicAmt.slipId = this.slipRule.slipPolicy.slipId
  //       publicAmt.isBearClassbRatio = publicAmt.isBearClassbRatio ? 1 : 0
  //       publicAmt.isBearMyselfRatio = publicAmt.isBearMyselfRatio ? 1 : 0
  //       publicAmt.isWaitDate = publicAmt.isWaitDate ? 1 : 0
  //       publicAmt.insuLimitTypeList = publicAmt.insuLimitTypeList.map(v => {
  //         delete v.$$index
  //         return v
  //       })
  //       res = await this.$http.post<number>('/insurance/updateCommonAmt', publicAmt)
  //       this.slipRule.publicCoverageAmt.commonAmtId = res
  //       NotificationSuccess()
  //     },
  //     [RuleEnum.AllowanceRule]: async () => {
  //       res = await this.$http.post<number>('/duty/updateSubsidyDuty', this.slipRule.allowance)
  //       this.currentTreeNodeData.allowance = _.cloneDeep(this.slipRule.allowance)
  //       this.currentTreeNodeData.label = this.slipRule.allowance.subsidyDutyName
  //       NotificationSuccess()
  //     },
  //     [RuleEnum.DirectPay]: async () => {
  //       await this.directPayOperate()
  //       NotificationSuccess()
  //     },
  //     [RuleEnum.TPADuty]: async () => {
  //       await this.tpaOperate()
  //       NotificationSuccess()
  //     },
  //     [RuleEnum.TPAReplenish]: async () => {
  //       await this.tpaReplenishOperation()
  //       NotificationSuccess()
  //     },
  //     [RuleEnum.Share]: async () => {
  //       await this.shareOperate()
  //       NotificationSuccess()
  //     },
  //     [RuleEnum.Plan]: () => null
  //   }
  //   operations[newChild.treeNodeType]()
  // }

  /**
   * 添加节点
   * @param {TempTreeNode} newChild
   */
  addTreeNode (newChild: TempTreeNode) {
    if (!this.currentTreeNodeData.children) {
      this.$set(this.currentTreeNodeData, 'children', [])
    }

    this.currentTreeNodeData.children &&
    this.currentTreeNodeData.children.push(newChild)
  }

  /**
   * 直付处理
   * @returns {Promise<void>}
   */
  async directPayOperate () {
    let res: number
    let { planId } = this.slipRule.plan
    // 判断是否是特殊限定
    if (this.$refs.directPay.isSpecial) {
      // 设置直付ID
      this.slipRule.directPay.special.specialSetting.dutyId =
          this.slipRule.directPay.base.directPayDutyId
      this.slipRule.directPay.special.specialSetting.dutyType = RuleEnum.DirectPay
      // 如果是添加限定
      if (!this.slipRule.directPay.special.specialSetting.specialSetId) {
        res = await addSpecialRuleSet(this.slipRule.directPay.special.specialSetting)
        this.slipRule.directPay.special.specialSetting.specialSetId = res
        // 添加或更新直付特殊规则
        await this.addAndUpdateSpecialRule()
      } else {
        // 更新限定
        res = await updateInsuSpecialSet(this.slipRule.directPay.special.specialSetting)
        await this.addAndUpdateSpecialRule()
      }
      // 更新或添加基本责任
    } else {
      this.slipRule.directPay.base.planId = planId
      res = await this.$http.post<number>('/duty/updateDirectPay', this.slipRule.directPay.base)
      const payList = await this.$http.postParams<DirectPayBaseModel>('/duty/getDirectPayByPlanId', { planId })
      console.log(this.slipRule.directPay.base.insuLimitTypeList, payList)
      _.merge(this.slipRule.directPay.base.insuLimitTypeList, payList.insuLimitTypeList)
    }
  }

  /**
   * 更新或添加直付特殊限定设置规则
   * @returns {Promise<void>}
   */
  async addAndUpdateSpecialRule () {
    let res: number
    let { specialSetId, dutyId } = this.slipRule.directPay.special.specialSetting
    // 添加限定必须要限定设置的ID
    this.slipRule.directPay.special.specialRule =
        this.$refs.directPay.specialRules.map((rule) => {
          rule.specialSetId = specialSetId
          return rule
        })
    res = await addSpecialRule(this.slipRule.directPay.special.specialRule)
  }

  /**
   * 处理TPA
   * @returns {Promise<void>}
   */
  async tpaOperate () {
    let res: number
    let { planId } = this.slipRule.plan

    if (this.$refs.tpa.isSpecial) {
      // 通过责任ID和责任类型去关联特殊责任
      this.slipRule.tpa.specail.specialSetting.dutyId = this.slipRule.tpa.base.tpaDutyId
      this.slipRule.tpa.specail.specialSetting.dutyType = RuleEnum.TPADuty

      let specialSetting = _.cloneDeep(this.slipRule.tpa.specail.specialSetting)
      specialSetting.isDeductible = specialSetting.isDeductible ? 1 : 0
      specialSetting.isLimitNum = specialSetting.isLimitNum ? 1 : 0
      specialSetting.isLimitAmt = specialSetting.isLimitAmt ? 1 : 0
      // 添加设置
      if (!specialSetting.specialSetId) {
        res = await addSpecialRuleSet(specialSetting)
        this.slipRule.tpa.specail.specialSetting.specialSetId = res
        await this.addAndUpdateTPASpecialRule()
      } else {
        // 更新设置
        res = await updateInsuSpecialSet(specialSetting)
        await this.addAndUpdateTPASpecialRule()
      }
    } else {
      // 处理基本元素
      this.slipRule.tpa.base.planId = planId
      let tpaBase = _.cloneDeep(this.slipRule.tpa.base)
      tpaBase.insuLimitTypeList = tpaBase.insuLimitTypeList.map((limit) => {
        delete limit.$$index
        return limit
      })
      tpaBase.isClassbRatio = tpaBase.isClassbRatio ? 1 : 0
      tpaBase.isMyselfRatio = tpaBase.isMyselfRatio ? 1 : 0
      tpaBase.isWaitDate = tpaBase.isWaitDate ? 1 : 0
      res = await this.$http.post<number>('/duty/updateTPADuty', tpaBase)
      const tpaLimitList = await this.$http.postParams<TPADutyBase>('/duty/getTPADutyByPlanId', { planId })
      _.merge(this.slipRule.tpa.base.insuLimitTypeList, tpaLimitList.insuLimitTypeList)
      console.log(this.slipRule.tpa)
    }
  }

  /**
   * 更新或添加TPA特殊限定设置规则
   * @returns {Promise<void>}
   */
  async addAndUpdateTPASpecialRule () {
    let res: number
    // 添加限定必须要限定设置的ID
    this.slipRule.tpa.specail.specialRule =
        this.$refs.tpa.specialRules.map((rule) => {
          rule.specialSetId = this.slipRule.tpa.specail.specialSetting.specialSetId
          return rule
        })
    res = await addSpecialRule(this.slipRule.tpa.specail.specialRule)
    console.log(res)
  }

  /**
   * 处理TPA小项
   * @returns {Promise<void>}
   */
  async tpaReplenishOperation () {
    if (this.currentTreeNodeData.tpa) {
      this.slipRule.tpaReplenish.tpadutyId = this.currentTreeNodeData.tpa.base.tpaDutyId
    }
    let tpaReplenish = _.cloneDeep(this.slipRule.tpaReplenish)
    tpaReplenish.insuLimitTypeList = tpaReplenish.insuLimitTypeList.map((limit) => {
      delete limit.$$index
      return limit
    })

    tpaReplenish.isClassbRatio = tpaReplenish.isClassbRatio ? 1 : 0
    tpaReplenish.isMyselfRatio = tpaReplenish.isMyselfRatio ? 1 : 0
    // 如果没有ID就是添加小项
    if (!tpaReplenish.smallItemId) {
      let res = await this.$http.post<number>('/duty/addSmallItem', tpaReplenish)
      tpaReplenish.smallItemId = res
      this.slipRule.tpaReplenish.smallItemId = res

      let newChild: TempTreeNode = {
        // id: nextUid(),
        treeNodeType: RuleEnum.TPAReplenish,
        // label: this.slipRule.tpaReplenish.smallItemName,
        children: [],
        tpaReplenish
      }
      this.addTreeNode(newChild)
    } else {
      // 更新小项
      await this.$http.post('/duty/updateSmallItem', tpaReplenish)
      this.currentTreeNodeData.tpaReplenish = _.cloneDeep(this.slipRule.tpaReplenish)
      // this.currentTreeNodeData.label = tpaReplenish.smallItemName
    }
  }

  /**
   * 点击共享
   * @returns {Promise<void>}
   */
  async operationShare () {
    let { planId, planName } = this.slipRule.plan
    assert(!!planId, '当前没有选中计划')
    this.currentTreeNode = RuleEnum.Share
    this.slipRule.share.planId = planId
    this.slipRule.share.slipId = this.slipRule.slipPolicy.slipId
    // 所有的共享
    let shareList: ShareModel[] = await this.$refs.share.query()
    // 得到本计划下面所有的共享数据
    // shareList =
    let allShareDuty: ShareDutyModel[] =
        shareList
            .filter(share => share.planId === planId)
            .reduce((acc: ShareDutyModel[], share) => acc.concat(share.insuShareDutyList), [])
    // 本计划所有的责任
    let allDuty = await getDutyByPlanId(planId)
    console.log(allDuty, allShareDuty)
    // 对后台的数据进行处理
    this.slipRule.allDuty = allDuty.filter((duty) => {
      duty.planName = planName
      for (let shareDuty of allShareDuty) {
        if (duty.dutyId === shareDuty.dutyId && duty.dutyType === shareDuty.dutyType) {
          return false
        }
      }

      return true
    })
  }

  /**
   * 点击保存共享
   */
  async shareOperate () {
    this.$refs.share.getSelectedRows()
    await this.$http.post('/duty/addShare', this.slipRule.share)
    await this.operationShare()
    this.$refs.share.fetchData()
  }
}
