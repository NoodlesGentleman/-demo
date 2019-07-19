const RecommendList = resolve => {
  import('components/recommendList/recommendList').then(module => {
    resolve(module)
  })
}

const Details = resolve => {
  import('components/details/details').then(module => {
    resolve(module)
  })
}

const SwiperDetail = resolve => {
  import('components/swiperDetail/swiperDetail').then(module => {
    resolve(module)
  })
}

const GladTidingsWall = resolve => {
  import('components/gladTidingsWall/gladTidingsWall').then(module => {
    resolve(module)
  })
}

const BannerDetail = resolve => {
  import('components/bannerDetail/bannerDetail').then(module => {
    resolve(module)
  })
}

const ExportPage = resolve => {
  import('components/exportPage/exportPage').then(module => {
    resolve(module)
  })
}

// 海外房产
const OverseasList = resolve => {
  import('components/overseasList/overseasList').then(module => {
    resolve(module)
  })
}

// 完善客户资料
const PerfectDatum = resolve => {
  import('components/perfectDatum/perfectDatum').then(module => {
    resolve(module)
  })
}
// 结佣资料
const MaidDatum = resolve => {
  import('components/maidDatum/maidDatum').then(module => {
    resolve(module)
  })
}

// 大转盘
const BigWheel = resolve => {
  import('components/bigWheel/prizedraw').then(module => {
    resolve(module)
  })
}
// 战报
const Warprize = resolve => {
  import('components/warprize/warprize').then(module => {
    resolve(module)
  })
}

// 最新捷报
const NewReport = resolve => {
  import('components/newreport/newreport').then(module => {
    resolve(module)
  })
}

// 汇金
const Huijin = resolve => {
  import('components/huijin/huijin').then(module => {
    resolve(module)
  })
}
export default [
  {
    path: '/',
    component: RecommendList,
    meta: {
      keepAlive: true,
      title: '项目推荐'
    }
  },
  {
    path: '/recommendList/',
    component: RecommendList,
    meta: {
      keepAlive: true,
      title: '项目推荐'
    },
    name: 'recommendList'
  },
  {
    path: '/detail',
    component: Details,
    meta: {
      title: '项目详情'
    }
  },
  {
    path: '/bannerDetail',
    component: BannerDetail,
    meta: {
      keepAlive: true,
      title: '广告详情'
    }
  },
  {
    path: '/swiperDetail',
    component: SwiperDetail,
    meta: {
      title: '广告详情'
    }
  },
  {
    path: '/gladTidingsWall',
    component: GladTidingsWall,
    meta: {
      title: '喜报墙'
    }
  },
  {
    path: '/exportPage',
    component: ExportPage,
    name: 'exportPage',
    mate: {
      keepAlive: true,
      title: '海外房产'
    }
  },
  {
    path: '/overseasList',
    component: OverseasList,
    meta: {
      keepAlive: true,
      title: '海外房产'
    }
  },
  {
    path: '/perfectDatum',
    component: PerfectDatum,
    meta: {
      keepAlive: true,
      title: '结佣'
    }
  },
  {
    path: '/maidDatum',
    component: MaidDatum,
    meta: {
      keepAlive: true,
      title: '结佣'
    }
  },
  {
    path: '/bigWheel',
    component: BigWheel,
    meta: {
      title: '幸运转盘'
    }
  },
  {
    path: '/warprize',
    component: Warprize,
    meta: {
      title: '我的战报'
    }
  },
  {
    path: '/newreport',
    component: NewReport,
    meta: {
      title: '今日捷报'
    }
  },
  {
    path: '/huijin',
    component: Huijin,
    meta: {
      title: '汇金'
    }
  }
]
