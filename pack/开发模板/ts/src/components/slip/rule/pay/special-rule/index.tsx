/**
 * Created by slipkinem on 4/26/2018 at 2:38 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../../ext-nb'
import AreaCascader from '../../../../area-cascader'
import { SpecialDutyModel } from '../../../model/SpecialDutyModel'
import { getInsuSpecialSet } from '../../../service'
import { RuleEnum } from '../../../../../enum/Rule'
import { Prop, Watch } from 'vue-property-decorator'
import { DirectPayModel } from '../../../model/DirectPayModel'
import TableColumn from '../../../../main/model/Table'
import MainComponent from '../../../../main'
import { SpecialTypeEnum } from '../../../../../enum/SpecialType'
import QueryForm from '../../../../main/model/Form'
import { SpecialRule } from '../../../model/SpecialRule'
import Goods from '../../../../../view/merchant/goodsManager/model/goods'
import Merchant from '../../../../../view/merchant/merchantManager/model/Merchant'
import _ from 'lodash'
import { OptionItem } from '../../../../../shared/util/model/OptionItem'
import { ShopModel } from '../../../../../view/merchant/merchantManager/model/Shop'
import { getShopTypes, getSpecialSetLimitType } from '../../../../../shared/util/service'

@Component({
  components: {
    MainComponent
  }
})
class DirectPaySpecialRule extends Vue {
  $refs: {
    previewMainComponent: MainComponent
  }

  @Prop({
    default: () => new DirectPayModel()
  })
  private directPay: DirectPayModel

  private showSpecialType = 'preview'

  private specialTabActive = SpecialTypeEnum.Goods

  private shopTypeRuleList: SpecialRule[] = []
  private areaRules: SpecialRule[] = []
  private merchantRuleList: SpecialRule[] = []
  private goodsRuleList: SpecialRule[] = []
  private shopRuleList: SpecialRule[] = []
  private shopData: OptionItem[] = []
  private specialSetLimitType: OptionItem[] = []

  private previewColumns: TableColumn[] = [
    {
      label: '限定说明',
      prop: 'mark'
    },
    {
      label: '限定关系',
      prop: 'limitType'
    }
  ]

  private goodsForms: QueryForm[] = [
    {
      label: '商品限定',
      prop: 'name'
    },
    {
      label: '商品编码',
      prop: 'name'
    }
  ]
  private goodsColumns: TableColumn[] = [
    {
      prop: 'merchantType',
      label: '商品类型'
    },
    {
      prop: 'code',
      label: '商品编码'
    }
  ]

  private shopForms: QueryForm[] = [
    {
      label: '门店名称',
      prop: 'shopName'
    },
    {
      label: '商户名称',
      prop: 'merchantName'
    }
  ]
  private shopColumns: TableColumn[] = [
    {
      prop: 'name',
      label: '门店名称'
    },
    {
      prop: 'merchantName',
      label: '商户名称'
    }
  ]

  private merchantForms: QueryForm[] = [
    {
      label: '商户名称',
      prop: 'merchantName'
    },
    {
      label: '商户编码',
      prop: 'merchantCode'
    }
  ]

  private merchantColumns: TableColumn[] = [
    {
      prop: 'name',
      label: '商户名称'
    },
    {
      prop: 'code',
      label: '商户编码'
    }
  ]

  async created () {
    await this.init()
  }

  async init () {
    this.specialSetLimitType = await getSpecialSetLimitType()
    this.shopData = await getShopTypes()
    this.shopTypeRuleList = []
    this.areaRules = []
    this.merchantRuleList = []
    this.goodsRuleList = []
    this.shopRuleList = []
    this.addSpecialAreaRule()
  }

  /**
   * 返回预览
   */
  goPreview () {
    this.showSpecialType = 'preview'
  }

  showDetail () {
    this.showSpecialType = 'detail'
  }

  @Watch('showSpecialType')
  async onSpecialTypeChange (val: string) {
    let { dutyId } = this.directPay.special.specialSetting

    if (val === 'preview' && dutyId) {
      this.directPay.specialRuleList = await getInsuSpecialSet(RuleEnum.DirectPay, dutyId)
      console.log(this.directPay.specialRuleList)
      this.directPay.special = new SpecialDutyModel()
      // this.init()
    }
  }

  /**
   * 最后提交时候调用，获取最终的list
   * @returns {SpecialRule[]}
   */
  get specialRules () {
    let areaRules = _.cloneDeep(this.areaRules)
    // 根据后台将area字段变为 省市区以 ","分割的字符串
    areaRules = areaRules.map(area => {
      if (_.isArray(area.district)) {
        area.area = area.district.toString()
      }
      delete area.district
      return area
    })
    return areaRules
        .concat(this.shopTypeRuleList)
        .concat(this.goodsRuleList)
        .concat(this.shopRuleList)
        .concat(this.merchantRuleList)
  }

  /**
   * 商品限定
   * @param {Goods[]} goods
   */
  handleGoodsChange (goods: Goods[]) {
    let specialRule = new SpecialRule()
    this.shopTypeRuleList = goods.map(good => {
      specialRule = new SpecialRule()
      specialRule.specialRuleType = SpecialTypeEnum.Goods
      specialRule.typeTableId = good.id
      return specialRule
    })
    console.log(this.specialRules)
  }

  /**
   * 商户限定
   * @param {Goods[]} merchants
   */
  handleMerchantChange (merchants: Merchant[]) {
    let specialRule = new SpecialRule()
    this.merchantRuleList = merchants.map(merchant => {
      specialRule = new SpecialRule()
      specialRule.specialRuleType = SpecialTypeEnum.Merchant
      specialRule.typeTableId = merchant.id
      return specialRule
    })
    console.log(this.specialRules)
  }

  // 添加区域
  addSpecialAreaRule () {
    this.areaRules.push({
      specialRuleType: SpecialTypeEnum.Area,
      district: []
    })
  }

  /**
   * 去掉区域
   * @param {number} key
   */
  removeSpecialAreaRule (key: number) {
    this.areaRules.splice(key, 1)
  }

  /**
   * 选择门店类型
   * @param {OptionItem[]} val
   */
  handleShopTypeChange (val: OptionItem[]) {
    let specialRule = new SpecialRule()
    this.shopTypeRuleList = val.map(option => {
      specialRule = new SpecialRule()
      specialRule.specialRuleType = SpecialTypeEnum.ShopType
      specialRule.typeTableId = option.id
      return specialRule
    })
    console.log(this.specialRules)
  }

  /**
   * 商户限定
   * @param {Goods[]} shops
   */
  handleShopChange (shops: ShopModel[]) {
    let specialRule = new SpecialRule()
    this.merchantRuleList = shops.map(shop => {
      specialRule = new SpecialRule()
      specialRule.specialRuleType = SpecialTypeEnum.Shop
      specialRule.typeTableId = shop.id
      return specialRule
    })
    console.log(this.specialRules)
  }

  render () {
    return (
        // <!-- 限定预览 -->
        <div>
          <div v-show={this.showSpecialType === 'preview'}>
            <MainComponent
                onCreate={this.showDetail}
                onUpdate={this.showDetail}
                onDelete={this.showDetail}
                ref='previewMainComponent'
                data={this.directPay.specialRuleList}
                columns={this.previewColumns}
                showPagination={false}
            >
            </MainComponent>
          </div>
          {/* 限定详情 */}
          <div v-show={this.showSpecialType === 'detail'}>
            <el-button-group>
              <el-button size='mini' onClick={this.goPreview}>返回</el-button>
            </el-button-group>
            <el-tabs v-model={this.specialTabActive}>
              <el-tab-pane label='商品限定'
                           name={String(SpecialTypeEnum.Goods)}>
                <MainComponent
                    forms={this.goodsForms}
                    columns={this.goodsColumns}
                    url='/merchant/getGoodsList'
                    multiSelect={true}
                    selectionChange={this.handleGoodsChange}
                    size='mini'
                >
                  <span slot='dispose'/>
                </MainComponent>
              </el-tab-pane>

              <el-tab-pane label='商户限定' name={String(SpecialTypeEnum.Merchant)}>
                <MainComponent
                    forms={this.merchantForms}
                    columns={this.merchantColumns}
                    multiSelect={true}
                    selectionChange={this.handleMerchantChange}
                    url='/merchant/getMerchantList'
                    size='mini'
                >
                  <span slot='dispose'/>
                </MainComponent>
              </el-tab-pane>

              <el-tab-pane label='地区' name={String(SpecialTypeEnum.Area)}>
                <el-form size='small'>
                  {
                    this.areaRules.map((rule, key) =>
                        <el-form-item label='省/市/区' key={key}>
                          <AreaCascader style='min-width: 500px'
                                        value={rule.district}
                                        onInput={(value: number[]) => rule.district = value}/>
                          {
                            key === 0 ?
                                <el-button onClick={this.addSpecialAreaRule}>添加</el-button> :
                                <el-button
                                    type='warning'
                                    onClick={() => this.removeSpecialAreaRule(key)}>删除
                                </el-button>
                          }
                        </el-form-item>)
                  }
                </el-form>
              </el-tab-pane>

              <el-tab-pane label='门店' name={String(SpecialTypeEnum.Shop)}>
                <MainComponent
                    style='width: 100%'
                    forms={this.shopForms}
                    columns={this.shopColumns}
                    url='/merchant/getShopList'
                    selectionChange={this.handleShopChange}
                    multiSelect={true}
                    size='mini'
                >
                  <span slot='dispose'/>
                </MainComponent>
              </el-tab-pane>

              <el-tab-pane label='门店类型' name={String(SpecialTypeEnum.ShopType)}>
                <el-table
                    stripe
                    data={this.shopData}
                    border
                    size='mini'
                    onSelection-change={this.handleShopTypeChange}
                    highlight-current-row>
                  <el-table-column type='selection' width='55'/>
                  <el-table-column prop='displayValue' label='门店类型'/>
                </el-table>
              </el-tab-pane>
            </el-tabs>

            <h5 class='h5'>限定设置</h5>
            <el-form size='mini' label-width='140px'>
              <el-row>
                <el-col
                    span={12}>
                  <el-form-item label='限定关系'>
                    <el-select
                        value={this.directPay.special.specialSetting.limitType}
                        placeholder='请选择'
                        v-model={this.directPay.special.specialSetting.limitType}>
                      {
                        this.specialSetLimitType.map(type =>
                            <el-option
                                key={type.id}
                                value={Number(type.value)}
                                label={type.displayValue}/>)
                      }
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col span={12}>
                  <el-form-item label='限定说明'>
                    <el-input type='textarea' v-model={this.directPay.special.specialSetting.mark}/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
    )
  }
}

export default DirectPaySpecialRule
