/**
 * Created by slipkinem on 4/26/2018 at 10:52 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import FormBuilder from '../../../../components/form-builder'
import Customer from '../model/Customer'
import { Prop } from 'vue-property-decorator'
import QueryForm from '../../../../components/main/model/Form'
import { getCertificateTypes, getGenders } from '../../../../shared/util/service'

@Component({
  components: {
    FormBuilder
  }
})
class CustomerForm extends Vue {
  @Prop({
    default: () => new Customer()
  })
  customerForm: Customer

  @Prop({
    default: 'edit'
  })
  operationType: string

  private forms: QueryForm[][] = [
    [
      {
        label: '客户姓名',
        prop: 'username'
      },
      {
        label: '联系方式',
        prop: 'mobile'
      }
    ],
    [
      {
        label: '证件类型',
        prop: 'certificateType',
        type: 'select',
        options: getCertificateTypes()
      },
      {
        label: '证件号',
        prop: 'certificate'
      }
    ],
    [
      {
        label: '性别',
        prop: 'gender',
        type: 'select',
        options: getGenders()
      },
      {
        label: '邮箱',
        prop: 'email'
      }
    ],
    [
      {
        label: '开户行',
        prop: 'accountBank'
      },
      {
        label: '开户账号',
        prop: 'accountNum'
      }
    ],
    [
      {
        label: '备注信息',
        prop: 'comment'
      }
    ]
  ]

  render () {
    return (
        <div className={'CustomerForm'}>
          <FormBuilder disabled={this.operationType !== 'edit'} forms={this.forms} model={this.customerForm}/>
        </div>
    )
  }
}

export default CustomerForm
