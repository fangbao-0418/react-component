import React from 'react'
import * as pilipa from 'pilipa2'

import { AutoComplete } from '../components'
const { DropDown } = pilipa

export default class extends React.Component {
  constructor () {
    super()
    this.data = [{
      key: 1,
      title: '爱康鼎科技有限公司'
    }, {
      key: 2,
      title: '噼里啪智能财税'
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
        <AutoComplete
          data={this.data}
        />
      </div>
    )
  }
}
