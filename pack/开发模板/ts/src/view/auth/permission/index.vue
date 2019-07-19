<template>
  <el-row>
    <el-col :span="9">

      <el-dialog :title="formTitle" :visible.sync="roleFormVisible">
        <RoleForm :role="param"></RoleForm>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="submit">保 存</el-button>
          <el-button size="small" @click="closeForm">取 消</el-button>
        </div>
      </el-dialog>

      <MainComponent
          :forms="MainForms"
          :columns="MainColumns"
          ref="pkMain"
          url="/auth/getRoleListByQuery">
        <template slot="dispose">
          <el-button size="mini" @click.native="insert" type="success">新增</el-button>
          <el-button size="mini" @click.native="update" type="warning">修改</el-button>
          <el-button size="mini" @click.native="permission" type="success">查看权限</el-button>
        </template>
      </MainComponent>
    </el-col>
    <el-col :span="15" v-show="show">
      <el-row><el-button size="mini" @click.native="savePermission" type="success">保存权限</el-button></el-row>
      <el-tree :data="lableList"
               show-checkbox
               ref="elTree"
               node-key="id"
               :expand-on-click-node="false"></el-tree>

    </el-col>
  </el-row>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
