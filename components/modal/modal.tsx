import $ from 'jquery'
export interface MyOptions {
  title?: string
}
class Modal {
  public title: string = 'Modal'
  public $el = $(document.createElement('div'))
  public defaultCls = 'pilipa-modal'
  public pageX = 0
  public pageY = 0
  public constructor (options: MyOptions = {}) {
    this.title = options.title || this.title
    this.$el.addClass(this.defaultCls)
    $('body').on('click', (event) => {
      this.pageX = event.pageX
      console.log(event)
    })
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
  }
  public show () {
    console.log(this.pageX)
    this.$el.html(this.template())
    $('body').append(this.$el)
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
        <div class="${this.defaultCls}-content" style="transform-origin: 250px -50% 0px;">
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
