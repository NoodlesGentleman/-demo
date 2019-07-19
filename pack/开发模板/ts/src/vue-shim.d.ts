declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.json' {
  const value: any
  export default value
}

declare var require: (files: Array<string> | string, resolve?: any) => any
declare var global: any

declare namespace JSX {
  interface Element {
  }

  interface ElementAttributesProperty {
    $props: any // Add type checking to component props
  }

  interface IntrinsicElements {
    [elemName: string]: any
  }
}
