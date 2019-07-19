<template>
  <el-form size="small"
           label-width="105px">
    <el-form-item label="商户名称">
      <el-input v-model="merchant.name"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="商户简称">
      <el-input v-model="merchant.shortName"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="商户品牌">
      <el-select
          :disabled="operationType !== 'edit'"
          filterable
          v-model="merchant.brandId"
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="getBreanList"
          :loading="loading">
        <el-option v-if="merchant.brandName"
                   :key="merchant.brandId"
                   :label="merchant.brandName"
                   :value="merchant.brandId">
        </el-option>
        <el-option
            v-for="item in brandItem"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品库">
      <el-select
          :disabled="operationType !== 'edit'"
          v-model="merchant.warehouseId"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="getWarehouseList"
          :loading="loading">
        <el-option v-if="merchant.warehouseName"
                   :key="merchant.warehouseId"
                   :label="merchant.warehouseName"
                   :value="merchant.warehouseId">
        </el-option>
        <el-option
            v-for="item in warehouseItem"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="结算账户">
      <el-input v-model="merchant.bankName"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="结算账号">
      <el-input v-model="merchant.bankCode"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="对接人">
      <el-input v-model="merchant.contactsName"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="对账信息">
      <el-row>
        <el-col>
          <el-radio-group v-model="merchant.reconciliationType">
            <el-radio label="1" v-model="merchant.reconciliationType"
                      :disabled="operationType !== 'edit'">百分比</el-radio>
            <el-radio label="2" v-model="merchant.reconciliationType"
                      :disabled="operationType !== 'edit'">阶梯百分比</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row v-if="merchant.reconciliationType == 1">
        <el-col :span="4">
          百分比：
        </el-col>
        <el-col :span="6">
          <el-input v-model="merchant.reconciliationPercentage"
                    :disabled="operationType !== 'edit'"></el-input>
        </el-col>
        <el-col :span="2"> %
        </el-col>
      </el-row>
      <el-row v-if="merchant.reconciliationType == 2">
        <el-col :span="4">
          基准百分比：
        </el-col>
        <el-col :span="6">
          <el-input v-model="merchant.reconciliationPercentage"
                    :disabled="operationType !== 'edit'"></el-input>
        </el-col>
        <el-col :span="2"> %
        </el-col>
        <el-col :span="4">
          是否追溯：
        </el-col>
        <el-col :span="8">
          <el-select v-model="merchant.reconciliationIsAdd"
                     :disabled="operationType !== 'edit'">
            <el-option value="0" label="请选择" />
            <el-option :value="1" label="是"/>
            <el-option :value="2" label="否"/>
          </el-select>
        </el-col>
      </el-row>
      <el-row v-if="merchant.reconciliationType == 2">
        <el-col :span="4">
          追加百分比：
        </el-col>
        <el-col :span="6">
          <el-input v-model="merchant.reconciliationAddPercentage"
                    :disabled="operationType !== 'edit'"></el-input>
        </el-col>
        <el-col :span="2">
          %
        </el-col>
        <el-col :span="4">
          追加基准值：
        </el-col>
        <el-col :span="8">
          <el-input v-model="merchant.reconciliationAddValue"
                    :disabled="operationType !== 'edit'"></el-input>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>

</template>


<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import Merchant from '../model/Merchant'
import ResPage from '../../../../model/ResPage'

@Component({
  name: 'MerchantForm'
})
export default class MerchantForm extends Vue {
  @Prop({
    default: () => new Merchant()
  })
  merchant: Merchant

  @Prop({
    default: () => 'edit'
  })
  operationType: string
  brandItem: any[] = []
  warehouseItem: any[] = []

  loading: boolean = false

  async getBreanList (query: string) {
    if (query !== '') {
      this.loading = true
      const res = await this.$http.postParams<ResPage<any>>('/merchant/getBrandList', { name: query })
      this.brandItem = res.rows
      this.loading = false
    } else {
      this.brandItem = []
    }
  }


  async getWarehouseList (query: string) {
    if (query !== '') {
      this.loading = true
      const res = await this.$http.postParams<ResPage<any>>('/merchant/getWareHouseList', { name: query })
      this.warehouseItem = res.rows
      this.loading = false
    } else {
      this.warehouseItem = []
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
