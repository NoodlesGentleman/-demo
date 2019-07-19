/**
 * Created by slipkinem on 3/7/2018 at 10:13 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../ext-nb'
import QueryForm from '../../../components/main/model/Form'
import TableColumn from '../../../components/main/model/Table'
import MainComponent from '../../../components/main'
import User from './model/User'
import { assert } from '../../../shared/util/logger'
import _ from 'lodash'
import UserForm from './dialog/UserForm.vue'

@Component({
  components: {
    MainComponent,
    UserForm
  }
})
export default class UserManager extends Vue {
  $refs: {
    pkMain: MainComponent
  }

  MainForms: QueryForm[] = [
    {
      prop: 'name',
      label: '用户姓名'
    },
    {
      prop: 'username',
      label: '用户账号'
    }
  ]

  MainColumns: TableColumn[] = [
    {
      prop: 'username',
      label: '账户'
    },
    {
      prop: 'password',
      label: '账户密码'
    },
    {
      prop: 'status',
      label: '账户状态'
      // filter: 'optionStatusFilter'
    },
    {
      prop: 'name',
      label: '姓名'
    },
    {
      prop: 'gender',
      label: '性别',
      filter: 'gendersFilter'
    },
    {
      prop: 'mobile',
      label: '手机'
    },
    {
      prop: 'email',
      label: '邮箱'
    },
    {
      prop: 'memo',
      label: '备注'
    }
  ]
  param: User = new User()
  userFormVisible: boolean = false
  formTitle: string = ''
  submitUrl: string = ''


  async permission () {
    this.param = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.param), '请先选择一行')
  }

  insert () {
    this.formTitle = '新增用户'
    this.param = new User()
    this.submitUrl = '/auth/addSysUser'
    this.userFormVisible = true
  }

  update () {
    this.formTitle = '更新用户'
    this.param = this.$refs.pkMain.getSelectedRow()
    assert(!_.isEmpty(this.param), '请先选择一行')
    this.submitUrl = '/auth/updateSysUser'
    this.userFormVisible = true
  }

  closeForm () {
    this.userFormVisible = false
  }

  async submit () {
    await this.$http.post(this.submitUrl, this.param)
    this.userFormVisible = false
    this.$refs.pkMain.query()
  }

  showUsers () {
    console.log()
  }

  showRoles () {
    console.log()
  }
}
