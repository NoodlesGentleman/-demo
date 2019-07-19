<!-- 
  @user slipkinem
  @date 3/22/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="slip">
    <el-dialog
        title="新增保单信息"
        :close-on-press-escape="true"
        :close-on-click-modal="true"
        width="85%"
        @close="nextOperation[2]()"
        :visible.sync="isShowEditSlip">
      <!-- 进度条 -->
      <PkSteps :active="active">
        <PkStep title="基本信息" @click.native="goStep(0)"></PkStep>
        <PkStep title="规则管理" @click.native="goStep(1)"></PkStep>
        <PkStep title="人员名单" @click.native="goStep(2)"></PkStep>
      </PkSteps>
      <!-- 主体 -->
      <div class="slip-content">
        <SlipBaseInfo :baseInfo="slip.baseInfo" v-show="active === 0"></SlipBaseInfo>
        <SlipRuleManage ref="slipRuleManage" :slipRule="slip.slipRule" v-show="active === 1"></SlipRuleManage>
        <SlipPerson :baseInfo="slip.baseInfo" v-show="active === 2"></SlipPerson>
      </div>
      <!-- footer -->
      <div slot="footer" class="dialog-footer" v-if="!slipDisabledGetters">
        <el-button size="small" @click="doPrevClick" v-if="active >= 1">上 一 步</el-button>
        <el-button size="small" type="primary" @click="doNextClick">下 一 步</el-button>
      </div>
      <div slot="footer" v-if="slipDisabledGetters">
        <el-button
            size="small"
            type="primary"
            @click="closeEditSlip">关 闭
        </el-button>
        <el-button
            size="small"
            type="success"
            @click="submitAudit"
            v-if="slipOperation === 'audit'">确认审核
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
