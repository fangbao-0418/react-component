import React from 'react'
import { SearchView, mount } from '../components'
import $ from 'jquery'
class Test extends React.Component {
  constructor () {
    super()
    this.state = {
      content: '123'
    }
  }
  toClick () {
    this.setState({
      content: '234'
    })
  }
  render () {
    return (
      <div onClick={this.toClick.bind(this)}>{this.state.content}</div>
    )
  }
}
export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      title: '222',
      message: '111'
    }
  }
  componentDidMount () {
    const el = $('<div>123</div>')
    this.searchView = mount({
      component: 'SearchView',
      props: {
        title: this.state.title,
        content: el
      },
      el: $('#search')
    })
  }
  toClick () {
    this.searchView.then(ins => {
      ins.trigger('panel-up')
    })
  }
  render () {
    return (
      <div id='search'>
      </div>
    )
  }
}
