<template>
  <div>
    <div class="project-list" v-if="projectList.length">
        <ul>
          <li @click.stop="projectDetail(item.id)" :key="index" class="item" v-for="(item, index) in projectList">
            <div tag="div" class="item-list" >
              <div class="item-img">
                <div class="item-new">
                  <img v-lazy="'http://sofmanager.fangsir007.com/image/' + item.list_chart">
                </div>
              </div>
            </div>
            <div class="item-right">
              <div class="item-center">
                <ul>
                  <li  class="p_name">{{item.project_name}} {{item.province}} {{item.city}}<span class="type"> {{item.type}}</span></li>
                   <li  style="overflow:hidden" class="p_area">{{item.area}}</li>
                  <li  class="p_district">{{item.district}}</li>
                 
                  <li v-if="item.brokerage != null" class="p_brokerage"><span>项目佣金：{{item.brokerage}}</span> <span class="between">|</span><span v-if="item.commission != null">个人佣金：{{item.commission}} </span></li>
                  <!--<li v-if="item.commission != null">个人佣金:{{item.commission}} </li>-->
                </ul>
              </div>
              <div class="cen-par-right">
                <a v-if="item.inStock === 0" @click.stop="linkTo(item.id)" class="cen-right">
                  <img :src="baobei" alt="" style="width:120px">
                </a>
                <a v-else @click.stop="fenxiao(item.project_name, item.id)" class="cen-right ">
                  <img :src="qiuhezuo" alt="" style="width:120px">
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import baobei from 'common/image/baobei.png'
import qiuhezuo from 'common/image/qiuhezuo.png'
export default {
  props: {
    projectList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      baobei: baobei,
      qiuhezuo: qiuhezuo
    }
  },
  methods: {
    linkTo(id) {
      this.$emit('buryingPoint', true)
      window.location = '/recommend?id=' + id
    },
    fenxiao(projectname, id) {
      this.$emit('projectnewest', {projectname, id})
    },
    projectDetail (id) {
      console.log(this.$route)
      if (this.$route.path === '/overseasList') {
        this.$emit('buryingPoint', false, 'over')
        this.$router.push({path: '/detail', query: {id: id, isover: 'over'}})
      } else {
        this.$emit('buryingPoint', false)
        this.$router.push({path: '/detail', query: {id: id, isover: 'no'}})
      }
      // this.$emit('buryingPoint', false, 'over')
      // this.$router.push({path: '/detail', query: {id: id, isover: 'over'}})
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .project-list
    .item
      background: #fff
      margin-top: 10px
      .item-list
        margin: 5px 0 0
        width: 100%
        .item-img
          padding: 0 10px
          img
            width: 100%
            height: 200px
      .item-right
        display: inline-block
        padding: 10px
        text-align: center
        display: flex
        .item-center
          font-size: $font-size-medium
          width: 63%
          padding-right: 5px
          box-sizing: border-box
          li
            width: 100%
            height 1.3rem;
            line-height: 20px
            font-size: $font-size-medium
            text-overflow: ellipsis
            white-space: nowrap
            text-align: left
          li.p_name
            color: #000000
            font-size: 18px
            .type
              display: inline-block
              width: 34px;
              height: 16px;
              line-height: 16px;
              background: rgba(237,249,239,1)
              border-radius: 5px
              color: #85B88D
              font-size: 10px
              text-align: center
              padding: 1px
              position: relative
              top: -2px
          li.p_area
            color: #000000
            font-size: 14px
          li.p_district
            color: #747474
            font-size: 11px
          li.p_brokerage
            color: #C2342D
            font-size: 11px
            color: #C2342D
            font-size: 11px
            .between
              color:rgb(237,237,237)
              padding-left:2px
              margin-right:2px
        .cen-par-right
          padding-top: 25px
          box-sizing: border-box
          width: 31%
          text-align: right
          .cen-right
            display: inline-block
            line-height: 40px
            color: white
            text-align: center
            border-radius: 5px
            font-size: $font-size-medium-x
            width: 100px
            text-decoration: none
            border: none
            padding: 1px
          .bg-color
            background-color: #0077ed
</style>
