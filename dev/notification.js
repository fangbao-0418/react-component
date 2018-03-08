import React from 'react'
import notification from '../components/notification'
// notification.config({
//   duration: 000
// })
export default class extends React.Component {
  toClick (type) {
    notification[type]({
      title: 'ceshisdfdsfdsfsfdsfdsfdsfdsfdsfdsfdsfdsffsdfd',
      message: 'ceshisdfdsfdsfsfdsfdsfdsfdsfdsfdsfdsfdsffsdfdsf'
    })
  }
  toClick2 (type) {
    notification[type]({
      message: 'ceshisdfdsfdsfsfdsfdsfdsfdsfdsfdsfdsfdsffsdfdsf'
    })
  }
  render () {
    return (
      <div>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick.bind(this, 'warning')}
        >
          warning
        </button>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick2.bind(this, 'success')}
        >
          success
        </button>
        <button
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick.bind(this, 'error')}
        >
          error
        </button>
      </div>
    )
  }
}
