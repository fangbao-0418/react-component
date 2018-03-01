import ClassNames from 'classnames'
import React from 'react'
export interface MyProps {
  className?: string
  style?: React.CSSProperties
}
class Demo extends React.Component<MyProps, any> {
  public defaultCls = 'pilipa-demo'
  public render () {
    const { className, style } = this.props
    return (
      <div className={ClassNames(this.defaultCls, className)} style={style}>
        voucher
      </div>
    )
  }
}
export default Demo
