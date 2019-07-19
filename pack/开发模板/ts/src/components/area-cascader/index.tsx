/**
 * Created by slipkinem on 3/29/2018 at 2:41 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../ext-nb'
import { Area, AreaItem, AreaMapping } from './model'
import { Prop } from 'vue-property-decorator'
import { getArea, getCity, getProvince } from './service'
import _ from 'lodash'
import { error } from '../../shared/util/logger'

@Component
export default class AreaCascader extends Vue {
  // 省市区列表
  options: Area[] = []

  @Prop({
    default: () => [],
    required: true
  })
  value: number[]

  /**
   * @description 省市区下拉框的个数
   */
  @Prop({
    default: 3
  })
  length: number

  @Prop({
    default: false
  })
  disabled: boolean

  /**
   * @description 联动类型,默认是单输入框三级联动，select为三输入框
   */
  @Prop({
    default: 'cascader'
  })
  type: 'cascader' | 'select'

  isInit = false

  /**
   * @description 省市区三输入框当前的列表
   * @type AreaItem
   */
  area: AreaItem = {
    0: [],
    1: [],
    2: []
  }

  /**
   * @description area的key映射，就是为了可读性好一点而已
   * @see area
   * @type AreaMapping
   */
  areaMapping: AreaMapping = {
    province: 0,
    city: 1,
    distinct: 2
  }

  /**
   * @description 由于进行数据拦截来进行省市区的改变，所以一定要保持传入value的响应式
   * @see value
   * @returns {number[]}
   */
  get casValue () {
    // 必须等到初始化省份列表获取完毕
    let value = this.value
    if (this.isInit) {
      if (value.length <= 1) {
        this.area[this.areaMapping.city] = []
        this.area[this.areaMapping.distinct] = []
      } else if (value.length === 2) {
        this.area[this.areaMapping.distinct] = []
      }
      this.handleValueChange(value).then(_.noop)
    }
    return value
  }

  set casValue (val: number[]) {
    this.$emit('input', val)
    this.$emit('input', val)
  }

  async created () {
    await this.init()
  }

  /**
   * @description 初始化省份列表
   * @returns {Promise<void>}
   */
  async init () {
    const res = await getProvince()
    this.options = res.map(province => {
      this.$set(province, 'children', [])
      return province
    })
    this.area[this.areaMapping.province] = this.options
    await this.handleValueChange(this.value)
    this.isInit = true
  }

  /**
   * 省份ID改变
   * @param {number} provinceId
   * @returns {Promise<void>}
   */
  async provinceChange ([provinceId]: number[]) {
    if (!provinceId) return
    let provinceIndex = _.findIndex(this.options, (o) => o.id === provinceId)
    let citys = this.options[provinceIndex].children

    if (citys.length <= 0) {
      citys = await getCity(provinceId)
      citys = citys.map(city => {
        this.$set(city, 'children', [])
        return city
      })
    }
    this.options[provinceIndex].children = this.area[this.areaMapping.city] = citys
  }

  /**
   * 市ID改变
   * @param {number} provinceId
   * @param {number} cityId
   * @returns {Promise<void>}
   */
  async cityChange ([provinceId, cityId]: number[]) {
    if (!cityId) return
    let provinceIndex: number = -1
    let cityIndex: number = -1

    try {
      let provinceIndex = _.findIndex(this.options, (o) => o.id === provinceId)
      let cityIndex = _.findIndex(this.options[provinceIndex].children, (o) => o.id === cityId)
      let areas = this.options[provinceIndex].children[cityIndex].children

      if (areas.length <= 0) {
        areas = await getArea(cityId)
      }
      this.options[provinceIndex].children[cityIndex].children = this.area[this.areaMapping.distinct] = areas
    } catch (e) {
      error(e.message + ` provinceId:${provinceId}-cityId:${cityId}-provinceIndex:${provinceIndex}-cityIndex:${cityIndex}`)
    }
  }

  /**
   * 解决初始化双向绑定问题
   * @param {number[]} val
   * @returns {Promise<void>}
   */
  async handleValueChange (val: number[]) {
    console.log(val, 'handleValueChange')
    // 只有省
    if (val.length === 1) {
      await this.provinceChange(this.value)
    } else if (val.length >= 2) {
      await this.provinceChange(this.value)
      await this.cityChange(this.value)
    }
  }

  render () {
    /**
     * @description 为了加强抽象化，将每个select对应的change方法提取出来
     * @type {(((val: number) => number[]) | ((val: number) => (number[] & number[])))[]}
     */
    let onChangeMap = [
      (val: number) => this.casValue = [val],
      (val: number) => this.casValue = [this.casValue[0], val],
      (val: number) => this.casValue = Object.assign([0, 0, val], this.casValue)
    ]
    return (
        this.type === 'cascader' ?
            <el-cascader
                v-model={this.casValue}
                filterable
                ref='cascader'
                disabled={this.disabled}
                clearable
                props={{ value: 'id', label: 'name' }}
                placeholder='请选择'
                options={this.options}
                change-on-select={true}
            /> :
            <div className={'AreaSelect'}>
              {
                _.range(this.length).map(index =>
                    <el-select
                        v-model={this.casValue[index]}
                        filterable
                        clearable
                        disabled={this.disabled}
                        onChange={onChangeMap[index]}>
                      {
                        this.area[index].map(v => <el-option value={v.id} label={v.name} key={v.id}/>)
                      }
                    </el-select>)
              }
            </div>
    )
  }
}
