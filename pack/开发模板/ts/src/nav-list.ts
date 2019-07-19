import Nav from './model/Nav'

export const navList: Nav[] = [
  {
    name: '客户管理',
    icon: 'el-icon-message',
    subMenus: [
      {
        name: 'InsuranceCompany',
        path: '/home/insuranceCompany',
        component: r => require(['./view/client/insurance-company/index.vue'], r),
        meta: {
          localName: '保险公司管理'
        }
      },
      {
        name: 'Corp',
        path: '/home/Corp',
        component: r => require(['./view/corp/manage/index.vue'], r),
        meta: {
          localName: '投保公司管理'
        }
      },
      {
        name: 'OtherCompany',
        path: '/home/otherCompany',
        component: r => require(['./view/other-company/manage/index.vue'], r),
        meta: {
          localName: '其他公司管理'
        }
      }
    ]
  },
  {
    name: '合同管理',
    icon: 'el-icon-setting',
    subMenus: [
      {
        name: 'Contract',
        path: '/home/contract',
        component: r => require(['./view/contract/manage/index.vue'], r),
        meta: {
          localName: '合同管理'
        }
      }
    ]
  },
  {
    name: '用户管理',
    icon: 'el-icon-setting',
    subMenus: [
      {
        name: 'CustomerManage',
        path: '/home/customerManage',
        component: r => require(['./view/customer/manage/index.vue'], r),
        meta: {
          localName: '用户管理'
        }
      },
      {
        name: 'CustomerModification',
        path: '/home/customerModification',
        component: r => require(['./view/customer/modification/index.vue'], r),
        meta: {
          localName: '修改信息'
        }
      },
      {
        name: 'CustomerAccountManage',
        path: '/home/customerAccountManage',
        component: r => require(['./view/customer/account/AccountManage.tsx'], r),
        meta: {
          localName: '账户管理'
        }
      }
    ]
  },
  {
    name: '商户管理',
    icon: 'el-icon-setting',
    subMenus: [
      {
        name: 'brandManager',
        path: '/home/brand',
        component: r => require(['./view/merchant/brandManager/index.vue'], r),
        meta: {
          localName: '品牌管理'
        }
      },
      {
        path: '/home/merchant',
        component: r => require(['./view/merchant/merchantManager/index.vue'], r),
        meta: {
          localName: '商户管理'
        }
      }
      , {
        name: 'shopManager',
        path: '/home/shop',
        component: r => require(['./view/merchant/shopManager/index.vue'], r),
        meta: {
          localName: '门店管理'
        }
      },
      {
        name: 'goodsManager',
        path: '/home/goods',
        component: r => require(['./view/merchant/goodsManager/index.vue'], r),
        meta: {
          localName: '商品库管理'
        }
      }
    ]
  },
  {
    name: '保单管理',
    icon: 'el-icon-setting',
    subMenus: [
      // {
      //   name: 'SlipManager',
      //   path: '/home/slipManage',
      //   component: r => require(['./view/slip/manage/index.vue'], r),
      //   meta: {
      //     localName: '保单管理'
      //   }
      // },
      // {
      //   name: 'SlipCustomerService',
      //   path: '/home/preserve',
      //   component: r => require(['./view/slip/preserve/index.vue'], r),
      //   meta: {
      //     localName: '保全管理'
      //   }
      // }
    ]
  },
  {
    name: '库存管理',
    icon: 'el-icon-setting',
    subMenus: [
      {
        name: 'CardBinManage',
        path: '/stock/cardbinManager',
        component: r => require(['./view/stock/cardbinManager/index.vue'], r),
        meta: {
          localName: '卡类型管理'
        }
      },
      // {
      //   name: 'StockBatchManage',
      //   path: '/stock/stockBatchManager',
      //   component: r => require(['./view/stock/stockBatchManager/index.vue'], r),
      //   meta: {
      //     localName: '库存管理'
      //   }
      // },
      {
        name: 'CardManager',
        path: '/stock/cardManager',
        component: r => require(['./view/stock/cardManager/index.vue'], r),
        meta: {
          localName: '卡片管理'
        }
      }
    ]
  }
  ,
  {
    name: '订单管理',
    icon: 'el-icon-setting',
    subMenus: [
      {
        name: 'orderManager',
        path: '/home/orderManager',
        component: r => require(['./view/order/orderManager/index.vue'], r),
        meta: {
          localName: '订单管理'
        }
      }
    ]
  }
  ,
  {
    name: '系统管理',
    icon: 'el-icon-setting',
    subMenus: [
      {
        name: 'permission',
        path: '/home/permission',
        component: r => require(['./view/auth/permission/index.vue'], r),
        meta: {
          localName: '权限管理'
        }
      },
      {
        name: 'group',
        path: '/home/group',
        component: r => require(['./view/auth/group/index.vue'], r),
        meta: {
          localName: '组管理'
        }
      },
      {
        name: 'user',
        path: '/home/user',
        component: r => require(['./view/auth/user/index.vue'], r),
        meta: {
          localName: '用户管理'
        }
      }
    ]
  }
]
