<template>
  <div class="">
    <el-form
        size="small"
        label-width="80px">
      <el-form-item label="组名称">
        <el-input v-model="group.name" auto-complete="off" required="required"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import Group from '../model/Group'

@Component({
  name: 'GroupForm'
})
export default class GroupForm extends Vue {

  @Prop({
    default: () => new Group()
  })
  group: Group

}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
