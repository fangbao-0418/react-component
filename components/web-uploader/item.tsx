import $ from 'jquery'
import React from 'react'
import bus from '../events'
export interface Props {
  item: string
  index: number
  removeImg?: (index: number) => void
}
export default class extends React.Component <Props, {}> {
  public deg = 0
  public componentWillMount () {
    console.log(bus, this)
  }
  public handleOpearte (type: string) {
    const $img = $(this.refs.img)
    switch (type) {
    case 'rotate-left':
      this.deg -= 90
      $img.css({
        transform: `rotate(${this.deg}deg)`
      })
      break
    case 'rotate-right':
      this.deg += 90
      $img.css({
        transform: `rotate(${this.deg}deg)`
      })
      break
    case 'delete':
      this.props.removeImg(this.props.index)
      break
    }
  }
  public render () {
    const { item, index } = this.props
    return (
      <li>
        {/* <div className='web-uploader-imgage-mask'></div> */}
        {/* <div className='web-uploader-imgage-loading'>
          <i className='fa fa-spinner fa-pulse fa-spin fa-3x fa-fw' aria-hidden='true'></i>
        </div> */}
        {/* <div className='web-uploader-image-upload-status failed'>
          上传失败
        </div> */}
        <div className='pilipa-web-uploader-image-operate'>
          <i className='fa fa-undo' aria-hidden='true' onClick={this.handleOpearte.bind(this, 'rotate-left')}></i>
          <i className='fa fa-repeat' aria-hidden='true' onClick={this.handleOpearte.bind(this, 'rotate-right')}></i>
          <i className='fa fa-search-plus' aria-hidden='true'></i>
          <i className='fa fa-trash-o' aria-hidden='true' onClick={this.handleOpearte.bind(this, 'delete')}></i>
        </div>
        <img src={item} ref='img'/>
      </li>
    )
  }
}
