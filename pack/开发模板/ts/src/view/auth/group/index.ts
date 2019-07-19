/**
 * Created by slipkinem on 3/7/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from "../../../ext-nb";
import QueryForm, { Params } from "../../../components/main/model/Form";
import TableColumn from "../../../components/main/model/Table";
import MainComponent from "../../../components/main";
import Group from "./model/Group";
import { assert } from "../../../shared/util/logger";
import _ from "lodash";
import GroupForm from "./dialog/GroupForm.vue";
import User from "../user/model/User";
import Role from "../permission/model/Role";
import SelectFrom from "./dialog/selectForm.vue";

@Component({ components: { MainComponent, GroupForm, SelectFrom } })
export default class GroupManager extends Vue {
  $refs: {
    pkMain: MainComponent;
    userTable: MainComponent;
    roleTable: MainComponent;
  };

  MainForms: QueryForm[] = [
    {
      prop: "groupName",
      label: "组名称"
    }
  ];

  MainColumns: TableColumn[] = [
    {
      prop: "name",
      label: "组名称"
    }
  ];
  param: Group = new Group();
  groupFormVisible: boolean = false;
  formTitle: string = "";
  submitUrl: string = "";
  isShowUsers: boolean = false;
  isShowRoles: boolean = false;
  selectUser: User = new User();
  selectRole: Role = new Role();
  selectGroupId: number = 0;
  selectFormVisible: boolean = false;

  selectFormLable: string = "";
  selectFormId: number = 0;
  selectFormUrl: string = "";
  selectFormTitle: string = "";
  addUrl: string = "";

  userColumns: TableColumn[] = [
    {
      prop: "name",
      label: "姓名"
    },
    {
      prop: "username",
      label: "用户名"
    }
  ];
  roleColumns: TableColumn[] = [
    {
      prop: "name",
      label: "角色名"
    }
  ];

  async permission() {
    this.param = this.$refs.pkMain.getSelectedRow();
    assert(!_.isEmpty(this.param), "请先选择一行");
  }

  insert() {
    this.formTitle = "新增组";
    this.param = new Group();
    this.submitUrl = "/auth/addGroup";
    this.groupFormVisible = true;
  }

  update() {
    this.formTitle = "更新组";
    this.param = this.$refs.pkMain.getSelectedRow();
    assert(!_.isEmpty(this.param), "请先选择一行");
    this.submitUrl = "/auth/updateGroup";
    this.groupFormVisible = true;
  }

  closeForm() {
    this.groupFormVisible = false;
  }

  addParam(param: Params) {
    param.groupId = this.selectGroupId;
    return param;
  }

  async submit() {
    await this.$http.post(this.submitUrl, this.param);
    this.groupFormVisible = false;
    this.$refs.pkMain.query();
  }

  async showUsers() {
    this.param = this.$refs.pkMain.getSelectedRow();
    assert(!_.isEmpty(this.param), "请先选择一行");
    this.selectGroupId = this.param.id;
    this.isShowRoles = false;
    this.isShowUsers = true;
    this.$refs.userTable.query();
  }

  showRoles() {
    this.param = this.$refs.pkMain.getSelectedRow();
    assert(!_.isEmpty(this.param), "请先选择一行");
    this.selectGroupId = this.param.id;
    this.isShowRoles = true;
    this.isShowUsers = false;
    this.$refs.roleTable.query();
  }

  async addUser() {
    this.selectFormTitle = "添加用户";
    this.selectFormLable = "用户账号";
    this.selectFormUrl = "/auth/getSysUserList";
    this.addUrl = "/auth/addUser2Group";
    this.selectFormVisible = true;
  }

  async deleteUser() {
    this.selectUser = this.$refs.userTable.getSelectedRow();
    assert(!_.isEmpty(this.selectUser), "请先选择要删除的用户");
    await this.$http.postParams("/auth/deleteUser2Group", {
      userId: this.selectUser.id,
      groupId: this.selectGroupId
    });
    this.$refs.userTable.query();
  }

  addRole() {
    this.selectFormTitle = "添加角色";
    this.selectFormLable = "角色名";
    this.selectFormUrl = "/auth/getRoleListByQuery";
    this.addUrl = "/auth/addRole2Group";
    this.selectFormVisible = true;
  }

  async deleteRole() {
    this.selectUser = this.$refs.roleTable.getSelectedRow();
    assert(!_.isEmpty(this.selectUser), "请先选择要删除的角色");
    await this.$http.postParams("/auth/deleteRole2Group", {
      roleId: this.selectRole.id,
      groupId: this.selectGroupId
    });
    this.$refs.roleTable.query();
  }

  async addSelectToGroup() {
    await this.$http.postParams(this.addUrl, {
      id: this.selectFormId,
      groupId: this.selectGroupId
    });
    if (this.selectFormTitle === "添加角色") {
      this.$refs.roleTable.query();
    } else {
      this.$refs.userTable.query();
    }
    this.selectFormVisible = false;
  }
}
