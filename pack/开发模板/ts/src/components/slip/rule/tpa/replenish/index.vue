<!-- 
  @user slipkinem
  @date 3/23/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="replenish">
    <el-form size="mini"
             label-width="120px"
             :disabled="slipDisabledGetters">
      <el-row>
        <el-col :span="12">
          <el-form-item label="小项名称：">
            <el-input v-model="replenish.smallItemName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="16">
              <el-form-item>
                <template slot="label">
                  <el-checkbox v-model="replenish.isMyselfRatio">
                    承担自费
                  </el-checkbox>
                </template>
                <el-input v-model="replenish.bearMyselfRatio" :disabled="!replenish.isMyselfRatio">
                  <template slot="append">
                    %
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保额" label-width="50px">
                <el-input size="mini" v-model="replenish.bearMyselfInsuAmt" :disabled="!replenish.isMyselfRatio"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="小项代码：">
            <el-input v-model="replenish.smallItemCode"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="16">
              <el-form-item>
                <template slot="label">
                  <el-checkbox v-model="replenish.isClassbRatio">
                    承担乙类
                  </el-checkbox>
                </template>
                <el-input v-model="replenish.bearClassbRatio" :disabled="!replenish.isClassbRatio">
                  <template slot="append">
                    %
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保额" label-width="50px">
                <el-input size="mini" v-model="replenish.bearClassbInsuAmt" :disabled="!replenish.isClassbRatio"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="保额：">
            <el-input v-model="replenish.quota">
              <template slot="append">
                元
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="compensate">
          <el-row v-for="(pay, key) in timesLimit" :key="key">
            <el-col :span="20">
              <el-form-item :label="key === 0 ? '限次方式' : ''">
                <el-input class="input-with-select" v-model="pay.limitNumber">
                  <el-select :value="pay.limitType"
                             v-model="pay.limitType"
                             slot="prepend"
                             :disabled="true"
                             placeholder="请选择">
                    <el-option label="年" :value="DateType.Year"/>
                    <el-option label="日" :value="DateType.Day"/>
                  </el-select>
                  <template slot="append">
                    元
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="5px">
                <!--<el-button @click="addInsuLimit(LimitType.Quota)" v-if="key === 0">添加</el-button>-->
                <!--<el-button @click="removeInsuLimit(pay.$$index)" type="warning" v-else>删除</el-button>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="次免赔：">
            <el-row style="font-size: 12px">
              <el-col :span="2">
                从第
              </el-col>
              <el-col :span="5">
                <el-input/>
              </el-col>
              <el-col :span="8">
                次就诊开始,扣除
              </el-col>
              <el-col :span="6">
                <el-input/>
              </el-col>
              <el-col :span="3">
                元/次
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="compensate">
          <el-row v-for="(pay, key) in quotas" :key="key">
            <el-col :span="20">
              <el-form-item :label="key === 0 ? '限额方式' : ''">
                <el-input class="input-with-select" v-model="pay.limitNumber">
                  <el-select :value="pay.limitType"
                             v-model="pay.limitType"
                             slot="prepend"
                             :disabled="true"
                             placeholder="请选择">
                    <el-option label="年" :value="DateType.Year"/>
                    <el-option label="月" :value="DateType.Month"/>
                    <el-option label="日" :value="DateType.Day"/>
                    <el-option label="次" :value="DateType.Times"/>
                  </el-select>
                  <template slot="append">
                    元
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="5px">
                <!--<el-button @click="addInsuLimit(LimitType.Quota)" v-if="key === 0">添加</el-button>-->
                <!--<el-button @click="removeInsuLimit(pay.$$index)" type="warning" v-else>删除</el-button>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class="compensate">
          <el-row>
            <el-col :span="14">
              <el-form-item label="赔付比例">
                <el-select :value="replenish.compensateRatioRule"
                           v-model="replenish.compensateRatioRule"
                           placeholder="请选择">
                  <el-option label="固定比例" :value="1"/>
                  <el-option label="分段比例" :value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" v-show="replenish.compensateRatioRule === 1">
              <el-form-item label-width="0">
                <el-input v-model="replenish.compensateRatioNumber">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label-width="0" v-show="replenish.compensateRatioRule === 2">
            <el-row v-for="(compensate, key) in compensates" :key="key" type="flex" align="center" justify="middle">
              <el-col :span="1">
                <el-tooltip effect="dark" content="分段区间为“>”和“<=”" placement="left-start">
                  <i class="el-icon-info el-tag--danger"></i>
                </el-tooltip>
              </el-col>
              <el-col :span="6">
                <el-input v-model="compensate.limitNumberBegin"/>
              </el-col>
              <el-col :span="1"><span style="font-size: 30px;font-weight: bold;">-</span></el-col>
              <el-col :span="7">
                <el-input v-model="compensate.limitNumberEnd">
                  <template slot="append">元</template>
                </el-input>
              </el-col>
              <el-col :span="7">
                <el-input v-model="compensate.limitNumber">
                  <template slot="append">%</template>
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-button type="text" v-if="key === 0"
                           @click="replenish.insuLimitTypeList.push({type: LimitType.Compensate})">添 加
                </el-button>
                <el-button type="text" v-else @click="replenish.insuLimitTypeList.splice(compensate.$$index, 1)">删 除
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="compensate">
          <el-row v-for="(pay, key) in deductions" :key="key">
            <el-col :span="20">
              <el-form-item :label="key === 0 ? '免赔方式' : ''">
                <el-input class="input-with-select" v-model="pay.limitNumber">
                  <el-select :value="pay.limitType"
                             v-model="pay.limitType"
                             slot="prepend"
                             :disabled="true"
                             placeholder="请选择">
                    <el-option label="年" :value="DateType.Year"/>
                    <el-option label="月" :value="DateType.Month"/>
                    <el-option label="日" :value="DateType.Day"/>
                    <el-option label="次" :value="DateType.Times"/>
                  </el-select>
                  <template slot="append">
                    元
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="5px">
                <!--<el-button @click="addInsuLimit(LimitType.Quota)" v-if="key === 0">添加</el-button>-->
                <!--<el-button @click="removeInsuLimit(pay.$$index)" type="warning" v-else>删除</el-button>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="replenish.basicMark"/>
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
