<template>
  <div class="picker-inline-container">
      <div class="picker-container" :style="'height:'+ height + 'px'">
          <div class="picker-inner">
            <PickItem v-for="name in Object.keys(optionGroups)"
              :name="name"
              :options="optionGroups[name]"
              :value="valueGroups[name]"
              :itemHeight="itemHeight"
              :columnHeight="height"
              :onChange="onChange"
              @click="handleItemClick">
            </PickItem>
            <div class="picker-highlight" :style="highlightStyles()"></div>
          </div>
      </div>
  </div>
</template>

<script>
import PickItem from './picker-item.vue';
export default {
  name: 'vui-picker',
  props: {
    optionGroups: {
      type: Object,
      required: true
    },
    valueGroups: {
      type: Object,
      required: true
    },
    itemHeight: {
      type: Number,
      default: 36
    },
    height: {
      type: Number,
      default: 216
    },
    onChange: {
      required: true,
      type: Function
    }
  },

  methods: {
    highlightStyles() {
      return (
        'height:' +
        this.itemHeight +
        'px;margin-top:' +
        -(this.itemHeight / 2) +
        'px'
      );
    },

    handleItemClick(option, name) {
      console.log('parent option:', option);
      console.log('parent name:', name);
      this.$emit('click', option, name);
    }
  },

  components: {
    PickItem
  }
};
</script>

<style lang="css">
.picker-container {
    z-index: 10001;
    width: 100%
}
.picker-container,
.picker-container *,
.picker-container:after,
.picker-container:before {
    box-sizing: border-box
}
.picker-container .picker-inner {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 100%;
    padding: 0 20px;
    font-size: 1.2em;
    -webkit-mask-box-image: linear-gradient(0deg, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent)
}
.picker-container .picker-column {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1;
    -ms-flex: 1 1;
    flex: 1 1;
    position: relative;
    max-height: 100%;
    overflow: hidden;
    text-align: center
}
.picker-container .picker-column .picker-scroller {
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out
}
.picker-container .picker-column .picker-item {
    position: relative;
    padding: 0 10px;
    white-space: nowrap;
    color: #999;
    overflow: hidden;
    font-size: 14px;
    text-overflow: ellipsis
}
.picker-container .picker-column .picker-item.picker-item-selected {
    color: #222
}
.picker-container .picker-highlight {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    pointer-events: none
}
.picker-container .picker-highlight:after,
.picker-container .picker-highlight:before {
    content: ' ';
    position: absolute;
    left: 0;
    right: auto;
    display: block;
    width: 100%;
    height: 1px;
    background-color: #d9d9d9;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5)
}
.picker-container .picker-highlight:before {
    top: 0;
    bottom: auto
}
.picker-container .picker-highlight:after {
    bottom: 0;
    top: auto
}

*,
:after,
:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box
}
.app-container,
.page,
body,
html {
    width: 100%;
    height: 100%
}
.page {
    max-width: 480px;
    margin: 0 auto;
    padding-top: 5px;
    background-color: #fbf9fe
}
.page-header {
    padding: 10px 0 5px
}
.page-header .page-title {
    text-align: center;
    font-size: 26px;
    font-weight: 400;
    color: #3cc51f
}
.page-body .description {
    padding: 0 15px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.4
}
.example-container {
    margin-bottom: 20px
}
.picker-modal-mask {
    top: 0;
    right: 0;
    z-index: 1;
    display: none;
    height: 100%;
    background: rgba(0, 0, 0, .6)
}
.picker-modal,
.picker-modal-mask {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%
}
.picker-modal {
    z-index: 2;
    background-color: #efeff4;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s
}
.picker-modal.picker-modal-toggle {
    -webkit-transform: translate(0);
    transform: translate(0)
}
.picker-modal header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    background-color: #fbf9fe
}
.picker-modal header .title {
    -webkit-box-flex: 1;
    -webkit-flex: 1 1;
    -ms-flex: 1 1;
    flex: 1 1;
    color: #888
}
.picker-modal header a {
    text-decoration: none;
    color: #04be02;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}

</style>
