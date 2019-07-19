<template>
  <div id="table-left" v-if="clientInfo && tableData.length !== 0">
    <div class="search">
      联系手机：
      <Input v-model="phone" clearable style="width:120px;" size="small" />
      <Button type="primary" size="small" icon="ios-search" @click="searchPhone">搜索</Button>
      <Select v-model="order" style="width:90px; margin-left: 20px; float: right" size="small" @on-change="sort">
        <Option value="0">活跃度</Option>
        <Option value="1">联系时间 ⬆</Option>
        <Option value="2">联系时间 ⬇</Option>
      </Select>
    </div>
    <Table :row-class-name="rowClassName" border highlight-row :columns="columns" :data="tableData.data" @on-current-change="changeUser"></Table>
    <div class="page" v-if="pageShow">
      <Page className="p" :total="tableData.recordsTotal" size="small" :page-size="$config.limit" show-total @on-change="changePage"></Page>
    </div>
    <div class="offline-data">
      <Card :bordered="false">
        <p slot="title">线下资料</p>
        <p>
          <div>姓名：{{clientInfo.username}}</div>
          <div>工龄：{{clientInfo.workYears}}</div>
          <div>公司：{{clientInfo.com}}</div>
          <div>门店：{{clientInfo.storeName}}</div>
        </p>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    order: '0',
    phone: '',
    pageShow: true,
    oldTableData: [],
    oldPhone: '',
    isSearch: false,
    columns: [
      {
        title: '注册名',
        key: 'username',
        width: 90,
        render: function(h, params) {
          return h(
            'span',
            this.row.username.length && this.row.username.length > 3
              ? this.row.username.substring(0, 3) + '...'
              : this.row.username
          )
        }
      },
      {
        title: '电话',
        key: 'phone',
        width: 120
      },
      {
        title: '联系时间',
        key: 'createtime',
        width: 110
      },
      {
        title: '联系详情',
        key: 'msg',
        render: function(h, params) {
          return h(
            'Tooltip',
            {
              props: {
                placement: 'top'
              }
            },
            [
              h(
                'span',
                this.row.msg && this.row.msg.length >= 5
                  ? this.row.msg.substring(0, 5) + '...'
                  : this.row.msg
              ),
              h(
                'span',
                {
                  slot: 'content',
                  style: {
                    zIndex: 999,
                    whiteSpace: 'normal'
                  }
                },
                this.row.msg
              )
            ]
          )
        }
      }
    ]
  }),
  mounted: function() {
    // 获取表格数据
    if (this.$route.query.key) {
      let para = { ...this.params, sign: this.$route.query.key }
      this.getTableData(para)
    }
  },
  computed: {
    ...mapGetters(['tableData', 'clientInfo', 'params', 'currentPhone', 'contactList'])
  },
  methods: {
    ...mapActions(['getTableData', 'getClientInfo', 'getTimeline']),
    // 切换分页
    changePage(current_page) {
      document.getElementsByClassName('container')[0].scrollTop = 0
      let para = { ...this.params, start: current_page - 1 }
      this.getTableData(para)
    },
    // 搜索手机号
    searchPhone() {
      // 添加一个搜索标记
      this.isSearch = true
      // 保存旧数据
      this.oldTableData = this.tableData
      // 保存之前的回访客户的手机号码
      this.oldPhone = this.currentPhone
      // 防止选择客户后搜索手机右边客户信息错误
      this.$store.state.currentPhone = null
      // end

      let para = {
        order: 0,
        start: 0,
        length: this.$config.limit,
        phone: this.phone
      }
      this.getTableData(para)
    },
    // 排序
    sort() {
      let para = { ...this.params, order: this.order }
      this.getTableData(para)
    },
    // 选择用户
    changeUser(currentRow) {
      document.getElementsByClassName('container')[0].scrollTop = 0
      // 设置当前用户手机号
      this.$store.state.currentPhone = currentRow.phone
      // 回访记录请求参数
      let para = {
        phone: currentRow.phone,
        status: 1,
        start: 0,
        length: 100
      }
      // 获取客户信息
      this.getClientInfo(currentRow.phone)
      // 获取回访记录
      this.getTimeline(para)
    },
    // 判断当前需要高亮的位置
    rowClassName(row, index) {
      if (this.currentPhone) {
        if (row.phone === this.currentPhone) {
          return 'active'
        }
        if (this.contactList.indexOf(row.phone) >= 0) {
          return 'already-contact'
        }
      } else if (index === 0) {
        return 'active'
      }
    }
  },
  watch: {
    $route() {
      this.phone = ''
      // 初始化搜索参数
      let para = {
        oder: 0,
        start: 0,
        length: this.$config.limit,
        sign: this.$route.query.key
      }
      // 重置分页位置
      this.pageShow = false
      setTimeout(() => {
        this.pageShow = true
      }, 100)
      this.getTableData(para)

      document.getElementsByClassName('container')[0].scrollTop = 0
    },
    // 判断有没有点击 x 清空搜索手机号码
    phone(val) {
      let isKeyup = false
      let handle = () => {
        isKeyup = true
        // 移除键盘事件
        document.removeEventListener('keyup', handle, false)
      }
      // 监听键盘事件
      document.addEventListener('keyup', handle, false)
      // 如果之前有搜索过数据则返回上一个数据
      if (!isKeyup && !val && this.isSearch) {
        this.$store.state.tableData = this.oldTableData
        this.$store.state.currentPhone = this.oldPhone
        this.isSearch = false
      }
    }
  }
}
</script>

<style lang="stylus">
#table-left {
  overflow: hidden;

  .active {
    color: #FFF;

    td {
      background: #3c8bed;
    }
  }

  .already-contact {
    color: red;
  }

  th, td {
    text-align: center;
  }

  .search {
    padding-bottom: 15px;
    font-size: 0.8rem;
  }

  .page {
    position: relative;
    height: 30px;
    margin-top: 10px;
    margin-bottom: 5px;

    .p {
      position: absolute;
      right: 0;
    }
  }

  .offline-data {
    width: 100%;
    background: #fff;
    border-radius: 3px;

    div {
      border-bottom: 1px dashed #dddee1;
      padding: 5px;

      &:first-child {
        color: #333;
        font-size: 0.8rem;
      }

      &:last-child {
        border: none;
      }
    }
  }
}
</style>
