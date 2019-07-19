setTimeout(() => {
  (async function (window, wx) {
    var USERMSG = {}
    if (window.wx) {
      try {
        await wx.getNetworkType({
          success: function (res) {
            USERMSG.networkType = res.networkType ? res.networkType : ''
          }
        })
        await wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            USERMSG.userLocation = res.latitude ? `${res.latitude}|${res.longitude}` : ''
          }
        })
      } catch (error) {
        USERMSG.networkType = ''
        USERMSG.userLocation = ''
      }
    }
    USERMSG.userAgent = navigator && navigator.userAgent
    window.USERMSG = USERMSG
  })(window, window.wx)
}, 1000)