<template>
  <div class="pk-steps">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from '../../ext-nb'
import { Prop, Watch } from 'vue-property-decorator'
import { Step } from './model/Step'

@Component
export default class PkSteps extends Vue {
  steps: Step[] = []

  @Prop()
  active: number

  @Watch('active')
  onActiveChange (newValue: number, oldValue: number) {
    this.$emit('change', newValue, oldValue)
  }

  @Watch('steps')
  onStepsChange (newValue: Step[]) {
    newValue.forEach((child, index) => {
      child.index = index
    })
  }
}
</script>

<style scoped lang="scss">
  .pk-steps {
    display: flex;
  }
</style>