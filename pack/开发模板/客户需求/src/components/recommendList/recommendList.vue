<template>
  <div class="recommend">
    <div class="fixed-img">
      <img :src="fixedImg" alt="" @click="goverseas">
    </div>
    <div class="mengceng-img" v-if="mengcengFlag">
      <img :src="mengcengImg" alt="" @click="hideMengceng">
    </div>
    <pop-box class="provincelist" ref="provincelists" v-if="showCitysList" :posTop="clientTop" :typeList="provincelist" @showPopBox="showCityList">
      <div class="pop-city-list" ref="cityList">
        <div @click.stop.prevent>
          <div class="pop-city-child">
            <div class="pop-city-height">
              <scroll class="pop-city-scroll" v-if="provincelist.length" :data="provincelist">
                <ul>
                  <li :key="item.name" v-for="(item, index) in provincelist" :class="[provinceActive === item.name ? 'cityActive': '']" @touchstart.prevent="selectProvince(item, index)">{{item.name}}</li>
                </ul>
              </scroll>
            </div>
            <div class="pop-city-height">
              <scroll class="pop-city-scroll" v-if="childCitylist.length" :data="childCitylist">
                <ul ref="citys">
                  <li :key="item.name" v-for="(item, index) in childCitylist" :class="[cityActive === item.name ? 'cityActive': '']" @touchstart.prevent="selectCity(item, index)">{{item.name}}</li>
                </ul>
              </scroll>
            </div>
            <div class="pop-city-height">
              <scroll class="pop-city-scroll" ref="scrollCity" v-if="districtList.length" :data="districtList">
                <ul ref="district">
                  <li :key="item.name" ref="districtList" v-for="(item, index) in districtList" :class="[districtlistActive === item.name ? 'cityActive': '']" @touchstart.prevent="selectdistrictlist(item, index)">{{item.name}}</li>
                </ul>
              </scroll>
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
      <SearchBox ref="searchBox" @searchFocus="searchFocus" @clear="clearValue" :querys="query" @query="onQueryChange"></SearchBox>
    </div>
    <div class="scroll-top-show" ref="typeListClone">
      <ul class="type-list">
        <li :key="item" v-for="(item, index) in showSelectList" :class="[active === index ? 'active': '']" @click.stop="getTypeList(item, index, true)">{{item.name}}</li>
      </ul>
    </div>
    <pop-box v-if="showTypeList" :posTop="clientTop" :typeList="typeList" @showPopBox="showPopBox">
      <div>
        <ul class="pop-list-child" v-if="typeList.length">
          <li :key="item" v-for="(item, index) in typeList" :class="[index === selectTypeIndex ? 'select-type-index' : '']" @click.stop.prevent="selectType(item, index)">
            {{item.name}}
          </li>
        </ul>
        <div v-else class="show-loading">
          <loading title=""></loading>
        </div>
      </div>
    </pop-box>
    <div class="scroll">
      <scroll ref="scroll" class="recommend-content" @scroll="scrollStart" :listenScroll="true" :pullup="pullup" :beforeScroll="true" @beforeScroll="beforeScroll" @scrollToEnd="searchMore" :data="projectList">
        <div>
          <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
            <swiper ref="mySwiper" :options="swiperOption">
              <swiper-slide :key="index" v-for="(item,index) in recommends" class="slider-img">
                <a @click.prevent="addLog(item)">
                  <p v-if="item.project_name" :style="sliderContentText">{{item.project_name}}</p>
                  <img class="needsclick" @load="loadImage" :src="'http://sofimage.richest007.com/' + item.image">
                </a>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <!--<div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
            <slider>
              <div :key="item" v-for="item in recommends" class="slider-img">
                <a @click.prevent="addLog(item)">
                  <p v-if="item.project_name" :style="sliderContentText">{{item.project_name}}</p>
                  <img class="needsclick" @load="loadImage" :src="'http://sofmanager.fangsir007.com/image/' + item.image">
                </a>
              </div>
            </slider>
          </div>-->
          <!--<div>
            <banner></banner>
          </div>-->
          <div>
            <ul class="type-list" ref="typeList" style="border-bottom:1px solid #EDEDED">
              <li :key="item" v-for="(item, index) in showSelectList" :class="[active === index ? 'active': '']" @click="getTypeList(item, index)">{{item.name}}</li>
            </ul>
          </div>
          <div class="horsewrapper" style="">
            <div class="left">
              <img :src="jiebao" alt="" style="height:40px;margin-top:.25rem">
            </div>
            <div class="right" style="height:3rem;margin-left:.3rem；width:90%;" @click="tonewreport">
              <swiper ref="jiebaoSwiper" :options="jiebaoswiperOption" style="height:3rem" v-if="listdata.length">
                <swiper-slide :key="index" v-for="(item,index) in listdata">
                  <p class="slide_p">
                    <span class="type_tip" style="">{{item.type==0?'报备':'带看'}}</span>
                    <span style="width:35%;margin-left:2%">经纪人:{{item.username}}</span>
                    <span style="width:55px">成功{{item.type==0?'报备':'带看'}}</span>
                    <span class="p_proname" style="">【{{item.projectName}}】</span>
                  </p>
                </swiper-slide>
              </swiper>
              <div v-else class="zanwu">
                暂无当天捷报信息
              </div>
            </div>
          </div>
          <recommend-list @projectnewest="projectnewest" @buryingPoint="buryingPoint" :projectList="projectList"></recommend-list>
          <loading v-show="hasMore" title=""></loading>
          <div v-show="!hasMore" class="no-result-wrapper">
            <p>{{noResultWrapper}}</p>
          </div>
        </div>
      </scroll>
    </div>
    <div class="scroll-to-top" ref="scrollToTop" @click="scrollToTop">
      <i class="icon-scrollTop"></i>
    </div>
    <confirm ref="confirm" @cancel="cancel" @confirm="confirmClear" :text="text"></confirm>
  </div>
</template>

<script>
const selectList = [
  {
    name: '区域',
    type: 'all'
  },
  {
    name: '总价',
    pricemax: 'all',
    pricemin: 'all'
  },
  {
    name: '物业类型',
    type: 'all'
  }
]
const NUM = 255
import {
  getProjectList,
  getTypeList,
  getProvincelist,
  getCitylist,
  getDistirctlist,
  getBannerImg,
  projectnewest,
  getlist,
  viewLog
} from 'api/recommendList'
import { getFirstVisited } from 'api/getFirstVisited'
import Slider from 'base/slider/slider'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import SearchBox from 'base/search-box/search-box'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import RecommendList from 'base/recommend-list/recommend-list'
import PopBox from 'base/pop-box/pop-box'
import Banner from 'base/banner/banner'
import Confirm from 'base/confirm/confirm'
import TYPE from 'common/js/buryingpointType'
import OVERSEAS from 'common/image/haiwai.png'
import jiebao from 'common/image/jrjb.png'
import { addLog } from 'api/buryingpoint'
import { socketUrl } from '../../config/env'
export default {
  components: {
    Slider,
    Loading,
    Scroll,
    SearchBox,
    Confirm,
    RecommendList,
    PopBox,
    Banner,
    swiper,
    swiperSlide
  },
  data() {
    return {
      noResultWrapper: '暂无所需项目,您可在微信给我们留言',
      recommends: [],
      projectList: JSON.parse(sessionStorage.getItem('projectList')) || [],
      typeList: [],
      typeListModel: [],
      active: 3,
      provinceActive: '',
      query: '',
      cityActive: '',
      districtlistActive: '',
      pullup: true,
      hasMore: true,
      mengcengFlag: false,
      mengcengImg: require('common/image/mengcenghomepage01.jpg'),
      showTypeList: false,
      showCitysList: false,
      start: 0,
      length: 10,
      province: JSON.parse(sessionStorage.getItem('selectParams'))
        ? JSON.parse(sessionStorage.getItem('selectParams')).province
        : 'all',
      city: JSON.parse(sessionStorage.getItem('selectParams'))
        ? JSON.parse(sessionStorage.getItem('selectParams')).city
        : 'all',
      district: JSON.parse(sessionStorage.getItem('selectParams'))
        ? JSON.parse(sessionStorage.getItem('selectParams')).district
        : 'all',
      type: JSON.parse(sessionStorage.getItem('selectParams'))
        ? JSON.parse(sessionStorage.getItem('selectParams')).type
        : 'all',
      pricemin: JSON.parse(sessionStorage.getItem('selectParams'))
        ? JSON.parse(sessionStorage.getItem('selectParams')).pricemin
        : 'all',
      pricemax: 'all',
      projectName: 'all',
      priceList: [
        {
          name: '全部',
          pricemax: 'all',
          pricemin: 'all'
        },
        {
          name: '100万以下',
          pricemax: '100',
          pricemin: 'all'
        },
        {
          name: '100万-300万',
          pricemax: '300',
          pricemin: '100'
        },
        {
          name: '300万-500万',
          pricemax: '500',
          pricemin: '300'
        },
        {
          name: '500万以上',
          pricemax: 'all',
          pricemin: '500'
        }
      ],
      showSelectList:
        JSON.parse(sessionStorage.getItem('selectList')) || selectList,
      provincelist: [
        {
          name: '全部',
          provinceType: 'all'
        }
      ],
      childCitylist: [],
      districtList: [],
      show: true,
      clientTop: 0,
      selectTypeIndex: -1,
      sliderContentText: {
        width: document.body.clientWidth + 'px'
      },
      text: '',
      projectnewestData: {},
      fixedImg: OVERSEAS,
      jiebao: jiebao,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          disableOnInteraction: false
        },
        loop: true,
        bulletActiveClass: 'my-bullet-active',
        bulletClass: 'my-bullet',
        autoplayDisableOnInteraction: false,
        observer: true,
        observeParents: true
      },
      jiebaoswiperOption: {
        autoplay: {
          disableOnInteraction: false
        },
        loop: true,
        direction: 'vertical',
        slidesPerView: 2,
        observer: true,
        observeParents: true
      },
      websock: null,
      configurl: '',
      listdata: [],
      len: 0
    }
  },
  mounted() {
    this.configurl = socketUrl
    this.getdetail()
    this.initWebSocket()
    // 判断是否是首次访问
    getFirstVisited('recommentList').then(res => {
      if (res.data.data === 0) {
        this.mengcengFlag = true
      }
    })
    setTimeout(function() {
      addLog(TYPE.PROJECT, '', '', '', window.USERMSG)
    }, 1500)
    if (this.projectList.length === 0) {
      console.log('没有session')
      this._getProjectList()
    }
    this._getTypeList()
    this._getBannerImg()
    console.log(this.recommends)
  },
  computed: {},
  beforeDestroy() {
    this.websocketclose() // 销毁时关掉socket
  },
  methods: {
    // 求分销
    projectnewest(data) {
      this.projectnewestData = data
      this.text = '我们会尽快与该项目合作，签定分销协议'
      this.$refs.confirm.show()
    },
    // 点击隐藏蒙层
    hideMengceng() {
      this.mengcengFlag = false
    },
    // 海外房产
    goverseas() {
      addLog(TYPE.PROJECT, '', TYPE.OVERSEAS, TYPE.OVERSEASPAGE, window.USERMSG)
      this.$router.push({
        path: '/overseasList'
      })
    },
    addLog(row) {
      if (row.advertising) {
        if (row.advertising === '2') {
          this.$router.push({
            path: 'gladTidingsWall',
            query: {
              id: row.id
            }
          })
        } else if (row.advertising === '1') {
          this.$router.push({
            path: 'swiperDetail',
            query: {
              id: row.id
            }
          })
        }
        viewLog(row.id)
      } else {
        console.log(row.projectid.split('&'))
        let Id = row.projectid.split('&')[0]
        let isover = row.projectid.split('&')[1].split('=')[1]
        this.buryingPoint()
        this.$router.push({
          path: '/detail',
          query: {
            id: Id,
            isover: isover
          }
        })
      }
    },
    confirmClear() {
      if (this.text === '我们会尽快与该项目合作，签定分销协议') {
        addLog(
          TYPE.PROJECT,
          '',
          TYPE.HEZUOBTNCONFIRM,
          TYPE.PROJECT,
          window.USERMSG
        )
        projectnewest(
          this.projectnewestData.projectname,
          this.projectnewestData.id
        ).then(res => {
          if (res.data.code === 2) {
            this.text = '请先注册！'
            this.$refs.confirm.show()
          }
        })
      }
      if (this.text === '请先注册！') {
        window.location.href = '/registration'
      }
    },
    cancel() {
      if (this.text === '我们会尽快与该项目合作，签定分销协议') {
        addLog(
          TYPE.PROJECT,
          '',
          TYPE.HEZUOBTNCONCEL,
          TYPE.PROJECT,
          window.USERMSG
        )
      }
    },
    // 埋点
    buryingPoint(flag) {
      if (flag) {
        addLog(
          TYPE.PROJECT,
          '',
          TYPE.PROJECTBTN,
          TYPE.BAOBEIPAGE,
          window.USERMSG
        )
      } else {
        addLog(
          TYPE.PROJECT,
          '',
          TYPE.PROJECTIMG,
          TYPE.PROJECTDETAIL,
          window.USERMSG
        )
      }
    },
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
    searchFocus() {
      this.$refs.typeListClone.style.top = '200px'
      this.showCitysList = false
      this.showTypeList = false
      this.$refs.search.style.top = '0'
      this.$refs.scroll.scrollTo(0, -200, 200)
      this.$refs.scroll.disable()
      setTimeout(() => {
        this.$refs.search.style.top = '-50px'
        this.$refs.typeListClone.style.top = '50px'
        this.showCitysList = false
        this.showTypeList = false
        this.$refs.scroll.scrollTo(0, -NUM, 600)
        this.$refs.scroll.enable()
      }, 4000)
    },
    scrollStart(pos) {
      const y = Math.abs(Math.floor(pos.y))
      let num = y / 10000
      if (num < 0.2) {
        if (this.$refs.scrollToTop.style.display !== 'none') {
          this.$refs.scrollToTop.style.display = 'none'
        }
      } else {
        if (this.$refs.scrollToTop.style.display !== 'block') {
          this.$refs.scrollToTop.style.display = 'block'
          // this.$refs.search.style.background = '#393A3E'
        }
      }
      if (num > 0.7) {
        num = 0.7
      }
      if (y > NUM) {
        if (this.$refs.typeListClone.style.display !== 'block') {
          this.$refs.typeListClone.style.display = 'block'
        }
      } else {
        if (this.$refs.typeListClone.style.display !== 'none') {
          this.$refs.typeListClone.style.display = 'none'
        }
      }
      this.$refs.scrollToTop.childNodes[0].style.color = `rgba(0, 0, 0, ${num})`
    },
    onQueryChange(query) {
      if (this._trim(query) === '') {
        console.log('123')
        this.projectName = 'all'
        this.city = 'all'
        this.province = 'all'
        this.start = 0
        this.pricemax = 'all'
        this.pricemin = 'all'
        this.type = 'all'
        this.district = 'all'
        this._getProjectList()
        return
      }
      this.showSelectList = [
        {
          name: '区域',
          type: 'all'
        },
        {
          name: '总价',
          pricemax: 'all',
          pricemin: 'all'
        },
        {
          name: '物业类型',
          type: 'all'
        }
      ]
      this.city = 'all'
      this.province = 'all'
      this.start = 0
      this.pricemax = 'all'
      this.pricemin = 'all'
      this.type = 'all'
      this.district = 'all'
      this.start = 0
      this.query = query
      this.projectName = this._trim(query)
      if (this.projectName === 'all') {
        this._getProjectList()
        return
      }
      this.projectList = []
      getProjectList(
        this.start,
        this.length,
        'all',
        'all',
        'all',
        'all',
        'all',
        'all',
        this.projectName
      ).then(res => {
        if (res.data.recordsTotal === 0) {
          this.hasMore = false
          this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
          return
        }
        if (res.data.data.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = res.data.data
      })
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, -NUM)
      }, 50)
    },
    clearValue() {
      this.projectName = 'all'
      this.city = 'all'
      this.province = 'all'
      this.start = 0
      this.pricemax = 'all'
      this.pricemin = 'all'
      this.type = 'all'
      this.district = 'all'
      this._getProjectList()
    },
    getTypeList(item, index, flag) {
      this.$refs.scroll.scrollTo(0, -NUM)
      if (flag) {
        this.clientTop =
          this.$refs.typeListClone.getBoundingClientRect().top +
          this.$refs.typeListClone.getBoundingClientRect().height -
          2
      } else {
        this.clientTop =
          this.$refs.typeList.getBoundingClientRect().top +
          this.$refs.typeList.getBoundingClientRect().height
      }
      this.$refs.scroll.disable()
      this.typeList = []
      this.active = index
      this.childCitylist = []
      this.districtList = []
      if (index === 1) {
        this.typeList = this.priceList
      } else if (index === 2) {
        this.typeList = this.typeListModel
      } else if (index === 0) {
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
      this.showSelectList[this.active].name =
        item.name === '全部' ? '区域' : item.name
      this.provinceActive = item.name
      this.province = item.provinceType
      this.childCitylist = []
      this.districtList = []
      this.cityActive = ''
      this.districtlistActive = ''
      this.district = 'all'
      this.city = 'all'
      this._getCitylist()
    },
    selectCity(item, index) {
      this.showSelectList[this.active].name =
        item.name === '全部' ? this.provinceActive : item.name
      this.cityActive = item.name
      this.city = item.provinceType === '全部' ? 'all' : item.provinceType
      this.districtList = []
      this.district = 'all'
      this.districtlistActive = ''
      this._getdistrictlist()
    },
    selectdistrictlist(item, index) {
      this.showSelectList[this.active].name =
        item.name === '全部' ? this.cityActive : item.name
      this.districtlistActive = item.name
      this.district = item.provinceType === '全部' ? 'all' : item.provinceType
    },
    selectType(item, index) {
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
      if (this.active === 2) {
        this.showSelectList[this.active].name =
          item.name === '全部' ? '物业类型' : item.name
      } else {
        this.showSelectList[this.active].name =
          item.name === '全部' ? '总价' : item.name
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
      this.start++
      if (this.projectName !== 'all') {
        getProjectList(
          this.start,
          this.length,
          'all',
          'all',
          'all',
          'all',
          'all',
          'all',
          this.projectName
        ).then(res => {
          if (res.data.recordsTotal === 0) {
            this.hasMore = false
            this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
            return
          }
          if (res.data.data.length < 10) {
            this.hasMore = false
            this.noResultWrapper = '没有更多了'
          }
          this.projectList = this.projectList.concat(res.data.data)
        })
        return
      }
      getProjectList(
        this.start,
        this.length,
        this.province,
        this.city,
        this.district,
        this.type,
        this.pricemin,
        this.pricemax,
        'all'
      ).then(res => {
        if (res.data.recordsTotal === 0) {
          this.hasMore = false
          this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
          return
        }
        if (res.data.data.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = this.projectList.concat(res.data.data)
      })
    },
    selectProvinceList() {
      this.$refs.scroll.enable()
      this.start = 0
      this.query = ''
      this.projectName = 'all'
      this._getProjectList()
      this.showCitysList = false
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, 0, 300)
      }, 350)
    },
    scrollToTop() {
      this.$refs.scroll.scrollTo(0, 0, 600)
    },
    beforeScroll() {
      if (this.$refs.searchBox) {
        this.$refs.searchBox.blur()
      }
    },
    _getProjectList(projectName) {
      console.log(this.showSelectList, '区域')
      this.projectList = []
      this.hasMore = true
      getProjectList(
        this.start,
        this.length,
        this.province,
        this.city,
        this.district,
        this.type,
        this.pricemin,
        this.pricemax,
        this.projectName
      ).then(res => {
        if (res.data.recordsTotal === 0) {
          this.hasMore = false
          this.noResultWrapper = '暂无所需项目,您可在微信给我们留言'
          return
        }
        if (res.data.data.length < 10) {
          this.hasMore = false
          this.noResultWrapper = '没有更多了'
        }
        this.projectList = res.data.data
        let selectParams = {
          province: this.province,
          city: this.city,
          district: this.district,
          pricemin: this.pricemin,
          type: this.type
        }
        sessionStorage.setItem('selectParams', JSON.stringify(selectParams))
        sessionStorage.setItem(
          'selectList',
          JSON.stringify(this.showSelectList)
        )
        sessionStorage.setItem('projectList', JSON.stringify(res.data.data))
      })
    },
    _getBannerImg() {
      getBannerImg().then(res => {
        // console.log(res)
        // console.log(res.data.data)
        this.recommends = res.data.data
        // console.log(this.recommends)
      })
    },
    _getTypeList() {
      getTypeList().then(res => {
        this.typeListModel.push({
          name: '全部',
          type: 'all'
        })
        for (let i in res.data.data) {
          this.typeListModel.push({
            name: res.data.data[i].value,
            type: res.data.data[i].key
          })
        }
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
            name: res.data.data[i].value,
            provinceType: res.data.data[i].key
          })
        }
        console.log(this.provincelist)
      })
    },
    _getCitylist() {
      console.log(this.province)
      if (this.provinceActive === '全部') {
        return
      }
      getCitylist(this.province).then(res => {
        this.childCitylist = [
          {
            name: '全部',
            provinceType: 'all'
          }
        ]
        for (let i in res.data.data) {
          this.childCitylist.push({
            name: res.data.data[i].value,
            provinceType: res.data.data[i].key
          })
        }
      })
    },
    _getdistrictlist() {
      if (this.cityActive === '全部') {
        return
      }
      getDistirctlist(this.province, this.city).then(res => {
        this.districtList = [
          {
            name: '全部',
            provinceType: 'all'
          }
        ]
        for (let i in res.data.data) {
          this.districtList.push({
            name: res.data.data[i].value,
            provinceType: res.data.data[i].key
          })
        }
      })
    },
    _trim(str) {
      return str.replace(/(^\s+)|(\s+$)/g, '')
    },
    tonewreport() {
      addLog(TYPE.PROJECT, '', TYPE.JIEBAO_BTN, TYPE.JIEBAOPAGE, window.USERMSG)
      window.location.href = '/newreport'
    },
    initWebSocket() {
      // const str = this.configurl.replace(/http/, 'ws')
      const wsuri = this.configurl + '/websocket/username'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    websocketonmessage(e) {
      // 数据接收
      const redata = JSON.parse(e.data)
      this.listdata.push(redata)
      this.len = this.listdata.length
      console.log(this.listdata.length)
      if (this.listdata.length <= 1) {
        this.jiebaoswiperOption.slidesPerView = 1
      } else {
        this.jiebaoswiperOption.slidesPerView = 2
      }
    },
    websocketclose(e) {
      // 关闭
      console.log('connection closed')
    },
    getdetail() {
      getlist().then(res => {
        this.listdata = res.data.data
        this.len = res.data.data.length
        if (this.listdata.length <= 1) {
          this.jiebaoswiperOption.slidesPerView = 1
        } else {
          this.jiebaoswiperOption.slidesPerView = 2
        }
        console.log(this.jiebaoswiperOption.slidesPerView)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.zanwu {
  height: 2.2rem;
  line-height: 3rem;
  margin: 0 auto;
  width: 100%;
  margin-left: 3rem;
  font-size: 16px;
}

.horsewrapper {
  display: flex;
  height: 2rem;
  background: #fff;
  padding-top: 0.6rem;
  padding-left: 0.3rem;
  padding-bottom: 1.8rem;
  width: 100%;
}

.slide_p {
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 13px;
  width: 100%;
  display: flex;
  width: 100%;
  margin-left: 0.3rem;
}

.p_proname {
  width: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.type_tip {
  color: #FE4B42;
  border: 1px solid #C2342D;
  border-radius: 3px;
  font-size: 10px;
  width: 27px;
  height: 14px;
  line-height: 14px;
  position: relative;
  top: 4px;
  text-align: center;
}

.swiper-pagination-bullet {
  opacity: 0.9;
}

.my-bullet-active {
  width: 20px;
  border-radius: 5px;
  background: $color-text-ll;
}

.recommend {
  position: fixed;
  width: 100%;
  top: 0px;
  bottom: 0;
  font-size: $font-size-medium;
  background: #eee;

  .fixed-img {
    position: fixed;
    z-index: 999999;
    top: 23rem;
    left: 0.4rem;
    padding: 10px 10px 10px 0;

    img {
      width: 30px;
    }
  }

  .mengceng-img {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .provincelist {
    position: fixed;
    top: 0;
    width: 100%;
  }

  .search {
    height: 100px;
    padding: 7px 20px;
    background: #393A3E;
    position: fixed;
    top: -50px;
    width: 100%;
    z-index: 999;
    box-sizing: border-box;
    transition: all 0.3s;

    .search-text {
      height: 50px;

      p {
        line-height: 50px;
        color: white;
      }
    }
  }

  .scroll {
    position: fixed;
    width: 100%;
    top: 45px;
    bottom: 0;
    font-size: $font-size-medium;
  }

  .recommend-content {
    height: 100%;

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;

      .swiper-pagination-bullet-active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }

      .slider-img {
        a {
          width: 100%;
        }

        p {
          z-index: 999999;
          height: 40px;
          line-height: 40px;
          background: rgba(0, 0, 0, 0.4);
          position: absolute;
          text-align: center;
          bottom: 30px;
          color: white;
          font-size: 30px;
          transition: all 0.4s;
        }

        img {
          width: 100%;
          height: 200px;
        }
      }
    }

    .type-list {
      display: flex;
      justify-content: space-around;
      background: $color-highlight-background;
      margin: 5px 0 0;

      li {
        height: 42px;
        line-height: 42px;
        width: 32%;
        text-align: center;
        font-size: $font-size-medium-x;
        box-sizing: border-box;
      }

      .active {
        border-bottom: 2px solid #EA8910;
      }
    }

    .no-result-wrapper {
      text-align: center;
      z-index: 800;

      p {
        line-height: 30px;
      }
    }
  }

  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 50px;
    font-size: 40px;
    z-index: 9999;
    display: none;

    i {
      color: rgba(0, 0, 0, 0);
    }
  }

  .to-one-price {
    position: fixed;
    height: 100px;
    width: 30px;
    bottom: 50px;
    left: 0px;
    font-size: 40px;
    z-index: 9999;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .pop-list-child {
    background: white;
    padding: 10px;

    li {
      text-align: center;
      line-height: 30px;
      color: #7b7b7b;
      width: 33%;
      margin-bottom: 20px;
      box-sizing: border-box;
      display: inline-block;
    }

    .select-type-index {
      background: #f9742a;
      color: white;
    }
  }

  .pop-city-list {
    text-align: center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    height: 100%;
    background: white;

    .pop-city-btn {
      height: 50px;
      background: $color-highlight-background;

      a {
        display: inline-block;
        background: #13CE66;
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
      }
    }

    .pop-city-child {
      background: $color-highlight-background;
      padding: 0 2px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      height: 160px;
      overflow: hidden;
      margin: 10px 0;

      .pop-city-height {
        width: 33%;
        box-sizing: border-box;

        .pop-city-scroll {
          top: 0;
          bottom: 0;
          width: 100%;
          height: 160px;
          overflow: hidden;
        }
      }

      li {
        line-height: 35px;
      }
    }

    .cityActive {
      background: #EA8910;
      color: white;
    }
  }

  .show-loading {
    height: 50px;
    background: white;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .scroll-top-show {
    z-index: 9999;
    position: fixed;
    top: 50px;
    width: 100%;
    display: none;
    transition: all 0.3s;

    .type-list {
      display: flex;
      justify-content: space-around;
      background: $color-highlight-background;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;

      li {
        height: 42px;
        line-height: 42px;
        width: 32%;
        text-align: center;
        font-size: $font-size-medium-x;
        box-sizing: border-box;
      }

      .active {
        border-bottom: 2px solid #EA8910;
      }
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.type-list-enter-active, .type-list-leave-active {
  transition: all 0.3s;
}

.type-list-enter, .type-list-leave-to {
  transform: translate3d(100%, 0, 0);
}

@keyframes type-list-clild-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
