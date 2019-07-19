<template>
  <div class="result">
    <div class="toast">
      <img class="toastImg" :src="imgSrc" alt="" @click="close_toast">
      <p class="toastLoading" v-if="flag">请稍等...</p>
    </div>
    <div class="toast-mask"></div>
  </div>
</template>
<script>
import { baseUrl } from '@/config/env.js'
export default {
  props: {
    prizeAmount: {
      type: Number,
      default: 0
    },
    showAlertImg: {
      type: String,
      default: ''
    },
    isActivityEnd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imgSrc: baseUrl + this.showAlertImg,
      // imgSrc: this.showAlertImg,
      flag: true
    }
  },
  mounted () {
    let img = document.querySelector('.toastImg')
    img.onload = () => {
      this.flag = false
    }
  },
  methods: {
    close_toast () {
      if (!this.isActivityEnd) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style>
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: 88%;
  border-radius: 16px;
  overflow: hidden;
}
.toast img {
  width: 100%;
}
.toastLoading {
  font-size: 8vw;
  color: white;
  text-align: center;
}
</style>
