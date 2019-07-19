<!-- 
  @user slipkinem
  @date 3/7/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="manage">
    <BatchChange ref="batchChange"></BatchChange>
    <!-- 修改弹框 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <CustomerForm :customerForm="dialogFormParams"></CustomerForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeFormDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="submitUpdate">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 查看信息 -->
    <el-dialog title="查看" :visible.sync="dialogShowDetail" width="70%">
      <el-tabs v-model="tabActive">
        <!-- 基本信息 -->
        <el-tab-pane label="基本信息" name="baseInfo">
          <CustomerForm :customerForm="dialogFormParams" operationType="check"></CustomerForm>
        </el-tab-pane>
        <!-- 变更信息 -->
        <el-tab-pane label="变更信息" name="changeInfo">
          <ChangeInfo :data="changeInfo"></ChangeInfo>
        </el-tab-pane>
        <!-- 保单信息 -->
        <el-tab-pane label="保单信息" name="slipInfo">
          <SlipInfo ref="slipInfo"></SlipInfo>
        </el-tab-pane>

        <el-tab-pane label="保单规则" name="SlipRule">
          <SlipRule ref="slipRule"></SlipRule>
        </el-tab-pane>

        <el-tab-pane label="理赔信息" name="ClaimInfo">
          <ClaimInfo></ClaimInfo>
        </el-tab-pane>

        <el-tab-pane label="卡信息" name="CardInfo">
          <CardInfo ref="cardInfo"></CardInfo>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>
    <!-- 主页面 -->
    <MainComponent
        :forms="forms"
        :multiSelect="true"
        :columns="columns"
        ref="pkMain"
        @handleCurrentRowChange="handleCurrentRowChange"
        url="/customer/getCustomerList"
    >
      <el-button-group slot="dispose">
        <el-button size="mini" @click="showDetail" type="info">查看</el-button>
        <el-button size="mini" @click="update" type="warning">修改</el-button>
        <el-button size="mini" @click.native="batchChange" type="info">批量修改</el-button>
        <el-button size="mini" @click.native="exportData" type="success">数据导出</el-button>
        <el-button size="mini" @click.native="downloadTemplate" type="info">模板导出</el-button>
      </el-button-group>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
