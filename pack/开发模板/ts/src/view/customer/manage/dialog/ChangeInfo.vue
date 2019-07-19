<!-- 
  @user slipkinem
  @date 3/15/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <el-table stripe :data="data" size="small" max-height="450" border>
    <el-table-column
        prop="operationField"
        label="变更内容"/>
    <el-table-column
        prop="operationBefore"
        label="变更前信息"/>
    <el-table-column
        prop="operationAfter"
        label="变更后信息"/>
    <el-table-column
        prop="userId"
        label="操作人"/>
    <el-table-column
        prop="updateTime"
        label="操作时间"/>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from '../../../../ext-nb'
import { Prop } from 'vue-property-decorator'
import ChangeInfoModel from '../model/ChangeInfo'

@Component
export default class ChangeInfo extends Vue {
  @Prop({
    default: () => []
  })
  data: ChangeInfoModel[]
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
