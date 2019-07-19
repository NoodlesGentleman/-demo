<template>
  <el-form :model="othercompany"
           ref="othercompany"
           size="small"
           :rules="rule"
           label-width="105px">
    <el-form-item label="公司名称" prop="name">
      <el-input v-model="othercompany.name"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="简称" prop="shortname">
      <el-input v-model="othercompany.shortname"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="所属区域" prop="areaList">
      <AreaCascader type="select"
                    v-model="othercompany.areaList"
                    :disabled="operationType !== 'edit'"
                    auto-complete="off"/>
    </el-form-item>
    <el-form-item label="详细地址" prop="place">
      <el-input v-model="othercompany.place"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import OtherCompanyModel from '../model/OtherCompanyModel'
import { ElForm } from 'element-ui/types/form'
import AreaCascader from '../../../../components/area-cascader'

@Component({
  name: 'OtherCompanyInsertForm',
  components: {
    AreaCascader
  }
})
export default class OtherCompanyInsertForm extends Vue {
  @Prop({
    default: () => new OtherCompanyModel()
  })
  othercompany: OtherCompanyModel
  @Prop({
    default: () => 'edit'
  })
  operationType: string
  @Prop({
    default: () => ''
  })
  provincestring: string
  rule = {
    name: [
      { required: true, type: 'string', message: '请输入公司名称' }
    ],
    shortname: [
      { required: true, type: 'string', message: '请输入简称' }
    ],
    areaList: [
      {
        required: true,
        len: 3,
        message: '请输入所属区域',
        type: 'array',
        array: [this.othercompany.province, this.othercompany.city, this.othercompany.area]
      }
    ],
    place: [
      { required: true, type: 'string', message: '请输入详细地址' }
    ]
  }
  $refs: {
    othercompany: ElForm
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
