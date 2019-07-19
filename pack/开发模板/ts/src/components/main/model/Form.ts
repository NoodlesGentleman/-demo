/**
 * Created by slipkinem on 3/5/2018 at 10:35 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import Page from '../../../model/Page'
import { OptionItem } from '../../../shared/util/model/OptionItem'
import { FormBuilderModel } from '../../form-builder/model/FormBuilderModel'

export class Option {
  value: number
  displayValue: string = ''
  children?: Option[]
}

export default class QueryForm<N = any, T = any[]> extends FormBuilderModel {
  label?: string // 表单label
  prop?: keyof N// 表单属性 v-model进行绑定的值
  placeholder?: string // 占位符
  type?: 'input' | 'select' | 'date' | 'datetime' | 'typeahead' | 'cascader' | 'areaCascader' | 'textarea' // 表单类型
  value?: number | string | number[] // 表单的值，number[]类型是 type=areaCascader专属
  options?: Array<Option | OptionItem> | Promise<Array<Option | OptionItem>> = [] // 当type是select的时候需要
  /**
   * typeahead返回值进行formate，对于重置修改默认字段的操作请手动配置
   * @see FormBuilderModel#typeaheadProp
   * @deprecated 1.0.2
   */
  remoteFormatter?: (data: T) => (Array<Option | OptionItem | any> | Promise<Array<Option | OptionItem | any>>)
  remoteUrl?: string // typeahead的url
  defaultOption?: boolean // select是否显示默认的全部选项
}

export interface Params extends Page {
  [key: string]: any
}
