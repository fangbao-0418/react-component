import React from 'react'
import * as pilipa from 'pilipa2'
import 'pilipa/dist/pilipa.min.css'
// const context = require.context('../components', true, /\.styl$/)
// context.keys().forEach(context)
console.log(pilipa, 'pilipa')
const { DropDown } = pilipa
export default class App extends React.Component {
  constructor () {
    super()
    this.data = [{
      key: 1,
      title: '222'
    }]
  }
  render () {
    return (
      <div>
        <DropDown
          data={this.data}
          callBack={(item) => {
            console.log(item)
          }}
        />
      </div>
    )
  }
}
