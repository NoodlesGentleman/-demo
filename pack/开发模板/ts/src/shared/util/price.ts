/**
 * Created by slipkinem on 9/19/2017 at 1:49 PM.
 */

export class Price {
  static mul = Price.base((v1, v2) => ((v1 * 100) * (v2 * 100)) / 10000)
  static add = Price.base((v1, v2) => (v1 * 100 + v2 * 100) / 100)
  static sub = Price.base((v1, v2) => (v1 * 100 - v2 * 100) / 100)

  private static base (cb: (val1: number, val2: number) => number) {
    return (val1: number | string, val2: number | string) => {
      val1 = Number(val1)
      val2 = Number(val2)
      if (isNaN(val2) || isNaN(val1)) return '0'
      return cb(val1, val2).noRoundToFixed(2)
    }
  }
}

export const pricePattern = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

export const genPriceValidator = (prop?: string) => (rule: string, value: string, cb: (e?: Error) => void) => {
  console.log(value, pricePattern.test(value))
  if (!pricePattern.test(value)) {
    return cb(new Error(`${prop || ''}金额输入不正确`))
  } else {
    cb()
  }
}
