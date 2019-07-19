<template>
    <el-form :model="ContractForm"
             ref="ContractForm"
             size="small"
             :rules="rule"
             label-width="115px">
      <el-form-item label="合同名称" prop="contractname">
        <el-input v-model="ContractForm.contractname"
                  :disabled="operationType == 'show'"/>
      </el-form-item>
      <el-form-item label="合同编号">
        <el-input v-model="ContractForm.contractcode"
                  :disabled="true" />
      </el-form-item>
      <el-form-item label="合同类型" prop="contracttype">
        <el-select :value="ContractForm.contracttype"
                   v-model="ContractForm.contracttype"
                   placeholder="合同类型"
                   :disabled="operationType == 'show'">
          <el-option v-for="(contracttype, key) in contracttype"
                     :label="contracttype.displayValue"
                     :value="Number(contracttype.value)" :key="key"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="title" prop="contractfirst">
        <PkTypeahead
            v-model.trim="ContractForm.name"
            :disabled="operationType == 'show'"
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
        <el-input v-model="ContractForm.contractsecond"
                  :disabled="operationType == 'show'"/>
      </el-form-item>
      <el-form-item label="签约方3">
        <el-input v-model="ContractForm.contractthird"
                  :disabled="operationType == 'show'"/>
      </el-form-item>
      <el-form-item label="合同期限" prop="contractdate">
        <el-date-picker
            v-model="ContractForm.contractdate"
            type="daterange"
            :picker-options="dateOptions"
            range-separator="至"
            start-placeholder="开始日期"
            :disabled="operationType == 'show'"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            auto-complete="off"
            align="right"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ContractForm.contractmemo"
                  :disabled="operationType == 'show'"/>
      </el-form-item>
    </el-form>
</template>


<script lang="ts">

  import { Vue, Component, Prop } from '../../../../ext-nb'
  import { OptionItem } from '../../../../shared/util/model/OptionItem'
  import { getContractType } from '../../../../shared/util/service'
  import ContractModel from '../model/ContractModel'
  import { Watch } from 'vue-property-decorator'
  import { ElForm } from 'element-ui/types/form'
  import PkTypeahead from '../../../../components/typeahead'

  @Component({
    name: 'ContractForm',
    components: {
      PkTypeahead
    }
  })
  export default class ContractForm extends Vue {
    @Prop({
      default: () => new ContractModel()
    })
    ContractForm: ContractModel
    @Prop({
      default: () => 'edit'
    })
    @Prop()
    operationType: string
    @Prop()
    url: string
    contracttype: OptionItem[] = []
    title: string = '保险公司'
    insuranceMains: any[] = []
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
      ContractForm: ElForm
    }
    async created () {
      this.contracttype = await getContractType()
    }
    @Watch('ContractForm.contracttype')
    change () {
      if (this.ContractForm.contracttype === 1) {
        this.title = '保险公司'
        this.url = '/getInsuranceListByName'
      }
      if (this.ContractForm.contracttype === 2) {
        this.title = '商户'
        this.url = '/merchant/getMerchantListByName'
      }
      if (this.ContractForm.contracttype === 3) {
        this.title = '其他公司'
        this.url = '/getOtherCompanyListByName'
      }
    }
  }
</script>
