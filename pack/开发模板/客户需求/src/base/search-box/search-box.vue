<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder" @focus="focus"/>
    <i @click.self="clear" v-show="query" class="icon-cancel"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入项目名'
      },
      querys: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        query: this.querys ? this.querys : ''
      }
    },
    methods: {
      clear() {
        this.query = ''
        this.blur()
        this.$emit('clear')
      },
      focus() {
        this.$emit('searchFocus')
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
      this.$watch('querys', newQuery => {
        this.query = this.querys
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 37px
    background: #fff
    border-radius: 20px
    .icon-search
      font-size: 15px
      color: #ddd
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      height: 35px
      background: rgba(250,250,250,.6)
      color: #ef654f
      font-size: 15px
      &::placeholder
        color: $color-background-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
    .icon-cancel
      width: 30px
      height: 100%
      line-height: 37px
      text-align: center  
</style>