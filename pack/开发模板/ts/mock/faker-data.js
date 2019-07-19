/**
 * Created by slipkinem on 9/14/2017 at 1:26 PM.
 */
'use strict'
let faker = require('faker/locale/zh_CN')
let _ = require('lodash')

module.exports = function () {
  return {
    info: (function (n) {
      return {
        id: 2,
        name: faker.name.findName(),
        lastTime: +new Date(),
        avatar: faker.internet.avatar()
      }
    })(),
    people: _.times(100, function (n) {
      return {
        id: n,
        name: faker.name.findName(),
        avatar: faker.internet.avatar()
      }
    }),
    address: _.times(100, function (n) {
      return {
        id: n,
        city: faker.address.city(),
        county: faker.address.county()
      }
    })
  }
}
