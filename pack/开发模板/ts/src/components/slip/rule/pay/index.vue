<!-- 
  @user slipkinem
  @date 3/23/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
    <div class="tpa">
        <!-- 直付责任 -->
        <el-tabs v-model="tabActive">
            <el-tab-pane name="first" label="基本要素">
                <el-form size="mini" label-width="120px" :disabled="slipDisabledGetters">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="直付责任名称">
                                <el-input v-model="directPay.base.directPayDutyName" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="支付期限">
                                <el-date-picker v-model="selectDate" @change="selectDateChange" value-format="yyyy-MM-dd HH:mm:ss" :unlink-panels="true" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="直付责任代码">
                                <el-input v-model="directPay.base.directPayDutyCode" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="14" class="compensate">
                            <el-row v-for="(pay, key) in quotas" :key="key">
                                <el-col :span="20">
                                    <el-form-item :label="key === 0 ? '限额方式' : ''">
                                        <el-input class="input-with-select" v-model="pay.limitNumber">
                                            <el-select :value="pay.limitType" v-model="pay.limitType" slot="prepend" :disabled="true" placeholder="请选择">
                                                <el-option label="年" :value="DateType.Year" />
                                                <el-option label="月" :value="DateType.Month" />
                                                <el-option label="日" :value="DateType.Day" />
                                                <el-option label="次" :value="DateType.Times" />
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
                        <el-col :span="10">
                            <el-form-item label="保额">
                                <el-input v-model="directPay.base.quota">
                                    <template slot="append">
                                        元
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14" class="compensate">
                            <el-row v-for="(deductible, key) in deductions" :key="key">
                                <el-col :span="20">
                                    <el-form-item :label="key===0 ? '免赔方式' : ''">
                                        <el-input class="input-with-select" v-model="deductible.limitNumber">
                                            <el-select :value="deductible.type" disabled v-model="deductible.limitType" slot="prepend" placeholder="请选择">
                                                <el-option label="年" :value="DateType.Year" />
                                                <el-option label="月" :value="DateType.Month" />
                                                <el-option label="日" :value="DateType.Day" />
                                                <el-option label="次" :value="DateType.Times" />
                                            </el-select>
                                            <template slot="append">
                                                元
                                            </template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label-width="5px">
                                        <!--<el-button @click="addInsuLimit(LimitType.Deduction)" v-if="key === 0">添加</el-button>-->
                                        <!--<el-button type="warning" @click="removeInsuLimit(deductible.$$index)" v-else>删除</el-button>-->
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="赔付比例">
                                <el-input v-model="directPay.base.compensateRatioNumber">
                                    <template slot="append">
                                        %
                                    </template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="directPay.base.basicMark" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>

            <el-tab-pane name="special" label="特殊限定">
                <DirectPaySpecialRule ref="specialRule" :directPay="directPay"></DirectPaySpecialRule>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "index";
</style>
