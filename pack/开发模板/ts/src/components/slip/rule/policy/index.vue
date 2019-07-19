<!-- 
  @user slipkinem
  @date 3/23/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="policy">
    <el-form size="small" label-width="70px" :disabled="slipDisabledGetters">
      <el-form-item label="保单号">
        <el-input style="width: 200px" v-model="policy.slipCode" :disabled="true"/>
      </el-form-item>
      <h5 class="except">除外责任</h5>
      <el-tabs v-model="tabActive">
        <el-tab-pane label="医院" name="first" style="background: #eee">
          <el-form-item label="等级" size="mini">
            <el-checkbox-group size="mini" v-model="policy.exceptDuty.optionItemIdStr">
              <el-checkbox-button
                  v-for="(level, key) in hospitalGrade"
                  :key="key"
                  :label="level.id">{{level.displayValue}}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="级别" size="mini">
            <el-checkbox-group v-model="policy.exceptDuty.optionItemIdStr">
              <el-checkbox-button
                  v-for="(level, key) in hospitalLevel"
                  :label="level.id"
                  :key="key">{{level.displayValue}}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="性质一" size="mini">
            <el-checkbox-group v-model="policy.exceptDuty.optionItemIdStr">
              <el-checkbox-button
                  v-for="(item, key) in hospitalNatureA"
                  :label="item.id"
                  :key="key">{{item.displayValue}}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="性质二" size="mini">
            <el-checkbox-group v-model="policy.exceptDuty.optionItemIdStr">
              <el-checkbox-button
                  v-for="(item, key) in hospitalNatureB"
                  :label="item.id" :key="key">{{item.displayValue}}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="疾病" name="second" style="background: #eee">
          <el-form-item label="等级">
            <el-checkbox-group v-model="policy.exceptDuty.optionItemIdStr">
              <el-checkbox-button v-for="(item, key) in diseaseType" :label="item.id" :key="key">
                {{item.displayValue}}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-row>
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="policy.exceptDuty.mark"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
