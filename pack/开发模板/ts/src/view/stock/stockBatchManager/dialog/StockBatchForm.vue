<!-- 
  @user slipkinem
  @date 3/14/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <el-form :model="stockBatchForm"
           ref="stockBatchForm"
           size="small"
           label-width="130px">
    <el-form-item label="库存类型">
      <el-select :value="stockBatchForm.stockType"
                 v-model="stockBatchForm.stockType"
                 placeholder="库存类型">
        <el-option v-for="(stockType, key) in stockType"
                   :label="stockType.displayValue"
                   :value="Number(stockType.value)" :key="key"/>
      </el-select>
    </el-form-item>
    <el-form-item label="批次名称">
      <el-input v-model="stockBatchForm.stockName"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="卡类型名称" v-if="stockBatchForm.stockType==1">
      <el-select
          v-model="stockBatchForm.cardBinName"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          @change="checknumMinusp"
          :remote-method="getCardBinListByName"
          :loading="loading">
        <el-option
            v-for="item in CardBinList"
            :key="item.cardBinName"
            :label="item.cardBinName"
            :value="item.cardBinName">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="卡bin号" v-if="stockBatchForm.stockType==1">
      <el-input :disabled="true"
                v-model="stockBatchForm.cardBinId"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="卡样" v-if="stockBatchForm.stockType==1">
      <img width="50%" :src="templateUrl">
    </el-form-item>
    <el-form-item label="卡片/物料数量">
      <el-input v-model="stockBatchForm.stockCount"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="归属地区">
      <el-select v-model="stockBatchForm.stockProvince" placeholder="请选择省份">
        <el-option
            v-for="item in Province"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="stockBatchForm.stockCity" placeholder="请选择城市">
        <el-option
            v-for="item in City"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import { default as StockBatch } from '../model/StockBatch'
import { getStockType } from '../../../../shared/util/service'
import MainComponent from '../../../../components/main'
import ResPage from '../../../../model/ResPage'
import { Watch } from 'vue-property-decorator'
import SysCity from '../../../corp/manage/model/SysCity'
import SysArea from '../../../corp/manage/model/SysArea'

@Component({
  name: 'StockBatchForm'
})
export default class StockBatchForm extends Vue {
  @Prop({
    default: () => new StockBatch()
  })
  stockBatchForm: StockBatch
  @Prop({
    default: () => ''
  })
  operationType: string
  templateUrl: string
  City: any[] = []
  Province: any[] = []
  loading: boolean = false
  stockType: OptionItem[] = []
  sysArea: SysArea = new SysArea()
  sysCity: SysCity = new SysCity()
  CardBinList: any[] = []
  actionUrl = ''
  fileUrl: string = ''

  $refs: {
    stockBatchForm: MainComponent
  }

  async created () {
    this.stockType = await getStockType()
    const province = await this.$http.postParams<ResPage<any>>('/getProvinceList')
    const city = await this.$http.postParams<ResPage<any>>('/getCityList')
    this.Province = province.rows
    this.City = city.rows
  }

  async getCardBinListByName (query: string) {
    if (query !== '') {
      this.loading = true
      const res = await this.$http.get<ResPage<any>>('/stock/getCardBinByName', { query: query })
      this.CardBinList = res.rows
      this.loading = false
    } else {
      this.CardBinList = []
    }
  }

  async checknumMinusp () {
    const op = await this.$http.get<ResPage<any>>('/stock/getCardBinByName', { query: this.stockBatchForm.cardBinName.toString() })
    this.stockBatchForm.cardBinId = op.rows[0].cardBin
    this.templateUrl = op.rows[0].templateUrl
  }

  @Watch('stockBatchForm.stockProvince')
  change () {
    if (this.stockBatchForm.stockProvince !== '' && this.stockBatchForm.stockProvince !== undefined) {
      this.getCityList(this.stockBatchForm.stockProvince)
    }
  }

  async getCityList (query: string) {
    if (query !== '') {
      this.sysCity.provinceId = query
      const res = await this.$http.postParams<ResPage<any>>('/getCityList', this.sysCity)
      this.City = res.rows
    } else {
      this.City = []
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
