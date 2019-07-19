<!-- 
  @user slipkinem
  @date 3/21/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="slip-manager">
    <SetAccount ref="account"></SetAccount>
    <EditSlipComponent
        ref="editSlip"
        :slip="slip"></EditSlipComponent>
    <MainComponent
        url="/insurance/getInsuSlipList"
        :forms="forms"
        :columns="columns"
        :handleQueryParams="handleQueryParamsContact"
        ref="pkMain"
    >
      <el-button-group slot="dispose">
        <el-button size="mini" @click.native="addSlip" type="info">新增</el-button>
        <el-button size="mini" @click.native="showDetail" type="info">查看</el-button>
        <el-button size="mini" @click.native="updateSlip" type="warning">修改</el-button>
        <el-button size="mini" @click.native="auditSlip" type="info">审核</el-button>
        <el-button size="mini" @click.native="freezeSlip" type="warning">冻结/解冻</el-button>
        <el-button size="mini" @click.native="cancellationSlip" type="danger">作废</el-button>
        <el-button size="mini" @click.native="setAccount" type="info">账户设定</el-button>
      </el-button-group>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
