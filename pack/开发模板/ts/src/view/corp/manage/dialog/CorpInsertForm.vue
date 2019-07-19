<template>
  <el-form :model="corpInsertForm"
           ref="corpInsertForm"
           size="small"
           :rules="rule"
           label-width="115px">
    <el-form-item label="投保公司类型" prop="status">
      <el-select :value="corpInsertForm.status"
                 v-model.trim="corpInsertForm.status=2"
                 :disabled="true"
                 placeholder="投保公司类型">
        <el-option v-for="(status, key) in status"
                   :label="status.displayValue"
                   :value="Number(status.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="集团" prop="mainCorpId">
      <PkTypeahead
          v-model.trim="corpInsertForm.mainCorpId"
          url="/getMainCorpByQuery"
          placeholder="请输入关键词"
          method="POST"
          :prop="{
              value: 'id',
              label: 'corpName',
              query: 'mainCorpName'
          }"
      />
    </el-form-item>
    <el-form-item label="投保公司" v-if="corpInsertForm.status==2" prop="name">
      <el-input v-model.trim="corpInsertForm.name"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="简称" prop="shortName">
      <el-input v-model.trim="corpInsertForm.shortName"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="所属区域" v-if="corpInsertForm.status==2" prop="areaList">
      <AreaCascader
          type="select"
          v-model="corpInsertForm.areaList"></AreaCascader>
    </el-form-item>
    <el-form-item label="详细地址" v-if="corpInsertForm.status==2" prop="address">
      <el-input v-model.trim="corpInsertForm.address"
                auto-complete="off"/>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import { getCorpStatus } from '../../../../shared/util/service'
import { ElForm } from 'element-ui/types/form'
import CorpModel from '../model/CorpModel'
import AreaCascader from '../../../../components/area-cascader'
import PkTypeahead from '../../../../components/typeahead'

@Component({
  name: 'CorpInsertForm',
  components: {
    AreaCascader,
    PkTypeahead
  }
})
export default class CorpInsertForm extends Vue {
  @Prop({
    default: () => new CorpModel()
  })
  corpInsertForm: CorpModel
  @Prop({
    default: () => 'edit'
  })
  dockingType: OptionItem[] = []
  status: OptionItem[] = []
  tpaType: OptionItem[] = []
  rule = {
    name: [
      { required: true, message: '请输入投保公司名' }
    ],
    shortName: [
      { required: true, message: '请输入简称' }
    ],
    address: [
      { required: true, message: '请输入详细地址' }
    ],
    areaList: [
      {
        required: true,
        len: 3,
        message: '请输入所属区域',
        type: 'array',
        array: [this.corpInsertForm.provinceId, this.corpInsertForm.cityId, this.corpInsertForm.areaId]
      }
    ],
    mainCorpId: [
      { required: true, message: '请输入集团' }
    ]
  }

  operationType: string

  $refs: {
    corpInsertForm: ElForm
  }

  async created () {
    this.status = await getCorpStatus()
  }

}

</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
