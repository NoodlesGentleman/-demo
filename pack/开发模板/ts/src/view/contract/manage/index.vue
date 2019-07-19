<!--
  @user slipkinem
  @date 3/1/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="contract">
    <el-dialog title="新增" :visible.sync="dialogInsert">
      <ContractFormInsert ref="ContractFormInsert" :ContractFormInsert="contractModel"></ContractFormInsert>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitInsert">保 存</el-button>
        <el-button size="small" type="primary" @click="closeDialogInsert">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="dialogShowDetail" width="70%">
      <el-tabs v-model="tabActiveWatchMain">
        <el-tab-pane label="基本信息" name="contract">
          <ContractForm :ContractForm="dialogFormParams" operationType="show"></ContractForm>
        </el-tab-pane>
        <el-tab-pane label="附件信息" name="contact">
          <ContractDownloadForm ref="ContractDownloadForm" :contractModel="dialogFormParams"></ContractDownloadForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogFormVisible" width="70%">
      <el-tabs v-model="tabActiveWatchMain">
        <el-tab-pane label="基本信息" name="contract">
          <ContractForm ref="ContractForm" :ContractForm="dialogFormParams" operationType="update"></ContractForm>
        </el-tab-pane>
        <el-tab-pane label="附件信息" name="contact">
          <ContractDownloadForm ref="ContractDownloadForm" :contractModel="dialogFormParams" operationType="show"></ContractDownloadForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitUpdate">保 存</el-button>
        <el-button size="small" type="primary" @click="closeDialogFormVisible">取 消</el-button>
      </div>
    </el-dialog>
    <el-tabs v-model="tabActive">
      <el-tab-pane label="合同管理" name="contract">
        <MainComponent url="/getContract" :handleQueryParams="handleQueryParams" :forms="forms" ref="pkMain" @handleCurrentRowChange="handleCurrentRowChange" :columns="columns">
          <template slot="dispose">
            <el-button size="mini" @click.native="insert" type="success">新增</el-button>
            <el-button size="mini" @click.native="showDetail" type="info">查看</el-button>
            <el-button size="mini" @click.native="update" type="warning">修改</el-button>
          </template>
        </MainComponent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" src="./index.ts">

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "index";
</style>
