/**
 * Created by slipkinem on 3/21/2018 at 3:00 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm, { Params } from '../../../components/main/model/Form'
import { getSlipState } from '../../../shared/util/service'
import TableColumn from '../../../components/main/model/Table'
import EditSlipComponent from './dialog/edit/index.vue'
import EditSlip from './dialog/edit'
import { BaseInsuSlip } from '../../../components/slip/model/BaseInsuSlip'
import { InsuOtherAmt } from '../../../components/slip/model/InsuOtherAmt'
import _ from 'lodash'
import { PublicCoverageAmt } from '../../../components/slip/model/PublicCoverageAmt'
import { InsuPlan } from '../../../components/slip/model/InsuPlan'
import { RuleEnum } from '../../../enum/Rule'
import { AllowanceModel } from '../../../components/slip/model/AllowanceModel'
import { DirectPayBaseModel } from '../../../components/slip/model/DirectPayBaseModel'
import { nextUid } from '../../../shared/util/uid'
import { TPADuty } from '../../../components/slip/model/TPADuty'
import { TPADutyBase } from '../../../components/slip/model/TPADutyBase'
import {
  genderDirectPayInsuTypeLimitList,
  genderInsuTypeLimitList,
  getInsuSpecialSet
} from '../../../components/slip/service'
import { TPAReplenishModel } from '../../../components/slip/model/TPAReplenishModel'
// import { TempTreeNode } from '../../../components/slip/model/TempTreeNode'
import { InsuExceptDuty } from '../../../components/slip/model/InsuExceptDuty'
import { Slip } from './model/Slip'
import { RuleOperationType } from '../../../enum/RuleOperationType'
import { operationSlip } from './service'
import { SlipStatus } from '../../../enum/SlipStatus'
import { Mutation } from 'vuex-class'
import { slipOperationType } from '../../../store/model/state'
import { api } from '../../../api'
import SetAccount from './dialog/SetAccount'
import { eventBus } from '../../../factory/EventBus'
import { assert } from '../../../shared/util/logger'

@Component({
  components: {
    MainComponent,
    EditSlipComponent,
    SetAccount
  }
})
export default class SlipManageComponent extends Vue {
  $refs: {
    editSlip: EditSlip
    pkMain: MainComponent
    account: SetAccount
  }

  slip: Slip = new Slip()

  forms: QueryForm[] = [
    {
      prop: 'slipCode',
      label: '保单编号'
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
      prop: 'coverCompanyId',
      label: '投保公司',
      type: 'typeahead',
      remoteUrl: api.company.getCorp,
      typeaheadProp: {
        value: 'id',
        label: 'name',
        query: 'query'
      }
    },
    {
      prop: 'slipState',
      label: '保单状态',
      type: 'select',
      options: getSlipState()
    },
    {
      prop: 'beginTime',
      label: '开始时间',
      type: 'date'
    },
    {
      prop: 'endTime',
      label: '结束时间',
      type: 'date'
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'slipCode',
      label: '保单号'
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
      prop: 'otherCompanyName',
      label: '其他公司'
    },
    {
      prop: 'beginDate',
      label: '起保日期'
    },
    {
      prop: 'slipState',
      label: '保单状态',
      filter: 'slipStateFilter'
    },
    {
      prop: 'createTime',
      label: '保单创建时间'
    }
  ]

  @Mutation SET_SLIP_OPERATION: (payload: slipOperationType) => void

  /**
   * 新增保单
   */
  addSlip () {
    this.SET_SLIP_OPERATION('edit')
    this.$refs.editSlip.openEditSlip()
    this.$nextTick(() => {
      this.$refs.editSlip.$refs.slipRuleManage.data = [{
        treeNodeType: RuleEnum.Policy
        // id:nextUid()
      }]
    })
  }

  mounted () {
    eventBus.subscribe('editClose', this.onEditClose)
  }

  /**
   * 保单编辑完成的回调
   */
  onEditClose () {
    this.$nextTick(() => {
      this.slip = new Slip()
    })
    this.$refs.pkMain.query()
  }

  /**
   * 修改保单
   * @returns {Promise<void>}
   */
  async updateSlip () {
    this.SET_SLIP_OPERATION('edit')
    await this.genderSlip()
  }

  /**
   * 获取保单数据
   * @returns {Promise<void>}
   */
  async genderSlip () {
    let insuSlip = this.$refs.pkMain.getSelectedRow<BaseInsuSlip>()
    let { slipId, slipCode } = insuSlip
    this.$refs.editSlip.openEditSlip()
    // 处理保单基础信息
    _.merge(this.slip.baseInfo, insuSlip)
    let insuOtherAmtList = await this.$http.postParams<InsuOtherAmt[]>('/insurance/getOtherAmtBySlipId', { slipId })
    this.slip.baseInfo.insuOtherAmtList = _.isEmpty(insuOtherAmtList) ? [new InsuOtherAmt()] : insuOtherAmtList
    // 处理计划
    console.log('insuSlip', insuSlip)
    this.slip.slipRule.slipPolicy.slipId = slipId
    this.slip.slipRule.slipPolicy.slipCode = slipCode
    // 除外责任
    let insuExceptDuty = (await this.$http.postParams<InsuExceptDuty[]>('/insurance/getExceptDutyBySlipId', { slipId }))[0]

    if (!_.isEmpty(insuExceptDuty)) {
      this.slip.slipRule.slipPolicy.exceptDuty = insuExceptDuty

      if (_.isString(insuExceptDuty.optionItemIdStr)) {
        this.slip.slipRule.slipPolicy.exceptDuty.optionItemIdStr =
            insuExceptDuty.optionItemIdStr
                .split(',')
                .map(item => Number(item))
      }
    }
    // 获取计划
    let planOrCommonAmts = await this.$http.postParams<InsuPlan[]>('/insurance/getPlanBySlipId', { slipId })
    // 开始生成树
    // let treeData: TempTreeNode[] = [{
    //   label: slipCode,
    //   treeNodeType: RuleEnum.Policy,
    //   id: nextUid(),
    //   children: []
    // }]
    // let treeData: TempTreeNode[] = [{
    //   label: slipCode,
    //   treeNodeType: RuleEnum.Policy,
    //   id: nextUid(),
    //   children: []
    // }]
    // 如果有计划
    // if (!_.isEmpty(planOrCommonAmts)) {
    //   planOrCommonAmts.forEach(async (planOrCommonAmt, index) => {
    //     // let treeNode = treeData[0]
    //     // 添加计划节点
    //     if (treeNode.children) {
    //         treeNode.children.push({
    //         label: planOrCommonAmt.planName,
    //         id: nextUid(),
    //         treeNodeType: RuleEnum.Plan,
    //         planOrCommonAmt: {
    //           slipId,
    //           type: planOrCommonAmt.planType,
    //           name: planOrCommonAmt.planName,
    //           Code: planOrCommonAmt.planCode,
    //           planOrAmtId: planOrCommonAmt.planId
    //         },
    //         children: []
    //       })
    //       this.slip.slipRule.plan = planOrCommonAmt
    //       // 责任
    //       let { planId } = this.slip.slipRule.plan
    //       // treeNode = treeNode.children[index]
    //       // 津贴责任
    //       let allowances = await this.$http.postParams<AllowanceModel[]>('/duty/getSubsidyByPlanId', { planId })
    //       if (!_.isEmpty(allowances)) {
    //         this.slip.slipRule.allowance = allowances[0]

    //         allowances.forEach((allowance) => {
    //           // if (treeNode.children) {
    //           //   // treeNode.children.push({
    //           //   //   label: allowance.subsidyDutyName,
    //           //   //   id: nextUid(),
    //           //   //   treeNodeType: RuleEnum.AllowanceRule,
    //           //   //   allowance
    //           //   // })
    //           // }
    //         })
    //       }
    //       // 直付责任
    //       this.slip.slipRule.directPay.base =
    //           await this.$http.postParams<DirectPayBaseModel>('/duty/getDirectPayByPlanId', { planId })

    //       this.slip.slipRule.directPay.base.insuLimitTypeList =
    //           _.merge(genderDirectPayInsuTypeLimitList(), this.slip.slipRule.directPay.base.insuLimitTypeList)

    //       if (!_.isUndefined(this.slip.slipRule.directPay.base.directPayDutyId)) {
    //         console.log('getInsuSpecialSet(RuleEnum.DirectPay, this.slip.slipRule.directPay.base.directPayDutyId)', RuleEnum.DirectPay, this.slip.slipRule.directPay.base.directPayDutyId)
    //         this.slip.slipRule.directPay.specialRuleList =
    //             await getInsuSpecialSet(RuleEnum.DirectPay, this.slip.slipRule.directPay.base.directPayDutyId)

    //         // if (treeNode.children) {
    //         //   treeNode.children.push({
    //         //     label: this.slip.slipRule.directPay.base.directPayDutyName,
    //         //     id: nextUid(),
    //         //     treeNodeType: RuleEnum.DirectPay,
    //         //     directPay: _.cloneDeep(this.slip.slipRule.directPay)
    //         //   })
    //         // }
    //       }
    //       //  TPA普通责任
    //       let tpaBases = await
    //           this.$http.postParams<TPADutyBase[]>('/duty/getTPADutyByPlanId', { planId })
    //       if (!_.isEmpty(tpaBases)) {
    //         this.slip.slipRule.tpa.base = tpaBases[0]

    //         tpaBases.forEach(async (tpaBase) => {
    //           let { tpaDutyId } = tpaBase

    //           let tpa = new TPADuty()
    //           tpa.base = tpaBase
    //           tpa.base.insuLimitTypeList =
    //               _.merge(genderInsuTypeLimitList(), tpa.base.insuLimitTypeList)
    //           console.log('manage/index -> getInsuSpecialSet()', RuleEnum.TPADuty, tpaDutyId)
    //           tpa.specialRuleList = await getInsuSpecialSet(RuleEnum.TPADuty, tpaDutyId)

    //           // if (treeNode.children) {
    //           //   // 小项
    //           //   let tpaReplenishs = await this.$http.postParams<TPAReplenishModel[]>('/duty/getSmallItemByTPADutyId', { tpaDutyId })
    //           //   // let children: TempTreeNode[] = tpaReplenishs.map((tpaReplenish) => {
    //           //   //   tpaReplenish.insuLimitTypeList =
    //           //   //       _.merge(genderInsuTypeLimitList(), tpaReplenish.insuLimitTypeList)

    //           //   //   return {
    //           //   //     label: tpaReplenish.smallItemName,
    //           //   //     id: nextUid(),
    //           //   //     treeNodeType: RuleEnum.TPAReplenish,
    //           //   //     tpaReplenish
    //           //   //   }
    //           //   // })

    //           //   treeNode.children.push({
    //           //     label: tpaBase.tpaName,
    //           //     id: nextUid(),
    //           //     treeNodeType: RuleEnum.TPADuty,
    //           //     tpa,
    //           //     children
    //           //   })
    //           // }
    //         })
    //       }
    //     }
    //   })
    // }

    // 获取公共保额
    let publicCoverageAmt =
        await this.$http.postParams<PublicCoverageAmt[]>('/insurance/getCommonAmtBySlipId', { slipId })
    // 如果有公共保额
    if (!_.isEmpty(publicCoverageAmt)) {
      // let commonTreeNode = treeData[0]
      this.slip.slipRule.publicCoverageAmt = publicCoverageAmt[0]
      let planOrCommonAmt = this.slip.slipRule.publicCoverageAmt
      this.slip.slipRule.publicCoverageAmt.insuLimitTypeList =
          _.merge(genderInsuTypeLimitList(), this.slip.slipRule.publicCoverageAmt.insuLimitTypeList)

      // if (commonTreeNode.children) {
      //   commonTreeNode.children.push({
      //     label: this.slip.slipRule.publicCoverageAmt.commonName,
      //     id: nextUid(),
      //     treeNodeType: RuleEnum.PublicCoverage,
      //     planOrCommonAmt: {
      //       slipId,
      //       type: RuleEnum.PublicCoverage,
      //       name: planOrCommonAmt.commonName,
      //       Code: planOrCommonAmt.commonCode,
      //       planOrAmtId: planOrCommonAmt.commonAmtId
      //     }
      //   })
      // }
    }
    console.log('this.slip', this.slip, nextUid(), this.$refs)
    this.$nextTick(() => {
      // this.$refs.editSlip.$refs.slipRuleManage.data = treeData
    })
  }

  /**
   * 作废保单
   * @returns {Promise<void>}
   */
  async cancellationSlip () {
    let insuSlip = this.$refs.pkMain.getSelectedRow<BaseInsuSlip>()
    assert(insuSlip.slipState !== SlipStatus.TakeEffect, '该保单 ' + insuSlip.slipCode + ' 为已生效状态，请冻结后再作废！')
    assert(insuSlip.slipState !== SlipStatus.Cancellation, '该保单 ' + insuSlip.slipCode + ' 为已经作废状态！')
    await this.$confirm(`确认作废保单： <span class="text-danger">${insuSlip.slipCode}</span> 吗?`, {
      dangerouslyUseHTMLString: true,
      type: 'error'
    })
    await operationSlip(insuSlip, RuleOperationType.Cancellation)
    await this.$refs.pkMain.query()
  }

  /**
   * 冻结保单
   * @returns {Promise<void>}
   */
  async freezeSlip () {
    let insuSlip = this.$refs.pkMain.getSelectedRow<BaseInsuSlip>()
    if (insuSlip.slipState === SlipStatus.TakeEffect) {
      await this.$confirm(`确认冻结保单： <span class="text-danger">${insuSlip.slipCode}</span> 吗?`, {
        dangerouslyUseHTMLString: true,
        type: 'error'
      })
      await operationSlip(insuSlip, RuleOperationType.Freeze)
    } else {
      await this.$confirm(`确认解冻保单： <span class="text-danger">${insuSlip.slipCode}</span> 吗?`, {
        dangerouslyUseHTMLString: true,
        type: 'error'
      })
      await operationSlip(insuSlip, RuleOperationType.Unfreeze)
    }
    await this.$refs.pkMain.query()
  }

  /**
   * 查看详情
   * @returns {Promise<void>}
   */
  async showDetail () {
    this.SET_SLIP_OPERATION('check')
    await this.genderSlip()
  }

  /**
   * 审核
   * @returns {Promise<void>}
   */
  async auditSlip () {
    let insuSlip = this.$refs.pkMain.getSelectedRow<BaseInsuSlip>()
    assert(insuSlip.slipState === SlipStatus.CheckPending, '此保单 ' + insuSlip.slipCode + ' 不是待审核状态，不能审核！')
    this.SET_SLIP_OPERATION('audit')
    await this.genderSlip()
  }

  /**
   * 账户设定
   */
  setAccount () {
    this.$refs.account.open(this.$refs.pkMain.getSelectedRow<BaseInsuSlip>())
  }

  handleQueryParamsContact (params: Params) {
    return Object.assign(params, this.$route.query)
  }

  beforeRouteEnter (to: any, from: any, next: any) {
    next((vm: SlipManageComponent) => {
      if (!_.isEmpty(vm.$route.query)) {
        vm.$refs.pkMain.query()
      }
    })
  }
}
