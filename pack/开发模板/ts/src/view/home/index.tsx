/**
 * Created by slipkinem on 3/1/2018 at 1:49 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import './index.scss'
import { Component, Vue } from '../../ext-nb'
import PkKeepAlive from '../../components/PkKeepAlive'
import { Route } from 'vue-router'
import { includesSym } from '../../shared/util/includesSym'
import { format } from '../../shared/util/format'
import { navList } from '../../nav-list'
import { locals } from '../../shared/util/Storage'
import _ from 'lodash'
import { soon } from '../../shared/util/soon'

interface NavRoute extends Route {
  key: string
}

@Component({
  components: {
    PkKeepAlive
  }
})
export default class Home extends Vue {
  $refs: {
    keepAlive: PkKeepAlive
  }

  private userName = ''
  private timeInfo = ''
  private activeRoutes: NavRoute[] = []

  created () {
    this.timeClock()
    let loginInfo = locals.get<{ userName: string }>('loginInfo')
    this.userName = loginInfo!.userName
  }

  /**
   * 时间
   */
  timeClock () {
    // window.setInterval(() => {
    this.timeInfo = format(new Date())
    // }, 1000)
  }

  /**
   * dropdown 执行
   * @param {string} command
   */
  handleCommand (command: string) {
    if (command === 'logout') {
      this.$router.push('/login')
    }
  }

  /**
   * 更新keep-alive存储的key
   * @param {string} key
   * @returns {boolean}
   */
  updateKey (key: string) {
    if (!includesSym(this.activeRoutes, this.$route, 'path')) {
      if (this.$route.meta.hideNav) {
        return false
      }
      this.activeRoutes.push(Object.assign({ key }, this.$route))
    }
  }

  /**
   * 移除存储的组件
   * @param {NavRoute} nav
   */
  removePath (nav: NavRoute) {
    this.activeRoutes.splice(_.findIndex(this.activeRoutes, nav), 1)
    this.$refs.keepAlive.removeCacheByKey(nav.key)
    if (this.activeRoutes.length > 0) {
      this.$router.push(this.activeRoutes[0].path)
    } else {
      this.$router.push('/home')
    }
  }

  flush () {
    locals.clear()
    soon(() => locals.set('loginInfo', {
      userName: 'userName'
    }, 300 * 60))
    this.$http.postParams('/System/flushCache')
  }

  render () {
    let {
      timeInfo,
      $route,
      handleCommand,
      userName,
      activeRoutes,
      updateKey,
      removePath
    } = this

    return (
        <div class='home'>
          <el-row>
            <el-col span={3}>
              <el-aside class='home-aside' width='100%'>
                <el-header class='home-logo'>
                  <img src={require('../../assets/favicon.png')} alt='logo'/>
                  <span class='home-pukang'>普康宝</span>
                </el-header>
                <el-menu
                    unique-opened={true}
                    router={true}
                    default-active={$route.path}
                    class='home-menu'
                    background-color='#324157'
                    text-color='#fff'
                    active-text-color='#1f76f3'>
                  {
                    navList.map((nav, key) =>
                        <el-submenu index={key + ''}>
                          <template slot='title'>
                            <i class={nav.icon}/>
                            {nav.name}
                          </template>
                          {
                            nav.subMenus.map((menu, menuKey) =>
                                <el-menu-item
                                    key={menuKey}
                                    index={menu.path + ''}>
                                  {menu.meta.localName}
                                </el-menu-item>)
                          }
                        </el-submenu>)
                  }
                </el-menu>
              </el-aside>
            </el-col>

            <el-col span={21}>
              <el-header class='home-header'>
                <div class='home-time'>
                  <i class='el-icon-time'/>
                  {timeInfo}
                </div>
                <el-button type='danger' onClick={this.flush}>一键清除字典缓存</el-button>
                <el-dropdown
                    size='small'
                    trigger='click'
                    onCommand={handleCommand}
                >
                  <div class='home-user' span={6}>
                    <img src={require('../../assets/images/avatar.png')} class='home-avatar' alt='头像'/>
                    <span class='home-username'>{userName}</span>
                  </div>
                  <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item command='logout'>登出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-header>
              {/*toolbar*/}
              <el-row>
                <nav>
                  <ul>
                    {
                      activeRoutes.map((nav, key) =>
                          <li class='nav-item'
                              key={key}>
                            {/* 导航 */}
                            <router-link class='home-route' to={nav.path}>{nav.meta.localName}</router-link>
                            {/* icon */}
                            <i class='remove el-icon-close' onClick={() => removePath(nav)}/>
                          </li>)
                    }
                  </ul>
                </nav>
              </el-row>
              <el-main class='home-main'>
                <PkKeepAlive updateComponentsKey={updateKey} ref='keepAlive'>
                  {
                    $route.meta.noCache ? null : <router-view/>
                  }
                </PkKeepAlive>
                {
                  $route.meta.noCache ? <router-view/> : null
                }
              </el-main>
            </el-col>
          </el-row>
        </div>
    )
  }
}
