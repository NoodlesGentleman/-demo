/**
 * Created by slipkinem on 3/30/2018 at 9:47 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { SpecialSetting } from './SpecialSetting'
import { SpecialRule } from './SpecialRule'


export class SpecialDutyModel {
  specialRule: SpecialRule[] = []
  specialSetting: SpecialSetting = new SpecialSetting()
}
