<template>
  <div class="insurance">
    <el-dialog :title="insuranceTitle" :visible.sync="dialogInsert">
      <InsuranceInsertForm ref="InsuranceInsertForm" :insuInsertForm="insuranceInsertForm"></InsuranceInsertForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitInsert">保 存</el-button>
        <el-button size="small" @click="closeInsertDialog">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="insuranceMainTitle" :visible.sync="dialogMainInsert">
      <InsuranceMainForm ref="InsuranceMainForm" :insuMainForm="insuranceInsertForm"></InsuranceMainForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitMainInsert">保 存</el-button>
        <el-button size="small" @click="closeMainInsertDialog">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="insuranceTitle" :visible.sync="dialogFormVisible">
      <InsuranceInsertForm ref="InsuranceInsertForm" :insuInsertForm="dialogFormParams" operationType=""></InsuranceInsertForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitUpdate">保 存</el-button>
        <el-button size="small" @click="closeDialogFormVisible">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="insuranceMainTitle" :visible.sync="dialogMainFormVisible">
      <InsuranceMainForm ref="InsuranceMainForm" :insuMainForm="dialogMainFormParams"></InsuranceMainForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitMainUpdate">保 存</el-button>
        <el-button size="small" @click="closeDialogMainFormVisible">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog :title="insuranceTitle" :visible.sync="dialogShowDetail" width="70%">
      <el-tabs v-model="tabActiveShowDetail">
        <el-tab-pane label="基本信息" name="insurance">
          <InsuranceInsertForm  ref="InsuranceInsertForm"  :insuInsertForm="dialogFormParams" operationType="show" ></InsuranceInsertForm>
        </el-tab-pane>
        <el-tab-pane label="合同信息" >
          <InsuContractForm ref="InsuContractForm" :insuranceForm="dialogFormParams" ></InsuContractForm>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="insuranceMainTitle" :visible.sync="dialogMainShowDetail" width="70%">
      <InsuranceMainForm ref="InsuranceMainForm"  :insuMainForm="dialogMainFormParams" operationType="show" ></InsuranceMainForm>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="closeDialogShowDetail">返 回</el-button>
      </div>
    </el-dialog>


  <el-tabs v-model="tabActive">
    <el-tab-pane label="保险公司" name="insurance">
    <MainComponent
        :handleResponseData="handleResponseData"
        url="/getInsuranceListByQueryVo"
        :handleQueryParams="handleQueryParams"
        :forms="forms"
        ref="pkMainInsurance"
        @handleCurrentRowChange="handleCurrentRowChange"
        :columns="columns">
      <template slot="dispose">
        <el-button size="mini" @click.native="insert" type="success">新增</el-button>
        <el-button size="mini" @click.native="showDetail" type="info">查看</el-button>
        <el-button size="mini" @click.native="update" type="warning">修改</el-button>
      </template>
    </MainComponent>
    </el-tab-pane>

    <el-tab-pane label="保险总公司" name="insuranceMain">
      <MainComponent
        :handleResponseData="handleResponseData"
        url="/getMainInsuByQuery"
        :handleQueryParams="handleQueryParams"
        :forms="forms1"
        ref="pkMain"
        @handleCurrentRowChange="handleMainCurrentRowChange"
        :columns="columns2">
        <template slot="dispose">
          <el-button size="mini" @click.native="insertTotal" type="success">新增</el-button>
          <el-button size="mini" @click.native="showDetailTotal" type="info">查看</el-button>
          <el-button size="mini" @click.native="updateTotal" type="warning">修改</el-button>
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
