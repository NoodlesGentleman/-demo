<!-- 
  @user slipkinem
  @date 3/7/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="modification">
    <ChangeDetail ref="changeDetail"></ChangeDetail>
    <MainComponent
        :forms="forms"
        :columns="columns"
        ref="pkMain"
        url="/customerOperation/batchList"
    >
      <el-button-group slot="dispose">
        <el-button type="info" @click="showDetail" size="mini">查看</el-button>
      </el-button-group>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
