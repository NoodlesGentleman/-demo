/**
 * Created by slipkinem on 9/19/2017 at 2:19 PM.
 */
export const objectInArrayIndex = function (list: any[], o: any, sym: string): number {
  for (let i = 0; i < list.length; i++) {
    if (list[i][sym] === o[sym]) {
      return i
    }
  }
  return -1
}

export function includesSym (list: any[], o: any, sym: string): boolean {
  return objectInArrayIndex(list, o, sym) !== -1
}
