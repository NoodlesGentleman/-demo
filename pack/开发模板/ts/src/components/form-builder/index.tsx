/**
 * Created by slipkinem on 4/8/2018 at 6:21 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../ext-nb'
import { Prop } from 'vue-property-decorator'
import PkTypeahead from '../typeahead/index'
import _ from 'lodash'
import QueryForm from '../main/model/Form'
import { ElForm } from 'element-ui/types/form'
import { ElementUIComponentSize } from 'element-ui/types/component'
import { Validate } from '../../enum/Validate'
import { genPriceValidator } from '../../shared/util/price'
import EditForm from './EditForm'

@Component({
  components: {
    PkTypeahead
  }
})
export default class FormBuilder extends Vue {
  $refs: {
    form: ElForm
  }

  @Prop({
    default: () => []
  })
  private forms: QueryForm[][]

  @Prop({
    default: () => Object.create(null)
  })
  private model: object

  @Prop({
    default: 'small'
  })
  private size: ElementUIComponentSize

  @Prop({
    default: '110px'
  })
  private labelWidth: string

  @Prop({
    default: false
  })
  private disabled: boolean

  get rules () {
    return [].concat.apply([], this.forms)
        .filter((form: QueryForm) => form.validator)
        .reduce(this.normalizeRule, Object.create(null))
  }

  normalizeRule (rule: any, form: QueryForm) {
    if (!form.prop) return
    // TODO: 处理的有点繁琐，待重构
    if (!form.validator) return {}
    let _rule: any[] = rule[form.prop] = [
      {
        required: true,
        message: `${form.label} 不能为空`,
        trigger: 'blur'
      }
    ]

    if (_.includes(form.validator, Validate.Number)) {
      _rule[0].message = `${form.label} 必须是数字格式`
      _rule[0].type = 'number'
    } else if (_.includes(form.validator, Validate.Date)) {
      _rule[0].message = `${form.label} 必须是日期格式`
      _rule[0].type = 'date'
    } else if (_.includes(form.validator, Validate.Array)) {
      _rule[0].message = `请至少选择一个 ${form.label}`
      _rule[0].type = 'array'
    } else if (_.includes(form.validator, Validate.Price)) {
      _rule[0] = { required: true, validator: genPriceValidator(form.label), trigger: 'blur' }
    }

    let config = form.validator[form.validator.length - 1]

    if (_.isFunction(config)) {
      _rule[1] = { required: true, validator: config(form.label), trigger: 'blur' }
    } else if (_.isPlainObject(config)) {
      _rule[1] = config
    }

    return rule
  }

  /**
   * 校验函数
   */
  validate () {
    return this.$refs.form.validate()
  }

  render () {
    let { model, forms, disabled } = this
    return (
        <div class='form-builder'>
          <el-form size={this.size}
                   ref='form'
                   rules={this.rules}
                   label-width={this.labelWidth}
                   disabled={disabled}
                   model={model}>
            {
              forms.map((row, key) => <EditForm formItems={row} key={key} model={model}/>)
            }
          </el-form>
        </div>
    )
  }
}
