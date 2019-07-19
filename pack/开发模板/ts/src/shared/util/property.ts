/**
 * Created by slipkinem on 12/4/2017 at 4:10 PM.
 */
interface Number {
  noRoundToFixed (fractionalDigits: number): string
}

Number.prototype.noRoundToFixed = function (fractionalDigits: number): string {
  let temp = parseFloat(String(this)).toFixed(fractionalDigits + 1)
  return temp.substring(0, temp.length - 1)
}
