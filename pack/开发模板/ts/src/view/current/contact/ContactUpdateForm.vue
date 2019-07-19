<template>
  <el-form :model="contactUpdateForm"
           ref="contactForm"
           size="small"
           :rules="rule"
           label-width="115px">
    <el-form-item label="姓名">
      <el-input v-model="contactUpdateForm.name"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="性别">
      <el-select :value="contactUpdateForm.sex"
                 v-model="contactUpdateForm.sex"
                 placeholder="性别">
        <el-option v-for="(sex, key) in sex"
                   :label="sex.displayValue"
                   :value="Number(sex.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="contactUpdateForm.mobile"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-input v-model="contactUpdateForm.email"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="职务">
      <el-input v-model="contactUpdateForm.duty"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="QQ">
      <el-input v-model="contactUpdateForm.qq"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="contactUpdateForm.memo"
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
  name: 'ContactUpdateForm'
})
export default class ContactUpdateForm extends Vue {
  @Prop({
    default: () => new ContactModel()
  })
  contactUpdateForm: ContactModel
  @Prop({
    default: () => 'edit'
  })
  sex: OptionItem[] = []

  operationType: string

  $refs: {
    contactForm: ElForm
  }

  async created () {
    this.sex = await getSex()
  }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
