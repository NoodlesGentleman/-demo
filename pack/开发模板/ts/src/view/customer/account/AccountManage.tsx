/**
 * Created by slipkinem on 4/19/2018 at 11:42 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import TableColumn from '../../../components/main/model/Table'
import QueryForm from '../../../components/main/model/Form'
import MainComponent from '../../../components/main'
import { api } from '../../../api'
import { getActivationState, getFrozenState } from '../../../shared/util/service'
import { Account } from './model'
import ShowDetail from './dialog/ShowDetail'
import { OperationType } from './OperationType'
import { FreezeState } from './FreezeState'

@Component({
  components: {
    MainComponent,
    ShowDetail
  }
})
class AccountManage extends Vue {
  $refs: {
    pkMain: MainComponent
    showDetail: ShowDetail
  }

  columns: TableColumn[] = [
    {
      prop: 'name',
      label: '账户'
    },
    {
      prop: 'certificateType',
      label: '证件类型',
      filter: 'certificateTypeFilter'
    },
    {
      prop: 'certificateCode',
      label: '证件号'
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
      prop: 'activationState',
      label: '激活状态',
      filter: 'activationStateFilter'
    },
    {
      prop: 'frozenState',
      label: '冻结状态',
      filter: 'frozenStateFilter'
    }
  ]

  forms: QueryForm[] = [
    {
      prop: 'accountName',
      label: '账户名称'
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
        query: 'corpName'
      }
    },
    {
      prop: 'activationState',
      label: '激活状态',
      type: 'select',
      options: getActivationState()
    },
    {
      prop: 'frozenState',
      label: '冻结状态',
      type: 'select',
      options: getFrozenState()
    }
  ]

  /**
   * 查看详情
   * @returns {Promise<void>}
   */
  async showDetail () {
    const account = this.getAccount()
    await this.$refs.showDetail.query(account.customerAccountId)
  }

  getAccount () {
    return this.$refs.pkMain.getSelectedRow<Account>()
  }

  /**
   * 激活
   * @returns {Promise<void>}
   */
  async active () {
    const { frozenState, customerAccountId } = this.getAccount()
    await this.$http.postParams('/account/activationAccount', {
      accountId: customerAccountId,
      frozenState
    })
  }

  /**
   * 冻结或者解冻,根据账户的冻结状态判断
   * @returns {Promise<ElMessageComponent>}
   */
  async freeze () {
    const { frozenState, customerAccountId } = this.getAccount()
    let operationState

    if (frozenState === FreezeState.freeze) {
      await this.$confirm('您确定要解冻账户吗？')
      operationState = OperationType.unFreeze
    } else if (frozenState === FreezeState.unFreeze) {
      await this.$confirm('您确定要冻结账户吗？')
      operationState = OperationType.freeze
    } else {
      return this.$message('未知冻结状态')
    }

    await this.$http.postParams('/account/forzenAccount', {
      accountId: customerAccountId,
      operationState
    })
    await this.$refs.pkMain.query()
  }

  /**
   * 重置密码
   * @returns {Promise<void>}
   */
  async resetPassword () {
    let { customerAccountId } = this.getAccount()
    await this.$confirm('您确定要重置密码吗？')
    await this.$http.postParams('/account/resetPassword', {
      customerAccountId
    })
  }

  render () {
    return (
        <div class={'AccountManage'}>
          <ShowDetail ref={'showDetail'}/>
          <MainComponent url='/account/getAccount' ref='pkMain' forms={this.forms} columns={this.columns}>
            <el-button-group slot='dispose'>
              <el-button size='mini' onClick={() => this.showDetail()} type='success'>查看</el-button>
              <el-button size='mini' onClick={() => this.active()} type='info'>激活</el-button>
              <el-button size='mini' onClick={() => this.freeze()} type='warning'>冻结/解冻</el-button>
              <el-button size='mini' onClick={() => this.resetPassword()} type='info'>密码重置</el-button>
            </el-button-group>
          </MainComponent>
        </div>
    )
  }
}

export default AccountManage
