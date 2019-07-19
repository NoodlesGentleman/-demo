/**
 * Created by slipkinem on 3/30/2018 at 9:43 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { InsuExceptDuty } from './InsuExceptDuty'

export class SlipPolicy {
  slipId: number | string = ''
  slipCode: string = ''
  exceptDuty: InsuExceptDuty = new InsuExceptDuty()
}
