import { Component, Vue } from './ext-nb'
import LoadingBar from './packages/loading-bar'
import ah from 'ajax-hook'

@Component({
  components: {
    LoadingBar
  }
})
class App extends Vue {
  progress = 0
  error = false

  errorDone () {
    this.error = false
  }

  progressDone () {
    this.progress = 0
  }

  created () {
    let timer = 0

    ah.hookAjax({
      // hook callbacks
      onreadystatechange: (xhr: XMLHttpRequest) => {
        if (xhr.readyState === xhr.DONE) {
          clearTimeout(timer)
          this.progress = 100
        }
      },
      // hook function
      open: () => {
        this.progress = 60
        timer = window.setTimeout(() => {
          this.progress = 95
        }, 800)
      }
    })
  }


  render () {
    return (
        <div id='app'>
          <LoadingBar
              errorDone={this.errorDone}
              progressDone={this.progressDone}
              progress={this.progress}
              error={this.error}/>
          <router-view/>
        </div>
    )
  }
}

export default App

