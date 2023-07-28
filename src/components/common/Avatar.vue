<template>
  <div v-if="letter" class="avatar-bg">{{ letter }}</div>
  <div v-else-if="!imgUrl" class="avatar" :class="{'avatar-letter':hasLetter}"></div>
  <img v-else class="w100" :src="imgUrl" alt="" />
</template>
<script>
export default {
  name: "",
  props: {
    imgUrl: {
      type: String,
      default: "",
    },
    hasLetter: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    letter() {
      return this.name[0] || "";
    },
  },
  methods: {},
};
</script>
<style scoped>
.avatar-bg {
  background: linear-gradient(180deg, #7389db 0%, #3f51b5 100%);
  border-radius: 50%;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-image: url("~@/assets/img/AvatarContact.png");
      background-repeat: no-repeat;
    background-size: contain;
}
.avatar-letter {
  background-image: url("~@/assets/img/AvatarSmall.png");
}
</style>
