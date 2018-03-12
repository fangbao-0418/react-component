import React from 'react'
import cookie from '../components/cookie'
export default class extends React.Component {
  toClick (type) {
    cookie[type]({name: 'hh1', time: 1, path: '/'})
    const status = cookie.getCookie()
    alert(status)
  }
  toClick2 (type) {
    const a = cookie[type]()
    alert(a)
  }
  toClick3 (type) {
    const status = cookie.removeCookie(['hh1', 'hh2'])
    alert(status)
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
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick3.bind(this, 'removeCookie')}
        >
          removeCookie
        </button>
      </div>
    )
  }
}
