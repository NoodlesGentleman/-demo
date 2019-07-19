/**
 * Created by slipkinem on 4/4/2018 at 4:11 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import MainComponent from '../../../main'
import TableColumn from '../../../main/model/Table'
import { ShareModel } from '../../model/ShareModel'
import { LimitType } from '../../../../enum/LimitType'
import { DateType } from '../../../../enum/DateType'
import { Prop } from 'vue-property-decorator'
import { InsuDuty } from '../../model/InsuDuty'
import { ShareDutyModel } from '../../model/ShareDutyModel'
import { Getter } from 'vuex-class'
import { Params } from '../../../main/model/Form'
import { InsuPlan } from '../../model/InsuPlan'
import { getDutyByPlanId } from '../../service'
import { eventBus } from '../../../../factory/EventBus'

@Component({
  components: {
    MainComponent
  }
})
export default class ShareRule extends Vue {
  @Prop({
    default: () => new ShareModel()
  })
  share: ShareModel

  @Prop({
    default: () => []
  })
  allDuty: InsuDuty[]

  columns: TableColumn[] = [
    {
      label: '计划条目',
      prop: 'planId',
      filter: async (planId: number) => {
        if (planId) {
          return (await this.$http.postParams<InsuPlan>('/insurance/getPlanByplanId', { planId })).planName
        } else {
          return ''
        }
      }
    },
    {
      label: '责任条目',
      prop: 'insuShareDutyList',
      filter: async (insuShareDutyList: ShareDutyModel[], row: ShareModel) => {
        let str = ''
        let allDuty = await getDutyByPlanId(row.planId)

        allDuty.forEach(duty => {
          insuShareDutyList.forEach((shareDuty) => {
            if (shareDuty.dutyId === duty.dutyId && shareDuty.dutyType === duty.dutyType) {
              str += `${duty.dutyName}: ${shareDuty.availableProportion}%；`
            }
          })
        })
        return str
      }
    }
  ]

  isAddShare = false

  selectedRows: InsuDuty[] = []

  $refs: {
    pkMain: MainComponent
    ruleMainComponent: MainComponent
  }

  @Getter slipDisabledGetters: boolean

  async query () {
    return this.$refs.pkMain.query()
  }

  handleQueryParams (params: Params) {
    params.slipId = this.share.slipId
    return params
  }

  addShare () {
    this.isAddShare = true
    this.share.insuLimitTypeList = [
      {
        type: LimitType.Deduction,
        limitType: DateType.Year
      },
      {
        type: LimitType.Deduction,
        limitType: DateType.Month
      },
      {
        type: LimitType.Deduction,
        limitType: DateType.Day
      },
      {
        type: LimitType.Deduction,
        limitType: DateType.Times
      }
    ]
  }

  fetchData () {
    this.isAddShare = false
  }

  handleDutyChange (rows: InsuDuty[]) {
    console.log(rows)
    this.selectedRows = rows
  }

  getSelectedRows () {
    this.share.insuShareDutyList = this.selectedRows.map(row => {
      return {
        dutyId: row.dutyId,
        availableProportion: row.availableProportion,
        dutyType: row.dutyType
      }
    })
  }

  async deleteShare () {
    await this.$confirm('确定要删除本条计划吗？')
    let { shareId } = this.$refs.pkMain.getSelectedRow<ShareModel>()
    await this.$http.postParams('/duty/deletedShare', { shareId })
    eventBus.publish('operationShare')
  }

  render () {
    return (
        <div class='share'>
          <MainComponent
              initialize={false}
              ref='pkMain'
              columns={this.columns}
              showPagination={false}
              handleQueryParams={this.handleQueryParams}
              url='/duty/getAllShareBySlipId'
          >
            {
              !this.slipDisabledGetters ?
                  <el-button-group slot='dispose'>
                    <el-button size='mini' type='info' onClick={this.addShare}>新增</el-button>
                    <el-button size='mini' type='danger' onClick={this.deleteShare}>删除</el-button>
                  </el-button-group> :
                  <span slot='dispose'/>
            }
          </MainComponent>

          {
            this.isAddShare && !this.slipDisabledGetters ?
                <el-row style='margin-top: 80px' gutter={10}>
                  <el-col span={12}>
                    <h5>责任选择</h5>
                    <el-table
                        data={this.allDuty}
                        stripe
                        border
                        size='mini'
                        onSelection-change={this.handleDutyChange}
                        highlight-current-row>
                      <el-table-column
                          type='selection'
                          width='55'>
                      </el-table-column>
                      <el-table-column
                          prop='planName'
                          label='计划名称'>
                      </el-table-column>
                      <el-table-column
                          prop='dutyName'
                          label='责任名称'>
                      </el-table-column>
                      <el-table-column label='可用比例'>
                        {
                          (props: any) => (
                              <el-input size='mini' v-model={props.row.availableProportion}/>
                          )
                        }
                      </el-table-column>
                    </el-table>
                  </el-col>

                  <el-col span={12}>
                    <h5>条件设置</h5>
                    <el-form label-width='80px' size='mini'>
                      <el-form-item label='保额'>
                        <el-input v-model={this.share.insuAmount}/>
                      </el-form-item>
                      {
                        this.share.insuLimitTypeList.map((deductible, key) =>
                            <el-row class='compensate' key={key}>
                              <el-col span={24}>
                                <el-form-item label={key === 0 ? '免赔方式' : ''}>
                                  <el-input class='input-with-select' v-model={deductible.limitNumber}>
                                    <el-select
                                        disabled
                                        v-model={deductible.limitType}
                                        slot='prepend'
                                        placeholder='请选择'>
                                      <el-option label='年' value={DateType.Year}/>
                                      <el-option label='月' value={DateType.Month}/>
                                      <el-option label='日' value={DateType.Day}/>
                                      <el-option label='次' value={DateType.Times}/>
                                    </el-select>
                                    <template slot='append'>
                                      元
                                    </template>
                                  </el-input>
                                </el-form-item>
                              </el-col>
                            </el-row>)
                      }
                    </el-form>
                  </el-col>
                </el-row> :
                undefined
          }
        </div>
    )
  }
}
