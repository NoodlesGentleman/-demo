/* eslint-disable */
export const main = {
  getPixelRatio(context) {
    var backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1
    return (window.devicePixelRatio || 1) / backingStore
  },

  // 绘制dom 元素，生成截图canvas
  htmlToCanvas(html2canvas, dom) {
    var width = dom.offsetWidth  // 获取(原生）dom 宽度
    var height = dom.offsetHeight // 获取(原生）dom 高

    var canvas = document.createElement('canvas')  // 创建canvas 对象
    var context = canvas.getContext('2d')
    var scaleBy = this.getPixelRatio(context)  // 获取像素密度的方法 (也可以采用自定义缩放比例)
    console.log('scaleBy', scaleBy)
    canvas.width = width * scaleBy   // 这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
    canvas.height = height * scaleBy  // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
    context.scale(scaleBy, scaleBy)

    var opts = {
      allowTaint: true, // 允许加载跨域的图片
      tainttest: true, // 检测每张图片都已经加载完成
      useCORS: true,
      scale: scaleBy, // 添加的scale 参数
      canvas: canvas, // 自定义 canvas
      logging: true, // 日志开关，发布的时候记得改成false
      width: width, // dom 原始宽度
      height: height // dom 原始高度
    }

    html2canvas(dom, opts).then(function (canvas) {
      console.log('html2canvas')
      // addDom.appendChild(canvas)
      try {
        var dataUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      } catch (error) {
        var errdataUrl = true
      }
      if (!errdataUrl) {
        dom.innerHTML = ''
        var image = new Image()
        image.crossOrigin = ''
        image.src = dataUrl
        console.log(document.body.clientWidth)
        image.width = document.body.clientWidth
        image.height = height
        dom.insertBefore(image, dom.childNodes[0])
        return true
      } else {
        return false
      }
    })
  }
}

