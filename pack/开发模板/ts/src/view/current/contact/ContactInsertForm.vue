<template>
  <el-form :model="contactInsertForm"
           ref="contactForm"
           size="small"
           label-width="115px">
    <el-form-item label="姓名">
      <el-input v-model="contactInsertForm.name"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="性别">
      <el-select :value="contactInsertForm.sex"
                 v-model="contactInsertForm.sex"
                 placeholder="性别">
        <el-option v-for="(sexSelect, key) in sexSelect"
                   :label="sexSelect.displayValue"
                   :value="Number(sexSelect.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="contactInsertForm.mobile"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-input v-model="contactInsertForm.email"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="职务">
      <el-input v-model="contactInsertForm.duty"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="QQ">
      <el-input v-model="contactInsertForm.qq"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="contactInsertForm.memo"
                auto-complete="off"/>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ElForm } from 'element-ui/types/form'
import { Component, Vue } from '../../../ext-nb'
import ContactModel from './ContactModel'
import { Prop } from 'vue-property-decorator'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import { getSex } from '../../../shared/util/service'

@Component({
  name: 'ContactInsertForm'
})
export default class ContactInsertForm extends Vue {
  @Prop({
    default: () => new ContactModel()
  })
  contactInsertForm: ContactModel
  @Prop({
    default: () => new ContactModel()
  })
  contactModel: ContactModel
  @Prop({
    default: () => 'edit'
  })
  sexSelect: OptionItem[] = []

  operationType: string

  $refs: {
    contactForm: ElForm
  }

  async created () {
    this.sexSelect = await getSex()
  }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
