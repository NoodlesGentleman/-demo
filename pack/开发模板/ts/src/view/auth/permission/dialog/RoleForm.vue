<template>
  <div class="">
    <el-form
        size="small"
        label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="role.name" auto-complete="off" required="required"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import Role from '../model/Role'

@Component({
  name: 'RoleForm'
})
export default class RoleForm extends Vue {

  @Prop({
    default: () => new Role()
  })
  role: Role

}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
