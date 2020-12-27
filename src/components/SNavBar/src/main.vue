<template>
  <div class="s-nav-bar">
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon name="weapp-nav" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
  export default {
    name: 'SNavBar',
    methods: {
      onClickLeft() {
        this.$toast('返回');
      },
      onClickRight() {
        this.$toast('按钮');
      },
    },
  };
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
