<template>
  <div id="home">
    <Spin fix v-if="loading">
      <Button type="text" loading>加载中...</Button>
    </Spin>
    <div class="content" v-if="$route.query.key">
      <search />
      <table-data />
    </div>
  </div>
</template>

<script>
import Search from '@/components/search'
import TableData from '@/components/tableData'
import { mapGetters,mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loading', 'sideMenu', 'isLogin'])
  },
  mounted() {
    let timer = null
    // 获取侧边栏信息
    this.set_side_menu().then(() => {
      // 判断当前路由有无参数，没有就跳到第一个侧边栏的路由
      if (!this.$route.query.key) {
        timer = setInterval(() => {
          if (this.sideMenu[0]) {
            this.$router.push(`/home?key=${this.sideMenu[0].value[0].key}`)
            clearInterval(timer)
          }
        }, 30)
      }
    })
  },
  // 切换路由的时候判断当前路由有无参数，没有就跳到第一个侧边栏的路由
  beforeRouteUpdate(to, from, next) {
    if (!to.query.key) {
      next(`/home?key=${this.sideMenu[0].value[0].key}`)
    } else {
      next()
    }
  },
  methods: {
    ...mapActions(['set_side_menu'])
  },
  components: { Search, TableData }
}
</script>

<style lang="stylus" scoped>
</style>
