import { ElUpload } from 'element-ui/types/upload'

/**
 * Created by slipkinem on 4/11/2018 at 5:04 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */

export interface PKUpload extends ElUpload {
  submit: () => void
  clearFiles: () => void
}
