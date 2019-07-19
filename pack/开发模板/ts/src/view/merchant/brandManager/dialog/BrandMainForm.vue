<template>
  <div>
    <el-form>
      <el-form-item label="大品牌名称">
        <el-input v-model="brandMain.name"/>
      </el-form-item>
      <el-form-item label="大品牌简称">
        <el-input v-model="brandMain.shortName"/>
      </el-form-item>
    </el-form>
  </div>
</template>


<script lang="ts">

import { Component, Prop, Vue } from '../../../../ext-nb'
import BrandMain from '../model/BrandMain'

@Component({
  name: 'BrandMainForm'
})
export default class BrandMainForm extends Vue {

  @Prop()
  brandMain: BrandMain

}
</script>