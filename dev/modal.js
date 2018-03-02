import React from 'react'
import modal from '../components/modal'
export default class extends React.Component {
  constructor () {
    super()
    this.modal = new modal({
      title: '修改文字'
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
        <button onClick={this.toClose.bind(this)}>关闭</button>
      </div>
    )
  }
}
