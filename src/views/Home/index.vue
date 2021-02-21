<template>
  <div class="page-container">
    <div class="page-header">App List</div>
    <div class="page-content">
      <div v-for="item in list" :key="item.name" class="page-card">
        <div class="sf-info">
          <div class="sf-logo">
            <img class="logo" :src="item.logoImg" />
          </div>
          <div class="sf-info-box">
            <div class="sf-info-item sf-name">{{ item.name }}</div>
            <div class="sf-info-item">Category：{{ item.category }}</div>
            <div class="sf-info-item">Compatibility：{{ item.compatibility }}</div>
            <div class="sf-info-item">Language：{{ item.language }}</div>
            <div class="sf-info-item">Price：{{ item.price }}</div>
          </div>
          <div class="sf-down">
            <a class="a-download" :href="item.url" target="_blank">Download</a>
          </div>
        </div>
        <van-collapse v-model="item.collapse" accordion>
          <van-collapse-item title="Introduction" :name="1">{{ item.introduction }}</van-collapse-item>
        </van-collapse>
      </div>
      <div class="info-foot">
        <div class="ft-title">
          Contact us
        </div>
        <div class="ft-cont">
          <p>
            <van-icon name="envelop-o" />
            2268920866@qq.com
          </p>
          <p>
            <van-icon name="envelop-o" />
            jackbettersli@gmail.com
          </p>
          <p>
            <router-link to="/policy" class="a-link">Privacy Policy</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dataSource from './data';
  export default {
    data() {
      return {
        list: dataSource.map(item => ({ ...item, collapse: 1 })),
      };
    },
  };
</script>

<style lang="less" scoped>
  .sf-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .sf-logo {
      padding: 10px;
      img {
        border-radius: 12px;
        height: 60px;
        width: 60px;
      }
    }
    &-box {
      font-size: 14px;
      color: #969799;
      // color: #666;
      flex: 1;
      padding: 10px;
    }
    &-item {
      padding: 3px 0;
      &.sf-name {
        color: #000;
        font-weight: bold;
        font-size: 16px;
      }
    }

    .sf-down {
      position: absolute;
      top: 5px;
      right: 5px;
      .a-download {
        border-radius: 12px;
        width: 80px;
        height: 24px;
        line-height: 24px;
        background: #00b294;
        color: #fff;
        font-size: 14px;
        display: block;
        text-align: center;
      }
    }
  }
  .info-foot {
    font-size: 14px;
    color: #999;
    text-align: center;
  }
</style>
