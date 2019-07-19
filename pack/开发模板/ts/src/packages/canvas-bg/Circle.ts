/**
 * Created by slipkinem on 3/1/2018 at 11:37 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export default class Circle {
  x: number
  y: number
  r: number
  _mx: number
  _my: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
    this.r = Math.random() * 14 + 1
    this._mx = Math.random() * 2 - 1
    this._my = Math.random() * 2 - 1
  }

  drawCircle (ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 360)
    ctx.closePath()
    ctx.fillStyle = 'rgba(204, 204, 204, 0.2)'
    ctx.fill()
  }

  drawLine (ctx: CanvasRenderingContext2D, _circle: Circle) {
    let dx = this.x - _circle.x
    let dy = this.y - _circle.y
    let d = Math.sqrt(dx * dx + dy * dy)
    if (d < 150) {
      ctx.beginPath()
      ctx.moveTo(this.x, this.y) // 起始点
      ctx.lineTo(_circle.x, _circle.y) // 终点
      ctx.closePath()
      ctx.strokeStyle = 'rgba(204, 204, 204, 0.1)'
      ctx.stroke()
    }
  }

  move (w: number, h: number) {
    this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx)
    this._my = (this.y < h && this.y > 0) ? this._my : (-this._my)
    this.x += this._mx / 2
    this.y += this._my / 2
  }
}
