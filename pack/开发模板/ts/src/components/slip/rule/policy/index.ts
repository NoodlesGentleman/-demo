/**
 * Created by slipkinem on 3/23/2018 at 1:47 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../../../ext-nb'
import { Prop, Watch } from 'vue-property-decorator'
import { SlipPolicy } from '../../model/SlipPolicy'
import { OptionItem } from '../../../../shared/util/model/OptionItem'
import {
  getDiseaseType,
  getHospitalGrade,
  getHospitalLevel,
  getHospitalNatureA,
  getHospitalNatureB
} from '../../../../shared/util/service'
import { Getter } from 'vuex-class'

@Component
export default class PolicyRule extends Vue {
  tabActive = 'first'

  @Prop({
    default: () => new SlipPolicy()
  })
  policy: SlipPolicy

  hospitalLevel: OptionItem[] = []
  hospitalGrade: OptionItem[] = []
  hospitalNatureA: OptionItem[] = []
  hospitalNatureB: OptionItem[] = []
  diseaseType: OptionItem[] = []

  @Getter slipDisabledGetters: boolean

  @Watch('policy.slipId')
  onSlipIdChange (val: number) {
    console.log(val)
  }

  async created () {
    this.hospitalLevel = await getHospitalLevel()
    this.hospitalGrade = await getHospitalGrade()
    this.hospitalNatureA = await getHospitalNatureA()
    this.hospitalNatureB = await getHospitalNatureB()
    this.diseaseType = await getDiseaseType()
  }

}
