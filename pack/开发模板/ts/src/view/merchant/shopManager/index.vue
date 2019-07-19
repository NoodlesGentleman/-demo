<!--
  @user slipkinem
  @date 3/7/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="manage">
    <!-- 新增弹框 -->
    <el-dialog :title="title" :visible.sync="dialogFormInsert">
      <ShopEditForm></ShopEditForm>
      <div slot="footer" :type="data" class="dialog-footer">
        <el-button size="small" @click="closeFormDialogInsert">保存</el-button>
        <el-button size="small" @click="closeFormDialogInsert">取 消</el-button>
      </div>
    </el-dialog>
    <!--查看信息-->
    <el-dialog title="查看" :visible.sync="dialogShowDetail">
      <el-tabs v-model="tabActive">
        <el-tab-pane label="基本信息" name="baseInfo">
          <ShopForm :shop="shop" operationType="show"></ShopForm>
        </el-tab-pane>
        <el-tab-pane label="变更信息" name="changeInfo">
          <!--<MerchantForm :shop="shop" operationType="show"></MerchantForm>-->
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogEditDetail">
      <ShopForm :shop="shop" operationType="edit"></ShopForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="success" @click="updateShop">确 定</el-button>
        <el-button size="small" type="primary" @click="closeFormDialogUpdate">返 回</el-button>
      </div>
    </el-dialog>
    <!-- 主页面 -->
    <MainComponent
        :forms="forms"
        :columns="columns"
        ref="pkMain"
        :handleQueryParams="doSomething"
        url="/merchant/getShopList"
    >  <!--:isShowExpand="true"-->
      <template slot="dispose">
        <el-button size="mini" @click.native="openFormDialogInsert" type="info">新增</el-button>
        <el-button size="mini" @click.native="openDialogShowDetail" type="warning">查看</el-button>
        <el-button size="mini" @click.native="openFormDialogUpdate" type="warning">修改</el-button>
        <el-button size="mini" @click.native="changeOnline" type="warning">下线/上线</el-button>
        <el-button size="mini" @click.native="changeDemo" type="warning">演示切换</el-button>
        <el-button size="mini" @click.native="changeShow" type="warning">隐藏切换</el-button>
        <el-button size="mini" @click.native="downloadShop" type="warning">门店导出</el-button>
        <el-button size="mini" @click.native="openFormDialogChange" type="warning">批量修改</el-button>
        <el-button size="mini" @click.native="changeTest" type="warning">重新测试</el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
