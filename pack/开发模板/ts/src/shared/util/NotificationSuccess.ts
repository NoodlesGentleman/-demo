/**
 * Created by slipkinem on 5/10/2018 at 2:40 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Notification } from 'element-ui'

export const NotificationSuccess = (message = '操作成功') => Notification({
  title: '成功',
  message,
  type: 'success',
  duration: 3000
})
