/**
 * Created by slipkinem on 3/7/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import QueryForm from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import MainComponent from '../../../components/main'
import Role from './model/Role'
import { Tree } from 'element-ui'
import { ElTree } from 'element-ui/types/tree'
import { assert } from '../../../shared/util/logger'
import _ from 'lodash'
import RoleForm from './dialog/RoleForm.vue'

@Component({
  components: {
    MainComponent,
    Tree,
    RoleForm
  }
})
export default class RoleManager extends Vue {
  $refs: {
    pkMain: MainComponent,
    elTree: ElTree
  }

  MainForms: QueryForm[] = [
    {
      prop: 'roleName',
      label: '角色名称'
    }
  ]

  MainColumns: TableColumn[] = [
    {
      prop: 'name',
      label: '角色名称'
    }
  ]
  lableList: any[] = []
  param: Role = new Role()
  ids: number[] = []
  show: boolean = false
  roleFormVisible: boolean = false
  formTitle: string = ''
  submitUrl: string = ''

  async created () {
    let a = await this.$http.postParams('/auth/getPermissionList')
    this.lableList = JSON.parse(JSON.stringify(a))
  }


  async permission () {
    this.param = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.param), '请先选择一行')
    this.ids = await this.$http.postParams<number[]>('/auth/getPermissionIdsByRoleId', { roleId: this.param.id })
    this.show = true
    this.$refs.elTree.setCheckedKeys(this.ids, false)
  }

  async savePermission () {
    this.ids = this.$refs.elTree.getCheckedKeys(false)
    await this.$http.post('/auth/savePermission?roleId=' + this.param.id, { ids: this.ids })
  }

  insert () {
    this.formTitle = '新增角色'
    this.param = new Role()
    this.submitUrl = '/auth/addRole'
    this.roleFormVisible = true
  }

  update () {
    this.formTitle = '更新角色'
    this.param = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.param), '请先选择一行')
    this.submitUrl = '/auth/updateRole'
    this.roleFormVisible = true
  }

  closeForm () {
    this.roleFormVisible = false
  }

  async submit () {
    await this.$http.post(this.submitUrl,this.param)
    this.roleFormVisible = false
    this.$refs.pkMain.query()
  }

}
