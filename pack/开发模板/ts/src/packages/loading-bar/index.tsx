/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
  * Licensed Under MIT (http://opensource.org/licenses/MIT)
  *
  * Vue 2 Loading Bar - Version 0.0.1
  *
  */
/**
 * Created by slipkinem on 12/18/2017 at 4:16 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from '../../ext-nb'
import { Prop, Watch } from 'vue-property-decorator'
import './index.scss'

@Component
export default class LoadingBar extends Vue {
  @Prop() id!: string

  @Prop()
  customClass: string

  @Prop({
    default: 0
  })
  progress: number

  // the direction of loading bar
  @Prop({
    default: 'right'
  })
  direction: string

  @Prop()
  error: boolean

  @Prop({
    required: true
  })
  errorDone: Function

  @Prop({
    required: true
  })
  progressDone: Function

  // To show
  show = true

  // binding class when it end
  full = false

  // state to animate the width of loading bar
  width = 0

  // indicate the loading bar is in 100% ( so, wait it till gone )
  wait = false

  // Error State
  myError = false

  @Watch('progress')
  onProgressChanged (val: number, old: number) {
    if (old !== val) {
      this.width = val
      setTimeout(() => {
        this.isFull()
      })
    }
  }

  @Watch('error')
  onErrorChanged (val: boolean, old: boolean) {
    if (old !== val) {
      if (val) {
        this.width = 100
        this.myError = true
        setTimeout(() => {
          this.isFull()
        })
      }
    }
  }

  // Check whether the proggress is full
  isFull () {
    // Full Indicator
    let isFull = this.width === 100

    // When the progress end or full
    if (isFull) {
      // Prevent new progress change
      this.wait = true

      // Start animate it
      setTimeout(() => {

        // animate when element removed
        this.full = true
        this.myError = false

        this.errorDone()

        setTimeout(() => {
          // remove bar element
          this.show = false
          // New Element is available to create now
          this.width = 0
          this.wait = false

          setTimeout(() => {

            // Show Bar
            this.full = false
            this.show = true

            this.progressDone()

          })

          // Duration to Waiting for slick hiding animation
        }, 250)

        // Duration is depend on css animation-duration of loading-bar
      }, 700)
    }
  }

  styling () {
    // When loading bar still in progress
    if (!this.wait) {
      return { width: `${this.width}%` }
      // When loading bar end
    } else {
      // Make it stuck at 100 to waiting the animation
      return { width: `100%` }
    }
  }

  render (): JSX.Element {
    let {
      direction, customClass, id,
      width, show, full, myError,
      styling
    } = this
    return (
        <div>
          {show ?
              <div id={id ? id : undefined}
                   class={
                     'LoadingBar LoadingBar--to_' + direction + ' ' +
                     (customClass ? customClass : '') +
                     (myError ? 'LoadingBar--error' : '') +
                     (full ? 'LoadingBar--full' : '')
                   }
                   style={styling()}>
                <div class='LoadingBar-glow'/>
              </div>
              : null}
        </div>
    )
  }

}
