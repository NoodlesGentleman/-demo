<!-- 
  @user slipkinem
  @date 3/22/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="rule">
    <el-row>
      <el-col :span="6">
        <el-button-group>
          <el-button type="info" size="mini" @click="operationShare">共享</el-button>
        </el-button-group>
        <el-tree
            default-expand-all
            :expand-on-click-node="false"
            :data="data"
            node-key="id"
            @node-click="handleNodeClick">
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <el-button-group>
              <el-button
                  type="text"
                  size="mini"
                  v-if="[RuleEnum.PublicCoverage,
                  RuleEnum.DirectPay,
                  RuleEnum.AllowanceRule,
                  RuleEnum.TPAReplenish].indexOf(data.treeNodeType) < 0 &&
                 !slipDisabledGetters"
                  @click.stop="() => appendNode(data)">
                添加
              </el-button>
              <el-button
                  type="text"
                  size="mini"
                  v-if="data.treeNodeType !== RuleEnum.Policy && !slipDisabledGetters"
                  @click.stop="() => removeNode(node, data)">
                <span class="el-button--danger">删除</span>
              </el-button>
            </el-button-group>
          </div>
        </el-tree>
      </el-col>
      <!-- right -->
      <el-col :span="18">
        <!-- 保单 -->
        <PolicyRule :policy="slipRule.slipPolicy" v-show="showCurrentNodeTab(RuleEnum.Policy)"></PolicyRule>
        <!-- 新增计划/公共保额 -->
        <el-form label-width="120px" size="mini" v-show="showCurrentNodeTab(RuleEnum.AddPlan)">
          <el-form-item label="新增类型">
            <el-select :value="planOrCommonAmt.type" v-model="planOrCommonAmt.type">
              <el-option :value="RuleEnum.Plan" label="计划"/>
              <el-option :value="RuleEnum.PublicCoverage" label="公共保额"/>
            </el-select>
          </el-form-item>

          <div v-show="planOrCommonAmt.type === RuleEnum.PublicCoverage">
            <el-form-item label="公共保额名称">
              <el-input v-model="planOrCommonAmt.name"/>
            </el-form-item>
            <el-form-item label="公共保额代码">
              <el-input v-model="planOrCommonAmt.Code"/>
            </el-form-item>
          </div>

          <div v-show="planOrCommonAmt.type === RuleEnum.Plan">
            <el-form-item label="计划名称">
              <el-input v-model="planOrCommonAmt.name"/>
            </el-form-item>
            <el-form-item label="计划代码">
              <el-input v-model="planOrCommonAmt.Code"/>
            </el-form-item>
          </div>
        </el-form>

        <!-- 计划 -->
        <el-form label-width="120px"
                 size="mini"
                 :disabled="slipDisabledGetters"
                 v-show="showCurrentNodeTab(RuleEnum.Plan)">
          <el-form-item label="计划名称">
            <el-input v-model="currentPlanOrCommonAmt.name"/>
          </el-form-item>
          <el-form-item label="计划代码">
            <el-input v-model="currentPlanOrCommonAmt.Code"/>
          </el-form-item>
        </el-form>

        <!-- 添加责任 -->
        <el-form label-width="100px" size="mini" v-show="showCurrentNodeTab(RuleEnum.AddDuty)">
          <el-form-item label="责任名称">
            <el-input v-model="duty.dutyName"/>
          </el-form-item>
          <el-form-item label="责任代码">
            <el-input v-model="duty.dutyCode"/>
          </el-form-item>
          <el-form-item label="责任类型">
            <el-select :value="duty.dutyType" v-model="duty.dutyType">
              <el-option label="直付责任" :value="RuleEnum.DirectPay"/>
              <el-option label="TPA普通责任" :value="RuleEnum.TPADuty"/>
              <el-option label="TPA津贴责任" :value="RuleEnum.AllowanceRule"/>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="TPA类型" v-show="duty.type !== RuleEnum.DirectPay">-->
          <!--<el-select :value="duty.type" v-model="duty.type">-->
          <!--<el-option label="普通责任" :value="RuleEnum.TPADuty"/>-->
          <!--<el-option label="津贴责任" :value="RuleEnum.AllowanceRule"/>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
        </el-form>
        <!-- TPA普通责任 -->
        <TPARule ref="tpa" :tpa="slipRule.tpa" v-show="showCurrentNodeTab(RuleEnum.TPADuty)"></TPARule>

        <!-- TPA小项 -->
        <TPAReplenish :tpaReplenish="slipRule.tpaReplenish"
                      v-show="showCurrentNodeTab(RuleEnum.TPAReplenish)"></TPAReplenish>

        <!-- 直付责任 -->
        <DirectPay ref="directPay" :directPay="slipRule.directPay"
                   v-show="showCurrentNodeTab(RuleEnum.DirectPay)"></DirectPay>

        <!-- 公共保额 -->
        <PublicCoverage :publicAmt="slipRule.publicCoverageAmt"
                        v-show="showCurrentNodeTab(RuleEnum.PublicCoverage)"></PublicCoverage>

        <!-- 津贴责任 -->
        <AllowanceRule :allowance="slipRule.allowance"
                       v-show="showCurrentNodeTab(RuleEnum.AllowanceRule)"></AllowanceRule>

        <!-- 共享 -->
        <ShareRule ref="share" :share="slipRule.share" :allDuty="slipRule.allDuty"
                   v-show="showCurrentNodeTab(RuleEnum.Share)"></ShareRule>
        <!-- 按钮 -->
        <el-button-group style="float: right" v-show="isShowSaveBtn && !slipDisabledGetters">
          <el-button size="mini">重 置</el-button>
          <el-button size="mini" type="success" @click="saveOperation">保 存</el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>

<style lang="scss">
  .compensate {
    .el-select .el-input {
      width: 100px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }
</style>
