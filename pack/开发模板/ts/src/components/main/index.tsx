/**
 * Created by slipkinem on 3/2/2018 at 2:35 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component } from '../../ext-nb'
import { Prop, Watch } from 'vue-property-decorator'
import QueryForm, { Params } from './model/Form'
import _ from 'lodash'
import { assert, error } from '../../shared/util/logger'
import ExpandData from './model/ExpandData'
import TableColumn from './model/Table'
import { FilterMixin } from '../../shared/mixin/filter'
import { displaySuffix } from '../../constant'
import { DatePickerOptions, ElDatePicker } from 'element-ui/types/date-picker'
import AreaCascader from '../area-cascader'
import { returnNoop } from '../../model/returnNoop'
import PkTypeahead from '../typeahead'
import { isPromise } from '../../shared/util'
import { ElementUIComponentSize } from 'element-ui/types/component'
import EditForm from '../form-builder/EditForm'

@Component({
  components: {
    AreaCascader,
    PkTypeahead
  }
})
export default class MainComponent extends FilterMixin {
  // 生成表格的配置
  @Prop({
    default: () => []
  })
  private columns: TableColumn[]

  @Prop({
    default: true
  })
  private initialize: boolean

  // 生成Form表单的Prop
  @Prop({
    default: () => []
  })
  private forms: QueryForm[]

  /**
   * 处理返回值的HOOK
   * @example
   * ```javascript
   *  <MainComponent :handleResponseData="doSomething"></MainComponent>
   *  // 目标组件
   *  doSomething (data: SomeData) { return data || Promise.resolve(data) }
   * ```
   * @description 此函数的值可以为Promise
   */
  @Prop({
    default: returnNoop
  })
  private handleResponseData: <T>(data: T) => T

  @Prop({
    default: _.noop
  })
  private spanMethod: <T>(data: T) => T

  /**
   * 处理params的HOOK
   * @example
   *  ```javascript
   *    <MainComponent :handleQueryParams="doSomething"></MainComponent>
   *    // 目标组件
   *    doSomething (params: Params) { return params }
   *  ```
   * @description 这个函数必须要有返回值
   */
  @Prop({
    default: returnNoop
  })
  private handleQueryParams: <T>(data: T) => T

  // 后台接口的URL
  @Prop()
  private url: string

  // 是否有层级，先不考虑多层级的情况
  @Prop({
    default: false
  })
  private isShowExpand: boolean

  @Prop({
    default: (): DatePickerOptions => ({
      shortcuts: [{
        text: '今天',
        onClick (picker: ElDatePicker) {
          picker.$emit('pick', new Date())
        }
      }, {
        text: '昨天',
        onClick (picker: ElDatePicker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      }, {
        text: '一周前',
        onClick (picker: ElDatePicker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }]
    })
  })
  private dateOptions: DatePickerOptions

  @Prop({
    default: false
  })
  private multiSelect: boolean

  @Prop()
  private selectable: <T>(row: T, index: number) => boolean

  @Prop({
    default: 'normal'
  })
  private size: ElementUIComponentSize

  // 返回的data
  @Prop({
    default: () => []
  })
  private data: ExpandData[]

  private tableData: ExpandData[] = []

  @Prop({
    default: true
  })
  private showPagination: boolean

  /**
   * 查询参数
   * @type Params
   */
  private params: Params = Object.create(null)

  private total: number = 0
  // 当前选中行，暂未考虑多选情况
  private currentRow: any

  // 多选
  private selectionRows: any[]

  private _columns: TableColumn[] = []

  private suffixReg = new RegExp(`${displaySuffix}$`)

  private _forms: QueryForm[] = []

  @Watch('data')
  onDataChange (val: ExpandData[]) {
    this.tableData = _.cloneDeep(val)
  }

  async created () {
    if (this.showPagination) {
      this.params = {
        pageSize: 10,
        pageNum: 1
      }
    }

    this._columns = _.cloneDeep(this.columns)
    this._columns = this._columns.map(col => {
      if (_.isFunction(col.filter) || _.isString(col.filter)) {
        col.prop += displaySuffix
      }
      return col
    })
    if (this.forms.length === 0) return

    this._forms = this.forms.map((form) => {
      if (_.isUndefined(form.defaultOption)) {
        form.defaultOption = true
      }
      return form
    })
        .concat([{
          label: '',
          prop: '',
          render: this.genQueryBtn
        }])
  }

  genQueryBtn () {
    return (
        <el-form-item>
          <el-button type='primary' onClick={() => this.query()}>查询</el-button>
        </el-form-item>
    )
  }

  mounted () {
    if (this.initialize && this.url) {
      this.query()
    }
  }

  /**
   * 获取选择的行
   * @returns {T}
   */
  getSelectedRow<T> (): T {
    assert(!_.isEmpty(this.currentRow), '请先选择一行')
    return _.cloneDeep(this.currentRow)
  }

  getSelectedRows<T> (): T[] {
    assert(!_.isEmpty(this.selectionRows), '请选中')
    return _.cloneDeep(this.selectionRows)
  }

  genExpandTemp () {
    if (this.isShowExpand) {
      return (
          <el-table-column type='expand'>
            {
              (props: any) =>
                  <el-table
                      size='small'
                      tooltip-effect='dark'
                      highlight-current-row
                      onCurrent-change={this.handleCurrentRowChange}
                      stripe
                      border
                      data={props.row.details}
                      show-header={false}>
                    {
                      this._columns.map((column, key) =>
                          <el-table-column
                              show-overflow-tooltip
                              key={key}
                              prop={column.prop}
                              label={column.label}/>)
                    }
                  </el-table>
            }
          </el-table-column>
      )
    }
  }

  render () {
    let {
      _forms,
      create,
      update,
      remove,
      spanMethod,
      rowDblClick,
      handleCurrentRowChange,
      handleSelectionChange,
      tableData,
      selectable,
      multiSelect,
      size,
      _columns,
      showPagination,
      handleCurrentChange,
      handleSizeChange,
      total,
      genExpandTemp,
      params,
      url
    } = this

    return (
        <div class='main'>
          {
            this.$slots.default ||
            !_.isEmpty(_forms) &&
            <el-form
                inline={true}
                size='mini'>
              <EditForm formItems={_forms} model={params}/>
            </el-form>
          }
          <div class='table-container'>
            {/* tab-bar */}
            <el-row type='flex' justify='start' class='tool-bar'>
              {
                this.$slots.dispose ||
                <el-button-group>
                  <el-button size='mini' onClick={create} type='info'>新增</el-button>
                  <el-button size='mini' onClick={update} type='warning'>修改</el-button>
                  <el-button size='mini' onClick={remove} type='danger'>删除</el-button>
                </el-button-group>
              }
            </el-row>
            {
              /* table */
              this.$slots.table ||
              <el-table
                  span-method={spanMethod}
                  highlight-current-row
                  onRow-dblclick={rowDblClick}
                  ref='table'
                  stripe
                  onCurrent-change={handleCurrentRowChange}
                  onSelection-change={handleSelectionChange}
                  tooltip-effect='dark'
                  max-height='450'
                  size={size}
                  data={tableData}
                  border
                  style='width: 100%'>
                {
                  multiSelect &&
                  <el-table-column
                      type='selection'
                      selectable={selectable}
                      width='55'>
                  </el-table-column>
                }
                {
                  // 子级
                  genExpandTemp()
                }
                {
                  _columns.map((column, key) =>
                      _.isFunction(column.render) ?
                          <el-table-column
                              key={key}
                              label={column.label}>
                            {
                              (scope: { row: object }) => column.render && column.render(scope.row)
                            }
                          </el-table-column> :
                          <el-table-column
                              show-overflow-tooltip
                              key={key}
                              prop={column.prop}
                              label={column.label}/>
                  )

                }
              </el-table>
            }
            {
              showPagination && url &&
              <el-pagination
                  current-page$sync={params.pageNum}
                  onSize-change={handleSizeChange}
                  onCurrent-change={handleCurrentChange}
                  background
                  page-sizes={[10, 20, 40, 100, 150, 200]}
                  page-size={10}
                  layout='total, sizes, prev, pager, next, jumper'
                  total={total}/>
            }
          </div>
        </div>
    )
  }

  /**
   * 查询数据
   * @returns {Promise<ExpandData[]>}
   */
  async query<T> (param = Object.create(null)): Promise<Array<T | ExpandData | any>> {
    // 当点查询的时候重置pageNum
    this.params.pageNum = param.pageNum || 1
    // 处理参数HOOK
    let params = Object.assign(param, this.handleQueryParams(this.params))
    const res = await this.$http.postParamsClick(this.url, params)
    this.total = res.total
    // 处理返回数据HOOK
    let data = this.handleResponseData<ExpandData[]>(_.isUndefined(res.rows) ? _.isArray(res) ? res : [] : res.rows)
    data = isPromise(data) ? await data : data
    let filterValue: string | Promise<string> = ''
    // 处理filter
    data.forEach((row: any) => {
      this._columns.forEach(async (column, index) => {
        if (_.isFunction(column.filter) || _.isString(column.filter)) {
          let prop = this.columns[index].prop
          if (column.prop && prop) {
            try {
              filterValue =
                  _.isString(column.filter) ?
                      this[column.filter](row[prop], row) :
                      _.isFunction(column.filter) ?
                          column.filter(row[prop], row) : ''
            } catch (e) {
              filterValue = ''
              error(e)
            }
            filterValue = isPromise(filterValue) ? await filterValue : filterValue
            this.$set(row, column.prop, filterValue || '未知')
          }
        }
      })
    })
    this.tableData = data
    let _data = _.cloneDeep(data)
    this.$emit('update:data', _data)
    return _data
  }

  /**
   * 删除HOOK
   * @example <MainComponent @remove="doSometing"></MainComponent>
   */
  private remove () {
    this.getSelectedRow()
    this.$emit('remove', this.currentRow)
  }

  /**
   * 更新HOOK
   * @example <MainComponent @update="doSomething"></MainComponent>
   */
  private update () {
    this.getSelectedRow()
    this.$emit('update', this.currentRow)
  }

  /**
   * 新增HOOK
   * @example <MainComponent @created="doSomething"><MainComponent>
   */
  private create () {
    this.$emit('create')
  }

  /**
   * 数量改变
   * @param {number} pageSize
   */
  private handleSizeChange (pageSize: number) {
    this.params.pageSize = pageSize
    this.query({ pageSize, pageNum: this.params.pageNum })
  }

  /**
   * 当前页数改变
   * @param {number} pageNum
   */
  private handleCurrentChange (pageNum: number) {
    this.params.pageNum = pageNum
    this.query({ pageNum, pageSize: this.params.pageSize })
  }

  /**
   * 选中的row
   * @param row
   */
  private handleCurrentRowChange (row: any) {
    this.currentRow = Object.create(null)
    Object.keys(row || {})
        .filter(key => !this.suffixReg.test(key))
        .forEach(key => this.currentRow[key] = row[key])
    this.$emit('handleCurrentRowChange', _.cloneDeep(this.currentRow))
  }

  private handleSelectionChange (row: any[]) {
    let current = Object.create(null)
    this.selectionRows = row.map((value: any) => {
      Object.keys(value || {})
          .filter(key => !this.suffixReg.test(key))
          .forEach(key => current[key] = value[key])
      return current
    })
    this.$emit('selectionChange', _.cloneDeep(this.selectionRows))
  }

  /**
   * 双击
   * @param row
   */
  private rowDblClick (row: any) {
    console.log(this)
  }
}
