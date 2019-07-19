<template>
  <MainComponent
    :handleResponseData="handleResponseDataContact"
    url="/insurance/getInsuSlipList"
    :handleQueryParams="handleQueryParamsContact"
    ref="pkMain"
    @handleCurrentRowChange="handleCurrentRowChangeContact"
    :columns="column">
    <template slot="dispose">
      <el-button size="mini"  v-bind:hidden="true">查看保单详情</el-button>
    </template>
  </MainComponent>
</template>

<script lang="tsx" src="./SlipForm.tsx"></script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
