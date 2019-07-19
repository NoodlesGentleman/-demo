/**
 * Created by slipkinem on 4/12/2018 at 6:25 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
export class UploadResponse {
  message?: string
  path?: string
  result?: string
  code?: number
  codeDisplay?: string
}

export class PreserveUploadResponse extends UploadResponse {
  billCustomerId: number
  slipFullType: number
  slipId: number
}
