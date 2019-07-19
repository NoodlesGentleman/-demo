/**
 * Created by slipkinem on 3/7/2018 at 1:31 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import MainComponent from '../../../components/main'
import QueryForm from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import ChangeDetail from './dialog/ChangeDetail'
import { assert } from '../../../shared/util/logger'
import { BatchInfo } from './model/BatchInfo'

@Component({
  components: {
    MainComponent,
    ChangeDetail
  }
})
export default class CustomerModification extends Vue {
  forms: QueryForm[] = [
    {
      prop: 'beginTime',
      label: '修改时间',
      type: 'date'
    },
    {
      prop: 'endTime',
      label: '-',
      type: 'date'
    },
    {
      prop: 'operationUser',
      label: '操作人员',
      type: 'typeahead',
      remoteUrl: '/sysUser/getUserListByName',
      typeaheadProp: {
        value: 'id',
        label: 'name',
        query: 'query'
      }
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'batchCode',
      label: '批改编号'
    },
    {
      prop: 'updateTime',
      label: '修改时间'
    },
    {
      prop: 'count',
      label: '修改人数'
    },
    {
      prop: 'operateUsername',
      label: '操作人员'
    }
  ]

  $refs: {
    changeDetail: ChangeDetail
    pkMain: MainComponent
  }

  async showDetail () {
    let selectRow = this.$refs.pkMain.getSelectedRow<BatchInfo>()
    assert(selectRow.count !== 0, '修改人数为0')
    await this.$refs.changeDetail.open(selectRow)
  }
}
