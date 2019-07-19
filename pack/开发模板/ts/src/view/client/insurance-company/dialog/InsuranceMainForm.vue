<template>
  <el-form :model="insuMainForm"
           size="small"
           label-width="115px"
           ref="insuMainForm"
           :rules="rule">
    <el-form-item label="总公司名称" prop="insuName">
      <el-input v-model.trim="insuMainForm.insuName" :disabled="operationType == 'show'"/>
    </el-form-item>
    <el-form-item label="总公司简称" prop="shortName">
      <el-input v-model.trim="insuMainForm.shortName" :disabled="operationType == 'show'"/>
    </el-form-item>
  </el-form>
</template>


<script lang="ts">

import { Component, Prop, Vue } from '../../../../ext-nb'
import Insurance from '../model/Insurance'
import { ElForm } from 'element-ui/types/form'

@Component({
  name: 'InsuranceMainForm'
})
export default class InsuranceMainForm extends Vue {
  @Prop({
    default: () => new Insurance()
  })
  insuMainForm: Insurance
  @Prop()
  operationType: string
  rule = {
    insuName: [
      { required: true, type: 'string', message: '请输入总保险公司名' }
    ],
    shortName: [
      { required: true, type: 'string', message: '请输入总公司简称' }
    ]
  }
  $refs: {
    insuMainForm: ElForm
  }
}
</script>
