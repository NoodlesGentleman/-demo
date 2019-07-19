<template>
  <div id="search">
    <Card :bordered="false">
      <p slot="title">
        <Spin v-show="contactCount.length === 0"></Spin>
        {{contactCount.dataTime}} 更新：昨日已联系
        <span>{{contactCount.yesterday}}</span> 人，今日已联系
        <span>{{contactCount.today}}</span> 人，系统推荐您
        <span>{{contactCount.commend}}</span> 人，还有
        <span>{{contactCount.contcat}}</span> 人未回访
      </p>
      <p>
        <tags style="font-size: 0.8rem;" label="标签" ref="tags" @add="handleAdd" @delete="handleDelete"></tags>
        <div class="rate">
          客户分级：
          <RadioGroup v-model="para.rate" type="button" size="small">
            <Radio label="A"></Radio>
            <Radio label="B"></Radio>
            <Radio label="C"></Radio>
            <Radio label="D"></Radio>
            <Radio label="">全部</Radio>
          </RadioGroup>
        </div>
        <span class="contact-time">
          联系时间：
          <span v-if="para.contact">
            最近&nbsp;
            <InputNumber :max="30" :min="1" v-model="para.day" size="small" style="width: 50px" /> &nbsp;天
          </span>
          <Tag v-if="!para.contact" color="green">所有时间</Tag>
          <RadioGroup v-model="para.contact">
            <Radio label="0">已联系</Radio>
            <Radio label="1">未联系</Radio>
            <Radio label="">全部</Radio>
          </RadioGroup>
        </span>
        <Button type="primary" icon="ios-search" size="small" @click="getData">搜索</Button>
      </p>
    </Card>
  </div>
</template>

<script>
import tags from '@/components/tags'
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    // 搜索默认参数
    para: {
      tags: [],
      day: 7,
      contact: '',
      rate: ''
    }
  }),
  computed: {
    ...mapGetters(['contactCount', 'params', 'currentPhone'])
  },
  methods: {
    ...mapActions(['getContactCount', 'getTableData']),
    // 初始化搜索参数
    init_parmas() {
      this.para = {
        tags: [],
        day: 7,
        contact: '',
        rate: ''
      },
      // 初始化标签
      this.$refs.tags.init_tags()
    },
    handleAdd(tags) {
      this.para.tags = tags
    },
    // 删除标签
    handleDelete(tags) {
      this.para.tags = tags
    },
    // 获取表格数据
    getData() {
      // 初始化当前手机号，防止搜索前点击过用户再点击搜索导致搜索出来的数据左右不一致
      if (this.currentPhone) {
        this.$store.state.currentPhone = ''
      }
      let para = {
        ...this.params,
        label: this.para.tags.length !== 0 ? this.para.tags.join(',') : null,
        day: this.para.day ? this.para.day : null,
        contact: this.para.contact,
        rate: this.para.rate ? this.para.rate : null
      }
      this.getTableData(para)
    }
  },
  mounted: function() {
    this.getContactCount()
  },
  components: { tags },
  watch: {
    // 监听是否切换侧边子菜单，若切换则初始化搜索参数
    $route() {
      this.init_parmas()
    }
  }
}
</script>

<style lang="stylus" scoped>
#search {
  width: 99%;
  margin: 5px auto;

  p {
    span {
      color: red;
    }
  }

  .contact-time {
    color: #333;
    display: inline-block;
    margin-top: 10px;
    font-size: 0.8rem

    span {
      color: #333;
    }

    span {
      margin-right: 10px;
    }
  }

  .rate {
    color: #333;
    margin-top: 10px;
    font-size: 0.8rem
  }
}
</style>
