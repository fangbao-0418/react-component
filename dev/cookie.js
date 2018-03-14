import React from 'react'
import cookie from '../components/cookie'
export default class extends React.Component {
  toClick (type) {
    const date = new Date()
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * 1)
    cookie[type]({mmd: '嗯', bbd: 'no'}, {path: '/', expires: date})
    const status = cookie.get()
    alert(status)
  }
  toClick2 (type) {
    const a = cookie[type]('mmd')
    alert(a)
  }
  toClick3 (type) {
    const status = cookie.remove(['mmd', 'bbd'])
    alert(status)
  }
  render () {
    return (
      <div>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick.bind(this, 'set')}
        >
          setCookie
        </button>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick2.bind(this, 'get')}
        >
          getCookie
        </button>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick3.bind(this, 'removew')}
        >
          removeCookie
        </button>
      </div>
    )
  }
}
