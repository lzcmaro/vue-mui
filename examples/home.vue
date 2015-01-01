<template>
  <section class="page-demo">
    <div v-for="group in navs">
      <h3 class="page-title" v-text="group.title"></h3>
      <mui-list
        v-for="item in group.list"
        :to="item.path"
        is-link>
        <div slot="title">
          <i :class="['indexicon', 'icon-' + item.icon]"></i>
          <span>{{ item.name }}</span>
        </div>
      </mui-list>
    </div>
  </section>
</template>

<style lang="less">
  .page-demo {
    padding-bottom: 50px;

    .indexicon {
      font-size: 22px;
      color: #26a2ff;
      display: inline-block;
      width: 30px;
      vertical-align: middle;

      &.icon-swipe {
        font-size: 26px;
      }

      &.icon-checklist {
        font-size: 18px;
      }
    }
  }
  .page {
    .title {
      font-size: 20px;
      margin: 20px auto;
      text-align: center;
      display: block;
      line-height: 1;
    }

    .part {
      margin-bottom: 15px;
    }
  }
</style>

<script type="text/babel">
  import navs from './navs.json'

  export default {
    data() {
      return {
        navs: []
      }
    },

    created() {
      this.navs = navs
    }
  }
</script>
