<template>
  <div class="">
    <el-form
        size="small"
        label-width="80px">
      <el-form-item :label="label">
        <PkTypeahead
            v-model="labelValue"
            :url="selectUrl"
            :prop="{
                   value: 'id',
                   label: 'name',
                   query: 'name'
                }"
            method="postParams"
        ></PkTypeahead>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from '../../../../ext-nb'
import PkTypeahead from '../../../../components/typeahead/index.tsx'
import { Watch } from 'vue-property-decorator'


@Component({
  name: 'GroupForm',
  components: {
    PkTypeahead
  }
})
export default class GroupForm extends Vue {

  @Prop({
    default: () => ''
  })
  label: string

  @Prop({
    default: () => 0
  })
  selectId: number

  @Prop({
    default: () => ''
  })
  selectUrl: string

  labelValue = []

  loading: boolean = false

  @Watch('labelValue')
  labelValueChange (value: number) {
    console.log(value)
    this.$emit('update:selectId', value)
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
