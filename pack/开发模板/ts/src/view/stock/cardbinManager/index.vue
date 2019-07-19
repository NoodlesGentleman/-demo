<!--
  @user luco
  @date 4/10/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="manage">
    <!-- 新增弹框 -->
    <el-dialog title="新增" :visible.sync="NewDialogFormVisible">
      <CardBinForm :cardBinForm="dialogFormParams" ref="upLoadForm" operationType="new"></CardBinForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitInsert">保 存</el-button>
        <el-button size="small" @click="closeNewCardBinDialog">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog title="修改" :visible.sync="UpdateDialogFormVisible">
      <CardBinForm :cardBinForm="dialogFormParams" ref="upLoadForm" operationType="edit"></CardBinForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitUpdate">保 存</el-button>
        <el-button size="small" @click="closeUpdateCardBinDialog">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 主页面 -->
    <MainComponent
        :forms="forms"
        :columns="columns"
        ref="pkMain"
        @handleCurrentRowChange="handleCurrentRowChange"
        url="/stock/getStockCardBin"
    >
      <template slot="dispose">
        <el-button size="mini" @click.native="newCardBin" type="info">新增</el-button>
        <el-button size="mini" @click.native="updateCardBin" type="warning">修改</el-button>
        <el-button size="mini" @click.native="submitDelete" type="danger">删除</el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
