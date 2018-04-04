import classNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import events from '../decorations/events'
import modal from '../modal'
import notification from '../notification'
import bus from './bus'
import Item from './item'
interface ProgressEvent {
  target: {
    result: string
  }
}
interface Props {
  accept?: string
  accessKeyId: string
  accessKeySecret: string
  stsToken: string
  bucket: string
  region: string
  dir: string
}
interface States {
  initShow: boolean
  files: File[]
  uploadStatus: string
  percentage: number
  successNo: number
  failedNo: number
}
type UploadStatus = 'start' | 'pause' | 'continue'
@events()
class WebUploader extends React.Component <Props, States> {
  public on: <T>(event: string, cb: (payload: T) => void) => void
  public trigger: <T>(event: string, payload: T) => void
  public off: (event: string) => void
  public files: File[] = []
  public percentages: number[] = [0]
  public uploadedInfo: Array<'success' | 'failed'> = []
  public m: any
  public state = {
    initShow: this.files.length === 0,
    files: this.files,
    uploadStatus: 'start',
    percentage: 0,
    successNo: 0,
    failedNo: 0
  }
  public componentWillMount () {
    bus.on('end-upload', this.onEndUpload.bind(this))
    bus.on('percentage', this.onPercentage.bind(this))
  }
  public componentDidMount () {
    this.handleDrop()
    this.showSuccessModal()
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
      this.filterRepeatFile()
      this.setState({
        files: this.files,
        initShow: this.files.length === 0
      })
    })
  }
  // 过滤文件
  public filterRepeatFile () {
    const accept = this.props.accept || 'jpeg,png,gif'
    const allowTypes = ('image/' + accept.replace(/[,|]/g, ',image/')).split(',')
    const temp: any = {}
    const files: File[] = []
    this.files.map((item, index) => {
      // 过滤重复文件
      if (
          temp[item.name] && temp[item.name].size === item.size
          && temp[item.name].type === item.type
          // && temp[item.name].lastModified === item.lastModified
      ) {
      } else {
        temp[item.name] = item
        // 过滤不允许的文件类型
        if (allowTypes.indexOf(item.type) > -1) {
          files.push(item)
        } else {
          notification.warning({
            message: `${item.name} 文件已被忽略掉！`
          })
        }
      }
    })
    this.files = files
  }
  public createPreview () {
    if (this.files.length) {
      this.setState({
        initShow: false
      })
    }
  }
  public initShowView () {
    return (
      <div className='pilipa-web-uploader-constructor'>
        <div className='pilipa-web-uploader-btn' onClick={this.toAddFile.bind(this)}>
          点击选择票据
        </div>
        <p className=''>
          或将票据拖到这里，单次最多可选300张，仅支持jpg、png、gif类型的文件
        </p>
      </div>
    )
  }
  public removeImage (index: number) {
    this.files.splice(index, 1)
    this.uploadedInfo.splice(index, 1)
    this.percentages.splice(index, 1)
    this.setState({
      files: Object.assign([], this.files),
      initShow: this.files.length === 0
    })
    console.log(this.files, this.state.files)
  }
  public imageListView () {
    return (
      <div className='pilipa-web-uploader-images'>
        <ul>
          {
            this.state.files.map((file, index) => {
              return (
                <Item
                  key={`pilipa-web-uploader-image-${file.name}-${file.size}`}
                  accessKeyId={this.props.accessKeyId}
                  accessKeySecret={this.props.accessKeySecret}
                  stsToken={this.props.stsToken}
                  bucket={this.props.bucket}
                  region={this.props.region}
                  dir={this.props.dir}
                  accept={this.props.accept}
                  index={index}
                  file={file}
                  removeImg={this.removeImage.bind(this, index)}
                />
              )
            })
          }
        </ul>
      </div>
    )
  }
  public startUpload () {
    bus.trigger('start-upload', this.state.uploadStatus)
    switch (this.state.uploadStatus) {
    case 'start':
      status = 'pause'
      break
    case 'pause':
      status = 'continue'
      break
    case 'continue':
      status = 'pause'
      break
    }
    this.setState({
      uploadStatus: status
    })
  }
  public onPercentage (item: {index: number, percentage: number}) {
    let sum = 0
    this.percentages[item.index] = item.percentage
    console.log(item, this.percentages, 'percentage')
    this.percentages.map((v) => {
      sum += v
    })
    this.setState({
      percentage: Math.round((sum / this.files.length) * 100)
    })
  }
  public onEndUpload (item: {index: number, status: 'success' | 'failed'}) {
    this.uploadedInfo[item.index] = item.status
    let successNo = 0
    this.uploadedInfo.map((v) => {
      if(v === 'success') {
        successNo += 1
      }
    })
    const failedNo = this.uploadedInfo.length - successNo
    this.setState({
      successNo,
      failedNo
    })
    if (this.uploadedInfo.length === this.files.length) {
      this.setState({
        uploadStatus: 'start'
      })
    }
    if (successNo === this.files.length) {
      this.showSuccessModal()
    }
  }
  public showSuccessModal () {
    this.m = new modal({
      header: null,
      footer: null,
      mask: false,
      maskClosable: false,
      className: 'pilipa-web-uploader-success-modal',
      content: (
        <div className='pilipa-web-uploader-success-modal-content'>
          <p>
          本次票据上传成功！<br />
          您上传的票据已完成，共1张（2.78K），成功上传1张!
          </p>
          <div className='pilipa-web-uploader-success-modal-footer'>
            <div onClick={this.uploadSuccess.bind(this)}>上传成功</div>
            <div onClick={this.continueUpload.bind(this)}>继续上传</div>
          </div>
        </div>
      )
    })
    this.m.show()
  }
  public uploadSuccess () {
    console.log(this.m)
    this.m.hide()
    this.trigger('upload-success', null)
  }
  public continueUpload () {
    console.log('continue upload')
  }
  public toAddFile () {
    const file: any = $(this.refs.file)
    file.attr('multiple', 'multiple')
    file.off('change').on('change', () => {
      console.log(this.files)
      const files = file[0].files
      for (const item of files) {
        if (item) {
          this.files.push(item)
        }
      }
      this.filterRepeatFile()
      this.setState({
        files: this.files,
        initShow: this.files.length === 0
      })
    })
    file.trigger('click')
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
        </div>
        <div className='pilipa-web-uploader-footer'>
            <div className='pilipa-web-uploader-info'>
              {/* 选中98张票据，共6.02M */}
              {
                // ['pause', 'continue'].indexOf(this.state.uploadStatus) &&
                <div className='pilipa-web-uploader-percentage'>
                  <span>{this.state.percentage}%</span>
                  <div
                    className='pilipa-web-uploader-percentage-solid'
                    style={{width: `${this.state.percentage}%`}}
                  >
                  </div>
                </div>
              }
              <p>
                &nbsp;&nbsp;成功：<span style={{color: '#52c41a'}}>{this.state.successNo}</span>&nbsp;&nbsp;
                失败：<span style={{color: '#cf1322'}}>{this.state.failedNo}</span>
              </p>
            </div>
            <div className='pilipa-web-uploader-operate'>
              <div className='pilipa-web-uploader-operate'>
                <div
                  onClick={this.toAddFile.bind(this)}
                  className='pilipa-web-uploader-btn-default mr-10'
                >
                  继续添加
                  <input type='file' ref='file' style={{display: 'none'}} />
                </div>
                <div
                  className='pilipa-web-uploader-btn-primary'
                  onClick={this.startUpload.bind(this)}
                >
                  {['开始', '暂停', '继续'][['start', 'pause', 'continue'].indexOf(this.state.uploadStatus)]}上传
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
export default WebUploader
