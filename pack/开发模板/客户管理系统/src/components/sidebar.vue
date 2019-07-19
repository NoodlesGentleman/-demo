<template>
  <div id="sidebar">
    <Menu ref="sidebar" accordion :active-name="$route.query.key" :open-names="[openName]" theme="dark" width="150px" @on-select="goPage">
      <Submenu v-for="(item, index) in sideMenu" :name="item.key" :key="index">
        <template slot="title">
          {{item.key}}
        </template>
        <MenuItem style="padding-left: 30px; width:150px" v-for="(subItem, index) in item.value" :name="subItem.key" :key="index">
        <div @mouseenter="closeShow(subItem.key)" @mouseleave="closeHide">
          <span class="sub">{{subItem.value}}</span>
          <Button v-if="item.key==='临时任务' && close && subItem.key === mouseName" size="small" style="display: inline-block; color: #FFF" type="error" @click.stop="modal(subItem.key)" icon="trash-a">删除</Button>
        </div>
        </MenuItem>
      </Submenu>
    </Menu>
    <Modal v-model="modalShow" width="360">
      <p slot="header" style="color:#eb3816;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>删除的任务将不可找回</p>
        <p>确认删除吗?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="loading" @click="deleteTask()">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    modalShow: false,
    loading: false,
    timer: null,
    close: false,
    taskName: '',
    mouseName: ''
  }),
  computed: {
    ...mapGetters(['sideMenu', 'params']),
    // 计算当前需要展开的菜单
    openName() {
      for (let i = 0; i < this.sideMenu.length; i++) {
        for (let j = 0; j < this.sideMenu[i].value.length; j++) {
          if (this.$route.query.key === this.sideMenu[i].value[j].key) {
            return this.sideMenu[i].key
            break
          }
        }
      }
    }
  },
  methods: {
    // 显示删除
    closeShow(name) {
      this.mouseName = name
      this.timer = setTimeout(() => {
        this.close = true
      }, 1000)
    },
    // 隐藏删除
    closeHide() {
      clearTimeout(this.timer)
      this.close = false
    },
    // 显示删除确认框
    modal(name) {
      this.modalShow = true
      this.taskName = name
    },
    // 删除任务
    deleteTask() {
      this.loading = true
      this.$api.deleteTask({ taskName: this.taskName }).then(res => {
        this.$Message.success('删除成功')
        this.loading = false
        this.modalShow = false
        this.set_side_menu()
          // 需要跳转的路由参数
          let key = this.sideMenu[0].value[0].key

          if (this.$route.query.key === this.taskName) {
            this.$router.push(`/home?key=${key}`)
          }
      })
    },
    // 切换子菜单
    goPage(key) {
      // 清空当前用户
      this.$store.state.currentPhone = null
      this.$router.push(`/home?key=${key}`)
    }
  },
  watch: {
    // 当路由变化时重新计算侧边栏展开位置
    $route() {
      this.$nextTick(function() {
        this.$refs.sidebar.updateOpened()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#sidebar {
  width: 150px;
  height: calc(100% - 50px);
  position: absolute;
  background: #49505e;
  overflow-x: hidden;
  overflow-y: auto;

  .sub {
    display: inline-block;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
