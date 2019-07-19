/**
 * Created by slipkinem on 5/15/2018 at 11:12 AM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import JSZip from 'jszip'
import { Vue } from '../../ext-nb'
import { multiDownloadFile } from './multiDownloadFile'
import _ from 'lodash'

export interface FileURL {
  url: string
  filename: string
}

export async function downloadZip (urls: Array<FileURL | string>, zipFilename = 'downloadFile.zip') {
  let zip = new JSZip()
  let promises = urls.map(file => {
    if (_.isString(file)) {
      file = {
        url: file,
        filename: file.substring(file.lastIndexOf('/') + 1, file.length)
      }
    }
    return Vue.http.request(file.url, {
      responseType: 'blob',
      baseURL: '/',
      headers: {
        common: {
          filename: file.filename
        }
      }
    })
  })
  const resList = await Promise.all(promises)
  resList.forEach(res => zip.file(res.config.headers.filename, res.data))
  let zipFile = await zip.generateAsync<'blob'>({ type: 'blob' })
  multiDownloadFile(zipFile, zipFilename)
}
