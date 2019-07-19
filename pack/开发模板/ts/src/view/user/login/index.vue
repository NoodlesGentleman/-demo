<!--
  @user slipkinem
  @date 3/1/2018
  @license Copyright © 2016, PuKang Health Maintenance Co.
 -->
<template>
  <div class="login">
    <pk-canvas-bg class="login-bg"></pk-canvas-bg>
    <header></header>
    <el-card class="section">
      <h2 class="section-title">普康健康</h2>
      <el-form ref="form" :label-position="'top'" label-width="100px">
        <el-form-item label="用户名">
          <el-input placeholder="用户名" v-model="username"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" placeholder="密码" v-model="password"/>
        </el-form-item>
        <el-form-item>
          <el-button round class="login-submit" nativeType="submit" type="primary" @click.prevent="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <footer></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from '../../../ext-nb'
import { locals } from '../../../shared/util/Storage'
import PkCanvasBg from '../../../packages/canvas-bg/index.vue'

@Component({
  name: 'Login',
  components: {
    PkCanvasBg
  }
})
export default class Login extends Vue {
  private username: string = ''
  private password: string = ''

  async login () {
    // assert(!_.isEmpty(this.username) || !_.isEmpty(this.password), '请填写用户名和密码')
    const res = await this.$http.postParams('/login', { username: this.username, password: this.password })
    // locals.setObject('loginInfo', res)
    locals.set('loginInfo', {
      userName: 'userName'
    }, 300 * 60)
    this.$router.push('/home')
  }
}


</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "index";
</style>
