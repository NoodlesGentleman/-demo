<!-- 
  @user slipkinem
  @date 3/23/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="tpa">
    <!-- TPA责任 -->
    <el-tabs v-model="tabActive">
      <el-tab-pane name="base" label="基本要素">
        <el-form :disabled="slipDisabledGetters" size="mini" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="TPA责任名称：">
                <el-input v-model="tpaDuty.base.tpaName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template slot="label">
                  <el-checkbox v-model="tpaDuty.base.isWaitDate">
                    等待期
                  </el-checkbox>
                </template>
                <el-input v-model="tpaDuty.base.waitDate" :disabled="!tpaDuty.base.isWaitDate">
                  <template slot="append">
                    天
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="TPA责任代码：">
                <el-input v-model="tpaDuty.base.tpaCode"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="16">
                  <el-form-item>
                    <template slot="label">
                      <el-checkbox v-model="tpaDuty.base.isMyselfRatio">
                        承担自费
                      </el-checkbox>
                    </template>
                    <el-input v-model="tpaDuty.base.bearMyselfRatio" :disabled="!tpaDuty.base.isMyselfRatio">
                      <template slot="append">
                        %
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保额" label-width="50px">
                    <el-input size="mini" v-model="tpaDuty.base.bearMyselfInsuAmt"
                              :disabled="!tpaDuty.base.isMyselfRatio"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="保额：">
                <el-input v-model="tpaDuty.base.tpaQuota">
                  <template slot="append">
                    元
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="16">
                  <el-form-item>
                    <template slot="label">
                      <el-checkbox v-model="tpaDuty.base.isClassbRatio">
                        承担乙类
                      </el-checkbox>
                    </template>
                    <el-input v-model="tpaDuty.base.bearClassbRatio" :disabled="!tpaDuty.base.isClassbRatio">
                      <template slot="append">
                        %
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保额" label-width="50px">
                    <el-input size="mini" v-model="tpaDuty.base.bearClassbInsuAmt"
                              :disabled="!tpaDuty.base.isClassbRatio"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="系统责任：">
                <el-select v-model="tpaDuty.base.systemDuty">
                  <el-option v-for="item in insuranceSlipSystemDuty" :key="item.value" :value="Number(item.value)"
                             :label="item.displayValue"/>
                </el-select>
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
                        次
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
              <el-form-item label="次免赔">
                <el-row style="font-size: 12px">
                  <el-col :span="2">
                    从第
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="tpaDuty.base.lastDeductiblesNext"/>
                  </el-col>
                  <el-col :span="8">
                    次就诊开始,扣除
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="tpaDuty.base.lastDeductiblesFee"/>
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
                    <el-select :value="tpaDuty.base.compensateRatioRule"
                               v-model="tpaDuty.base.compensateRatioRule"
                               placeholder="请选择">
                      <el-option label="固定比例" :value="1"/>
                      <el-option label="分段比例" :value="2"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" v-show="tpaDuty.base.compensateRatioRule === 1">
                  <el-form-item label-width="0">
                    <el-input v-model="tpaDuty.base.compensateRatioNumber">
                      <template slot="append">%</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label-width="0" v-show="tpaDuty.base.compensateRatioRule === 2">
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
                               @click="tpaDuty.base.insuLimitTypeList.push({type: LimitType.Compensate})">添 加
                    </el-button>
                    <el-button type="text" v-else @click="tpaDuty.base.insuLimitTypeList.splice(compensate.$$index, 1)">
                      删 除
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
                <el-input type="textarea" v-model="tpaDuty.base.basicMark"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="special" label="特殊限定">
        <!-- 限定预览 -->
        <div v-show="!isShowDetail">
          <el-button-group>
            <el-button size="mini" type="info" @click="isShowDetail = true">新增</el-button>
            <el-button size="mini" type="danger" @click="deleteSpecialRueSet">删除</el-button>
          </el-button-group>
          <el-table
              highlight-current-row
              @current-change="handleCurrentRowChange"
              stripe
              :data="tpaDuty.specialRuleList"
              border
              size="small"
              style="width: 100%">
            <el-table-column
                prop="mark"
                label="限定说明">
            </el-table-column>
            <el-table-column
                prop="limitTypeDisplay"
                label="限定关系">
            </el-table-column>
          </el-table>
        </div>
        <!-- 限定详情 -->
        <div v-show="isShowDetail">
          <el-button-group>
            <el-button size="mini" @click="isShowDetail = false">返回</el-button>
          </el-button-group>
          <el-tabs v-model="specialTabActive">
            <el-tab-pane label="人员限定" :name="`${SpecialTypeEnum.Person}`">
              <MainComponent
                  :forms="personForms"
                  :columns="personColumns"
                  url="/customer/getCustomerList"
                  @selectionChange="handlePersonChange"
                  :multiSelect="true"
                  size="mini"
              >
                <span slot="dispose"></span>
              </MainComponent>
            </el-tab-pane>

            <el-tab-pane label="疾病限定" :name="`${SpecialTypeEnum.Disease}`">
              <MainComponent
                  :forms="diseaseForms"
                  :columns="diseaseColumns"
                  url="/disease/getDisease"
                  @selectionChange="handleDiseaseChange"
                  :multiSelect="true"
                  size="mini"
              >
                <span slot="dispose"></span>
              </MainComponent>
            </el-tab-pane>

            <el-tab-pane label="医院限定" :name="`${SpecialTypeEnum.Hospital}`">
              <MainComponent
                  :forms="hospitalForms"
                  :columns="hospitalColumns"
                  url="/disease/getHospital"
                  :multiSelect="true"
                  @selectionChange="handleHospitalChange"
                  :handleQueryParams="handleHospitalParams"
                  size="mini"
              >
                <span slot="dispose"></span>
              </MainComponent>
            </el-tab-pane>
          </el-tabs>

          <!--<el-row style="margin: 20px 0;">-->
          <!--<el-col :span="6" :offset="18">-->
          <!--<el-button-group>-->
          <!--<el-button size="mini">取消</el-button>-->
          <!--<el-button size="mini" type="success">保存</el-button>-->
          <!--</el-button-group>-->
          <!--</el-col>-->
          <!--</el-row>-->

          <h5 class="h5">限定设置</h5>
          <el-form size="mini" :disabled="slipDisabledGetters" label-width="140px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="限定关系">
                  <el-select
                      :value="tpaDuty.specail.specialSetting.limitType"
                      placeholder="请选择"
                      v-model="tpaDuty.specail.specialSetting.limitType">
                    <el-option :value="1" label="单一限定"/>
                    <el-option :value="2" label="单一满足"/>
                    <el-option :value="3" label="同时满足"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="限定比例">
                  <el-input v-model="tpaDuty.specail.specialSetting.limitRatio">
                    <template slot="append">
                      %
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="compensate">
                <el-form-item>
                  <template slot="label">
                    <el-checkbox v-model="tpaDuty.specail.specialSetting.isLimitAmt">限额</el-checkbox>
                    限额方式
                  </template>
                  <el-input
                      :disabled="!tpaDuty.specail.specialSetting.isLimitAmt"
                      class="input-with-select"
                      v-model="tpaDuty.specail.specialSetting.limitAmt">
                    <template slot="append">
                      元
                    </template>
                    <el-select
                        :disabled="!tpaDuty.specail.specialSetting.isLimitAmt"
                        :value="tpaDuty.specail.specialSetting.limitAmtType"
                        v-model="tpaDuty.specail.specialSetting.limitAmtType"
                        slot="prepend"
                        placeholder="请选择">
                      <el-option label="年" :value="DateType.Year"/>
                      <el-option label="月" :value="DateType.Month"/>
                      <el-option label="日" :value="DateType.Day"/>
                      <el-option label="次" :value="DateType.Times"/>
                    </el-select>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="compensate">
                <el-form-item>
                  <template slot="label">
                    <el-checkbox v-model="tpaDuty.specail.specialSetting.isLimitNum">限次</el-checkbox>
                    限次方式
                  </template>
                  <el-input
                      :disabled="!tpaDuty.specail.specialSetting.isLimitNum"
                      class="input-with-select"
                      v-model="tpaDuty.specail.specialSetting.limitNum">
                    <template slot="append">
                      次
                    </template>
                    <el-select
                        :disabled="!tpaDuty.specail.specialSetting.isLimitNum"
                        v-model="tpaDuty.specail.specialSetting.limitNumType"
                        :value="tpaDuty.specail.specialSetting.limitNumType"
                        slot="prepend"
                        placeholder="请选择">
                      <el-option label="年" :value="DateType.Year"/>
                      <el-option label="月" :value="DateType.Month"/>
                      <el-option label="日" :value="DateType.Day"/>
                    </el-select>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="compensate">
                <el-form-item>
                  <template slot="label">
                    <el-checkbox v-model="tpaDuty.specail.specialSetting.isDeductible">免赔额</el-checkbox>
                    免赔方式
                  </template>
                  <el-input
                      :disabled="!tpaDuty.specail.specialSetting.isDeductible"
                      class="input-with-select"
                      v-model="tpaDuty.specail.specialSetting.deductible">
                    <template slot="append">
                      元
                    </template>
                    <el-select
                        :disabled="!tpaDuty.specail.specialSetting.isDeductible"
                        v-model="tpaDuty.specail.specialSetting.deductibleType"
                        :value="tpaDuty.specail.specialSetting.deductibleType"
                        slot="prepend"
                        placeholder="请选择">
                      <el-option label="年" :value="DateType.Year"/>
                      <el-option label="月" :value="DateType.Month"/>
                      <el-option label="日" :value="DateType.Day"/>
                      <el-option label="次" :value="DateType.Times"/>
                    </el-select>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="限定说明">
                  <el-input type="textarea" v-model="tpaDuty.specail.specialSetting.mark"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
