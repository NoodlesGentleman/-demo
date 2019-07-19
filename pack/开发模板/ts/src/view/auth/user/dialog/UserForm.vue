<template>
  <div class="">
    <el-form
        size="small"
        label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="user.name" auto-complete="off" required="required"/>
      </el-form-item>
      <el-form-item label="账户名">
        <el-input v-model="user.username" auto-complete="off" required="required"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" auto-complete="off" required="required"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-select :value="user.gender"
                   v-model="user.gender">
          <el-option label="男"
                     :value="1"/>
          <el-option label="女"
                     :value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="user.mobile" auto-complete="off" required="required"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" auto-complete="off" required="required"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="user.memo" auto-complete="off" required="required"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import User from '../model/User'

@Component({
  name: 'UserForm'
})
export default class UserForm extends Vue {

  @Prop({
    default: () => new User()
  })
  user: User

}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
