import React from 'react'

import { AutoComplete, DropDown } from '../index'

export default class extends React.Component {
  constructor () {
    super()
    this.data = [{
      key: 1,
      title: '爱康鼎科技有限公司爱康鼎科技有限公司爱康鼎科技有限公司爱康鼎科技有限公司1'
    }, {
      key: 2,
      title: '噼里啪智能财税'
    }]
    let i = 0
    while (i < 100) {
      console.log(i)
      this.data.push({
        key: i,
        title: `测试数据${i}`
      })
      i++
    }
  }
  render () {
    return (
      <div>
        <DropDown
          style={{float: 'left', marginRight: '20px'}}
          data={this.data}
          callBack={(item) => {
            console.log(item)
          }}
          filter
        />
        <DropDown
          style={{float: 'left'}}
          data={this.data}
          callBack={(item) => {
            console.log(item)
          }}
          filter
        />
      </div>
    )
  }
}
