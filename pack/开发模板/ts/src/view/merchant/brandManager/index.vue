<!--
  @user slipkinem
  @date 3/7/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="manage">

    <el-dialog :title="brandMainFormTitle" :visible.sync="brandMainFormVisible">
      <BrandMainForm :brandMain="brandMain"></BrandMainForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeBrandMainForm" v-show="brandMainFormTitle === '查看'">关 闭</el-button>
        <el-button size="small" @click="closeBrandMainForm" v-show="brandMainFormTitle !== '查看'">取 消</el-button>
        <el-button size="small" type="primary" @click="submitBrandMainFrom"  v-show="brandMainFormTitle !== '查看'">保 存</el-button>
      </div>
    </el-dialog>


    <el-dialog :title="brandFormTitle" :visible.sync="brandFormVisible">
      <BrandForm :brand="brand" ref="upLoadForm" :operationType="brandFormTitle"></BrandForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeBrandForm" v-show="brandFormTitle === '查看'">关 闭</el-button>
        <el-button size="small" @click="closeBrandForm" v-show="brandFormTitle !== '查看'">取 消</el-button>
        <el-button size="small" type="primary" @click="submitBrandFrom" v-show="brandFormTitle !== '查看'">保 存</el-button>
      </div>
    </el-dialog>


    <el-tabs v-model="tabActive">
      <el-tab-pane label="品牌" name="brandForm">
        <MainComponent
            :forms="brandForms"
            :columns="brandColumns"
            ref="pkMain2"
            :handleResponseData="brandHandleResponseData"
            url="/merchant/getBrandList">
          <template slot="dispose">
            <el-button size="mini" @click.native="insertBrand" type="info">新增</el-button>
            <el-button size="mini" @click.native="showBrand" type="warning">查看</el-button>
            <el-button size="mini" @click.native="updateBrand" type="warning">修改</el-button>
          </template>
        </MainComponent>
      </el-tab-pane>

      <el-tab-pane label="大品牌" name="brandMainFrom">
        <MainComponent
            :forms="brandMainForms"
            :columns="brandMainColumns"
            ref="pkMain"
            url="/merchant/getBrandMainList">
          <template slot="dispose">
            <el-button size="mini" @click.native="insertBrandMain" type="info">新增</el-button>
            <el-button size="mini" @click.native="updateBrandMain" type="warning">修改</el-button>
          </template>
        </MainComponent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
