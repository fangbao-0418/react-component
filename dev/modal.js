import React from 'react'
import { findDOMNode } from 'react-dom'
import modal from '../components/modal'
class Content extends React.Component {
  toClick () {
    console.log(this)
    alert('xxx')
  }
  render () {
    return (
      <div>
        Content Component
        <button onClick={this.toClick.bind(this)}>点我</button>
      </div>
    )
  }
}
export default class extends React.Component {
  constructor () {
    super()
    this.modal = new modal({
      title: '修改文字',
      content: '<div>xxxx33</div>'
    })
    this.modal2 = new modal()
    // this.modal.show({
    //   title: '修改文字'
    // })
  }
  toClick () {
    this.modal.show({
      title: '修改文字'
    })
    // this.modal2.show()
  }
  toClose () {
    this.modal.hide()
  }
  render () {
    return (
      <div>
        <button onClick={this.toClick.bind(this)}>打开</button>
        <button
          onClick={this.toClick.bind(this)}
          style={{
            position: 'absolute',
            right: 0
          }}
        >
          打开
        </button>
        <button
          onClick={this.toClick.bind(this)}
          style={{
            position: 'absolute',
            right: '50%',
            top: '0'
          }}
        >
          打开
        </button>
        <button
          onClick={this.toClick.bind(this)}
          style={{
            position: 'absolute',
            right: '50%',
            top: '500px'
          }}
        >
          打开
        </button>
        <button onClick={this.toClose.bind(this)}>关闭</button>
      </div>
    )
  }
}
