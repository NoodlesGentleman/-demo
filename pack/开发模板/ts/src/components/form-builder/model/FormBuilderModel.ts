import { RequestMethod } from '../../../enum/RequestMethod'
import { CreateElement } from 'vue'
import { Validate } from '../../../enum/Validate'

/**
 * Created by slipkinem on 4/13/2018 at 4:54 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export class TypeaheadProp {
  value?: string // 如果没有value，则value默认为当前的row
  label: string
  query: string

  constructor (typeaheadProp: TypeaheadProp) {
    this.value = typeaheadProp.value
    this.label = typeaheadProp.label
    this.query = typeaheadProp.query
  }
}

export class FormBuilderModel {
  labelWidth?: string // form 名字的宽度
  typeaheadProp?: TypeaheadProp // 查询框的属性配置
  method?: RequestMethod = RequestMethod.GET // 查询框的方法
  selectChange?: (val: any, row?: any) => void // 输入框选中的时候触发，一般用于查出来数据后反填给其他表单
  disabled?: boolean // 是否禁用
  render?: (h: CreateElement, ...args: any[]) => JSX.Element // 接受将本条form-item用render函数替换掉
  span?: number // 本条item的宽度
  validator?: [Validate] | [Validate, Function | Object] // 输入框的校验，使用tuple类型是为了看起来好看
  inputAppend?: string
}
