<template>
  <div id="call" v-if="clientInfo">
    <!-- <Poptip confirm title="确定挂断电话吗?" @on-ok="callback"> -->
      <Button type="error" shape="circle" icon="android-remove" style="margin-right: 10px;" @click="callback"></Button>
    <!-- </Poptip> -->
    <!-- <Poptip confirm :title="`确认拨打电话给用户${clientInfo.phone ? clientInfo.phone.split('(')[0] : ''}吗?`" @on-ok="call(clientInfo.phone.split('(')[0])"> -->
      <Button type="success" shape="circle" icon="ios-telephone" @click="call(clientInfo.phone.split('(')[0])"></Button>
    <!-- </Poptip> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['clientInfo'])
  },
  methods: {
    // 拨打电话
    call(phone) {
      this.$api.call(phone)
    },
    // 挂断电话
    callback() {
      this.$api.callback()
    }
  }
}
</script>


<style lang="stylus">
#call {
  position: absolute;
  left: 4.5rem;
  bottom: 0;
}
</style>
