<template>
  <el-form :model="corpInsertForm"
           ref="corpInsertForm"
           size="small"
           label-width="115px"
           :rules="rule">
    <el-form-item label="集团名称" prop="corpName">
      <el-input v-model.trim="corpInsertForm.corpName" :disabled="operationType !== 'edit'"/>
    </el-form-item>
    <el-form-item label="集团简称" prop="shortName">
      <el-input v-model.trim="corpInsertForm.shortName" :disabled="operationType !== 'edit'"/>
    </el-form-item>
  </el-form>
</template>


<script lang="ts">

import { Component, Prop, Vue } from '../../../../ext-nb'
import CorpModel from '../model/CorpModel'
import { ElForm } from 'element-ui/types/form'

@Component({
  name: 'CorpMainForm'
})
export default class CorpMainForm extends Vue {

  @Prop({
    default: () => new CorpModel()
  })
  corpInsertForm: CorpModel
  @Prop({
    default: () => 'edit'
  })
  operationType: string
  rule = {
    corpName: [
      { required: true, type: 'string', message: '请输入集团名称' }
    ],
    shortName: [
      { required: true, type: 'string', message: '请输入集团简称' }
    ]
  }
  $refs: {
    corpInsertForm: ElForm
  }
}
</script>
