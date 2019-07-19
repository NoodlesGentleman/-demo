<!--
  @user slipkinem
  @date 3/7/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="manage">
    <!-- 修改弹框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <GoodsForm :goodVo="dialogFormParams" :type="data"></GoodsForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeFormDialog">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看" :visible.sync="dialogShowDetail">
      <el-tabs v-model="tabActive">
        <el-tab-pane label="商品列表" name="baseInfo">
          <MerchantGoodsList ref="goodList" :goodsVo="dialogFormParams" operationType="check"></MerchantGoodsList>
        </el-tab-pane>
        <el-tab-pane label="关联商户" name="merInfo">
          <MerchantList ref="merchantList" :goodsVo="dialogFormParams" operationType="check"></MerchantList>
        </el-tab-pane>
        <el-tab-pane label="历史记录" name="hisInfo">
          <History :goodsVo="dialogFormParams" operationType="check"></History>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogChangeDetail">
      <div>
        <el-form>
          <el-form-item label="原商品库名称">
            <el-input v-model="dialogFormParams.name" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="修改后商品库名称">
            <el-input v-model="newName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="changeWarehouse">保存</el-button>
          <el-button size="small" type="primary" @click="closeChangeDialog">返回</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 主页面 -->
    <MainComponent
        :forms="forms"
        :columns="columns"
        ref="pkMain"
        :handleResponseData="handleResponseData"
        url="/merchant/getWareHouseList">
      <template slot="dispose">
        <el-button size="mini" @click.native="insert" type="info">新增</el-button>
        <el-button size="mini" @click.native="showDetail" type="warning">查看</el-button>
        <el-button size="mini" @click.native="update" type="warning">更新</el-button>
        <el-button size="mini" @click.native="change" type="warning">修改</el-button>
        <el-button size="mini" @click.native="download" type="warning">导出</el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
