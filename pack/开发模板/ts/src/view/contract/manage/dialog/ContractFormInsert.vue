<template>
    <el-form :model="ContractFormInsert"
             ref="ContractFormInsert"
             size="small"
             :rules="rule"
             label-width="115px">
      <el-form-item label="合同名称" prop="contractname">
        <el-input v-model="ContractFormInsert.contractname"  />
      </el-form-item>
      <el-form-item label="合同编号">
        <el-input v-model="ContractFormInsert.contractcode" :disabled="true" />
      </el-form-item>
      <el-form-item label="合同类型" prop="contracttype">
        <el-select :value="ContractFormInsert.contracttype"
                   v-model="ContractFormInsert.contracttype"
                   placeholder="合同类型">
          <el-option v-for="(contracttype, key) in contracttype"
                     :label="contracttype.displayValue"
                     :value="Number(contracttype.value)" :key="key"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="title" prop="contractfirst">
        <PkTypeahead
            v-model.trim="ContractFormInsert.contractfirst"
            :url=this.url
            placeholder="请输入关键词"
            method="GET"
            :prop="{
              value: 'id',
              label: 'name',
              query: 'query'
          }"
        />
      </el-form-item>
      <el-form-item label="签约方2" prop="contractsecond">
        <el-input v-model="ContractFormInsert.contractsecond" />
      </el-form-item>
      <el-form-item label="签约方3">
        <el-input v-model="ContractFormInsert.contractthird" />
      </el-form-item>
      <el-form-item label="合同期限" prop="contractdate">
        <el-date-picker
          v-model="ContractFormInsert.contractdate"
          type="daterange"
          :picker-options="dateOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          auto-complete="off"
          align="right"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ContractFormInsert.contractmemo" />
      </el-form-item>
    </el-form>
</template>


<script lang="ts">

  import { Vue, Component, Prop } from '../../../../ext-nb'
  import ContractModel from '../model/ContractModel'
  import { OptionItem } from '../../../../shared/util/model/OptionItem'
  import { getContractType } from '../../../../shared/util/service'
  import { Watch } from 'vue-property-decorator'
  import ResPage from '../../../../model/ResPage'
  import { ElForm } from 'element-ui/types/form'
  import PkTypeahead from '../../../../components/typeahead'

  @Component({
    name: 'ContractFormInsert',
    components: {
      PkTypeahead
    }
  })
  export default class ContractFormInsert extends Vue {
    @Prop({
      default: () => new ContractModel()
    })
    ContractFormInsert: ContractModel
    @Prop()
    operationType: string
    @Prop()
    url: string
    title: string = '保险公司'
    contracttype: OptionItem[] = []
    rule = {
      contractname: [
        { required: true, type: 'string', message: '请输入合同名称' }
      ],
      contractdate: [
        { required: true, message: '请输入合同期限' }
      ],
      contracttype: [
        { required: true, message: '请输入合同类型' }
      ],
      contractsecond: [
        { required: true, message: '请输入签约方2' }
      ],
      contractfirst: [
        { required: true, message: '请输入签约方1' }
      ]
    }
    $refs: {
      ContractFormInsert: ElForm
    }
    async created () {
      this.contracttype = await getContractType()
    }

    @Watch('ContractFormInsert.contracttype')
    change () {
      if (this.ContractFormInsert.contracttype === 1) {
        this.title = '保险公司'
        this.url = '/getInsuranceListByName'
      }
      if (this.ContractFormInsert.contracttype === 2) {
        this.title = '商户'
        this.url = '/merchant/getMerchantListByName'
      }
      if (this.ContractFormInsert.contracttype === 3) {
        this.title = '其他公司'
        this.url = '/getOtherCompanyListByName'
      }
    }
  }
</script>
