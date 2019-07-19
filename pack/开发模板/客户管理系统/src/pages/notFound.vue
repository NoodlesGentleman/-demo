<template>
  <div id="not-found">
    <div class="content">
      <img src="./../../static/404.jpg" alt="">
      <div>
        <span>{{time}}</span>秒后将返回首页...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    time: 3
  }),
  mounted() {
    let timer =setInterval(() => {
      this.time --
      if (this.time === 0) {
        clearInterval(timer)
        this.$router.push('/')
      }
    }, 1000)
  }
}
</script>


<style lang="stylus">
#not-found {
  img {
    width: 600px;
    height: 500px;
  }

  .content {
    width: 600px;
    height: 600px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    div {
      font-size: 1rem;
      text-align: center;
      margin-top: 1rem;

      span {
        color: red;
      }
    }
  }
}
</style>
