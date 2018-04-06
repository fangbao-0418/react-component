import { CheckPoint, Client, ConfigProps, Wrapper as OSS } from 'ali-oss'
import classNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import Viewer from 'viewerjs'
import { md5 } from '../_util'
import modal from '../modal'
import bus from './bus'
export interface Props {
  file: File
  index: number
  removeImg?: (index: number) => void
  accessKeyId: string
  accessKeySecret: string
  stsToken: string
  bucket: string
  region: string
  dir: string
}
export interface States {
  src: string
  percentage: number
  uploadStatus: string
  uploading: boolean
}
export interface ClientPromise {
  then: (cb: (res: any) => void) => this
  catch: (cb: (e: any) => void) => this
  finally: (cb: (res: any, e: any) => void) => this
}
export interface P extends ConfigProps {
  dir: string
}
export type UploadStatus = 'start' | 'pause' | 'continue'
export default class extends React.Component <Props, States> {
  public deg = 0
  public state = {
    src: '',
    percentage: 0,
    uploadStatus: 'unknow',
    uploading: false
  }
  public tempCheckpoint: CheckPoint = null
  public store: Client
  public name = ''
  public uploadId = ''
  public dir = ''
  public viewer: Viewer
  public componentWillMount () {
    this.readFile()
    const { accessKeyId, accessKeySecret, stsToken, bucket, region } = this.props
    this.store = OSS({
      accessKeyId,
      accessKeySecret,
      stsToken,
      bucket,
      region
    })
    this.dir = this.props.dir
    bus.on<UploadStatus>('start-upload', (status) => {
      this.initStatus(() => {
        this.startUpload(status)
      })
    })
    bus.on('oss-update', this.updateOss.bind(this))
    this.createFileName()
  }
  public componentDidMount () {
    const $el = $(this.refs.item)
    const img = $(this.refs.img)
    $el.hover(() => {
      if ($el.find('.pilipa-web-uploader-imgage-uploading').length > 0) {
        if (this.state.uploadStatus === 'pause') {

        }
        $el.find('.pilipa-web-uploader-image-operate').hide()
      }
    })
    if (!this.viewer) {
      this.viewer = new Viewer($(img)[0], {
      })
    }
  }
  public componentWillUnmount () {
    console.log('willunmount')
    this.viewer.destroy()
  }
  public updateOss (options: P) {
    const { accessKeyId, accessKeySecret, stsToken, bucket, region, dir } = options
    this.store = OSS({
      accessKeyId,
      accessKeySecret,
      stsToken,
      bucket,
      region
    })
    this.dir = dir
    // this.fileUpload()
  }
  public createFileName () {
    const pattern = 'ABCDEFGHIJKLMNOPQRESUVWXYZabcdefghijklmnopqresuvwxyz1234567890'
    let i = 0
    let random
    let str = ''
    const suffix = this.props.file.type.replace('image/', '').replace('jpeg', 'jpg')
    while (i < 10) {
      random = Math.floor(Math.random()*62)
      str += pattern.charAt(random)
      i++
    }
    const nowTime = new Date().getTime().toString()
    str = md5([this.props.file.name, nowTime, str].join('||'))
    this.name = '/' + this.dir + '/' + str.toUpperCase() + '.' + suffix
    console.log(this.name)
  }
  public initStatus (cb?: () => void) {
    if (this.state.uploadStatus === 'success') {
      return
    }
    this.setState({
      uploadStatus: 'unknow'
    }, () => {
      if (cb) {
        cb()
      }
    })
  }
  public readFile () {
    const reader: FileReader = new FileReader()
    reader.readAsDataURL(this.props.file)
    reader.onload = (e: any) => {
      this.setState({
        src: e.target.result
      })
    }
  }
  public fileUpload () {
    this.store.multipartUpload<{
      progress: (percentage: number, checkpoint: CheckPoint) => void,
      checkpoint?: CheckPoint
    }, ClientPromise>(this.name, this.props.file, {
      progress: async (percentage, checkpoint) => {
        this.setState({
          percentage
        })
        bus.trigger<{index: number, percentage: number}>('percentage', {
          index: this.props.index,
          percentage
        })
        console.log(percentage, checkpoint, 'progress')
        if (checkpoint) {
          this.tempCheckpoint = checkpoint
          this.uploadId = checkpoint.uploadId
        }
      },
      checkpoint: this.tempCheckpoint
    }).then((res) => {
      console.log(res, 'success')
      this.setState({
        uploadStatus: 'success'
      })
      bus.trigger('end-upload', {
        index: this.props.index,
        status: 'success',
        url: res.res.requestUrls[0]
      })
    }).catch((err) => {
      bus.trigger('error', err)
      if (typeof err === 'object' && err.name === 'cancel') {
        this.setState({
          uploadStatus: 'pause'
        })
      } else {
        this.setState({
          uploadStatus: 'failed'
        })
        bus.trigger('end-upload', {
          index: this.props.index,
          status: 'failed'
        })
      }
    }).finally(() => {
      this.setState({
        uploading: false
      })
    })
  }
  public startUpload (status: UploadStatus) {
    if (this.state.uploadStatus === 'success') {
      return
    }
    switch (status) {
    case 'start':
      this.setState({
        uploading: true
      })
      this.fileUpload()
      break
    case 'pause':
      this.setState({
        uploadStatus: 'pause',
        uploading: false
      })
      this.store.cancel()
      break
    case 'continue':
      this.setState({
        uploading: true
      })
      this.fileUpload()
      break
    }
  }
  public handleOpearte (type: 'rotate-left' | 'rotate-right' | 'zoom-in' | 'delete') {
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
    case 'zoom-in':
      this.viewer.show()
      break
    case 'delete':
      if (this.props.removeImg) {
        this.removeFile()
        this.props.removeImg(this.props.index)
      }
      break
    }
  }
  public removeFile () {
    const status = this.state.uploadStatus
    switch (status) {
    case 'success':
      // this.store.delete(this.name)
      break
    case 'failed':
      this.store.abortMultipartUpload(this.name, this.uploadId)
      break
    case 'pause':
      this.store.abortMultipartUpload(this.name, this.uploadId)
      break
    }
  }
  public render () {
    return (
      <li ref='item'>
        {
          // 上传进度
          this.state.uploading &&
          <div className='pilipa-web-uploader-imgage-uploading'>
            <div className='pilipa-web-uploader-ring'></div>
            <span>{Math.round(this.state.percentage * 100)}%</span>
          </div>
        }
        {
          // 暂停
          this.state.uploadStatus === 'pause' &&
          <div className='pilipa-web-uploader-imgage-uploading'>
            <div className='pilipa-web-uploader-pause'>
              <i className='fa fa-pause-circle-o' aria-hidden='true'></i>
            </div>
          </div>
        }
        {
          // 失败 || 成功
          ['success', 'failed'].indexOf(this.state.uploadStatus) > -1 &&
          <div
            className={
              classNames([
                'pilipa-web-uploader-image-upload-status',
                {
                  success: this.state.uploadStatus === 'success',
                  failed: this.state.uploadStatus === 'failed'
                }
              ])
            }
          >
            {this.state.uploadStatus === 'success' ? '上传成功' : '上传失败'}
          </div>
        }
        <div className='pilipa-web-uploader-image-operate'>
          <i className='fa fa-undo' aria-hidden='true' onClick={this.handleOpearte.bind(this, 'rotate-left')}></i>
          <i className='fa fa-repeat' aria-hidden='true' onClick={this.handleOpearte.bind(this, 'rotate-right')}></i>
          <i
            className='fa fa-search-plus'
            aria-hidden='true'
            onClick={this.handleOpearte.bind(this, 'zoom-in')}
          >
          </i>
          <i className='fa fa-trash-o' aria-hidden='true' onClick={this.handleOpearte.bind(this, 'delete')}></i>
        </div>
        <img src={this.state.src} ref='img' alt={this.props.file.name}/>
      </li>
    )
  }
}
