import classNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import bus from '../events'
import Item from './item'
interface ProgressEvent {
  target: {
    result: string
  }
}
export interface Props {
  accept?: string
}
export interface States {
  initShow: boolean
  imgs: string[]
}
class WebUploader extends React.Component <Props, States> {
  public files: File[] = []
  public state = {
    initShow: false,
    imgs: ['']
  }
  public componentWillMount () {
    bus.on('rotate-left', this.handleImageOperate)
  }
  public componentDidMount () {
    this.handleDrop()
  }
  public handleDrop () {
    const $dropArea = $(this.refs['drop-area'])
    document.addEventListener('dragover', (event) => {
      event.preventDefault()
    })
    document.addEventListener('dragenter', (event: any) => {
      console.log($dropArea.parent().find(event.target).length)
      if ($dropArea.parent().find(event.target).length) {
        $dropArea.css({
          border: '2px rgba(0, 0, 0, .8) dashed'
        })
      }
    })
    document.addEventListener('dragleave', (event: any) => {
      if (!$dropArea.parent().find(event.target).length) {
        $dropArea.css({
          border: ''
        })
      }
    })
    document.addEventListener('drop', (event: any) => {
      $dropArea.css({
        border: ''
      })
      event.preventDefault()
      for (const item of event.dataTransfer.files) {
        this.files.push(item)
      }
      console.log(this.files)
      this.createPreview()
    })
  }
  public createPreview () {
    if (this.files.length) {
      this.setState({
        initShow: false
      })
      this.asyncReadImages()
    }
  }
  public async asyncReadImages () {
    const imgs: any[] = []
    for (const item of this.files) {
      imgs.push(await this.readImage(item))
    }
    this.setState({
      imgs
    })
  }
  public readImage (file: File) {
    const reader: FileReader = new FileReader()
    reader.readAsDataURL(file)
    const p = new Promise((resolve, reject) => {
      reader.onload = (e: any) => {
        resolve(e.target.result)
      }
    })
    return p
  }
  public initShowView () {
    return (
      <div className='pilipa-web-uploader-constructor'>
        <div className='pilipa-web-uploader-btn'>
          点击选择票据
        </div>
        <p className=''>
          或将票据拖到这里，单次最多可选300张
        </p>
      </div>
    )
  }
  public removeImage (index: number) {
    const imgs = this.state.imgs
    imgs.splice(index, 1)
    this.files.splice(index, 1)
    this.setState({
      imgs
    })
    console.log(this.files.length)
  }
  public imageListView () {
    return (
      <div className='pilipa-web-uploader-images'>
        <ul>
          {
            this.state.imgs.map((item, index) => {
              return (
                <Item
                  key={`pilipa-web-uploader-image-${index}`}
                  index={index}
                  removeImg={this.removeImage.bind(this)}
                  item={item}
                />
              )
            })
          }
        </ul>
      </div>
    )
  }
  public handleImageOperate () {
    console.log('ratote')
  }
  public startUpload () {
    bus.trigger('upload')
  }
  public render () {
    return (
      <div className='pilipa-web-uploader'>
        <div className='pilipa-web-uploader-header'>
          <span>票据上传</span>
          <div className='pilipa-web-uploader-close'>
            <i className='fa fa-times' aria-hidden='true'></i>
          </div>
        </div>
        <div className='pilipa-web-uploader-body'>
          <div
            className={classNames([
              'pilipa-web-uploader-drop-area',
              {
                'pilipa-web-uploader-border-white': !this.state.initShow
              }
            ])}
            ref='drop-area'
          >
            {
              // 初始显示的view
              this.state.initShow ? this.initShowView() : this.imageListView()
            }
          </div>
          <div className='pilipa-web-uploader-footer'>
            <div className='pilipa-web-uploader-info'>
              选中98张票据，共6.02M
            </div>
            <div className='pilipa-web-uploader-operate'>
              <div className='pilipa-web-uploader-operate'>
                <div className='pilipa-web-uploader-btn-default mr-10'>继续上传</div>
                <div className='pilipa-web-uploader-btn-primary' onClick={this.startUpload.bind(this)}>开始上传</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default WebUploader
