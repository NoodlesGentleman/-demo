/**
 * Created by slipkinem on 5/17/2018 at 3:41 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../ext-nb'
import { TypeaheadProp } from './model/FormBuilderModel'
import _ from 'lodash'
import { Prop } from 'vue-property-decorator'
import QueryForm from '../main/model/Form'
import PkTypeahead from '../typeahead'
import { DatePickerOptions } from 'element-ui/types/date-picker'
import { isPromise } from '../../shared/util'
import AreaCascader from '../area-cascader'
import { ElForm } from 'element-ui/types/form'
import { OptionItem } from '../../shared/util/model/OptionItem'

@Component
class EditForm extends Vue {
  $parent: ElForm

  @Prop({
    default: () => []
  })
  formItems: QueryForm[]

  @Prop({
    default: () => Object.create(null)
  })
  private model: any

  private dateOptions: DatePickerOptions = {
    shortcuts: [{
      text: '今天',
      onClick (picker) {
        picker.$emit('pick', new Date())
      }
    }, {
      text: '昨天',
      onClick (picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        picker.$emit('pick', date)
      }
    }, {
      text: '一周前',
      onClick (picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', date)
      }
    }]
  }

  private forms: QueryForm[] = []

  created () {
    this.forms = this.formItems.map(form => {
      if (form.type === 'select') {
        if (isPromise(form.options)) {
          form.options.then(res => {
            form.options = res

            if (form.defaultOption) {
              form.options.unshift(new OptionItem('全部', ''))
            }
          })
        }
      }

      // 看似没有意义，是将object => TypeaheadProp
      if (!_.isUndefined(form.typeaheadProp)) {
        form.typeaheadProp = new TypeaheadProp(form.typeaheadProp)
      }

      // 响应式
      if (form.prop && _.isUndefined(this.model[form.prop])) {
        this.$set(this.model, form.prop, form.value || (form.type === 'areaCascader' ? [] : ''))
      }

      return form
    })
  }

  genFormTemplates (form: QueryForm) {
    if (!form.prop) return
    let { model } = this

    let dateTemp =
        <el-date-picker
            v-model={model[form.prop]}
            placeholder={form.placeholder || form.label}
            picker-options={this.dateOptions}
            valueFormat='yyyy-MM-dd HH:mm:ss'
            type={form.type}
            align='right'/>

    return {
      input:
          <el-input
              placeholder={form.placeholder || form.label}
              v-model={model[form.prop]}>
            {
              form.inputAppend &&
              <span slot='append'>
                {form.inputAppend}
              </span>
            }
          </el-input>,
      date: dateTemp,
      datetime: dateTemp,
      select:
          <el-select
              ref='select'
              placeholder={form.placeholder || form.label}
              v-model={model[form.prop]}>
            {
              _.isArray(form.options) && form.options.map((option, optionKey) =>
                  <el-option
                      key={optionKey}
                      label={option.displayValue}
                      value={(() => {
                        // 将value是类似 '0' 转为 0
                        let value = option.value
                        if (_.isString(value)) {
                          return (value.length === 1 && !_.isNaN(Number(value))) ? Number(value) : value
                        }
                        return value
                      })()}/>)
            }
          </el-select>,
      typeahead:
          <PkTypeahead
              url={form.remoteUrl}
              v-model={model[form.prop]}
              placeholder={form.placeholder || form.label}
              selectChange={form.selectChange ? form.selectChange : () => null}
              prop={new TypeaheadProp(form.typeaheadProp || Object.create(null))}
              remoteFormatter={form.remoteFormatter}
              method={form.method}
          />,
      cascader:
          <el-cascader
              clearable
              v-model={model[form.prop]}
              props={{ label: 'displayValue' }}
              placeholder={form.placeholder || form.label}
              options={form.options}
              changeOnSelect
          />,
      areaCascader: <AreaCascader v-model={model[form.prop]}/>,
      textarea:
          <el-input
              type='textarea'
              placeholder={form.placeholder || form.label}
              v-model={model[form.prop]}/>
    }[form.type || 'input']
  }

  genFormItem (col: QueryForm) {
    let {
      $createElement,
      model
    } = this

    return _.isFunction(col.render) ?
        col.render($createElement, col, model) :
        <el-form-item
            prop={col.prop}
            label={col.label}
            label-width={col.labelWidth}>
          {
            this.genFormTemplates(col)
          }
        </el-form-item>
  }

  render () {
    let {
      forms,
      genFormItem
    } = this

    return this.$parent.inline ? (
        <div class='form-container'>
          {
            forms.map(item => this.genFormItem(item))
          }
        </div>
    ) : (
        <el-row>
          {
            forms.map((item, colKey) =>
                <el-col span={item.span || 24 / forms.length} key={colKey}>
                  {
                    genFormItem(item)
                  }
                </el-col>
            )
          }
        </el-row>
    )
  }
}

export default EditForm
