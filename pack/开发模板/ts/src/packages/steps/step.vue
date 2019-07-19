<template>
  <div class="step">
    <span :class="[
    'step-tag',
    activeIndex === index ? 'active' : ''
    ]">{{title}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from '../../ext-nb'
import PkSteps from './steps.vue'
import { Prop } from 'vue-property-decorator'

@Component
export default class PkStep extends Vue {
  $parent: PkSteps
  index: number = -1
  activeIndex: number = -2

  @Prop()
  title: string

  beforeCreate () {
    this.$parent.steps.push(this)
  }

  beforeDestroy () {
    const steps = this.$parent.steps
    const index = steps.indexOf(this)
    if (index >= 0) {
      steps.splice(index, 1)
    }
  }

  mounted () {
    const unwatch = this.$watch('index', (val: number) => {
      this.$watch('$parent.active', this.updateStatus, { immediate: true })
      unwatch()
    })
  }

  updateStatus (val: number) {
    this.activeIndex = val
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/variable";

  .step {
    margin-right: 2em;

    &-tag {
      display: inline-block;
      padding: 1px 10px;
      border-radius: 3px;
      background: #eee;
      box-shadow: -4px 0 5px #999;
      cursor: pointer;
      position: relative;

      &:after {
        display: inline-block;
        vertical-align: middle;
        border: 12px solid transparent;
        border-left: 10px solid #eee;
        width: 0;
        height: 0;
        position: absolute;
        right: -21px;
        content: ' ';
      }

      &.active {
        background: $--color-primary;
        color: #fff;

        &:after {
          border-left: 10px solid $--color-primary;
        }
      }
    }
  }
</style>