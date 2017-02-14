<template>
  <div class="slider" id="swiper" v-on:touchstart="_swiperStart($event)" v-on:touchmove="_swiperMove($event)" v-on:touchend="_swiperEnd($event)">
    <div class="slide-group" style="min-height:120px;">
      <slot></slot>
    </div>
    <div class="slider-indicator" >
      <div  class="indicator " v-bind:class="{active: slideNumber == -(i - 1)}" v-for=" i in amount"></div>
    </div>
  </div>
</template>

<script>
import SlideItem from './slide'

export default {
  name: 'vui-swiper',
  data: function() {
    return {
      pageX: null,
      pageY: null,
      deltaX: null,
      deltaY: null,
      offsetX: null,
      lastSlide: null,
      startTime: null,
      resistance: null,
      isScrolling: null,
      timer: null,
      slider: null,
      firstItem: null,
      scrollableArea: null,
      sliderWidth: null,
      slideNumber: 0,
      animated: false,
      firstSlider: null,
      amount: null,
      crisisSlideWidth: 0
    }
  },
  components: {
    SlideItem
  },
  methods: {
    _getSlider: function(target) {
      var i;
      var sliders = document.querySelectorAll('.slider > .slide-group');

      for (; target && target !== document; target = target.parentNode) {
        for (i = sliders.length; i--;) {
          if (sliders[i] === target) {
            return target;
          }
        }
      }
    },
    _getScroll: function() {
      if ('webkitTransform' in this.slider.style) {
        var translate3d = this.slider.style.webkitTransform.match(/translate3d\(([^,]*)/);
        var ret = translate3d ? translate3d[1] : 0;
        return parseInt(ret, 10);
      }
    },
    _setSlideNumber: function(offset) {
      var round = offset ? (this.deltaX < 0 ? 'ceil' : 'floor') : 'round';
      this.slideNumber = Math[round](this._getScroll() / (this.scrollableArea / this.slider.children.length));
      this.slideNumber += offset;
      this.slideNumber = Math.min(this.slideNumber, 0);
      this.slideNumber = Math.max(-(this.slider.children.length - 1), this.slideNumber);
    },
    _nextSlider: function() {
      this.offsetX = this.slideNumber * this.sliderWidth;
      this.animated = true;
      var time = 300;
      var inteval = 10;
      var speed = -this.sliderWidth / (time / inteval);
      var scroll = this._getScroll();
      var that = this;

      var go = function() {
        if ((speed > 0 && parseInt(that._getScroll()) < that.offsetX) || (speed < 0 && parseInt(that._getScroll()) > that.offsetX)) {
          that.slider.style.webkitTransform = 'translate3d(' + (that._getScroll() + speed) + 'px,0,0)';
          setTimeout(go, inteval);
        } else {
          that.slider.style.webkitTransform = 'translate3d(' + that.offsetX + 'px,0,0)';
          if (scroll <= -that.crisisSlideWidth) {
            that.slider.style.webkitTransform = 'translate3d(0,0,0)';
            that.slideNumber = 0;
          }
          that.animated = false;
        }
      }
      go();
    },
    _autoSlide: function() {
      var that = this;
      if (this.timer != null) {
        this.timer = null;
      }
      this.timer = setInterval(function() {
        that.slideNumber--;
        that._nextSlider();
      }, 1000);
    },
    _swiperStart: function(e) {
      clearInterval(this.timer);
      this.timer = null;
      this.isScrolling = 'undefined';
      this.resistance = 1;
      this.lastSlide = -(this.slider.children.length - 1);
      this.startT = new Date();
      this.pageX = e.touches[0].pageX;
      this.pageY = e.touches[0].pageY;
      this.deltaX = 0;
      this.deltaY = 0;
      this._setSlideNumber(0);
      this.slider.style['-webkit-transition-duration'] = 0;
    },
    _swiperMove: function(e) {
      if (e.touches.length > 1) return;
      this.deltaX = e.touches[0].pageX - this.pageX;
      this.deltaY = e.touches[0].pageY - this.pageY;
      this.pageX = e.touches[0].pageX;
      this.pageY = e.touches[0].pageY;

      console.log('isScrolling', this.isScrolling);

      if (this.isScrolling === 'undefined') {
        this.isScrolling = Math.abs(this.deltaY) > Math.abs(this.deltaX);
      }

      if (this.isScrolling) {
        return;
      }

      this.offsetX = (this.deltaX / this.resistance) + this._getScroll();
      this.resistance = this.slideNumber === 0 && this.deltaX > 0 ? (this.pageX / this.sliderWidth) + 1.25 : this.slideNumber === this.lastSlide && this.deltaX < 0 ? (Math.abs(this.pageX) / this.sliderWidth) + 1.25 : 1;
      this.slider.style.webkitTransform = 'translate3d(' + this.offsetX + 'px,0,0)';
    },
    _swiperEnd: function(e) {
      if (!this.slider || this.isScrolling) {
        return;
      }
      this._setSlideNumber(
              (+new Date()) - this.startTime < 1000 && Math.abs(this.deltaX) > 15 ? (this.deltaX < 0 ? -1 : 1) : 0
      );
      this._nextSlider();
      this._autoSlide();
    }
  },
  mounted() {
    this.slider = this.$el.childNodes[0];
    this.firstItem = this.slider.childNodes[0];
    this.scrollableArea = this.firstItem.offsetWidth * this.slider.children.length;
    this.crisisSlideWidth = this.scrollableArea - this.firstItem.offsetWidth;
    console.log('crisisSlideWidth', this.crisisSlideWidth);
    this.sliderWidth = this.slider.offsetWidth;
    this.amount = this.slider.children.length;
    this._autoSlide();
    this.firstSlider = this.slider.childNodes[0];
  }
}
</script>

<style lang="less" scoped>
  .slider {
    overflow: hidden;
    position: relative;

    .slide-group {
    	position: relative;
	    font-size: 0;
	    white-space: nowrap;
	    -webkit-transition: all 0s linear;
	    -moz-transition: all 0s linear;
	    transition: all 0s linear;

	    .slide {
	    	display: inline-block;
		    width: 100%;
		    height: 100%;
		    font-size: 14px;
		    vertical-align: top;
	    }
    }

    .slider-indicator {
    	width:100%; position:absolute; bottom:8px; text-align:center; background:0 0;

    	.indicator {display:inline-block; width:10px; height:10px; margin:1px 3px; cursor:pointer; background:#ccc; border:1px solid #fff; border-radius:50%;}
    	.indicator.active {background:#29bc98;}
    }
  }
</style>