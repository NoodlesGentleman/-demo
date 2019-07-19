<template>
  <div class="">
    <MainComponent
        :forms="forms"
        :columns="columns"
        :handleQueryParams="doSomething"
        ref="pkMain"
        url="/merchant/getOperateList4Warehouse">
    </MainComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from '../../../../ext-nb'
import QueryForm, { Params } from '../../../../components/main/model/Form'
import TableColumn from '../../../../components/main/model/Table'
import MainComponent from '../../../../components/main'
import { assert } from '../../../../shared/util/logger'
import _ from 'lodash'
import History from '../model/history.ts'
import GoodsVo from '../model/GoodsVo'
import { Prop } from 'vue-property-decorator'

@Component({
  components: {
    MainComponent
  },
  name: 'HistoryList'
})
export default class HistoryList extends Vue {
  dialogFormVisible = false
  dialogShowDetail = false
  dialogFormParams: History = new History()

  @Prop()
  goodsVo: GoodsVo

  forms: QueryForm[] = [
    {
      prop: 'operate',
      label: '操作',
      type: 'select',
      options: [
        {
          value: 1,
          displayValue: ''
        }
      ]
    },
    {
      prop: 'user',
      label: '操作人员',
      type: 'input',
      value: ''
    }
  ]

  columns: TableColumn[] = [
    {
      prop: 'type',
      label: '操作类型'
    },
    {
      prop: 'content',
      label: '操作内容'
    },
    {
      prop: 'user',
      label: '操作人员'
    },
    {
      prop: 'time',
      label: '操作时间'
    },
    {
      prop: 'file',
      label: '附件'
    }
  ]

  $refs: {
    pkMain: MainComponent
  }

  created () {
    this.$refs.pkMain.query()
  }

  doSomething (params: Params) {
    params.warehouseId = this.goodsVo.id
    return params
  }

  openFormDialog () {
    this.dialogFormVisible = true
  }

  closeFormDialog () {
    this.dialogFormVisible = false
  }

  openDialogShowDetail () {
    this.dialogShowDetail = true
  }

  closeDialogShowDetail () {
    this.dialogShowDetail = false
  }

  handleCurrentRowChange (row: History) {
    this.dialogFormParams = row
  }

  update () {
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openFormDialog()
  }

  /**
   * 查看
   */
  showDetail () {
//      assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openDialogShowDetail()
  }

  insert () {
    // assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openFormDialog()
  }

  disable () {
//      assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
//      this.disableMerchant()
  }

  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate () {
    await this.$http.post<number>('/customer/update', this.dialogFormParams)
    this.closeFormDialog()
    this.$refs.pkMain.query()
  }

//    async disableMerchant() {
//      let param = {'brandId': this.dialogFormParams.ida}
//      await this.$http.postParamsClick('/merchant/dsiableBrand', param)
//    }
}
</script>
