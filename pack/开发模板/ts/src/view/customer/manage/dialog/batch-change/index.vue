<!-- 
  @user slipkinem
  @date 4/11/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="batch">
    <el-dialog title="批量修改" :visible.sync="showDialog">
      <el-form size="small" label-width="80px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="批改编号">
              <el-input :disabled="true" v-model="batchChange.batchCode"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="投保公司">
              <PkTypeahead
                  v-model="batchChange.corpId"
                  url="/getCorpByQuery"
                  :prop="{
                   value: 'id',
                   label: 'name',
                   query: 'corpName'
                }"
                  method="postParams"
              ></PkTypeahead>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="名单上传">
              <el-upload
                  ref="upload"
                  action="/api/customer/batchUpdate"
                  :on-change="handleChange"
                  :file-list="fileList"
                  :data="batchChange"
                  :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="校验信息">
              <el-input type="textarea" v-model="batchChange.batchCode"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitAudit">审 核</el-button>
        <el-button size="small" @click="closeDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
