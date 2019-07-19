<template>
  <el-form :model="insuInsertForm"
           ref="insuInsertForm"
           size="small"
           :rules="rule"
           label-width="115px">
    <el-form-item label="基本信息:"></el-form-item>
    <el-form-item label="保险公司类型" prop="status">
      <el-select :value="insuInsertForm.status"
                 v-model.trim="insuInsertForm.status=2"
                 :disabled="true"
                 placeholder="保险公司类型">
        <el-option v-for="(status, key) in status"
                   :label="status.displayValue"
                   :value="Number(status.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="总公司" prop="insuName">
      <PkTypeahead
          v-model.trim="insuInsertForm.insuName"
          url="/getMainInsuByQuery"
          placeholder="请输入关键词"
          :disabled="operationType == 'show'"
          method="POST"
          :prop="{
              value: 'id',
              label: 'insuName',
              query: 'mainInsuName'
          }"
        />
    </el-form-item>
    <el-form-item label="保险公司" v-if="insuInsertForm.status==2" prop="name">
      <el-input v-model.trim="insuInsertForm.name"
                :disabled="operationType == 'show'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="简称" prop="shortName">
      <el-input v-model.trim="insuInsertForm.shortName"
                :disabled="operationType == 'show'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="对接模式" v-if="insuInsertForm.status==2" prop="dockingType">
      <el-select :value="insuInsertForm.dockingType"
                 v-model.trim="insuInsertForm.dockingType"
                 :disabled="operationType == 'show'"
                 placeholder="对接模式">
        <el-option v-for="(dockingType, key) in dockingType"
                   :label="dockingType.displayValue"
                   :value="Number(dockingType.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="对账信息:"></el-form-item>
    <el-form-item label="直付服务费" v-if="insuInsertForm.status==2">
      <el-input v-model.trim.number="insuInsertForm.directPaymentPer"
                :disabled="operationType == 'show'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="TPA服务费" v-if="insuInsertForm.status==2">
      <el-select :value="insuInsertForm.tpaType"
                 v-model="insuInsertForm.tpaType"
                 :disabled="operationType == 'show'"
                 placeholder="对接模式">
        <el-option v-for="(tpaType, key) in tpaType"
                   :label="tpaType.displayValue"
                   :value="Number(tpaType.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="百分比" v-if="insuInsertForm.status==2&&insuInsertForm.tpaType==1" prop="tpaPercent">
      <el-input v-model.trim.number="insuInsertForm.tpaPercent"
                :disabled="operationType == 'show'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="单件价格(元)" v-if="insuInsertForm.status==2&&insuInsertForm.tpaType==2"
                  prop="tpaPerPrice">
      <el-input v-model.trim.number="insuInsertForm.tpaPerPrice"
                :disabled="operationType == 'show'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="单件发票数(张)" v-if="insuInsertForm.status==2&&insuInsertForm.tpaType==2"
                  prop="tpaPerInvoiceCount">
      <el-input v-model.trim.number="insuInsertForm.tpaPerInvoiceCount"
                :disabled="operationType == 'show'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="超量发票单价(元)" v-if="insuInsertForm.status==2&&insuInsertForm.tpaType==2"
                  prop="tpaPerPriceAbove">
      <el-input v-model.trim.number="insuInsertForm.tpaPerPriceAbove"
                :disabled="operationType == 'show'"
                auto-complete="off"/>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import Insurance from '../model/Insurance'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import { getDockingType, getInsuranceTotaltype, gettpaType } from '../../../../shared/util/service'
import ResPage from '../../../../model/ResPage'
import { ElForm } from 'element-ui/types/form'
import PkTypeahead from '../../../../components/typeahead'

@Component({
  name: 'InsuranceInsertForm',
  components: {
    PkTypeahead
  }
})
export default class InsuranceInsertForm extends Vue {
  @Prop({
    default: () => new Insurance()
  })
  insuInsertForm: Insurance
  @Prop({
    default: () => 'edit'
  })
  @Prop()
  operationType: string
  insuranceMains: any[] = []
  dialogFormVisible = false
  dockingType: OptionItem[] = []
  status: OptionItem[] = []
  tpaType: OptionItem[] = []
  rule = {
    name: [
      { required: true, message: '请输入保险公司名' }
    ],
    insuName: [
      {
        required: true,
        message: '请输入总公司名',
        trigger: 'change'
      }
    ],
    dockingType: [
      { required: true, message: '请输入对接模式' }
    ],
    shortName: [
      { required: true, type: 'string', message: '请输入简称' }
    ],
    tpaPercent: [
      { required: true, message: '请输入百分比', pattern: /^[0-9]*[1-9][0-9]*$/ }
    ],
    tpaPerPrice: [
      { required: true, message: '请输入单件价格', pattern: /^\d+(\.\d+)?$/ }
    ],
    tpaPerInvoiceCount: [
      { required: true, message: '单件发票数', pattern: /^\d+$/ }
    ],
    tpaPerPriceAbove: [
      { required: true, message: '超量发票单价', pattern: /^\d+(\.\d+)?$/ }
    ]
  }

  $refs: {
    insuInsertForm: ElForm
  }

  async created () {
    this.dockingType = await getDockingType()
    this.status = await getInsuranceTotaltype()
    this.tpaType = await gettpaType()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
