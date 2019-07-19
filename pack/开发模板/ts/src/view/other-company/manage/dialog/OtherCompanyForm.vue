<template>
  <el-form :model="othercompany"
           size="small"
           label-width="105px">
    <el-form-item label="公司名称">
      <el-input v-model="othercompany.name"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="简称">
      <el-input v-model="othercompany.shortname"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="所属区域">
      <AreaCascader type="select"
                    v-model="othercompany.areaList"
                    :disabled="operationType !== 'edit'"
                    auto-complete="off"/>
    </el-form-item>
    <el-form-item label="详细地址">
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
  name: 'OtherCompanyForm',
  components: {
    AreaCascader
  }
})
export default class OtherCompanyForm extends Vue {
  @Prop({
    default: () => new OtherCompanyModel()
  })
  othercompany: OtherCompanyModel

  @Prop({
    default: () => 'edit'
  })
  operationType: string
  $refs: {
    otherCompanyForm: ElForm
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
