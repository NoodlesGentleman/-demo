<template>
  <div class="manage">
    <!-- 新增弹框 -->
    <el-dialog title="导出" :visible.sync="DownloadDialogFormVisible">
      <DownloadCardForm :downloadCardForm="dialogFormParams" :type="type"></DownloadCardForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="downloadCard">保 存</el-button>
        <el-button size="small" @click="closeDownloadDialogFormVisible">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="回收站" :visible.sync="RecycleBinFormVisible">
      <RecycleForm ref="recycleForm"></RecycleForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeRecycleBinFormVisible">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 主页面 -->
    <MainComponent
        :forms="forms"
        :columns="columns"
        ref="pkMain"
        :handleQueryParams="handleQueryParamsContact"
        @handleCurrentRowChange="handleCurrentRowChange"
        url="/stock/getCard"
    >
      <template slot="dispose">
        <el-button size="mini" @click.native="losesubmit">挂失/解挂</el-button>
        <el-button size="mini" @click.native="deletedsubmit">作废</el-button>
        <el-button size="mini" @click.native="recycle">回收站</el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
