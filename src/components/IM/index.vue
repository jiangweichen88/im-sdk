<template>
  <div
    class="chatbox-crm"
    style="    position: relative;
    height: 100%;"
  >
    <!--【整个聊天界面层（成功登录后显示）】-->
    <div class="h100 flex-col dis-f" style="flex-direction: column;">
      <!--【头部提示信息区】-->
      <div id="chatbox_header">
        <div id="chatbox_headerwrapper">
          <!-- <span class="chatbox_header_pname">MobileIMSDK-H5</span> -->
          <!-- <span class="chatbox_header_pversion">v6.4</span> -->
          <span id="chatbox_header_userinfo" class="net_warn">
            <span id="netstatusicon" class=""></span>登陆名：{{ username }}
            <!-- |<a id="logoutButton" href="javascript:;" style="color:#fff;d">退出</a>-->
          </span>
        </div>
      </div>

      <!--【聊天消息区】-->
      <!--【消息列表区】-->
      <!-- <div id="message" class="message message-box"> -->
      <!-- <template v-for="(p,index) in messages">
            <section v-if="p.fp" :class="[getIsme(p)?'user':'service']">
              <i v-if="p.isLost" class="weui-icon-warn weui-icon_msg"></i>
              <i v-if="getIsme(p)&&!p.isReceived" class="weui-loading"></i>
              <i v-else-if="getIsme(p)&&p.isReceived" class="weui-icon-success weui-icon_msg"></i>
              <div>{{p.dataContent}}</div>
              <span>{{ p.from}}</span>
            </section>
            <div v-else v-html="p"></div>
          </template>
        </div>
       <!-- 会话详情 -->
      <div class="message message-box flex1 pad10 " style="background: #F5F5F9;height: 0;">
        <Messages @scroll.native="handleScroll" class="h100 ovf-y-a" ref="scrollDiv" :activeItem="activeItem"></Messages>
      </div>
      <!-- 发送消息 -->
      <SendMsg style="    height: 128px;" @send="send"> </SendMsg>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import imMixin from "@/mixins/im";
import {
  getImAccountsCustomer,
  getImChatRoute,
  getImChats,
  sendMessagesCustomer,
  putReceived,
  getCustomerViewMessages,
} from "@/api/im";
import { get } from "lodash-es";
import Messages from "./Messages";
import SendMsg from "./SendMsg";
import { getToken,setToken } from '@/utils/auth'

export default {
  name: "",
  mixins: [imMixin],
  components: { Messages,SendMsg },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      username: "",
      password: "",
      receiver: "",
      content: "",
      messages: [],
      isVisitor: true,
      sessionId: "",
      activeItem: {},
      userInfo: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    // ...mapGetters(["userInfo"]),
  },
  watch: {
    isShow(val) {
        console.log(val, "isShow");
        if (val) {
         this.$nextTick (() => {
          this.scrollToBottom()
        }, 0);
        }
    }
  },
  created() {
    let imWebToken = getToken()
    console.log(imWebToken, 'getToken')
    if (!imWebToken) {
      setToken(uuid.v1())
    }
    getImAccountsCustomer({
      tenantId: 372,
      imWebToken: getToken(),
      appId: "1683716785230389249",
    })
      .then((res) => {
        console.log(res);
        this.IM_SERVER_URL = res.data.wsUrl;
        this.username = res.data.imAccount.username;
        this.password = res.data.token;
        this.$store.dispatch("user/setToken", res.data.token);
        const webClientId = 372;
        // return getImChatRoute({ webClientId });
        setToken('999')
        return getImChats();
      })
      // .then((res) => {
      //   //    "agentId": 0,
      //   // "groupId": 0
      //   const agentId = 1;
      //   return getImChats({ agentId: get(res.data, "agentId", agentId) });
      // })
      .then((res) => {
        console.log(res);
        const data = res.data;
        const typeData = get(data, data.result, {});
        console.log(typeData, "typeData");
        this.receiver = get(typeData, "imAccount.username", "2222");
        this.sessionId = get(typeData, "sessionId");
        return getCustomerViewMessages(this.sessionId);
      })
      .then((res) => {
        console.log(res, "getCustomerViewMessages");
        const data = res.data;
        this.activeItem = {
          messages: data.messageList,
          customer: {
            username: "客服",
          },
          agent: {
            username: "访客",
          },
          session:{id: this.sessionId},
          isVisitor: true,
          color: "#FF9300",
        };
        this.init();
      });
  },
  methods: {
       send(content) {
      this.content=content;
      this.doSend();
    },
  },

  mounted() {},
  destroyed() {},
};
</script>
<style scoped>
/* @import url("./weui/weui.css");
@import url("./index.css"); */
.chatbox-crm {
  background: #f0f2f6;
}
.chat-box {
height: 0;
    overflow: hidden;
}
</style>
