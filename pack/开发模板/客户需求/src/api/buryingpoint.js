import $api from './index'

export function addLog(currPageId, listPageId, btnId, nextPageId, userMsg) {
  const url = `/log/add`
  const data = {
    // 用户设备信息
    front_ua: userMsg.userAgent,
    // ip地址
    front_ip: window.returnCitySN['cip'],
    // 当前页面id
    curr_page_id: currPageId,
    // 列表id
    list_page_id: listPageId,
    // 按钮id
    btn_id: btnId,
    // 跳转下级页面id
    next_page_id: nextPageId,
    // 当前时间
    front_time: Date.now() + '',
    // 平台开发版本号
    platform_ver: '0.2.3',
    // 用户网络链接情况
    wifi_ssid: userMsg.networkType ? userMsg.networkType : ''
  }
  return $api.post(url, data)
}