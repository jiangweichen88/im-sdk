<template v-if="activeItem.messages&&activeItem.messages.length">
  <div>
    <template v-for="item in activeItem.messages">
      <div v-if="item.contentType=='open_session'" class="msg-box tx-c padtb10">
        <div
          class="msg"
          style="background-color: #ECEDEE;border-radius: 2px;line-height:  24px;    width: auto;
    display: inline-block;
    padding: 0 16px;"
        >
          <span
            style="font-size: 12px;
font-family: Helvetica;
color: #808694;"
          >
            {{ item.updateDate | formatTime }} Open</span
          >
        </div>
      </div>
      <div v-else-if="activeItem.isVisitor?item.sender=='agent':item.sender=='customer'" class="visitors-box">
        <div class="visitors-item dis-f j-start">
          <Avatar :style="{'background':activeItem.color}" class="Avatar" :hasLetter="true" :name="customerName === 'Unknown' ? '' : customerName"> </Avatar>
          <div class="txt-box">
            <span style="" class="name">{{customerName }}</span>
            <div :id="item.msgBizId" class="txt" style="">
              {{ item.content }}
              <!-- Can I consult you if I have anything else Can I consult you if I have anything else Can I consult you if I have anything else Can I consult you if I have anything else -->
            </div>
          </div>
          <span class="read-time" style="">120s</span>
        </div>
      </div>
      <div v-else-if="activeItem.isVisitor?item.sender=='customer':item.sender=='agent'" class="me-box">
        <div class="visitors-item me-item dis-f j-end">
          <span class="read-time" style="">Read at 10:00</span>
          <div class="dis-f a-end">
            <i v-if="item.sendStatus==sendStatus.sending.id" class="weui-loading"></i>
            <i v-if="item.sendStatus==sendStatus.failed.id" class="el-icon-warning" style="color: red;"></i>
          </div>
          <div class="txt-box tx-r">
            <span style="" class="name">{{agentName }}</span>
            <div class="txt" style="">
              <span :id="item.msgBizId">
                {{ item.content }}
                <!-- Can I consult you if I have anything else Can I consult you if I have anything else Can I consult you if I have anything else Can I consult you if I have anything else -->
              </span>
            </div>
          </div>
          <Avatar class="Avatar" :hasLetter="true" :name="agentName === 'Unknown' ? '' : agentName"> </Avatar>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Avatar from "@/components/common/Avatar";
import {get} from 'lodash-es'
import {sendStatus} from '@/dict'
 export default {
  name: '',
  mixins: [],
  components: {Avatar},
  props: {
    activeItem: {
      type: Object,
      default: () => {
        messages: []
      }
    }
  },
  data () {
    return {
      sendStatus:sendStatus
    }
  },
  computed: {
    customerName() {
      return   get(this.activeItem,'customer.username')
    },
    agentName() {
     return get(this.activeItem,'agent.username')
    }
  },
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.Avatar {
  width: 36px;
  height: 36px;
  margin-right: 12px;
  flex-shrink: 0
}
.visitors-item {
  padding-right: 12%;
  margin-top: 12px;

  .name {
    font-size: 12px;
    font-family: Helvetica;
    color: #999999;
    line-height: 18px;
  }

  .txt-box {
    /* margin-right: 30%; */
    width: auto;
  }

  .txt {
    background: #ffffff;
    border-radius: 2px 6px 6px 6px;
    border: 1px solid #eeeeee;
    font-size: 14px;
    font-family: Helvetica;
    color: #111111;
    padding: 8px 12px;
    line-height: 22px;
    text-align: left;
        word-wrap: break-word;
  }

  .read-time {
    font-size: 12px;
    font-family: Helvetica;
    color: #666666;
    display: flex;
    align-items: end;
    padding: 0 2px 2px 0;
    white-space: nowrap;
  }
}

.me-item {
  padding-right: 0;
  padding-left: 20%;

  .txt-box {
    /* margin-right: 0;
    margin-left: 30%; */
  }

  .Avatar {
    margin-left: 10px;
    margin-right: 0;
  }

  .txt {
    border-radius: 6px 2px 6px 6px;
    background: #c0d8f6;
  }
}
.weui-loading {
  font-size: 16px;
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  background: transparent url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='80px' height='80px' viewBox='0 0 80 80' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Eloading%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='94.0869141%25' y1='0%25' x2='94.0869141%25' y2='90.559082%25' id='linearGradient-1'%3E%3Cstop stop-color='%23606060' stop-opacity='0' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23606060' stop-opacity='0.3' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient x1='100%25' y1='8.67370605%25' x2='100%25' y2='90.6286621%25' id='linearGradient-2'%3E%3Cstop stop-color='%23606060' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23606060' stop-opacity='0.3' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' opacity='0.9'%3E%3Cg%3E%3Cpath d='M40,0 C62.09139,0 80,17.90861 80,40 C80,62.09139 62.09139,80 40,80 L40,73 C58.2253967,73 73,58.2253967 73,40 C73,21.7746033 58.2253967,7 40,7 L40,0 Z' fill='url(%23linearGradient-1)'%3E%3C/path%3E%3Cpath d='M40,0 L40,7 C21.7746033,7 7,21.7746033 7,40 C7,58.2253967 21.7746033,73 40,73 L40,80 C17.90861,80 0,62.09139 0,40 C0,17.90861 17.90861,0 40,0 Z' fill='url(%23linearGradient-2)'%3E%3C/path%3E%3Ccircle id='Oval' fill='%23606060' cx='40.5' cy='3.5' r='3.5'%3E%3C/circle%3E%3C/g%3E%3CanimateTransform attributeName='transform' begin='0s' dur='1s' type='rotate' values='0 40 40;360 40 40' repeatCount='indefinite'/%3E%3C/g%3E%3C/svg%3E%0A") no-repeat;
  background-size: 100%;
}
</style>
