<template>
  <div>
    <div class="project-list" v-if="projectList.length">
        <ul>
          <li class="item" :key="item" v-for="item in projectList">
            <div class="item-right"><!-- `/housePrice/houseDetail/${encodeURIComponent(item.project_name)}` -->
              <router-link :to="{path:'/houseDetail',query: {id: `${item.project_name}`}} " class="item-center">
                <div class="item-title">
                  <h2><span>{{item.project_name}}</span> <span>{{item.district}}</span></h2>
                  <div>
                    <div>
                      <p>成交套数： <span>{{item.count || '暂无'}}</span></p>
                      <p>平均总价： <span>{{item.total_price + '万元' || '暂无'}} </span></p>
                    </div>
                    <div>
                      <p>平均单价： <span>{{item.price + ' 元' || '暂无'}}</span> </p>
                      <p>物业类型： <span>{{item.uses || '暂无'}}</span></p>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      projectList: {
        type: Array,
        default: []
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .project-list
    .item
      margin-top: 10px
      .item-right
        display: inline-block
        box-sizing: border-box
        width: 100%
        .item-center
          font-size: $font-size-medium
          width: 100%
          box-sizing: border-box
          .item-title
            margin: 0 10px
            background: #fff
            border-radius: 4px
            overflow: hidden
            h2
              font-size: $font-size-large
              height: 40px
              background: #fe843e
              width: 100%
              line-height: 40px
              color: white
              box-sizing: border-box
              display: flex
              padding: 0 10px
              span
                width: 50%
                box-sizing: border-box
                &:last-child
                  text-align: right
            >div
              display: flex
              padding: 30px 0
              div
                width: 50%
                box-sizing: border-box
                border-right: 1px solid #eee
                padding-left: 20px
                &:last-child
                  border-right: none
                p
                  width: 100%
                  line-height: 20px
                  font-size: $font-size-medium
                  text-overflow: ellipsis
                  white-space: nowrap
                  overflow: hidden
                  box-sizing: border-box
                  span
                    color: #ff7242
</style>
