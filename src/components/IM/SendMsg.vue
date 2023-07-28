<template>
  <div class="send-box-chat flex-col" style="height: 159px;">
    <div class="dis-f head-box a-center" style="height: 32px;padding:0 6px 0 16px;">
      <el-popover v-model="isEmojiPopoverShow" popper-class="popover-sdk" placement="top" style="padding: 0;" width="342" trigger="click">
        <Picker :showSearch="false" :showPreview="false" :showCategories="false" @select="addEmoji"></Picker>
        <i slot="reference" @click="emojiShow" class="iconfont icon-biaoqing"></i>
      </el-popover>
      <i class="iconfont icon-tupian"></i>
      <i class="iconfont icon-wenjian"></i>
      <div class="flex1 tx-r">
        <i class="iconfont icon-kuaijiehuifu"></i>
        <i class="iconfont icon-manyidu"></i>
        <i class="iconfont icon-fanyizuoxi"></i>
      </div>
    </div>
    <div class="content flex1 pos-r">
      <!-- v-focus -->

      <textarea
        v-focus
        id="textareaCrmSend"
        ref="myTextarea"
        v-model="content"
        placeholder="Type your message here"
        style="width: 100%;height: 100%;border: none;outline: none;resize: none;padding: 10px 16px;box-sizing: border-box;"
      ></textarea>
      <el-button class="pos-a" style="bottom:10px;right: 10px;" :disabled="!content||isSendDisabled" @click="send" type="primary">Send</el-button>
    </div>
    <div></div>
  </div>
</template>
<script>
import { Picker } from "emoji-mart-vue";

import focus from "@/directive/focus";
export default {
  name: '',
  mixins: [],
    directives: {
    focus,
  },
  components: {Picker},
  props: {},
  data () {
    return {
      content: '',
      isEmojiPopoverShow: false,
      isSendDisabled: false
    }
  },
  computed: {

  },
  watch: {},
  created() {

  },
  mounted() {

  },
  destroyed () {},
  methods: {
    send () {
      this.$emit('send', this.content)
      this.content = ''
    },
        setFocus() {
      // 获取textarea元素
      const textarea = this.$refs.myTextarea;
      // 获取光标位置
      const start = textarea.selectionStart;
      console.log(start, "start");
      this.startPos = start;
      textarea.focus(); // 设置焦点
      textarea.selectionStart = start; // 设置光标位置
    },
    emojiShow() {
      this.setFocus();
    },
    addEmoji(e) {
      console.log(e);
      this.isEmojiPopoverShow = false;
      // this.content += e.native;
      // this.insertText(e.native);
      this.insertVariable(e.native);
    },
        async insertText(val) {
      const textarea = this.$refs.myTextarea;
      // this.startPos = this.startPos + val.length;

      // 拼接字符
      this.content =
        this.content.substring(0, this.startPos) +
        val +
        this.content.substring(this.startPos, this.content.length);
      await this.$nextTick();
      textarea.focus(); // 设置焦点
      textarea.selectionStart = this.startPos + 1;
      // console.log(val.length, this.startPos + 1);
      textarea.selectionStart = this.startPos + val.length;

      // this.$nextTick(()=>{
      //   textarea.selectionStart=this.startPos;
      // })
    },
    async insertVariable(value) {
      const myField = document.querySelector("#textareaCrmSend");

      // const myField = this.$refs.singleText;

      console.log("myField--", myField);

      if (myField.selectionStart || myField.selectionStart === 0) {
        let startPos = myField.selectionStart;

        let endPos = myField.selectionEnd;

        this.content =
          myField.value.substring(0, startPos) +
          value +
          myField.value.substring(endPos, myField.value.length);

        await this.$nextTick();
        myField.focus();
        myField.setSelectionRange(endPos + value.length, endPos + value.length);
      } else {
        this.content = value;
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  .send-box-chat {
  .head-box {
    .iconfont {
      color: #494949;
      font-size: 18px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
