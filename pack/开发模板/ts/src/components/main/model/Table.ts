import { FilterMixin } from '../../../shared/mixin/filter'

/**
 * Created by slipkinem on 3/7/2018 at 5:00 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export default class TableColumn<T = any> {
  prop?: keyof T
  label: string
  filter?: keyof FilterMixin | ((payload: any, row?: any) => string | Promise<string>)
  render?: (...args: any[]) => JSX.Element
}
