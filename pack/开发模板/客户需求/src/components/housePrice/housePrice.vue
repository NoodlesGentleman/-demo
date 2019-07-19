<template>
<transition name="housePrice">
<div class="recommend">

        <pop-box class="provincelist" ref="provincelists" v-if="showCitysList" :posTop="clientTop" :typeList="provincelist" @showPopBox="showCityList">
          <div class="pop-city-list" ref="cityList">
             <div  @click.stop.prevent>
               <div class="pop-city-child">
                    <div  class="pop-city-height">
                      <scroll class="pop-city-scroll" v-if="provincelist.length" :data="provincelist">
                        <ul>
                          <li v-for="(item, index) in provincelist" :class="[provinceActive === item.name ? 'cityActive': '']" @touchstart.prevent="selectProvince(item, index)">{{item.name}}</li>
                        </ul>
                      </scroll>
                    </div>
                    <div  class="pop-city-height">
                      <scroll class="pop-city-scroll" v-if="childCitylist.length" :data="childCitylist">
                        <ul ref="citys">
                          <li v-for="(item, index) in childCitylist" :class="[cityActive === item ? 'cityActive': '']" @touchstart.prevent="selectCity(item, index)">{{item}}</li>
                        </ul>
                      </scroll>
                      <div v-else>
                        <loading v-show="childCitylistHasMore" title=""></loading>
                        <div v-show="!childCitylistHasMore" class="no-result-wrapper">
                          <p style="color: #999;line-height: 30px; text-align: center;">{{childCitylistHasMoreTxt}}</p>
                        </div>
                      </div>
                    </div>
                    <div  class="pop-city-height">
                      <scroll class="pop-city-scroll" ref="scrollCity" v-if="districtList.length" :data="districtList">
                        <ul ref="district">
                          <li ref="districtList" v-for="(item, index) in districtList" :class="[districtlistActive === item ? 'cityActive': '']" @touchstart.prevent="selectdistrictlist(item, index)">{{item}}</li>
                        </ul>
                      </scroll>
                      <div v-else>
                        <loading v-show="districtListHasMore" title=""></loading>
                        <div v-show="!districtListHasMore" class="no-result-wrapper">
                          <p style="color: #999;line-height: 30px; text-align: center;">{{districtListHasMoreTxt}}</p>
                        </div>
                      </div>
                    </div>
               </div>
               <div class="pop-city-btn">
                 <a @touchstart.prevent="selectProvinceList">确定选择</a>
               </div>
             </div>
          </div>
        </pop-box>
      <div class="search" ref="search">
        <div class="search-text">
          <p>输入所要查询的项目名称：</p>
        </div>
        <div class="search-back">
            <i class="icon-back" @click="back"></i>
            <SearchBox ref="searchBox" @searchFocus="searchFocus" @clear="clearValue" :querys="query" @query="onQueryChange"></SearchBox>
        </div>
        <div class="scroll-top-show" ref="typeListClone">
          <ul class="type-list">
            <li v-for="(item, index) in showSelectList" :class="[active === index ? 'active': '']" @click="getTypeList(item, index)"><span>{{item.name}}</span> <span class="list-icon"><i :class="[active === index ? 'icon-back-down': 'icon-back-up']"></i></span></li>
          </ul>
         </div>
      </div>

      <pop-box v-if="showTypeList" :posTop="clientTop" :typeList="typeList" @showPopBox="showPopBox">
          <div>
            <ul class="pop-list-child" v-if="typeList.length">
              <li v-for="(item, index) in typeList" :class="[index === selectTypeIndex ? 'select-type-index' : '']" @click.stop.prevent="selectType(item, index)">
                {{item.name}}
              </li>
            </ul>
            <div v-else class="show-loading">
              <loading title=""></loading>
            </div>
          </div>
        </pop-box>
      <div class="scroll">
        <scroll
              ref="scroll"
              class="recommend-content"
              :listenScroll="true"
              @scroll="scrollStart"
              :pullup="pullup"
              :beforeScroll="true"
              @beforeScroll="beforeScroll"
              @scrollToEnd="searchMore"
              :data="projectList">
          <div>
            <div>
            </div>
            <div v-if="projectList.length">
              <div class="project-msg" v-if="projectMsg">
                <div>
                  <div>
                    <p><i class="icon-date"></i></p>
                    <p>近期</p>
                    <p>30 天</p>
                  </div>
                </div>
                <div>
                  <div>
                    <p><i class="icon-tag"></i></p>
                    <p>成交</p>
                    <p>{{projectCount}}</p>
                  </div>
                </div>
              </div>
            </div>
            <recommend-list :projectList="projectList"></recommend-list>
            <loading v-show="hasMore" title=""></loading>
            <div v-show="!hasMore" class="no-result-wrapper">
              <p>{{noResultWrapper}}</p>
            </div>
          </div>
        </scroll>
      </div>
      <div>
          <scroll-to @scrollToTop="scrollToTop" :num="num"></scroll-to>
        </div>

        <router-view></router-view>

</div>
</transition>
</template>

<script>
const selectList = [{
  name: '区域',
  type: 'all'
}, {
  name: '物业类型',
  type: 'all'
}, {
  name: '总价',
  pricemax: 'all',
  pricemin: 'all'
}, {
  name: '单价',
  type: 'all'
}]
import { getTypeList, getProvincelist, getCitylist, getDistirctlist, getProjectLists, searchPorjectList, countNum } from 'api/housePrice'
import SearchBox from 'base/search-box/search-box'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import RecommendList from 'base/house-price-list/house-price-list'
import PopBox from 'base/pop-box/pop-box'
import ScrollTo from 'base/scroll-to/scroll-to'
export default {
  components: {
    Loading,
    Scroll,
    SearchBox,
    RecommendList,
    PopBox,
    ScrollTo
  },
  data () {
    return {
      noResultWrapper: '暂无所需项目,您可在微信给我们留言',
      projectList: [],
      projectCount: '',
      typeList: [],
      typeListModel: [],
      active: -1,
      provinceActive: '',
      query: '',
      cityActive: '',
      districtlistActive: '',
      pullup: true,
      hasMore: true,
      showTypeList: false,
      showCitysList: false,
      childCitylistHasMore: false,
      districtListHasMore: false,
      projectMsg: true,
      districtListHasMoreTxt: '',
      childCitylistHasMoreTxt: '',
      start: 0,
      length: 10,
      province: 'all',
      city: 'all',
      district: 'all',
      type: 'all',
      pricemin: 'all',
      pricemax: 'all',
      projectName: 'all',
      allPricemax: 'all',
      allPricemin: 'all',
      allPriceList: [{
        name: '全部',
        allPricemax: 'all',
        allPricemin: 'all'
      }, {
        name: '100万以下',
        allPricemax: '100万元',
        allPricemin: 'all'
      }, {
        name: '100万-300万',
        allPricemax: '300万元',
        allPricemin: '100万'
      }, {
        name: '300万-500万',
        allPricemax: '500万元',
        allPricemin: '300万元'
      }, {
        name: '500万以上',
        allPricemax: 'all',
        allPricemin: '500万元'
      }],
      priceList: [{
        name: '全部',
        pricemax: 'all',
        pricemin: 'all'
      }, {
        name: '1万以下',
        pricemax: '10000元',
        pricemin: 'all'
      }, {
        name: '1万-3万',
        pricemax: '30000元',
        pricemin: '10000元'
      }, {
        name: '3万-5万',
        pricemax: '50000元',
        pricemin: '30000元'
      }, {
        name: '5万-8万',
        pricemax: '80000元',
        pricemin: '50000元'
      }, {
        name: '8万以上',
        pricemax: 'all',
        pricemin: '80000元'
      }],
      showSelectList: selectList,
      provincelist: [{
        name: '全部',
        provinceType: 'all'
      }],
      childCitylist: [],
      districtList: [],
      show: true,
      clientTop: 0,
      selectTypeIndex: -1,
      num: 0
    }
  },
  created () {
    this._getProjectList()
    this._getTypeList()
    this._countNum()
  },
  computed: {},
  methods: {
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
      }
      this.$refs.scroll.refresh()
    },
    showPopBox(data) {
      this.showTypeList = false
    },
    showCityList() {
      this.showCitysList = false
    },
    back() {
      this.$router.back()
    },
    searchFocus() {
      this.showCitysList = false
      this.showTypeList = false
      this.$refs.search.style.top = '0'
      this.$refs.scroll.disable()
      setTimeout(() => {
        this.$refs.search.style.top = '-50px'
        this.showCitysList = false
        this.showTypeList = false
        this.$refs.scroll.enable()
      }, 4000)
    },
    onQueryChange(query) {
      if (this._trim(query) === '') {
        return
      }
      this.showSelectList = [{
        name: '区域',
        type: 'all'
      }, {
        name: '物业类型',
        type: 'all'
      }, {
        name: '总价',
        pricemax: 'all',
        pricemin: 'all'
      }, {
        name: '单价',
        type: 'all'
      }]
      this.city = 'all'
      this.province = 'all'
      this.start = 0
      this.pricemax = 'all'
      this.pricemin = 'all'
      this.allPricemin = 'all'
      this.allPricemax = 'all'
      this.type = 'all'
      this.district = 'all'
      this.query = query
      this.hasMore = true
      this.projectList = []
      this.projectName = this._trim(query)
      if (this.projectName === 'all') {
        this._getProjectList()
        return
      }
      this._searchPorjectList()
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, 0)
      }, 50)
    },
    clearValue() {
      this.projectName = 'all'
      this.start = 0
      this._getProjectList()
    },
    getTypeList(item, index) {
      this.clientTop = this.$refs.typeListClone.getBoundingClientRect().top + this.$refs.typeListClone.getBoundingClientRect().height - 2
      this.$refs.scroll.disable()
      this.typeList = []
      this.active = index
      this.childCitylist = []
      this.districtList = []
      if (index === 1) {
        this.typeList = this.typeListModel
      } else if (index === 2) {
        this.typeList = this.allPriceList
      } else if (index === 3) {
        this.typeList = this.priceList
      } else {
        this._getProvincelist()
        this.showTypeList = false
        setTimeout(() => {
          this.showCitysList = true
        }, 20)
        return
      }
      this.selectTypeIndex = -1
      this.showCitysList = false
      setTimeout(() => {
        this.showTypeList = true
      }, 20)
    },
    selectProvince(item, index) {
      if (this.provinceActive === item.name) {
        return
      }
      this.showSelectList[this.active].name = item.name === '全部' ? '区域' : item.name
      if (item.name === '全部') {
        this.childCitylistHasMore = false
        this.childCitylistHasMoreTxt = ''
      }
      this.provinceActive = item.name
      this.province = item.provinceType
      this.childCitylist = []
      this.districtList = []
      this.cityActive = ''
      this.districtlistActive = ''
      this.district = 'all'
      this.city = 'all'
      this.districtListHasMore = false
      this.districtListHasMoreTxt = ''
      this._getCitylist()
    },
    selectCity(item, index) {
      if (this.cityActive === item) {
        return
      }
      this.showSelectList[this.active].name = item === '全部' ? this.provinceActive : item
      if (item === '全部') {
        this.districtListHasMore = false
        this.districtListHasMoreTxt = ''
      }
      this.cityActive = item
      this.city = item === '全部' ? 'all' : item
      this.districtList = []
      this.district = 'all'
      this.districtlistActive = ''
      this._getdistrictlist()
    },
    selectdistrictlist(item, index) {
      this.showSelectList[this.active].name = item === '全部' ? this.cityActive : item
      this.districtlistActive = item
      this.district = item === '全部' ? 'all' : item
    },
    selectType(item, index) {
      if (item.allPricemax) {
        this.allPricemin = item.allPricemin
        this.allPricemax = item.allPricemax
      }
      if (item.pricemax) {
        this.pricemin = item.pricemin
        this.pricemax = item.pricemax
      }
      if (item.type) {
        this.type = item.type
      }
      this.projectList = []
      this.start = 0
      this.query = ''
      this.projectName = 'all'
      this.projectMsg = false
      if (this.active === 2) {
        this.showSelectList[this.active].name = item.name === '全部' ? '总价' : item.name
      } else if (this.active === 3) {
        this.showSelectList[this.active].name = item.name === '全部' ? '单价' : item.name
      } else {
        this.showSelectList[this.active].name = item.name === '全部' ? '物业类型' : item.name
      }
      this._getProjectList()
      this.selectTypeIndex = index
      setTimeout(() => {
        this.showTypeList = false
        this.$refs.scroll.enable()
      }, 20)
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, 0, 300)
      }, 350)
    },
    searchMore() {
      this.hasMore = true
      this.start ++
      if (this.projectName !== 'all') {
        this._searchPorjectList()
        return
      }
      this._getProjectList()
    },
    selectProvinceList() {
      this.districtListHasMore = false
      this.childCitylistHasMore = false
      this.districtListHasMoreTxt = ''
      this.childCitylistHasMoreTxt = ''
      this.$refs.scroll.enable()
      this.start = 0
      this.query = ''
      this.districtListHasMoreTxt = ''
      this.projectList = []
      this.projectName = 'all'
      this._getProjectList()
      this.showCitysList = false
      this.projectMsg = false
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, 0, 300)
      }, 350)
    },
    showProjectDianyong() {
      this.$router.push('/list/1')
    },
    scrollToTop() {
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
    scrollStart(pos) {
      const y = Math.abs(Math.floor(pos.y))
      this.num = y / 10000
      if (this.num > 0.7) {
        this.num = 0.7
      }
    },
    beforeScroll() {
      if (this.$refs.searchBox) {
        this.$refs.searchBox.blur()
      }
    },
    _getProjectList () {
      if (this.hasMore !== true) {
        this.hasMore = true
      }
      getProjectLists(this.start, this.length, this.province, this.city, this.district, this.type, this.pricemin, this.pricemax, this.allPricemin, this.allPricemax).then(res => {
        if (res.data.code === 1) {
          this.hasMore = false
          this.noResultWrapper = res.data.msg
          return
        }
        if (res.data.data && res.data.data.house2PriceInfo && res.data.data.house2PriceInfo.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = this.projectList.concat(res.data.data.house2PriceInfo)
        this.projectCount = res.data.data.count
        if (this.projectMsg !== true) {
          this.projectMsg = true
        }
      })
    },
    _searchPorjectList () {
      if (this.hasMore !== true) {
        this.hasMore = true
      }
      this.projectMsg = false
      searchPorjectList(this.projectName, this.start, this.length).then(res => {
        if (res.data.code === 1) {
          this.hasMore = false
          this.noResultWrapper = res.data.msg
          return
        }
        if (res.data.data && res.data.data.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = this.projectList.concat(res.data.data)
      })
    },
    _getTypeList() {
      getTypeList().then(res => {
        this.typeListModel.push({
          name: '全部',
          type: 'all'
        })
        const self = this
        new Set(res.data.data).forEach(function(item) {
          self.typeListModel.push({
            name: item,
            type: item
          })
        })
      })
    },
    _getProvincelist() {
      this.district = 'all'
      this.city = 'all'
      this.childCitylist = []
      this.districtList = []
      this.provinceActive = ''
      this.cityActive = ''
      this.districtlistActive = ''
      if (this.provincelist.length > 1) {
        return
      }
      getProvincelist().then(res => {
        for (let i in res.data.data) {
          this.provincelist.push({
            name: res.data.data[i],
            provinceType: res.data.data[i]
          })
        }
      })
    },
    _getCitylist() {
      if (this.provinceActive === '全部') {
        return
      }
      this.childCitylistHasMore = true
      getCitylist(this.province).then(res => {
        if (res.data.data == null || (res.data.data && res.data.data[0] == null)) {
          this.childCitylistHasMoreTxt = '暂无'
          this.childCitylistHasMore = false
          return
        }
        this.childCitylist = res.data.data
        this.childCitylist.unshift('全部')
        this.childCitylistHasMoreTxt = ''
        this.childCitylistHasMore = false
      })
    },
    _getdistrictlist() {
      if (this.cityActive === '全部') {
        return
      }
      this.districtListHasMore = true
      getDistirctlist(this.city).then(res => {
        if (res.data.data == null || (res.data.data && res.data.data[0] == null)) {
          this.districtListHasMoreTxt = '暂无'
          this.districtListHasMore = false
          return
        }
        this.districtList = res.data.data
        this.districtList.unshift('全部')
        this.districtListHasMoreTxt = ''
        this.districtListHasMore = false
      })
    },
    _countNum () {
      countNum().then()
    },
    _trim(str) {
      return str.replace(/(^\s+)|(\s+$)/g, '')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.recommend
  position: fixed
  width: 100%
  top: 0px
  bottom: 0
  font-size: $font-size-medium
  background: #eee
  .provincelist
    position: fixed
    top: 0
    width:100%
  .search
    height: 120px
    padding: 7px 20px 0 0
    background: #f77428
    position: fixed
    top: -50px
    width: 100%
    z-index: 999
    box-sizing: border-box
    transition: all 0.3s
    .search-back
      display: flex
      i
        width: 45px
        line-height: 37px
        color: #fff
        text-align: center
    .search-text
      height: 50px
      p
        line-height: 50px
        color: white
  .scroll
    position: fixed
    width: 100%
    top: 115px
    bottom: 0
    font-size: $font-size-medium
  .recommend-content
    height: 100%
    .no-result-wrapper
      text-align: center
      z-index: 800
      p
        line-height: 30px
    .project-msg
      display: flex
      background: white
      padding: 20px 0
      margin: 0 10px 10px
      border-radius: 4px
      >div
        width: 50%
        border-right: 1px solid #eee
        box-sizing: border-box
        &:last-child
          border: none
      p
        text-align: center
        line-height: 20px
        color: #f16d37
        &:nth-child(2)
          color: #999
        &:last-child
          font-size: $font-size-large
        i
          font-size: 20px
  .scroll-to-top
    position: fixed
    bottom: 20px
    right: 50px
    font-size: 40px
    z-index: 9999
    display: none
    i
      color: rgba(0, 0, 0, 0)
  .pop-list-child
    background: white
    padding: 10px
    li
      text-align: center
      line-height: 30px
      color: #7b7b7b
      width: 33%
      margin-bottom: 20px
      box-sizing: border-box
      display: inline-block
      font-size: $font-size-small
    .select-type-index
      background: #f9742a
      color: white
  .pop-city-list
    text-align: center
    position: absolute
    width: 100%
    height: 100%
    z-index: 999
    height: 100%
    background: white
    .pop-city-btn
      height: 50px
      background: $color-highlight-background
      a
        display: inline-block
        background #13CE66
        color: white
        padding: 10px 20px
        border-radius: 6px
    .pop-city-child
      background: $color-highlight-background
      padding: 0 2px
      width: 100%
      box-sizing: border-box
      display: flex
      justify-content: space-around
      align-items: flex-start
      height: 160px
      overflow: hidden
      margin: 10px 0
      .pop-city-height
        width: 33%
        box-sizing: border-box
        .pop-city-scroll
          top: 0
          bottom: 0
          width: 100%
          height: 160px
          overflow: hidden
          color: #7b7b7b
      li
        line-height: 35px
        font-size: $font-size-small
    .cityActive
      background : #EA8910
      color: white
  .show-loading
    height: 50px
    background: white
    padding-top: 10px
    box-sizing: border-box
  .scroll-top-show
    margin: 8px -20px 0 0
    .type-list
      display: flex
      justify-content: space-around
      background: $color-highlight-background
      box-sizing: border-box
      padding: 5px 0
      border-bottom: 1px solid #eee
      li
        height: 40px
        width: 25%
        font-size: $font-size-medium
        box-sizing: border-box
        color: #999
        display: flex
        span
          width: 75%
          line-height: 40px
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
          text-align: center
        .list-icon
          width: 25%
          box-sizing: border-box
          border-right: 1px solid #eee
          font-size: $font-size-small-s
        i
          vertical-align: middle
          text-align: right
        &:last-child
          .list-icon
            border-right: none
      .active
        color: #fe554c
.housePrice-enter-active, .housePrice-leave-active
  transition: all 0.3s
.housePrice-enter, .housePrice-leave-to
  transform: translate3d(100%, 0, 0)
</style>
