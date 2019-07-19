/**
 * Created by slipkinem on 4/11/2018 at 4:33 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component } from '../../../../../ext-nb'
import { BatchFileVo } from '../../model/BatchFileVo'
import { UploadVue } from '../../../../../factory/UploadVue'
import PkTypeahead from '../../../../../components/typeahead'

@Component({
  components: {
    PkTypeahead
  }
})
export default class BatchChange extends UploadVue {
  private showDialog = false
  private batchChange: BatchFileVo = new BatchFileVo()

  closeDialog () {
    this.showDialog = false
  }

  async openDialog () {
    this.batchChange.batchCode = await this.$http.get<string>('/System/getBatchCode')
    this.showDialog = true
  }

  submitUpload () {
    this.$refs.upload.submit()
  }

  submitAudit () {
    console.log('audit')
  }

}
