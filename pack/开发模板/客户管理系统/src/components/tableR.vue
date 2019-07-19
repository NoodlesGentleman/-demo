<template>
  <div id="table-right" v-if="clientInfo">
    <Card>
      <div>
        <div class="title">
          <Row>
            <Col span="8">注册时间：{{clientInfo.enrolTime}}</Col>
            <Col span="8">业务管家：{{clientInfo.managername}}</Col>
            <Col span="8">取关时间：{{clientInfo.unsubscribeTime || '未取关'}}</Col>
          </Row>
          <Row style="margin-top:3px;">
            <Col span="8">最后登录：{{clientInfo.loginTime}}</Col>
            <Col span="8">最后报备：{{clientInfo.reportTime || '无报备'}}</Col>
            <Col span="8">最后带看：{{clientInfo.lookTime || '无带看'}}</Col>
          </Row>
        </div>
        <div class="ob">
          <div>
            业务概览:
            <span v-if="clientInfo.business" v-for="(item, index) in clientInfo.business" :key="index">{{item}}</span>
            <span v-if="!clientInfo.business">暂无</span>
          </div>
          <div>
            最多浏览:
            <span v-if="clientInfo.projectCount" v-for="item in clientInfo.projectCount">{{item}}</span>
            <span v-if="!clientInfo.projectCount">暂无</span>
          </div>
          <div>
            最近浏览:
            <span v-if="clientInfo.recentProject" v-for="item in clientInfo.recentProject">{{item}}</span>
            <span v-if="!clientInfo.recentProject">暂无</span>
          </div>
          <div>
            筛选区域:
            <span v-if="clientInfo.area" v-for="item in clientInfo.area">{{item}}</span>
            <span v-if="!clientInfo.area">暂无</span>
          </div>
        </div>
      </div>
    </Card>
    <Card style="margin-top: 5px;">
      <div class="form">
        <Row>
          <Col span="3">从业状态：</Col>
          <Col span="21">
          <CheckboxGroup v-model="practiceStatuses">
            <Checkbox v-for="(item, index) in clientInfo.practiceStatuses" :key="index" :label="item.value" :disabled="clientInfo.managername === userInfo.username ? false : true"></Checkbox>
          </CheckboxGroup>
          </Col>
        </Row>
        <Row style="margin-top: 10px; display: flex; align-items: center; border-bottom: 1px dashed #dddee1; padding-bottom: 10px;">
          <Col span="24">
          <tags style="font-size: 0.6rem;" :add="clientInfo.managername === userInfo.username ? true : false" :data="clientInfo.labels" label="自定义标签" ref="diy_tags" @add="handleAdd" @delete="handleDelete"></tags>
          </Col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="10">
          <Row>
            <Col span="12">
            <span>姓名：{{clientInfo.username}}</span>
            </Col>
            <Col span="12" v-if="clientInfo.managername === userInfo.username">
            <tags ref="userName" one label="姓名备注" style="display: inline-block" @add="addUserName" @delete="deleteUserName"></tags>
            </Col>
          </Row>
          </Col>
          <Col span="14">
          <Row>
            <Col span="16" style="width:90%">
            <span>手机：{{clientInfo.phone}}</span>
            </Col>
            <!-- <Col span="8">
           <tags ref="phone" one label="联系电话" style="display: inline-block" @add="addPhone" @delete="deletePhone"></tags>
            </Col> -->
          </Row>
          </Col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="15">
          <Input v-model="msg" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="限500个字符以内"></Input>
          </Col>
          <Col span="8" style="margin-left: 5px; margin-top: 5px;">
          <span>身份：{{clientInfo.store}}</span>
          <Poptip confirm title="确定升为店长?" v-if="clientInfo.store == '店员'" style="margin-left: 5px; " @on-ok="setmanager" placement="bottom-end">
            <Button size="small" type="primary" :disabled="clientInfo.managername === userInfo.username ? false : true">提升</Button>
          </Poptip>
          <span v-if="clientInfo.store == '店长'">({{clientInfo.managerTime}})</span>
          <div class="rate">
            <RadioGroup v-model="rate" type="button" size="small">
              <Radio v-for="(item, index) in clientInfo.score" :key="index" :label="item.key" :disabled="clientInfo.managername === userInfo.username ? false : true"></Radio>
            </RadioGroup>
          </div>
          <Button type="primary" style="margin-top: 15px;" :loading="loading" @click="submit">
            <span v-if="!loading">提交</span>
            <span v-else>正在提交...</span>
          </Button>
          <call></call>
          </Col>
        </Row>
      </div>
    </Card>
    <Card style="margin-top: 5px;">
      <div class="timeline">
        <Timeline>
          <TimelineItem v-for="(item, index) in timeline" :key="index">
            <span>{{item.create_time}}</span>
            <span class="user">回访人：{{item.username}}</span>
            <Alert style="margin-top: 10px;">{{item.msg}}</Alert>
          </TimelineItem>
        </Timeline>
      </div>
    </Card>
  </div>
</template>

<script>
import tags from '@/components/tags'
import Call from '@/components/call'
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    loading: false,
    practiceStatuses: [],
    tags: [],
    rate: '',
    msg: '',
    boardRemark: {
      nameRemark: '',
      phoneRemark: ''
    }
  }),
  computed: {
    ...mapGetters([
      'params',
      'currentPhone',
      'tableData',
      'clientInfo',
      'timeline',
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'getTableData',
      'getContactCount',
      'getClientInfo',
      'getTimeline',
      'set_side_menu'
    ]),
    // 添加自定义标签
    handleAdd(tags) {
      this.tags = tags
    },
    // 删除标签
    handleDelete(tags) {
      this.tags = tags
    },
    // 添加备注姓名
    addUserName(tags) {
      this.boardRemark.nameRemark = tags.join('')
    },
    // 删除备注用户名标签
    deleteUserName(tags) {
      this.boardRemark.nameRemark = ''
    },
    // 添加备注联系电话
    addPhone(tags) {
      this.boardRemark.phoneRemark = tags.join('')
    },
    // 删除备注联系电话标签
    deletePhone(tags) {
      this.boardRemark.phoneRemark = ''
    },
    // 升级店长
    setmanager() {
      this.$api
        .setmanager({
          phone: this.currentPhone,
          openid: this.clientInfo.openid
        })
        .then(res => {
          this.$Message.success('升级店长成功')
          this.getClientInfo(this.currentPhone)
        })
    },
    // 提交
    submit() {
      this.loading = true
      let arr = []
      this.practiceStatuses.map(i => {
        this.clientInfo.practiceStatuses.map(j => {
          if (i == j.value) {
            arr.push(j.id)
          }
        })
      })
      let para = {
        addLabel: this.tags,
        addPractice: arr,
        boardRemark: this.boardRemark,
        phone: this.clientInfo.phone.split('(')[0]
      }
      // 修改客户信息（除评分等级，回访记录）
      this.$api.modifyClientInfo(para).then(res => {
        // 重新获取侧边栏信息
        this.set_side_menu()
        let para = {
          phone: this.clientInfo.phone.split('(')[0],
          score: this.rate
        }
        // 修改评分等级
        this.$api.modifyRate(para).then(res => {
          if (this.msg) {
            // 添加回访记录
            this.$api
              .addContact(this.clientInfo.phone.split('(')[0], {
                status: 1,
                msg: this.msg
              })
              .then(res => {
                this.msg = ''
                this.loading = false
                this.$Message.success('修改成功')
                this.set_side_menu()
                this.getContactCount()
                this.getTableData(this.params)
                if (
                 this.$store.state.contactList.indexOf(this.clientInfo.phone.split('(')[0]) < 0
                ) {
                  this.$store.state.contactList.push(
                    this.clientInfo.phone.split('(')[0]
                  )
                }
                document.getElementsByClassName('container')[0].scrollTop = 0
              })
          } else {
            document.getElementsByClassName('container')[0].scrollTop = 0
            this.$Message.success('修改成功')
            this.getClientInfo(this.clientInfo.phone.split('(')[0])
            this.loading = false
          }
        })
      })
    }
  },
  components: { tags, Call },
  watch: {
    // 刷新数据后需要展示的客户的信息
    tableData(state) {
      // 获取客户信息
      if (this.currentPhone) {
        this.getClientInfo(this.currentPhone)
      } else {
        this.getClientInfo(state.data[0].phone)
      }
      // 回访记录请求参数
      let para = {
        phone: this.currentPhone || state.data[0].phone,
        status: 1,
        start: 0,
        length: 100
      }
      // 获取回访记录
      this.getTimeline(para)
    },

    // 重新获取标签
    clientInfo(state) {
      // 初始化自定义标签
      this.$refs.diy_tags && this.$refs.diy_tags.init_tags()
      // 初始化备注姓名标签
      this.$refs.userName && this.$refs.userName.init_tags()
      // 初始化备注联系电话标签
      // this.$refs.phone && this.$refs.phone.init_tags()
      this.tags = state.labels
      this.practiceStatuses = []
      this.rate = ''
      state.practiceStatuses.map(i => {
        if (i.status) {
          this.practiceStatuses.push(i.value)
        }
      })
      state.score.map(i => {
        if (i.value) {
          this.rate = i.value
        }
      })
    }
  }
}
</script>

<style lang="stylus">
#table-right {
  margin-left: 5px;

  .title {
    font-size: 0.8rem;
    border-bottom: 1px dashed #dddee1;
    padding-bottom: 10px;
  }

  .ob {
    margin-top: 10px;
    font-size: 0.8rem;

    div {
      margin-top: 5px;

      span {
        margin-right: 5px;
      }
    }
  }

  .form {
    font-size: 0.8rem;

    .rate {
      margin-top: 10px;
    }
  }

  .timeline {
    overflow: hidden;

    .user {
      float: right;
    }
  }
}
</style>

