<template>
  <el-form :model="corpForm"
           ref="corpForm"
           size="small"
           :rules="rule"
           label-width="115px">
    <el-form-item label="投保公司类型" v-if="corpForm.status==2" prop="status">
      <el-select :value="corpForm.status"
                 v-model="corpForm.status"
                 :disabled="true"
                 placeholder="投保公司类型">
        <el-option v-for="(status, key) in status"
                   :label="status.displayValue"
                   :value="Number(status.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="集团" prop="corpName">
      <PkTypeahead
          v-model.trim="corpForm.corpName"
          url="/getMainCorpByQuery"
          placeholder="请输入关键词"
          :disabled="operationType !== 'edit'"
          method="POST"
          :prop="{
              value: 'id',
              label: 'corpName',
              query: 'mainCorpName'
          }"
      />
    </el-form-item>
    <el-form-item label="投保公司" v-if="corpForm.status==2" prop="name">
      <el-input v-model="corpForm.name"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="简称" prop="shortName">
      <el-input v-model="corpForm.shortName"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="所属区域" v-if="corpForm.status==2" prop="areaList">
      <AreaCascader type="select"
                    v-model="corpForm.areaList"
                    :disabled="operationType !== 'edit'"
                    auto-complete="off"/>
    </el-form-item>
    <el-form-item label="详细地址" v-if="corpForm.status==2" prop="address">
      <el-input v-model="corpForm.address"
                :disabled="operationType !== 'edit'"
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
import PkTypeahead from '../../../../components/typeahead'
import AreaCascader from '../../../../components/area-cascader'

@Component({
  name: 'CorpForm',
  components: {
    AreaCascader,
    PkTypeahead
  }
})
export default class CorpForm extends Vue {
  @Prop({
    default: () => new CorpModel()
  })
  corpForm: CorpModel
  dockingType: OptionItem[] = []
  status: OptionItem[] = []
  tpaType: OptionItem[] = []
  rule = {
    name: [
      { required: true, type: 'string', message: '请输入投保公司名' }
    ],
    shortName: [
      { required: true, type: 'string', message: '请输入简称' }
    ],
    address: [
      { required: true, message: '请输入详细地址' }
    ],
    corpName: [
      { required: true,
        message: '请输入集团',
        trigger: 'change'
      }
    ],
    areaList: [
      {
        required: true,
        len: 3,
        message: '请输入所属区域',
        type: 'array',
        array: [this.corpForm.provinceId, this.corpForm.cityId, this.corpForm.areaId]
      }
    ]
  }
  @Prop({
    default: () => 'edit'
  })
  operationType: string

  $refs: {
    corpForm: ElForm
  }

  async created () {
    this.status = await getCorpStatus()
  }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
