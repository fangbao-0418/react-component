import $ from 'jquery'
import React from 'react'
import { findDOMNode, render } from 'react-dom'

console.log(React)
export interface MyOptions {
  title?: string,
  content?: any
}
class Modal {
  public title: string = 'Modal'
  public content: any = <div>no message</div>
  public $el = $(document.createElement('div'))
  public defaultCls = 'pilipa-modal'
  public pageX = 0
  public pageY = 0
  public constructor (options: MyOptions = {}) {
    this.title = options.title || this.title
    this.content = options.content || this.content
    this.$el.addClass(this.defaultCls)
    $('body').on('click', (event) => {
      this.pageX = event.pageX
      this.pageY = event.pageY
    })
    console.log(options.content)
  }
  public initEvent () {
    this.$el.find('.pilipa-modal-close').unbind('click').click(() => {
      this.hide()
    })
    this.$el.find('.pilipa-modal-footer button').unbind('click').click((event) => {
      const index = $(event.target).index()
      if (index === 0) {
        this.hide()
      } else if (index === 1) {

      }
    })
    this.$el.find('.pilipa-modal-wrap').off('click').on('click', (event) => {
      if (this.$el.children('.pilipa-modal-wrap').find(event.target).length === 0) {
        this.hide()
      }
    })
  }
  public setTransformOrigin () {
    const offset = this.$el.find('.pilipa-modal-content').offset()
    const w = this.$el.find('.pilipa-modal-content').width()
    const h = this.$el.find('.pilipa-modal-content').height()
    let x = 0
    if (offset.left + w/2 > this.pageX) {
      x = offset.left - this.pageX
    } else {
      x = -(this.pageX - offset.left)
    }
    const y = offset.top - this.pageY
    this.$el.find('.pilipa-modal-content').css({
      transformOrigin: `${-x}px ${-y}px 0px`
    })
  }
  public show () {
    $('body').append(this.$el)
    this.$el.html(this.template())
    render(
      this.content,
      this.$el.find('.pilipa-modal-body')[0]
    )

    this.setTransformOrigin()
    this.$el.find('.pilipa-modal-mask').addClass('pilipa-fade-enter pilipa-fade-active')
    this.$el.find('.pilipa-modal-content').addClass('pilipa-zoom-enter pilipa-zoom-active')
    setTimeout(() => {
      this.$el.find('.pilipa-modal-mask').removeClass('pilipa-fade-enter pilipa-fade-active')
      this.$el.find('.pilipa-modal-content').removeClass('pilipa-zoom-enter pilipa-zoom-active')
    }, 200)
    this.initEvent()
  }
  public hide () {
    if ($('body').find(this.$el).length > 0) {
      this.$el.find('.pilipa-modal-mask').addClass('pilipa-fade-leave pilipa-fade-active')
      this.$el.find('.pilipa-modal-content').addClass('pilipa-zoom-leave pilipa-zoom-active')
      setTimeout(() => {
        this.$el.find('.pilipa-modal-mask').removeClass('pilipa-fade-leave pilipa-fade-active')
        this.$el.find('.pilipa-modal-content').removeClass('pilipa-zoom-leave pilipa-zoom-active')
        this.$el.remove()
      }, 200)
    }
  }
  public template () {
    return `
      <div class="${this.defaultCls}-mask"></div>
      <div class="${this.defaultCls}-wrap">
        <div class="${this.defaultCls}-content" style="">
          <div class="${this.defaultCls}-header">
            <span class="${this.defaultCls}-title">${this.title}</span>
            <span class="${this.defaultCls}-close">×</span>
          </div>
          <div class="${this.defaultCls}-body">xxx</div>
          <div class="${this.defaultCls}-footer">
            <button class="pilipa-btn pilipa-btn-default">取消</button>
            <button class="pilipa-btn pilipa-btn-warning">确定</button>
          </div>
        </div>
      </div>
    `
  }
}
export default Modal
