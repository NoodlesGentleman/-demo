/**
 * Created by slipkinem on 3/1/2018 at 11:40 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import Circle from './Circle'

export default class CurrentCircle extends Circle {
  constructor (x: number, y: number) {
    super(x, y)
  }

  drawCircle (ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2
    ctx.arc(this.x, this.y, this.r, 0, 360)
    ctx.closePath()
    ctx.fillStyle = 'rgba(45, 120, 244, ' + (~~(Math.random() * 100) / 100) + ')'
    ctx.fill()
  }

}
