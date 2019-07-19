/**
 * Created by slipkinem on 3/1/2018 at 11:34 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../ext-nb'
import CurrentCircle from './CurrentCircle'
import Circle from './Circle'

@Component({
  name: 'pk-canvas-bg'
})
export default class CanvasBg extends Vue {
  ctx: CanvasRenderingContext2D
  w: number
  h: number
  circles: Circle[] = []
  currentCircle = new CurrentCircle(0, 0)

  $refs: {
    canvas: HTMLCanvasElement
  }

  mounted () {
    let ctx = this.$refs.canvas.getContext('2d')
    ctx && (this.ctx = ctx)
    this.w = this.$refs.canvas.width = this.$refs.canvas.offsetWidth
    this.h = this.$refs.canvas.height = this.$refs.canvas.offsetHeight
    this.init(80)

    this.$refs.canvas.onmousemove = (e) => {
      e = e || window.event
      this.currentCircle.x = e.clientX
      this.currentCircle.y = e.clientY
    }
    this.$refs.canvas.onmouseout = () => {
      this.currentCircle.x = -99
      this.currentCircle.y = -99
    }
  }

  init (num: number) {
    for (let i = 0; i < num; i++) {
      this.circles.push(new Circle(Math.random() * this.w, Math.random() * this.h))
    }
    this.draw()
  }

  draw () {
    this.ctx.clearRect(0, 0, this.w, this.h)
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].move(this.w, this.h)
      this.circles[i].drawCircle(this.ctx)
      for (let j = i + 1; j < this.circles.length; j++) {
        this.circles[i].drawLine(this.ctx, this.circles[j])
      }
    }
    if (this.currentCircle.x) {
      this.currentCircle.drawCircle(this.ctx)
      for (let k = 1; k < this.circles.length; k++) {
        this.currentCircle.drawLine(this.ctx, this.circles[k])
      }
    }
    requestAnimationFrame(this.draw)
  }

}
