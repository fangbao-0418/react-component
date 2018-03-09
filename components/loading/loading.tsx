import $ from 'jquery'
import React from 'react'
import '../_util'
export default {
  $el: $('<div class="pilipa-loading"></div>'),
  hide () {
    $('.pilipa-loading-loading').fadeOut(10, () => {
      this.$el.remove()
    })
  },
  show () {
    this.$el.html(this.template)
    if ($('body').find(this.$el).length === 0) {
      $('body').append(this.$el)
    }
    $('.pilipa-loading-loading').lettering()
  },
  template () {
    return `
      <div class="pilipa-loading-mask">
        <h1 class="pilipa-loading-loading">loading...</h1>
      </div>
    `
  }
}
