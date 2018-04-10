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
  callBack?: any
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
  public isFinished: boolean = true
  public callback: any
  public newConfig: P
  public success: boolean = false
  public componentWillMount () {
    this.readFile()
    const { accessKeyId, accessKeySecret, stsToken, bucket, region } = this.props
    this.handleCallBack()
    this.store = OSS({
      accessKeyId,
      accessKeySecret,
      stsToken,
      bucket,
      region
    })
    this.dir = this.props.dir
    bus.on<UploadStatus>('handle-upload', (status) => {
      if (this.isFinished === false) {return}
      this.initStatus(() => {
        this.handleUpload(status)
      })
    })
    bus.on('oss-update', this.updateOss.bind(this))
    this.createFileName()
  }
  public componentDidMount () {
    const $el = $(this.refs.item)
    const img = $(this.refs.img)
    if (!this.viewer) {
      this.viewer = new Viewer($(img)[0], {
      })
    }
  }
  public componentWillUnmount () {
    this.isFinished = false
    if (this.viewer) {
      this.viewer.destroy()
    }
  }
  public handleCallBack () {
    const callback = this.props.callBack
    if (!callback) {
      return
    }
    if (typeof callback === 'object' && typeof callback.body === 'string' && typeof this.props.file === 'object') {
      const file: any = this.props.file
      const body = callback.body.replace(/\${(file)(\.(\w+))?}/g, ($0: string, $1: string, $2: string, $3: string) => {
        console.log($3, '$3')
        if ($3) {
          return file[$3]
        }
        return $0
      })
      this.callback = Object.assign({}, callback, {body})
    }
  }
  public initStatus (cb?: () => void) {
    if (['success'].indexOf(this.state.uploadStatus) > -1) {
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
  public updateOss (options?: P) {
    if (options) {
      this.newConfig = options
    } else {
      options = this.newConfig || {
        accessKeyId: this.props.accessKeyId,
        accessKeySecret: this.props.accessKeySecret,
        stsToken: this.props.stsToken,
        bucket: this.props.bucket,
        region: this.props.region,
        dir: this.props.dir
      }
    }
    if (this.isFinished === false) {return}
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
      callback?: any,
      timeout: number
    }, ClientPromise>(this.name, this.props.file, {
      progress: async (percentage, checkpoint) => {
        percentage = percentage > 1 ? 1 : percentage
        this.setState({
          percentage
        })
        bus.trigger<{index: number, percentage: number}>('percentage', {
          index: this.props.index,
          percentage
        })
        if (checkpoint) {
          if (percentage >= 1 && !this.success && checkpoint.uploadId) {
            this.store.completeMultipartUpload<any>(this.name, checkpoint.uploadId, checkpoint.doneParts)
            .then((res: any) => {
              this.handleUploadSuccess(res)
              return res
            })
            .catch((err: any) => {
              this.handleUploadError(err)
            })
          }
          this.tempCheckpoint = checkpoint
          this.uploadId = checkpoint.uploadId
        }
      },
      checkpoint: this.tempCheckpoint,
      callback: this.callback,
      timeout: 10000
    }).then((res) => {
      this.handleUploadSuccess(res)
    }).catch((err) => {
      this.handleUploadError(err)
    }).finally(() => {
      this.setState({
        uploading: false
      })
    })
  }
  public handleUploadSuccess (res: any) {
    console.log(res, 'success')
    this.success = true
    this.setState({
      uploadStatus: 'success'
    })
    bus.trigger('end-upload', {
      index: this.props.index,
      status: 'success',
      url: res.res.requestUrls[0]
    })
  }
  public handleUploadError (err: any) {
    console.log(err, err.code, this.success)
    if (this.success) {
      return
    }
    // console.log(err, 'error')
    if (typeof err === 'object' && err.name === 'cancel') {
      this.setState({
        uploadStatus: 'pause'
      })
    } else {
      switch (err.status) {
      case 403:
        this.setState({
          uploadStatus: 'failed'
        })
        bus.trigger('error', err)
        bus.trigger('end-upload', {
          index: this.props.index,
          status: 'failed'
        })
        break
      }
    }
  }
  public handleUpload (status: UploadStatus) {
    if (this.success) {
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
      this.updateOss()
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
          {
            !this.success &&
            <i
              className='fa fa-trash-o'
              aria-hidden='true'
              onClick={this.handleOpearte.bind(this, 'delete')}
            >
            </i>
          }
        </div>
        <img src={this.state.src} ref='img' alt={this.props.file.name}/>
      </li>
    )
  }
}
