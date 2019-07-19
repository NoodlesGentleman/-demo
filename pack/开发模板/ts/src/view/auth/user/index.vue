<template>
  <div>
    <el-dialog :title="formTitle" :visible.sync="userFormVisible">
      <UserForm :user="param"></UserForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submit">保 存</el-button>
        <el-button size="small" @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>

    <MainComponent
        :forms="MainForms"
        :columns="MainColumns"
        ref="pkMain"
        url="/auth/getSysUserList">
      <template slot="dispose">
        <el-button size="mini" @click.native="insert" type="success">新增</el-button>
        <el-button size="mini" @click.native="update" type="warning">修改</el-button>
        <el-button size="mini" @click.native="showUsers" type="success">查看角色</el-button>
        <el-button size="mini" @click.native="showRoles" type="success">查看用户</el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
