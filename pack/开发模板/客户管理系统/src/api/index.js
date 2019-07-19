import fetch from './fetch'

export default {
  // 登录
  Login: para => fetch.POST('clientboard/login', para),
  // 获取侧边栏信息
  getSideMenu: () => fetch.GET('boardnew/getlablcount'),
  // 获取联系人数
  getContactCount: () => fetch.GET('boardnew/getContactCount'),
  // 获取表格数据
  getTableData: para => fetch.GET('boardnew/getboardnewtable', para),
  // 客户信息
  getClientInfo: phone => fetch.GET(`boardnew/getclientinfo/${phone}`),
  // 客户回访记录
  getTImeline: para => fetch.GET('boardnew/getcontact', para),
  // 修改客户信息
  modifyClientInfo: para => fetch.POST('boardnew/modifyclientinfo', para),
  // 修改客户评分等级
  modifyRate: para => fetch.FORM('boardnew/setscore', para),
  // 添加回访记录
  addContact: (phone, para) => fetch.GET(`boardnew/addcontact/${phone}`, para),
  // 删除任务
  deleteTask: para => fetch.POST('boardnew/deleteTemTask', para),
  // 升级店长
  setmanager: para => fetch.FORM('boardnew/setmanager', para),
  // 拨打电话
  call: phone => fetch.GET(`http://127.0.0.1:3366/callout?phone=${phone}&callback=cb_callout&recordId=${Date.parse(new Date())}`),
  // 挂断电话
  callback: () => fetch.GET('http://127.0.0.1:3366/callhang?callback=cb_callout')
}
