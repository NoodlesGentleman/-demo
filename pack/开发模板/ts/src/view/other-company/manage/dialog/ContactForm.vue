<template>
  <div class="contact">
    <el-dialog title="新增" :visible.sync="dialogInsertContact" name="contact" :modal="false">
      <ContactInsertForm :contactInsertForm="contactInsertForm"></ContactInsertForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitInsertContact">保 存</el-button>
        <el-button size="small" @click="closeInsertDialog">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改" :visible.sync="dialogFormVisible" :modal="false">
      <ContactUpdateForm :contactUpdateForm="dialogFormParams"></ContactUpdateForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitUpdateContact">保 存</el-button>
        <el-button size="small" @click="closeFormDialog">取 消</el-button>
      </div>
    </el-dialog>


    <MainComponent
        :handleResponseData="handleResponseDataContact"
        url="/getContact"
        :handleQueryParams="handleQueryParamsContact"
        ref="pkMain"
        @handleCurrentRowChange="handleCurrentRowChangeContact"
        :columns="columnaaa">
      <template slot="dispose">
        <el-button size="mini" @click.native="insertContact" type="success" v-show="operationType !== 'edit'">新增
        </el-button>
        <el-button size="mini" @click.native="updateContact" type="info" v-show="operationType !== 'edit'">修改
        </el-button>
        <el-button size="mini" @click.native="deleteContact" type="warning" v-show="operationType !== 'edit'">删除
        </el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import { assert } from '../../../../shared/util/logger'
import ContactModel from '../model/ContactModel'
import { Params } from '../../../../components/main/model/Form'
import MainComponent from '../../../../components/main'
import * as _ from 'lodash'
import OtherCompanyModel from '../model/OtherCompanyModel'
import ContactInsertForm from '../dialog/ContactInsertForm.vue'
import ContactUpdateForm from '../dialog/ContactUpdateForm.vue'

@Component({
  components: {
    MainComponent,
    ContactInsertForm,
    ContactUpdateForm
  }
})
export default class ContactForm extends Vue {
  currentRow: ContactModel
  dialogFormVisible = false
  dialogInsertContact = false
  dialogShowDetail = false
  dialogFormParams: ContactModel = new ContactModel()
  tabActive = 'contact'
  columnaaa = [
    {
      prop: 'name',
      label: '联系人姓名'
    },
    {
      prop: 'sex',
      label: '性别',
      filter: 'contactSexFilter'
    },
    {
      prop: 'mobile',
      label: '联系方式'
    },
    {
      prop: 'duty',
      label: '联系人职务'
    },
    {
      prop: 'email',
      label: '电子邮箱'
    },
    {
      prop: 'qq',
      label: 'QQ'
    },
    {
      prop: 'memo',
      label: '备注'
    }
  ]
  $refs: {
    pkMain: MainComponent
  }
  @Prop({
    default: () => new ContactModel()
  })
  contactForm: OtherCompanyModel
  contactInsertForm: ContactModel = new ContactModel()


  @Prop({
    default: () => 'edit'
  })
  operationType: string

  async mounted () {
    await this.$refs.pkMain.query()
  }


  handleCurrentRowChangeContact (row: ContactModel) {
    this.dialogFormParams = row
  }

  handleQueryParamsContact (params: Params) {
    console.log(params)
    params.foreignId = this.contactForm.id
    params.type = 5
    return params
  }

  openFormDialog () {
    this.dialogFormVisible = true
  }

  closeFormDialog () {
    this.dialogFormVisible = false
    this.$refs.pkMain.query()
  }

  openInsertDialog () {
    this.dialogInsertContact = true
    this.contactInsertForm = new ContactModel()
  }

  closeInsertDialog () {
    this.dialogInsertContact = false
    this.$refs.pkMain.query()
  }

  insertContact () {
    this.openInsertDialog()
  }

  updateContact () {
    assert(!_.isEmpty(this.dialogFormParams), '请先选择一行')
    this.openFormDialog()
  }

  async submitInsertContact () {
    this.contactInsertForm.type = 5
    this.contactInsertForm.foreignId = this.contactForm.id
    await this.$http.post<ContactModel>('/insertContact', this.contactInsertForm)
    this.dialogInsertContact = false
    this.$refs.pkMain.query()
  }

  /**
   * 修改联系人
   * @returns {Promise<void>}
   */
  async submitUpdateContact () {
    await this.$http.post<ContactModel>('/updateContact', this.dialogFormParams)
    this.closeFormDialog()
    this.$refs.pkMain.query()
  }

  /**
   * 删除联系人
   * @returns {Promise<void>}
   */
  async deleteContact () {
    await this.$confirm('是否删除')
    await this.$http.post<ContactModel>('/deleteContact', this.dialogFormParams)
    this.closeFormDialog()
    this.$refs.pkMain.query()
  }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
