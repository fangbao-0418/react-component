import React from 'react'
import cookie from '../lib/cookie'
export default class extends React.Component {
  toClick (type) {
    cookie[type]('bug', 1)
    const status = cookie.getCookie('bug')
    alert(status)
  }
  toClick2 (type) {
    const a = cookie[type]()
    alert(a)
  }
  render () {
    return (
      <div>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick.bind(this, 'setCookie')}
        >
          setCookie
        </button>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick2.bind(this, 'getCookie')}
        >
          getCookie
        </button>
      </div>
    )
  }
}
