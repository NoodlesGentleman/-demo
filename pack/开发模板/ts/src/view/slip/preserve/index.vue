<!-- 
  @user slipkinem
  @date 4/8/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="customer-service">
    <PreserveDialogCreate ref="preserve"></PreserveDialogCreate>
    <PreserveDetail ref="preserveDetail"></PreserveDetail>
    <MainComponent
        ref="pkMain"
        :forms="forms"
        :columns="columns"
        url="/slipFull/getSlipFullList"
    >
      <el-button-group slot="dispose">
        <el-button type="info" size="mini" @click="showDetail">查看</el-button>
        <el-button type="success" size="mini" @click="addPreserve">新增</el-button>
        <!--<el-button type="warning" size="mini">修改</el-button>-->
        <el-button type="info" size="mini" @click="audit">审核</el-button>
        <el-button type="danger" size="mini" @click="cancellation">作废</el-button>
        <el-button type="info" size="mini" @click="hideSlipFull">隐藏</el-button>
      </el-button-group>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
