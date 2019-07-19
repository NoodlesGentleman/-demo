<!--
  @user slipkinem
  @date 4/9/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="person">
    <div class="upload" v-if="!slipDisabledGetters">
      <el-upload
          :disabled="successData"
          ref="upload"
          :action="`${baseURL}/account/uploadCustomerBillExcel`"
          :on-change="handleChange"
          :on-success="onSuccess"
          :data="uploadData"
          :on-error="onError"
          :file-list="fileList"
          :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
        <el-button style="margin-left: 10px;" size="small" type="info" @click="save">保存</el-button>
      </el-upload>
      <el-table :data="changeData" stripe @current-change="handleCurrentRowChange" border size="mini">
        <el-table-column label="校验">
          <template slot-scope="scope">
            <span>{{scope.row.code === 0 ? '校验成功' : '校验失败'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="exportFile(scope.row)">导出
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="content" v-else>
      <MainComponent
          :data="personList"
          ref="main"
          :initialize="false"
          :showPagination="false"
          :columns="columns">
        <el-button-group slot="dispose">
          <el-button type="primary" size="mini" @click="downloadExcel">下载原始数据</el-button>
        </el-button-group>
      </MainComponent>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
