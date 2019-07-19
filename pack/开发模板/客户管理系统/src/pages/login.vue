<template>
  <div id="login">
    <transition name="form-fade" mode="in-out">
      <div class="login-box" v-show="showLogin">
        <div class="title">上富CRM 业务管理系统</div>
        <div class="name">
          <Input v-model="loginName" placeholder="用户名" clearable>
          <span slot="prepend">
            <Icon type="android-person"></Icon>
          </span>
          </Input>
        </div>
        <div class="password">
          <Input v-model="password" type="password" placeholder="密码" clearable>
          <span slot="prepend">
            <Icon type="locked"></Icon>
          </span>
          </Input>
        </div>
        <div class="login-btn">
          <Checkbox v-model="remember">
            <span>记住密码</span>
          </Checkbox>
          <Button type="primary" :loading="loading" @click="login">
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </Button>
        </div>
      </div>
    </transition>
    <div id="loginThree"></div>
  </div>
</template>

<script>
import THREE from '@/libs/three/three'
export default {
  data: () => ({
    loginName: '',
    password: '',
    remember: true,
    loading: false,
    showLogin: false,
    interval: null
  }),
  mounted: function() {
    this.showLogin = true
    this.init3D()
    // 回车登录
    document.addEventListener('keyup', e => {
      event.keyCode == '13' && this.login()
    })
    // 获取记住密码后的用户名和密码
    const user = localStorage.getItem('user')
    if (user) {
      this.loginName = JSON.parse(user).loginName
      this.password = JSON.parse(user).password
    }
  },
  methods: {
    // 登录
    login() {
      const para = {
        loginName: this.loginName,
        password: this.password,
      }
      this.loading = true
      this.$api
        .Login(para)
        .then(res => {
          this.$store.state.userInfo = res.data
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          // 记住密码
          if (this.remember) {
            localStorage.setItem('user', JSON.stringify(para))
          } else {
            localStorage.removeItem('user')
          }
          setTimeout(() => {
            this.loading = false
            this.$Message.success('登录成功')
            this.$router.push('/home')
          }, 500)
        })
        .catch(err => {
          setTimeout(() => {
            this.loading = false
          }, 500)
          return err
        })
    },
    init3D() {
      // 初始化3D动画
      var SCREEN_WIDTH = window.innerWidth
      var SCREEN_HEIGHT = window.innerHeight
      var SEPARATION = 90
      var AMOUNTX = 50
      var AMOUNTY = 50
      var container
      var particles, particle
      var count
      var camera
      var scene
      var renderer
      var mouseX = 0
      var mouseY = 0
      var windowHalfX = window.innerWidth / 2
      var windowHalfY = window.innerHeight / 2
      init()
      this.interval = setInterval(loop, 1000 / 60)
      function init() {
        container = document.createElement('div')
        container.style.position = 'relative'
        container.style.top = '200px'
        document.getElementById('loginThree').appendChild(container)
        camera = new THREE.Camera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000)
        camera.position.z = 1000
        scene = new THREE.Scene()
        renderer = new THREE.CanvasRenderer()
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
        particles = new Array()
        var i = 0
        var material = new THREE.ParticleCircleMaterial(0x097bdb, 1)
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++] = new THREE.Particle(material)
            particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2
            particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2
            scene.add(particle)
          }
        }
        count = 0
        container.appendChild(renderer.domElement)
        document.addEventListener('mousemove', onDocumentMouseMove, false)
        document.addEventListener('touchmove', onDocumentTouchMove, false)
      }
      function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX
        mouseY = event.clientY - windowHalfY
      }
      function onDocumentTouchMove(event) {
        if (event.touches.length == 1) {
          event.preventDefault()
          mouseX = event.touches[0].pageX - windowHalfX
          mouseY = event.touches[0].pageY - windowHalfY
        }
      }
      function loop() {
        camera.position.x += (mouseX - camera.position.x) * 0.05
        camera.position.y = 364
        var i = 0
        for (var ix = 0; ix < AMOUNTX; ix++) {
          for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++]
            particle.position.y =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50
            particle.scale.x = particle.scale.y =
              (Math.sin((ix + count) * 0.3) + 1) * 2 +
              (Math.sin((iy + count) * 0.5) + 1) * 2
          }
        }
        renderer.render(scene, camera)
        count += 0.1
      }
    }
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
  }
}
</script>

<style lang="stylus" scoped>
#login {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/login-bg.png');
  background-size: cover;

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1.5s;
  }

  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }

  .login-box {
    text-align: center;
    width: 250px;
    height: 250px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1000;

    .title {
      color: #fff;
      font-size: 0.8rem;
    }

    .name {
      margin-top: 20px;
    }

    .password {
      margin-top: 20px;
    }

    .login-btn {
      margin-top: 20px;
      color: #fff;
    }
  }

  #loginThree {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
