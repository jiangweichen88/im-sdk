<template>
  <!-- v-drag -->
  <div
    v-drag
    class="icon-box"
    style="    width: 30px;
    height: 30px;"
  >
    <div @click="onlineService" class="icon">在线客服</div>
    <div id="im-sdk-visitor" class="h100">
      <Sdk v-show="isShow" :isShow="isShow" />
    </div>
  </div>
</template>
<script>
import Sdk from './components/IM/index.vue'
import drag from "@/directive/drag";

export default {
  name: 'im-sdk-visitor',
  props: {},
  data() {
    return {
      isShow: false,
    }
  },
        directives: {
    drag,
  },
  components: {
    Sdk,
  },
  methods: {
    onlineService() {
      this.isShow = !this.isShow
    }
  },
}
</script>

<style scoped>
.icon-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #fff;
  z-index: 100;
}
.icon{
  background: red;
  font-size: 50px;
}
#im-sdk-visitor{
 height: 400px;
    width: 360px;
    position: absolute;
    top: -400px;
    left: -330px;
}
</style>
