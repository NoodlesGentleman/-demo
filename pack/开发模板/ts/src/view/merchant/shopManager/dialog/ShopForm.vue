<template>
  <el-form size="small"
           label-width="105px">

    <el-form-item label="门店编号">
      <el-input v-model="shop.code"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>

    <el-form-item label="门店名称">
      <el-input v-model="shop.name"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>

    <el-form-item label="门店类型">
      <el-select v-model="shop.type"
                 :disabled="operationType !== 'edit'"
                 placeholder="门店类型">
        <el-option v-for="(signedStatus, key) in shopTypes"
                   :label="signedStatus.displayValue"

                   :value="Number(signedStatus.value)" :key="key"/>
      </el-select>

    </el-form-item>
    <el-form-item label="区域">
      <AreaCascader v-model="areaList"
                    :disabled="operationType !== 'edit'"
      ></AreaCascader>
    </el-form-item>

    <el-form-item label="详细地址">
      <el-input v-model="shop.address"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>


    <el-form-item label="门店标签">
      <el-button-group>
        <el-button v-for="(type, key) in labels" :key="key" @click="select(type.displayValue)"
                   :type="shop.label.indexOf(type.displayValue) > -1 ?  'success' : 'default'"
                   :disabled="operationType !== 'edit'">
          {{type.displayValue}}
        </el-button>
      </el-button-group>
    </el-form-item>


    <el-form-item label="经度">
      <el-input v-model="shop.longitude"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>

    <el-form-item label="纬度">
      <el-input v-model="shop.latitude"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>

    <el-form-item label="联系人">
      <el-input v-model="shop.contact"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>

    <el-form-item label="联系人电话">
      <el-input v-model="shop.mobile"
                :disabled="operationType !== 'edit'"
                auto-complete="off"/>
    </el-form-item>

  </el-form>

</template>


<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import Shop from '../model/Shop'
import AreaCascader from '../../../../components/area-cascader'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import { getShopLabels, getShopType } from '../../../../shared/util/service'
import { Watch } from 'vue-property-decorator'

@Component({
  name: 'ShopForm',
  components: {
    AreaCascader
  }
})
export default class ShopForm extends Vue {
  @Prop({
    default: () => new Shop()
  })
  shop: Shop

  @Prop({
    default: () => 'edit'
  })
  operationType: string
  areaList = [this.shop.province, this.shop.city, this.shop.area]
  shopTypes: OptionItem[] = []
  labels: OptionItem[] = []


  @Watch('areaList')
  change () {
    for (let i = 0; i < this.areaList.length; i++) {
      if (i === 0) {
        this.shop.province = this.areaList[0]
      }
      if (i === 1) {
        this.shop.city = this.areaList[1]
      }
      if (i === 2) {
        this.shop.area = this.areaList[2]
      }
    }
  }

  select (val: string) {
    if (this.shop.label.indexOf(val) > -1) {
      this.shop.label = this.shop.label.replace(val, '')
    } else {
      this.shop.label = this.shop.label.concat(val)
    }
  }


  async created () {
    this.shopTypes = await getShopType()
    this.labels = await getShopLabels()
  }

}


</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
