import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import * as types from './types'
import config from '@/api/config'
import { Message } from 'iview'

Vue.use(Vuex)

const state = {
  // 用户信息
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  // 当前用户手机号
  currentPhone: '',
  // 加载状态
  loading: false,
  // 侧边栏信息
  sideMenu: JSON.parse(localStorage.getItem('sideMenu')) || [],
  // 联系人数信息
  contactCount: [],
  // 表格数据
  tableData: [],
  // 客户信息
  clientInfo: null,
  // 回访记录
  timeline: [],
  // 当前已经回访过的客户
  contactList: [],
  // 搜索参数(默认)
  params: {
    oder: 0,
    start: 0,
    length: config.limit,
    sign: 'all'
  }
}

const getters = {
  userInfo: state => state.userInfo,
  sideMenu: state => state.sideMenu,
  loading: state => state.loading,
  contactCount: state => state.contactCount,
  tableData: state => state.tableData,
  clientInfo: state => state.clientInfo,
  timeline: state => state.timeline,
  params: state => state.params,
  currentPhone: state => state.currentPhone,
  contactList: state => state.contactList
}

const mutations = {
  // 设置侧边栏信息
  [types.SET_SIDE_MENU](state, payload) {
    state.sideMenu = payload
  },
  // 获取联系人数
  [types.GET_CONTACT_COUNT](state, payload) {
    state.contactCount = payload
  },
  // 获取表格数据
  [types.GET_TABLE_DATA](state, payload) {
    if (payload.data.length === 0) {
      Message.error('用户不存在')
    } else {
      state.tableData = payload
    }
    state.loading = false
  },
  // 获取客户信息
  [types.GET_CLIENT_INFO](state, payload) {
    state.clientInfo = payload
    state.loading = false
  },
  // 获取回访记录
  [types.GET_TIME_LINE](state, payload) {
    state.timeline = payload
  }
}

const actions = {
  set_side_menu({ commit }) {
    api.getSideMenu().then(res => {
      localStorage.setItem('sideMenu', JSON.stringify(res.data))
      commit(types.SET_SIDE_MENU, res.data)
    })
  },
  getContactCount({ commit }) {
    api.getContactCount().then(res => {
      commit(types.GET_CONTACT_COUNT, res.data)
    })
  },
  getTableData({ commit, state }, para) {
    for (let i in para) {
      if (i !== 'phone') {
        state.params[i] = para[i]
      }
    }
    state.loading = true
    api.getTableData(para).then(res => {
      commit(types.GET_TABLE_DATA, res)
    })
  },
  getClientInfo({ commit }, phone) {
    state.loading = true
    api.getClientInfo(phone).then(res => {
      let data = res.data
      data.area = data.area ? data.area.split(',') : null
      data.business = data.business ? data.business.split(',') : null
      commit(types.GET_CLIENT_INFO, data)
    })
  },
  getTimeline({ commit }, para) {
    api.getTImeline(para).then(res => {
      commit(types.GET_TIME_LINE, res.data)
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
