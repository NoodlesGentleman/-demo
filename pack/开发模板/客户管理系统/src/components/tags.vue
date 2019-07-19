<template>
  <div id="tags">
    <span v-if="!one">{{label}}：</span>
    <Tag color="blue" v-for="(item, index) in tags" :key="index" :name="item" :closable="add" @on-close="handleDelete(index)">{{item}}</Tag>
    <Button v-if="!inputShow && buttonShow && add" icon="plus" :type="one ? 'primary' : 'dashed'" size="small" @click="handleAdd">
      <span v-if="one">{{label}}</span>
    </Button>
    <Input v-if="inputShow" autofocus v-model="tagValue" size="small" style="width: 65px" @on-blur="addTag"></Input>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    data: Array,
    one: Boolean,
    add: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    buttonShow: true,
    inputShow: false,
    tagValue: '',
    tags: []
  }),
  mounted() {
    if (this.data) {
      this.tags = this.data
    }
  },
  methods: {
    // 显示添加标签输入框
    handleAdd() {
      this.inputShow = true
    },
    addTag() {
      let flag = false
      // 判断添加的标签的值是否为空，
      if (this.tagValue) {
        // 判断手机号是否有效
        if (this.label == '联系电话') {
          let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
          if (!reg.test(this.tagValue)) {
            this.$Message.error('无效的手机号')
            this.tagValue = ''
            this.inputShow = false
            this.buttonShow = true
            return
          }
        }
        // 判断是否只能添加一个标签
        if (this.one) {
          this.tags = []
          this.tags.push(this.tagValue)
          // 隐藏添加按钮
          this.buttonShow = false
        } else {
          // 判断添加的标签是否重复
          if (this.tags.length !== 0) {
            for (let i = 0; i < this.tags.length; i++) {
              if (this.tagValue !== this.tags[i]) {
                flag = true
              } else {
                flag = false
                this.$Message.error('标签名不能重复')
                break
              }
            }
            if (flag) {
              flag = false
              this.tags.push(this.tagValue)
            }
          } else {
            this.tags.push(this.tagValue)
          }
        }
      }
      this.tagValue = ''
      this.inputShow = false
      this.$emit('add', this.tags)
    },
    // 删除标签
    handleDelete(index) {
      this.tags.splice(index, 1)
      this.$emit('delete', this.tags)
      this.buttonShow = true
    },
    // 初始化标签
    init_tags() {
      this.tags = []
      this.inputShow = false
      this.buttonShow = true
    }
  },
  watch: {
    data(data) {
      this.tags = data
    }
  }
}
</script>
