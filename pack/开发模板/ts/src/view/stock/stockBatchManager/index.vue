<template>
  <div class="manage">
    <!-- 新增弹框 -->
    <el-dialog title="新增" :visible.sync="NewDialogFormVisible">
      <StockBatchForm :stockBatchForm="dialogFormParams" operationType="insert"></StockBatchForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitInsert">保 存</el-button>
        <el-button size="small" @click="closeNewCardBinDialog">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog title="修改" :visible.sync="UpdateDialogFormVisible">
      <el-tabs v-model="tabActiveMain">
        <el-tab-pane label="基本信息" name="stockBatch">
          <StockBatchUpdateForm :stockBatchForm="dialogFormParams" operationType="edit"></StockBatchUpdateForm>
        </el-tab-pane>
        <el-tab-pane label="库存信息">
          <InventoryListForm ref="InventoryListForm" :stockCardModel="stockCard"></InventoryListForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitUpdate">保 存</el-button>
        <el-button size="small" @click="closeUpdateCardBinDialog">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导出" :visible.sync="DownloadDialogFormVisible">
      <DownloadCardForm :downloadCardForm="dialogFormParams" :type="type"></DownloadCardForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="downloadCard">保 存</el-button>
        <el-button size="small" @click="closeDownloadDialogFormVisible">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="出库" :visible.sync="OutDialogFormVisible">
      <OutHousingForm :outHousingForm="dialogFormParams" :card="stockCard"></OutHousingForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitOuthousing">保 存</el-button>
        <el-button size="small" @click="closeOutDialogFormVisible">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="历史记录" :visible.sync="HistoryDialogFormVisible">
      <HistoryForm ref="HistoryForm"></HistoryForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeHistoryDialogFormVisible">关 闭</el-button>
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
        url="/stock/getStockBatch"
    >
      <template slot="dispose">
        <el-button size="mini" @click.native="insert">新增库存</el-button>
        <el-button size="mini" @click.native="updateCardBin">修改库存</el-button>
        <el-button size="mini" @click.native="warehousing">入库</el-button>
        <el-button size="mini" @click.native="outhousing">出库</el-button>
        <el-button size="mini" @click.native="history">历史记录</el-button>
        <el-button size="mini" @click.native="recycle">回收站</el-button>
        <el-button size="mini" @click.native="download">导出库存</el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
