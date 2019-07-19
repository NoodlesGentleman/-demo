<!--
  @user slipkinem
  @date 3/7/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="manage">
    <!-- 新增弹框 -->
    <el-dialog :title="title" :visible.sync="dialogFormInsert">
      <MerchantForm :merchant="merchant"></MerchantForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitInsert">保 存</el-button>
        <el-button size="small" @click="closeFormDialogInsert">取 消</el-button>
      </div>
    </el-dialog>
    <!--查看信息-->
    <el-dialog title="查看" :visible.sync="dialogShowDetail">
      <el-tabs v-model="tabActive">
        <el-tab-pane label="基本信息" name="baseInfo">
          <MerchantForm :merchant="merchant" operationType="show"></MerchantForm>
        </el-tab-pane>
        <el-tab-pane label="联系人信息" name="contact">
          <ContactForm :contactForm="contact" operationType="contact"></ContactForm>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>
    <!-- 主页面 -->
    <MainComponent
        :forms="forms"
        :columns="columns"
        ref="pkMain"
        url="/merchant/getMerchantWithShopCount"
    >  <!--:isShowExpand="true"-->
      <template slot="dispose">
        <el-button size="mini" @click.native="openFormDialogInsert" type="info">新增</el-button>
        <el-button size="mini" @click.native="openDialogShowDetail" type="warning">查看</el-button>
        <el-button size="mini" @click.native="openFormDialogUpdate" type="warning">修改</el-button>
        <el-button size="mini" @click.native="changeOnline" type="warning">下线/上线</el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
