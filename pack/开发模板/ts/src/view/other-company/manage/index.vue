<!--
  @user slipkinem
  @date 3/1/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="insurance">
    <el-dialog title="新增" :visible.sync="dialogInsert">
      <OtherCompanyInsertForm ref="OtherCompanyInsertForm" :othercompany="otherCompany"></OtherCompanyInsertForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitInsert">保 存</el-button>
        <el-button size="small" type="primary" @click="closeInsertDialog">返 回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-tabs v-model="tabActiveUpdate">
        <el-tab-pane label="基本信息" name="otherCompany">
          <OtherCompanyForm :othercompany="dialogFormParams"></OtherCompanyForm>
        </el-tab-pane>
        <el-tab-pane label="联系人信息" name="contact">
          <ContactForm ref="ContactForm" :contactForm="dialogFormParams" operationType="check"></ContactForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitUpdate">保 存</el-button>
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="dialogShowDetail" width="70%">
      <el-tabs v-model="tabActive">
        <el-tab-pane label="基本信息" name="otherCompany">
          <OtherCompanyForm :othercompany="dialogFormParams" operationType="check"></OtherCompanyForm>
        </el-tab-pane>
        <el-tab-pane label="联系人信息" name="contact">
          <ContactForm ref="ContactForm" :contactForm="dialogFormParams"></ContactForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>
    <el-tabs v-model="tabActive">
      <MainComponent
          :handleResponseData="handleResponseData"
          url="/getOtherCompany"
          :handleQueryParams="handleQueryParams"
          :forms="forms"
          ref="pkMain"
          @handleCurrentRowChange="handleCurrentRowChange"
          :columns="columns">
        <template slot="dispose">
          <el-button size="mini" @click.native="insertTotal" type="success">新增</el-button>
          <el-button size="mini" @click.native="showDetailTotal" type="info">查看</el-button>
          <el-button size="mini" @click.native="update" type="warning">修改</el-button>
        </template>
      </MainComponent>
    </el-tabs>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
