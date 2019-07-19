<template>
  <el-form :model="downloadCardForm"
           ref="downloadCardForm"
           size="small"
           label-width="130px">
    <el-form-item label="批次号">
      <el-input v-model="downloadCardForm.stockId"
                :disabled="true"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="批次名称">
      <el-input v-model="downloadCardForm.stockName"
                :disabled="true"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="已出库数量">
      <el-input v-model="downloadCardForm.stockOutcount"
                :disabled="true"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="剩余数量">
      <el-input v-model="downloadCardForm.stockSurpluscount"
                :disabled="true"
                auto-complete="off"/>
    </el-form-item>
    <el-form-item label="导出内容">
      <el-select :value="downloadCardForm.download"
                 v-model="downloadCardForm.download"
                 placeholder="导出内容">
        <el-option v-for="(download, key) in download"
                   :label="download.displayValue"
                   :value="Number(download.value)" :key="key"/>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import { default as StockBatch } from '../model/StockBatch'
import { getDownload } from '../../../../shared/util/service'
import MainComponent from '../../../../components/main'

@Component({
  name: 'DownloadCardForm'
})
export default class DownloadCardForm extends Vue {
  @Prop({
    default: () => new StockBatch()
  })
  downloadCardForm: StockBatch
  @Prop({
    default: () => ''
  })
  templateUrl: string
  loading: boolean = false
  download: OptionItem[] = []

  $refs: {
    downloadCardForm: MainComponent
  }

  async created () {
    this.download = await getDownload()
  }

}
</script>

<style lang="scss" rel="stylesheet/scss" scoped></style>
