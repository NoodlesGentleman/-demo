<template>
  <div class="manage">
    <!--查看信息-->
    <el-dialog title="订单详情" :visible.sync="dialogShowDetail">
      <div class="main">
        <el-form>
          <el-form-item label="基本信息"/>
          <el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="订单编号:">
                  {{order.code}}
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="订单时间:">{{order.createTime}}
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="订单商户:">{{order.merchantName}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="订单参考号:">{{order.rrn}}
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="订单门店:">{{order.shopName}}
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="三方交易号:">{{order.merchantOrdercode}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="订单状态:">{{order.status}}
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="客户姓名:">{{order.personName}}
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="优惠:">{{order.discountamt}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="折扣:">{{order.discountrate}}
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="订单总额:">{{order.actualAmt}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="支付信息"/>
          <el-form-item>
            <el-table :data="pays">
              <el-table-column prop="payType" label="支付方式"></el-table-column>
              <el-table-column prop="accountCode" label="账户"></el-table-column>
              <el-table-column prop="amt" label="支付金额"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="理赔信息"/>
          <el-form-item>
            <el-table :data="claims">
              <el-table-column prop="slipCode" label="保单号"></el-table-column>
              <el-table-column prop="personName" label="姓名"></el-table-column>
              <el-table-column prop="idNumber" label="身份证"></el-table-column>
              <el-table-column prop="exceedAmt" label="免赔额"></el-table-column>
              <el-table-column prop="approveAmt" label="理赔金额"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="商品信息"/>
          <el-form-item>
            <el-table :data="details">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="goodsType" label="商品类型"></el-table-column>
              <el-table-column prop="num" label="商品数量"></el-table-column>
              <el-table-column prop="price" label="商品价格"></el-table-column>
              <el-table-column prop="claimStatus" label="理赔状态"></el-table-column>
              <el-table-column prop="totalPrice" label="商品总价"></el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="refund">退款</el-button>
        <el-button size="small" type="primary" @click="closeDetail">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 主页面 -->
    <MainComponent
        :forms="forms"
        :columns="columns"
        ref="pkMain"
        :handleQueryParams="doSomething"
        url="/order/getOrderList"
    >  <!--:isShowExpand="true"-->
      <template slot="dispose">
        <el-button size="mini" @click.native="showDetail" type="info">查看</el-button>
        <el-button size="mini" @click.native="refund" type="warning">退款</el-button>
        <el-button size="mini" @click.native="cancelOrder" type="warning">取消订单</el-button>
      </template>
    </MainComponent>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
