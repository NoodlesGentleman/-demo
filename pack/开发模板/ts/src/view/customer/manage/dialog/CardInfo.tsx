/**
 * Created by slipkinem on 4/19/2018 at 10:50 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import MainComponent from '../../../../components/main'
import Customer from '../model/Customer'
import TableColumn from '../../../../components/main/model/Table'
import { updateCardDeleted, updateCardLose } from '../../../stock/cardManager/service'
import CardManagerModel from '../../../stock/cardManager/model/CardManagerModel'
import { assert } from '../../../../shared/util/logger'

@Component({
  components: {
    MainComponent
  }
})
class CardInfo extends Vue {
  $refs: {
    pkMain: MainComponent
  }

  customer: Customer

  private columns: TableColumn[] = [
    {
      prop: 'cardCode',
      label: '卡号'
    },
    {
      prop: 'slipCode',
      label: '保单号'
    },
    {
      prop: 'type',
      label: '卡类型',
      filter: 'stockCardTypeFilter'
    },
    {
      prop: 'lose',
      label: '挂失状态',
      filter: 'stockCardLoseFilter'
    },
    {
      prop: 'deleted',
      label: '作废',
      filter: 'stockCardDeletedFilter'
    }
  ]

  async query (customer: Customer) {
    this.customer = customer
    return this.$refs.pkMain.query({ userId: customer.id })
  }

  async cancellation () {
    let stockCard = this.$refs.pkMain.getSelectedRow<CardManagerModel>()
    assert(stockCard.lose !== 0, '未挂失的卡不能作废')
    await this.$confirm('是否要作废卡片?')
    await updateCardDeleted(stockCard)
    this.query(this.customer)
  }

  async loseOperate () {
    let stockCard = this.$refs.pkMain.getSelectedRow<CardManagerModel>()
    await this.$confirm('是否要挂失或者解挂卡片？')
    await updateCardLose(stockCard)
    this.query(this.customer)
  }

  render () {
    return (
        <div className={'CardInfo'}>
          <MainComponent ref={'pkMain'} columns={this.columns} url={'/stock/getCard'}>
            <el-button-group slot='dispose'>
              <el-button type='primary' size='mini' onClick={this.loseOperate}>挂失/解挂</el-button>
              <el-button type='danger' size='mini' onClick={this.cancellation}>作废</el-button>
            </el-button-group>
          </MainComponent>
        </div>
    )
  }
}

export default CardInfo
