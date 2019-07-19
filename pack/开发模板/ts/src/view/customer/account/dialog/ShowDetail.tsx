/**
 * Created by slipkinem on 4/25/2018 at 11:02 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import MainComponent from '../../../../components/main'
import TableColumn from '../../../../components/main/model/Table'
import { AccountSlipInfo } from '../model'

@Component({
  components: {
    MainComponent
  }
})
class ShowDetail extends Vue {
  $refs: {
    slipInfo: MainComponent
    payType: MainComponent
  }

  private showDialog = false
  private tabActive = 'slipInfo'
  private slipInfoColumns: TableColumn[] = [
    {
      label: '保单',
      prop: 'slipCode'
    },
    {
      label: '期限',
      prop: '',
      filter (time: string, slipInfo: AccountSlipInfo) {
        return slipInfo.beginDate + '--' + slipInfo.endDate
      }
    },
    {
      label: '基金总额度',
      prop: 'countAmount'
    },
    {
      label: '基金余额',
      prop: 'remainder'
    },
    {
      label: '冻结状态',
      prop: 'frozenState',
      filter: 'frozenStateFilter'
    }
  ]

  private payTypeColumns: TableColumn[] = [
    {
      label: '支付方式',
      prop: 'payType',
      filter: 'payTypeFilter'
    },
    {
      label: '账号',
      prop: 'code'
    }
  ]

  submit () {
    this.close()
  }

  close () {
    this.showDialog = false
  }

  open () {
    this.showDialog = true
  }

  query (customerAccountId: number) {
    this.open()
    this.$nextTick(async () => {
      await this.$refs.payType.query({ customerAccountId })
      await this.$refs.slipInfo.query({ customerAccountId })
    })
  }

  render () {
    return (
        <el-dialog width='60%' title='账户设定' visible$sync={this.showDialog}>
          <el-tabs v-model={this.tabActive}>
            <el-tab-pane name='slipInfo' label='保单信息'>
              <MainComponent ref='slipInfo' url='/account/getPesonSlip' showPagination={false}
                             columns={this.slipInfoColumns}>
                <span slot='dispose'/>
              </MainComponent>
            </el-tab-pane>
            <el-tab-pane name='payType' label='支付方式'>
              <MainComponent ref='payType' url='/account/getPayType' showPagination={false}
                             columns={this.payTypeColumns}>
                <span slot='dispose'/>
              </MainComponent>
            </el-tab-pane>
          </el-tabs>
          <div slot='footer' class='dialog-footer'>
            <el-button size='small' type='primary' onClick={this.submit}>保 存</el-button>
            <el-button size='small' type='warning' onClick={this.close}>取 消</el-button>
          </div>
        </el-dialog>
    )
  }
}

export default ShowDetail
