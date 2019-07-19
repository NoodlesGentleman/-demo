<template>
  <div id="navbar">
    <div class="title">
      上富业务管理系统
    </div>
    <div class="user">
      欢迎您：{{userInfo.username}}
    </div>
    <div class="sign-out">
      <Poptip confirm title="确定退出系统吗?" @on-ok="sign_out" placement="bottom-end">
        <Icon type="power" size="20" color="#eb3816"></Icon>
      </Poptip>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 退出
    sign_out () {
      this.$router.push('/login')
      localStorage.removeItem('userInfo')
    }
  }
}
</script>

<style lang="stylus">
#navbar {
  width: 100%;
  height: 50px;
  background: #373d41;
  position: relative;
  border-bottom: 1px solid #fff;

  .title {
    color: #fff;
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    text-indent: 1rem;
    font-weight: bold;
  }

  .user {
    position: absolute;
    height: 50px;
    line-height: 50px;
    right: 3.6rem;
    top: 0;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .sign-out {
    position: absolute;
    height: 50px;
    line-height: 50px;
    right: 1.2rem;
    top: 4px;
    cursor: pointer;
  }
}
</style>
