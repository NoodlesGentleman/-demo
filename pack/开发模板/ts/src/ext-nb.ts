import { default as Ext } from 'vue'
import { httpExtension } from './shared/interceptor/httpMeta'
import { format } from './shared/util/format'
import { AxiosRequestConfig } from 'axios'

// extending default vue instance with some more stuff
export class Vue extends Ext {
  static get http () {
    return httpExtension
  }

  get $http () {
    return httpExtension
  }

  get $format () {
    return format
  }

  $filter () {
    console.log(this)
  }
}

export {
  Inject,
  Provide,
  Model,
  Prop,
  Component,
  Watch,
  Emit
} from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface VueConstructor {
    options: {
      name: string
    },
    cid: string
  }
}

declare module 'axios' {
  interface AxiosRequestConfig {
    notifyMessage?: string
  }
}
