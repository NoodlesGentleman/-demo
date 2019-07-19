/**
 * Created by slipkinem on 4/18/2018 at 4:08 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import Papa from 'papaparse'

export const exporter = {
  isIE () {
    let match = navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/)
    return match !== -1
  },
  delay: 100,
  _downloadFile (fileName: string, csvContent: string, columnSeparator = ',',
                 exporterOlderExcelCompatibility = true,
                 exporterIsExcelCompatible = false) {
    let D = document
    let a = D.createElement('a')
    let strMimeType = 'application/octet-stream;charset=utf-8'
    let rawFile
    let ieVersion = this.isIE()

    if (exporterIsExcelCompatible) {
      csvContent = 'sep=' + columnSeparator + '\r\n' + csvContent
    }

    // IE10+
    if (window.navigator.msSaveBlob) {
      return window.navigator.msSaveOrOpenBlob(
          new Blob(
              [exporterOlderExcelCompatibility ? '\uFEFF' : '', csvContent],
              { type: strMimeType }),
          fileName
      )
    }

    if (ieVersion) {
      let frame = D.createElement('iframe')
      document.body.appendChild(frame)

      frame.contentWindow.document.open('text/html', 'replace')
      frame.contentWindow.document.write(csvContent)
      frame.contentWindow.document.close()
      frame.contentWindow.focus()
      frame.contentWindow.document.execCommand('SaveAs', true, fileName)

      document.body.removeChild(frame)
      return true
    }

    // html5 A[download]
    if ('download' in a) {
      let blob = new Blob(
          [exporterOlderExcelCompatibility ? '\uFEFF' : '', csvContent],
          { type: strMimeType }
      )
      rawFile = URL.createObjectURL(blob)
      a.setAttribute('download', fileName)
    } else {
      rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(csvContent)
      a.setAttribute('target', '_blank')
    }

    a.href = rawFile
    a.setAttribute('style', 'display:none;')
    D.body.appendChild(a)
    setTimeout(function () {
      if (a.click) {
        a.click()
        // Workaround for Safari 5
      } else if (document.createEvent) {
        let eventObj = document.createEvent('MouseEvents')
        eventObj.initEvent('click', true, true)
        a.dispatchEvent(eventObj)
      }
      D.body.removeChild(a)

    }, this.delay)
  },
  downloadFile<T> (fileName: string, data: T[], header?: string[]) {
    let csvContent = Papa.unparse(data)
    console.log(csvContent)
    this._downloadFile(fileName + '.csv', csvContent)
  }
}
