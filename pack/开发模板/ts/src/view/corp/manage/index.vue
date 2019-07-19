<!--
  @user slipkinem
  @date 3/1/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="corp">
    <el-dialog title="新增" :visible.sync="dialogInsert">
      <CorpInsertForm ref="CorpInsertForm" :corpInsertForm="corpForm"></CorpInsertForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitInsert">保 存</el-button>
        <el-button size="small" @click="closeDialogInsert">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="dialogMainInsert">
      <CorpMainForm ref="CorpMainForm" :corpInsertForm="corpForm"></CorpMainForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitMainInsert">保 存</el-button>
        <el-button size="small" @click="closeDialogMainInsert">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="updateFormVisible">
      <el-tabs v-model="tabActiveUpdate">
        <el-tab-pane label="基本信息" name="corp">
          <CorpForm :corpForm="dialogFormParams" ref="CorpForm"></CorpForm>
        </el-tab-pane>
        <el-tab-pane label="联系人信息">
          <ContactForm ref="ContactForm" :contactForm="dialogFormParams" operationType="check"></ContactForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitUpdate">保 存</el-button>
        <el-button size="small" @click="closeFormDialog">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="updateMainFormVisible">
      <el-tabs v-model="tabActiveUpdateMain">
        <el-tab-pane label="基本信息" name="corp">
          <CorpMainForm :corpInsertForm="dialogMainFormParams" ref="CorpMainForm"></CorpMainForm>
        </el-tab-pane>
        <el-tab-pane label="联系人信息">
          <ContactForm ref="ContactForm" :contactForm="dialogMainFormParams" operationType="check"></ContactForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitMainUpdate">保 存</el-button>
        <el-button size="small" @click="closeMainFormDialog">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="contactFormVisible">
      <el-tabs v-model="tabActiveWatch">
        <el-tab-pane label="基本信息" name="corp">
          <CorpForm :corpForm="dialogFormParams" ref="ContactForm" operationType="check"></CorpForm>
        </el-tab-pane>
        <el-tab-pane label="联系人信息" name="contact">
          <ContactForm ref="ContactForm" :contactForm="dialogFormParams"></ContactForm>
        </el-tab-pane>
        <el-tab-pane label="保单信息" name="slip">
          <SlipForm ref="ContactForm" :contactForm="dialogFormParams"></SlipForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="contactMainFormVisible" width="70%">
      <el-tabs v-model="tabActiveWatchMain">
        <el-tab-pane label="基本信息" name="corp">
          <CorpMainForm :corpInsertForm="dialogMainFormParams" operationType="check"></CorpMainForm>
        </el-tab-pane>
        <el-tab-pane label="联系人信息" name="contact">
          <ContactForm ref="ContactForm" :contactForm="dialogMainFormParams"></ContactForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>
    <el-tabs v-model="tabActive">
      <el-tab-pane label="投保公司" name="corp">
        <MainComponent url="/getCorpByQuery" :handleQueryParams="handleQueryParams" :forms="forms" ref="pkMain" @handleCurrentRowChange="handleCurrentRowChange" :columns="columns">
          <template slot="dispose">
            <el-button size="mini" @click.native="insert" type="success">新增</el-button>
            <el-button size="mini" @click.native="showDetail" type="info">查看</el-button>
            <el-button size="mini" @click.native="update" type="warning">修改</el-button>
          </template>
        </MainComponent>
      </el-tab-pane>

      <el-tab-pane label="集团" name="corpMain">
        <MainComponent url="/getMainCorpByQuery" :handleQueryParams="handleQueryParamsMain" :forms="formsTotal" ref="pkMainCorp" @handleCurrentRowChange="handleCurrentRowChangeMain" :columns="columnsTotal">
          <template slot="dispose">
            <el-button size="mini" @click.native="insertTotal" type="success">
              新增</el-button>
            <el-button size="mini" @click.native="showDetailTotal" type="info">查看</el-button>
            <el-button size="mini" @click.native="updateTotal" type="warning">修改</el-button>
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
