/**
 * Created by slipkinem on 5/18/2018 at 4:46 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export const soon = (() => {
  let fq: Function[] = []

  function callQueque () {
    while (fq.length) {
      fq[0]()
      fq.shift()
    }
  }

  let cqYield = (() => {
    if (typeof Promise !== 'undefined') {
      return () => Promise.resolve().then(callQueque)
    }
    // ie11
    if (typeof MutationObserver !== 'undefined') {
      let dd = document.createElement('div')
      let mo = new MutationObserver(callQueque)

      mo.observe(dd, {
        attributes: true
      })
      return function () {
        dd.setAttribute('a', '0')
      }
    }
    // ie10
    if (typeof setImmediate !== 'undefined') {
      return () => setImmediate(callQueque)
    }
    // fallback
    return () => setTimeout(callQueque, 0)
  })()

  return (fn: Function) => {
    fq.push(fn)

    if (fq.length === 1) {
      cqYield()
    }
  }
})()
