<template>
  <div class="turnplate">
    <canvas id="wheelcanvas" width="400px" height="400px" :style="{transform:'rotate(' + rotateAngle + 'deg)'}"></canvas>
    <img class="pointer" src="../../common/image/bigwheel/start.png" @click='rotateFn'/>
    <p class="loadingBtn" v-if="flag">请稍等...</p>
  </div>
</template>

<script>
import { baseUrl } from '@/config/env.js'
import { getResultIndex, getPrizeList } from '@/api/prizedraw'
export default {
  props: {
    prizeList: {
      type: Array,
      default: () => []
    },
    imgarr: {
      type: Array,
      default: () => []
    },
    code: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      turnplate: {
        outsideRadius: 192,
        textRadius: 165,
        insideRadius: 68,
        startAngle: -Math.PI / 2 // 转盘的起始状态
      },
      flag: true, // ”请稍等“提示信息是否出现
      btnFlag: true, // 避免多次点击抽奖按钮，true 为可再次点击，false 表示不能再次点击
      startDegree: 0, // 初始旋转角度
      rotateAngle: 0, // 将要旋转的角度
      resultAngle: [], // 不同奖品对应要停的角度(单位：deg)
      nameArr: [], // 存放所有奖品prizeName的数组
      prizeData: [], // 中奖数据
      prizeMsg: '', // 机会提示
      resultIndex: -1 // 接口返回得奖品名称对应的下标
    }
  },
  mounted () {
    getPrizeList().then(
      res => {
        this.prizeData = res.data.data// 页面加载成功的数据
        this.prizeMsg = res.data.msg
      }
    )
    // this.btnFlag = true
    document.querySelector('.pointer').onload = () => {
      this.flag = false // 加载完成后 ‘请稍等’ 消失
    }
    let prizeLength = this.prizeList.length
    // 根据奖品数量确定每一个奖品的度数(单位：deg)
    let baseAngle = +(180 / prizeLength).toFixed(1)
    for (let i = prizeLength - 1; i >= 0; i--) {
      this.resultAngle.push(baseAngle * (2 * i + 1))
    } // 旋转角度来获取奖品
    for (let j = 0; j < prizeLength; j++) {
      this.nameArr.push(this.prizeList[j].prizeName)
    }
    this.drawRouletteWheel()
    // this.btnFlag = false
  },
  methods: {
    rotateFn: function () {
      var time = new Date()
      var hour = time.getHours()
      console.log(hour)
      if (hour >= 0 && hour < 2) {
        this.$emit('notbeginning', '未开放')
        return
      }
      if (this.code === 4) { // 未注册 ，进入注册界面
        this.$emit('unregister', '未注册')
        return
      }
      if (!this.btnFlag) {
        return
      }
      this.btnFlag = false
      if (this.prizeData.personPrize === null) {
        this.$emit('nochance', this.prizeMsg) // 如果没有数据则表示没有机会
        this.btnFlag = true  // 第二次点击提示框继续弹出
        return
      }
      let prizeName = this.prizeData.personPrize.prizeName
      this.resultIndex = this.nameArr.indexOf(prizeName)
      if (this.resultIndex === -1) {
        alert('数据错误 请稍后重试')
        return
      }
      getResultIndex(this.prizeData.personPrize).then(res => { // 转盘转动时，再更新数据
        this.prizeData = res.data.data
        this.prizeMsg = res.data.msg
        this.$emit('sendlogId', this.prizeData.prizelogId)
        this.$emit('restchance', this.prizeMsg)
      })
      let randCircle = 6 // 至少旋转的圈数
      let rotateAngle = this.startDegree + randCircle * 360 + this.resultAngle[this.resultIndex] - this.startDegree % 360
      this.startDegree = rotateAngle // 设置下一次旋转的起始角度
      this.rotateAngle = rotateAngle // 驱动转盘旋转
      this.game_over(this.resultIndex)
    },
    game_over (index) {
      const canvas = document.getElementById('wheelcanvas')
      // 旋转动画执行完毕回调
      let transitionFlag = true
      canvas.addEventListener('webkitTransitionEnd', (e) => {
        // 判断解决重复触发问题
        if (e.target === e.currentTarget && transitionFlag) {
          transitionFlag = false
          setTimeout(() => { this.btnFlag = true }, 1000)
          this.$emit('prizeresult', index)
        }
      })
      canvas.addEventListener('transitionEnd', (e) => {
        if (e.target === e.currentTarget && transitionFlag) {
          transitionFlag = false
          setTimeout(() => { this.btnFlag = true }, 1000)
          this.$emit('prizeresult', index)
        }
      })
    },
    drawRouletteWheel () {
      let canvas = document.getElementById('wheelcanvas')
      if (canvas.getContext) {
        let arc = Math.PI / (this.prizeList.length / 2)
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, 422, 422)
        ctx.strokeStyle = '#FFBE04'
        ctx.font = '20px Microsoft YaHei'
        for (let i = 0; i < this.prizeList.length; i++) {
          let angle = this.turnplate.startAngle + i * arc
          ctx.fillStyle = i % 2 === 0 ? '#FCD94A' : '#FCC844'
          ctx.beginPath()
          ctx.arc(200, 200, this.turnplate.outsideRadius, angle, angle + arc, false)
          ctx.arc(200, 200, this.turnplate.insideRadius, angle + arc, angle, true)
          ctx.stroke()
          ctx.fill()
          ctx.save()
          ctx.fillStyle = '#E80013'
          let text = this.prizeList[i].prizeName
          ctx.translate(200 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 200 + Math.sin(angle + arc / 2) * this.turnplate.textRadius)
          ctx.rotate(angle + arc / 2 + Math.PI / 2)
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
          let img = document.createElement('img')
          img.src = baseUrl + this.imgarr[i]
          img.onload = () => {
            ctx.save()
            ctx.translate(200 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 200 + Math.sin(angle + arc / 2) * this.turnplate.textRadius)
            ctx.rotate(angle + arc / 2 + Math.PI / 2)
            ctx.drawImage(img, -36, 10, 72, 35)
            ctx.restore()
          }
          ctx.restore()
        }
      }
    }
  }
}
</script>

<style>
.turnplate{
    display: block;
    width: 64%;
    position: absolute;
    overflow: hidden;
    top: 23.2%;
    left: 17.3%;
}
#wheelcanvas{
    width: 100%;
    transition: transform 5s ease-in-out;
}
.pointer{
    position: absolute;
    width: 36%;
    height: 44%;
    left: 32.4%;
    top: 23.5%;
}
p.loadingBtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: white;
}
p.waitNet {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 6vw;
    padding: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.6);
}
</style>

