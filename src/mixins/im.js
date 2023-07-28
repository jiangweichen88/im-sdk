// import store from '@/store'
import { get, set } from 'lodash-es'
import { getImAgens, getImAccountsAgent, setImOnline, getMySessions, getSessionsDetails, putReceived, sendMessagesAgent, sendMessagesCustomer } from '@/api/im'
import { msgType, sendStatus } from '@/dict'
// let IM_SERVER_URL = "ws://192.168.110.87:3000/nebula/im/ws";
let IM_SERVER_URL = 'ws://dev-im-ws.arccocc.com/nebula/im/ws'
let d = document,
  w = window
export default {
  data() {
    return {
      IM_SERVER_URL: ''
    }
  },
  mounted() {},
  methods: {
    handleScroll(e) {
      // console.log('handleScroll', e)
      // this.checkIfChildInParent()
      this.activeItem.messages
        .filter((v) => v.sendStatus == sendStatus.sending.id)
        .forEach((v) => {
          // const index = this.activeItem.messages.findIndex((item) => item.msgBizId == v.msgBizId)
          // this.$set(this.activeItem.messages, index, { ...this.activeItem.messages[index], sendStatus: sendStatus.offline_sending.id })
          // console.log(this.activeItem.messages.find((item) => item.msgBizId == v.msgBizId))
          // const flag=this.checkChildInViewport(v.msgBizId)
        })
    },
    checkChildInViewport(id) {
      const parentEl = this.$refs.scrollDiv.$el
      const childEl = this.$refs.scrollDiv.$el.querySelector('#' + id)
      const parentRect = parentEl.getBoundingClientRect()
      const childRect = childEl.getBoundingClientRect()
      if (childRect.top >= parentRect.top && childRect.bottom <= parentRect.bottom) {
        console.log('在')
        return true
      } else {
        console.log('不在')
        return false
      }
    },
    checkIfChildInParent() {
      const parentRect = this.$refs.scrollDiv.getBoundingClientRect()
      const childRect = this.$refs.childDiv.getBoundingClientRect()

      if (childRect.top >= 0 && childRect.bottom <= parentRect.height) {
        // 子元素的顶部在父元素的可见区域内
        console.log('子元素在父元素的上方可见区域')
      } else if (childRect.top < 0) {
        // 子元素完全在父元素的上方不可见区域
        console.log('子元素完全在父元素的上方不可见区域')
      } else if (childRect.bottom > parentRect.height) {
        // 子元素完全在父元素的下方不可见区域
        console.log('子元素完全在父元素的下方不可见区域')
      } else if (childRect.left >= 0 && childRect.right <= parentRect.width) {
        // 子元素的左边在父元素的可见区域内
        console.log('子元素在父元素的左侧可见区域')
      } else if (childRect.left < 0) {
        // 子元素完全在父元素的左侧不可见区域
        console.log('子元素完全在父元素的左侧不可见区域')
      } else if (childRect.right > parentRect.width) {
        // 子元素完全在父元素的右侧不可见区域
        console.log('子元素完全在父元素的右侧不可见区域')
      } else {
        // 子元素完全在父元素的中央可见区域
        console.log('子元素完全在父元素的中央可见区域')
      }
    },
    sendMessageButton() {
      this.fireSubmit()
    },
    fireSubmit() {
      // 登陆/认证后的才能发消息
      if (IMSDK.isLogined() && this.receiver) {
        console.log('isLogined')
        this.doSend()
      }
      // 没登陆的先登陆再说
      else {
        this.doLogin()
      }
    },
    doLogin() {
      // 登录用户名/id（请确保全局唯一）
      var _loginName = this.username
      // 登录密码/token
      var _loginPsw = this.password
      // 要提交给服务端的完整登陆认证信息JSON对象，请确保至少需要loginUserId字段（且字段名不能随意更改）
      // 具体字段见：http://docs.52im.net/extend/docs/api/mobileimsdk/server_tcp/net/x52im/mobileimsdk/server/protocal/c/PLoginInfo.html
      var loginInfo = { loginUserId: _loginName, loginToken: _loginPsw }
      console.log('登陆信息：', loginInfo)
      // 先尝试清空前次登陆的提示信息
      this.log('')
      if (_loginName) {
        this.log('登陆中....')

        // 【SDK调用第2步：提交登陆/认证信息】// TODO [2]
        IMSDK.loginImpl(loginInfo, this.IM_SERVER_URL, false)
        this.receiver = '222'
      } else {
        this.log('请输入登陆用户名！')
      }
    },
    createMsg(ps) {
      let msg = {
        ...ps,
        isSend: true,
        sender: 'system',
        createDate: new Date().getTime(),
        updateDate: new Date().getTime()
      }
      return msg
    },
    doSend() {
      var receiver = this.receiver
      var message = this.content

      // if there is a non-empty message and a socket connection
      if (receiver && message && IMSDK.isOnline()) {
        // 清空输入框
        this.content = ''

        // tell server to execute 'new message' and send along one parameter
        var p = MBProtocalFactory.createCommonDataSimple(message, IMSDK.getLoginInfo().loginUserId, receiver, -1)
        // 将本地发出的消息显示在消息列表
        // this.onIMData(p);

        // 将消息通过websocket发送出去
        // IMSDK.sendData(p);
        let ps = {
          messageBizId: 'msg_' + uuid.v1() + '_' + Date.parse(new Date()) / 1000,
          content: message,
          contentType: 'text',
          seq: this.activeItem.messages.length,
          sessionId: this.activeItem.session.id
        }
        // const tt=this.createMsg(ps)
        // this.onIMData(tt)
        const fn = this.isVisitor ? sendMessagesCustomer : sendMessagesAgent
        fn(ps).then((res) => {
          console.log(res, 'sendMessagesAgent')
          this.onIMData(res.data)
        })
      } else {
        if (!receiver) {
          window.alert('消息接收者是空的！')
        } else if (!message) {
          window.alert('要发送的内容是空的！')
        } else if (!IMSDK.isOnline()) {
          window.alert('online==false, 当前已离线，无法发送消息！')
        }
      }
    },
    onIMData(p, options) {
      console.log('收到了消息', 'onIMData', p, options)
      // 不应使用appendChild，因$mesage是jQuery对象，它的append方法就相当于DOM的appendChild
      const isSend = this.isVisitor ? get(p, 'sender') === 'customer' : get(p, 'sender') === 'agent'
      const data = isSend ? p : JSON.parse(p.dataContent).data
      if (!isSend && get(data, 'id') && get(data, 'msgType') !== msgType.isReceived.id) {
        putReceived(data.id).then((res) => {})
        let message = ''
        let _p = MBProtocalFactory.createCommonDataSimple(message, p.to, p.from, -1)
        _p.dataContent = JSON.stringify({ data: { ...data, msgType: msgType.isReceived.id } })
        console.log(_p, 'isReceived')
        // 将消息通过websocket发送出去
        IMSDK.sendData(_p)
      } else if (get(data, 'msgType') == msgType.isReceived.id) {
        console.log('对方已收到消息', data.msgBizId)
        setTimeout(() => {
          const index = this.activeItem.messages.findIndex((item) => item.msgBizId == data.msgBizId)
          this.$set(this.activeItem.messages, index, { ...this.activeItem.messages[index], sendStatus: sendStatus.received.id })
          console.log(this.activeItem.messages.find((item) => item.msgBizId == data.msgBizId))
        }, 100)
        return
      }
      this.activeItem.messages.push({
        ...data,
        isReceived: false,
        isLost: false
      })
      // 10s后对方未收到消息，则发送失败
      setTimeout(() => {
        const index = this.activeItem && this.activeItem.messages.findIndex((item) => item.msgBizId == data.msgBizId)
        if (index > -1 && this.activeItem.messages[index].sendStatus == sendStatus.sending.id) {
          this.$set(this.activeItem.messages, index, { ...this.activeItem.messages[index], sendStatus: sendStatus.failed.id })
          console.log(this.activeItem.messages.find((item) => item.msgBizId == data.msgBizId))
        }
      }, 10000)
      // this.messages.push({ ...p, isReceived: false, isLost: false });
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    /**
     * 消息未送达的回调事件通知。
     *
     * 【发生场景：比如用户刚发完消息但网络已经断掉了的情况下，表现形式如：就像手机qq或微信一样消息气泡边上会出现红色图标以示没有发送成功）.】
     * 【建议用途：应用层可通过回调中的指纹特征码找到原消息并可以UI上将其标记为“发送失败”以便即时告之用户。】
     *
     * 调用时传入的参数1 {Array<Protocal>}：由框架的QoS算法判定出来的未送达消息列表
     */
    onMessagesLost(lostMessages) {
      this.log('[DEMO] 收到了系统的未实时送达事件通知，当前共有' + lostMessages.length + '个包QoS保证机制结束，判定为【无法实时送达】唉😡！(原因是网络状况不佳或对方id不存在)', true)

      // 为这些成功送达的消息设置消息发送状态图标为“发送失败”的图标样式
      if (lostMessages) {
        for (var i = 0; i < lostMessages.length; i++) {
          var p = lostMessages[i]
          if (p && p.fp) {
            // var $sendStatusIcon = $('#' + p.fp)
            // if ($sendStatusIcon.length > 0) {
            //   $sendStatusIcon.removeClass()
            //   $sendStatusIcon.addClass('weui-icon-warn weui-icon_msg')
            // }
            // this.messages.find((item) => item.fp == p.fp).isLost = true
          }
        }
      }
    },
    onMessagesBeReceived(theFingerPrint) {
      console.log(theFingerPrint, 'theFingerPrint', '对方已收到消息')
      if (theFingerPrint != null) {
        // this.log(
        //   "[DEMO] 收到了对方已收到消息事件的通知喔😁，fp=" + theFingerPrint,
        //   true
        // );
        // this.messages.find((item) => item.fp == theFingerPrint).isReceived = true
        // this.rre
        // 设置消息发送状态图标为“发送成功”的图标样式
        // var $sendStatusIcon = $('#' + theFingerPrint)
        // if ($sendStatusIcon.length > 0) {
        //   $sendStatusIcon.removeClass()
        //   $sendStatusIcon.addClass('weui-icon-success weui-icon_msg')
        // }
      }
    },
    getIsme(p) {
      return p.from == IMSDK.getLoginInfo().loginUserId
    },
    log(message, toConsole) {
      // var logMsg = '☢ ['+formatDate(new Date(), 'MM/dd hh:mm:ss.S') + '] ' + message;
      var logMsg = toConsole
        ? '☢ [' + MBUtils.formatDate(new Date(), 'MM/dd hh:mm:ss.S') + '] ' + message
        : '🔆 ' + message + '<span class="msg-system-time">' + MBUtils.formatDate(new Date(), 'hh:mm:ss.S') + '</span>'
      if (toConsole) {
        console.debug(logMsg)
      } else {
        // 已登陆则将信息显示在聊天界面
        if (IMSDK.isLogined()) {
          //添加系统消息
          var html = ''
          html += '<div class="msg-system">'
          html += logMsg
          html += '</div>'
          var section = d.createElement('section')
          section.className = 'system'
          section.innerHTML = html

          // $messages.append(section)
          console.log('onIMDatasection2', section)
          this.messages.push(section.outerHTML)

          // scrollToBottom()
        }
        // 未登陆时则将信息显示在登陆框下方的提示区
        else {
          // showLoginHint(message)
        }
      }
    },
    onIMAfterLoginSucess() {
      // 将登出框隐藏并显示登陆成功后的聊天界面
      // d.getElementById('showusername').innerHTML = w.IMSDK.getLoginInfo().loginUserId
      // d.getElementById('loginbox').style.display = 'none'
      // d.getElementById('chatbox').style.display = 'block'
      // 刷新网络连接情况的ui显录
      // refreshConnectionStatus()
    },
    onIMAfterLoginFailed(isReconnect) {
      this.log('对不起，你' + (isReconnect ? '自动重连' : '登陆') + 'IM服务器失败了 ...', false)
    },
    onIMDisconnected() {
      this.log('Sorry，你掉线了 ...', false)

      // 刷新网络连接情况的ui显录
      // refreshConnectionStatus()
    },

    /**
     * 掉线重连成功时要调用的函数。
     *
     * 【补充说明】：在当前的演示代码中，本函数将被MobileIMSDK-H5框架回调，请见IMSDK.callback_reconnectSucess 回调函数的设置。
     * 【建议用途】：开发者可在此回调中处理掉线重连成功后的界面状态更新等，比如设置将界面上的“离线”文字更新成“在线”。
     */
    onIMReconnectSucess() {
      this.log('掉线自动重连成功了！', false)

      // 刷新网络连接情况的ui显录
      // refreshConnectionStatus()
    },

    /**
     * 本地发出心跳包后的回调通知（本回调并非MobileIMSDK-H5核心逻辑，开发者可以不需要实现！）。
     *
     * 调用时传入的参数：无参数；
     *
     * 【补充说明】：在当前的代码中，本函数将被MobileIMSDK-H5框架回调，请见IMSDK.callback_onIMPing 回调函数的设置。
     * 【建议用途】：开发者可在此回调中处理底层网络的活动情况。
     */
    onIMPing() {
      // log('[DEMO] 本地心跳包已发出。', true);
    },
    onIMPong() {
      // log('[DEMO] 收到服务端的心跳包反馈！', true);

      // 绿色呼吸灯效果（表示心跳在后面正常工作中...）
      this.setConnectionStatusIconLight(true)
      setTimeout(() => {
        this.setConnectionStatusIconLight(false)
      }, 500)
    },

    /**
     * 让浏览器滚动条保持在最低部。
     */
    scrollToBottom() {
      // w.scrollTo(0, $messages.height())
      // this.$refs.scrollDiv.scrollTo(0, this.$refs.scrollDiv.scrollHeight)
      // console.log(this.$refs.scrollDiv.$el.scrollHeight, this.$refs.scrollDiv)
      this.$refs.scrollDiv.$el.scrollTop = this.$refs.scrollDiv.$el.scrollHeight
    },

    //************************************************************ 【4】Demo的具体功能实现代码 END

    //************************************************************ 【5】Demo的网络状态ui显示代码 START

    /**
     * 刷新网络连接状态UI显示。
     */
    refreshConnectionStatus() {
      // var currentStatusOBJ = $("#chatbox_header_userinfo");
      // // var destOBJ = $('#netstatusicon');
      // if (IMSDK.isOnline()) {
      //   currentStatusOBJ.removeClass("net_warn");
      //   currentStatusOBJ.addClass("net_ok");
      //   currentStatusOBJ.attr("title", "网络连接：[连接正常]");
      //   // destOBJ.text('通信正常');
      // } else {
      //   currentStatusOBJ.removeClass("net_ok");
      //   currentStatusOBJ.addClass("net_warn");
      //   currentStatusOBJ.attr("title", "网络连接：[已断开]");
      //   // destOBJ.text('连接已断开');
      // }
    },

    /**
     * 网络心跳呼吸灯效果。
     *
     * @param isLight true表示显示的黄色“亮”效果
     */
    setConnectionStatusIconLight(isLight) {
      // var obj = $("#netstatusicon");
      // if (isLight) obj.addClass("light");
      // else obj.removeClass("light");
    },
    init() {
      //************************************************************ 【1】Demo的全局变量定义 END

      //************************************************************ 【2】设置MobileIMSDK-H5的回调函数 START
      //** 【SDK调用第1步：设置回调函数】// TODO [1]

      // 开启或关闭SDK的核心算法层Log输出，建议仅在调试时设为true
      IMSDK.setDebugCoreEnable(false)
      // 开启或关闭SDK的框架内部Log输出，建议仅在调试时设为true
      IMSDK.setDebugSDKEnable(false)
      // 开启或关闭SDK的框架内部心跳包的Log输出，建议仅在调试时设为true
      IMSDK.setDebugPingPongEnable(false)
      // SDK核心IM框架的敏感度模式设置（默认是MBSenseMode.MODE_15S）
      MBKeepAliveDaemon.setSenseMode(MBSenseMode.MODE_5S)

      // 设置SDK的回调方法➊：用于debug的log输出
      IMSDK.callback_onIMLog = this.log
      // 设置SDK的回调方法➋：用于收到聊天消息时在UI上展现出来（事件通知于收到IM消息时）
      IMSDK.callback_onIMData = this.onIMData
      // 设置SDK的回调方法➌：服务端对客户端提交的登陆请求处理完成后的回调（事件通知于成功登陆/认证后）
      IMSDK.callback_onIMAfterLoginSucess = this.onIMAfterLoginSucess
      // 设置SDK的回调方法➍：客户端的登陆请求被服务端认证失败后的回调（事件通知于 登陆/认证 失败后）
      IMSDK.callback_onIMAfterLoginFailed = this.onIMAfterLoginFailed
      // 设置SDK的回调方法➎：网络连接已断开时的回调（事件通知于与服务器的网络断开后）
      IMSDK.callback_onIMDisconnected = this.onIMDisconnected
      // 设置SDK的回调方法➏：掉线重连成功后的回调（事件通知于掉线重连成功后）
      IMSDK.callback_onIMReconnectSucess = this.onIMReconnectSucess
      // 设置SDK的回调方法➐：本地发出心跳包后的回调通知（本回调并非SDK核心逻辑，开发者可以不需要实现！）
      // IMSDK.callback_onIMPing = this.onIMPing;
      // 设置SDK的回调方法➑：收到服务端的心跳包反馈的回调通知（本回调并非SDK核心逻辑，开发者可以不需要实现！）
      // IMSDK.callback_onIMPong = this.onIMPong;
      // 设置SDK的回调方法➒：消息未送达 的回调事件通知
      IMSDK.callback_onMessagesLost = this.onMessagesLost
      // 设置SDK的回调方法➓：消息已被对方收到 的回调事件通知
      IMSDK.callback_onMessagesBeReceived = this.onMessagesBeReceived
      //************************************************************ 【3】Demo的界面点击事件处理 START
      //** 添加键盘事件
      // $window.keydown(function (event) {
      //   // Auto-focus the current input when a key is typed
      //   if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      //     if (!IMSDK.isLogined()) {
      //       $inputMessage.focus()
      //     }
      //   }
      //   // When the client hits ENTER on their keyboard
      //   if (event.which === 13) {
      //     fireSubmit()
      //   }
      // })
      this.sendMessageButton()
    }
  }
}
