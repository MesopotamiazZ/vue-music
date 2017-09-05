<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot><!-- slot是vue的插槽组件，引入slider的content内容会被放到插槽的位置 -->
      </slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from '../../common/js/dom'

  export default {
    props: {
      loop: { // 是否循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: { // 是否自动轮播
        type: Boolean,
        default: true
      },
      interval: { // 多少ms轮播
        type: Number,
        default: 4000
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._setSliderWidth()
        this._initSlider()
      })
    },
    methods: {
      _setSliderWidth() {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          console.log(sliderWidth)
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop) { // 如果要实现轮播无间隙循环播放，那么内部content要增加两个sliderWidth的宽度
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          click: true
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>