<template>
  <el-row>
    <el-col :span="Number(8)">
      <el-dialog :title="formTitle" :visible.sync="groupFormVisible">
        <GroupForm :group="param"></GroupForm>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="submit">保 存</el-button>
          <el-button size="small" @click="closeForm">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="selectFormTitle" :visible.sync="selectFormVisible">
        <SelectFrom :label="selectFormLable" :selectId.sync="selectFormId" :selectUrl="selectFormUrl"></SelectFrom>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="addSelectToGroup">保 存</el-button>
          <el-button size="small" @click="closeForm">取 消</el-button>
        </div>
      </el-dialog>
      <MainComponent :forms="MainForms" :columns="MainColumns" ref="pkMain" url="/auth/getGroupList">
        <template slot="dispose">
          <el-button size="mini" @click.native="insert" type="success">新增</el-button>
          <el-button size="mini" @click.native="update" type="warning">修改</el-button>
          <el-button size="mini" @click.native="showUsers" type="success">查看用户</el-button>
          <el-button size="mini" @click.native="showRoles" type="warning">查看角色</el-button>
        </template>
      </MainComponent>
    </el-col>
    <el-col :span="Number(16)">
      <div v-show="isShowUsers">
        <MainComponent :columns="userColumns" ref="userTable" :handleQueryParams="addParam" :showPagination="false" url="/auth/getUserListByGroupId">
          <template slot="dispose">
            <el-button size="mini" @click.native="addUser" type="success">新增</el-button>
            <el-button size="mini" @click.native="deleteUser" type="warning">删除</el-button>
          </template>
          <span />
        </MainComponent>
      </div>
      <div v-show="isShowRoles">
        <MainComponent :columns="roleColumns" ref="roleTable" :handleQueryParams="addParam" :showPagination="false" url="/auth/getRoleListByGroupId">
          <template slot="dispose">
            <el-button size="mini" @click.native="addRole" type="success">新增</el-button>
            <el-button size="mini" @click.native="deleteRole" type="warning">删除</el-button>
          </template>
          <span />
        </MainComponent>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "index";
</style>
