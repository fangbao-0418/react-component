import React from 'react'

const context = require.context('../components', true, /\.styl$/)
context.keys().forEach(context)

const location = window.location.href
let hash
let Component
try {
  hash = location.match(/#([\w-]*)$/)[1]
  Component = require('./' + hash + '.js').default
} catch (e) {
  console.log('home page')
}
console.log(Component, 'component')
export default class App extends React.Component {
  mapDemo () {
    const demo = ['dropdown', 'auto-complete']
    const node = []
    demo.map((item, index) => {
      node.push(
        <li
          key={index}
          style={{
            cursor: 'pointer'
          }}
          onClick={() => {
            window.location.href = '/#' + item
            window.location.reload()
          }}
        >
          {item}
        </li>)
    })
    return node
  }
  render () {
    return (
      <div>
        {
          Component !== undefined &&
          <div>
            <h3
              style={{
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
              onClick={() => {
                window.location.href = '/'
              }}
            >
              返回列表
            </h3>
            <Component />
          </div>
        }
        {
          Component === undefined &&
          <div>
            <h3>组件demo</h3>
            <ul>
              {this.mapDemo()}
            </ul>
          </div>
        }
      </div>
    )
  }
}
