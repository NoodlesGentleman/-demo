<template>
  <div class="contact">
  <MainComponent
    :handleResponseData="handleResponseDataContact"
    url="/getContract"
    :handleQueryParams="handleQueryParamsContact"
    ref="pkMain"
    @handleCurrentRowChange="handleCurrentRowChangeContact"
    :columns="column">
    <template slot="dispose">
        <el-button size="small" type="success"  @click.native="download">下载</el-button>
    </template>
  </MainComponent>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from '../../../../ext-nb'
  import { Params } from '../../../../components/main/model/Form'
  import MainComponent from '../../../../components/main/index'
  import ContractModel from '../model/ContractModel'
  import Insurance from '../model/Insurance'
  import { downloadZip, FileURL } from '../../../../shared/util/ZIP'
  import Enclosure from '../../../contract/manage/model/Enclosure'
  import { assert } from '../../../../shared/util/logger'
  @Component({
    components: {
      MainComponent
    }
  })
  export default class InsuContractForm extends Vue {
    currentRow: ContractModel
    dialogFormVisible = false
    dialogInsertContact = false
    dialogShowDetail = false
    dialogFormParams: ContractModel = new ContractModel()
    tabActive = 'contact'
    column = [
      {
        prop: 'contractname',
        label: '合同名称'
      },
      {
        prop: 'contractdate',
        label: '合同期限'
      },
      {
        prop: 'contracttype',
        label: '合同类型',
        filter: 'contractFilter'
      },
      {
        prop: 'count',
        label: '附件情况'
      }
    ]
    $refs: {
      pkMain: MainComponent
      InsuContractForm: any
    }
    @Prop({
      default: () => new Insurance()
    })
    insuranceForm: Insurance
    contactInsertForm: ContractModel = new ContractModel()
    enclosure: Enclosure = new Enclosure()
    @Prop({
      default: () => 'edit'
    })
    operationType: string

    async mounted () {
      await this.$refs.pkMain.query()
    }

    handleResponseDataContact (data: ContractModel[]): ContractModel[] {
      if (data.length === 0) {
        this.currentRow = new ContractModel()
        return []
      } else {
        return data.map((v) => {
          if (v.count != null) {
            v.count = '有'
          } else {
            v.count = '无'
          }
          return v
        })
      }
    }


    handleCurrentRowChangeContact (row: ContractModel) {
      this.dialogFormParams = row
    }

    handleQueryParamsContact (params: Params) {
      params.contractfirst = this.insuranceForm.id
      params.contracttype = 1
      return params
    }
    async download () {
      this.dialogFormParams = this.$refs.pkMain.getSelectedRow()
      let downloadName = new Array<FileURL | string>()
      const data = await this.$http.postParams<any>('/getEnclosureByContract', { id: this.dialogFormParams.contractid })
      assert(data.total > 0, '无数据')
      data.rows.forEach((v: any) => {
        const name = '/excel/' + v.enclosurepeople
        downloadName.push(name)
      })
      downloadZip(downloadName)
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped></style>
