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
  newNo: number // 新增数
}
type UploadStatus = 'start' | 'pause' | 'continue' | 'finish'
@events()
class WebUploader extends React.Component <Props, States> {
  public on: <T>(event: string, cb: (payload: T) => void) => void
  public trigger: <T>(event: string, payload: T) => void
  public off: (event: string) => void
  public files: File[] = []
  public percentages: number[] = [0]
  public uploadedUrls: string[] = []
  public uploadedInfo: Array<'success' | 'failed'> = []
  public m: any
  public defaultAccpet: string = 'jpeg,png,gif'
  public allUploadStatus: any = {
    start: '开始上传',
    pause: '暂停上传',
    continue: '继续上传',
    finish: '上传完成'
  }
  public state = {
    initShow: this.files.length === 0,
    files: this.files,
    uploadStatus: 'start',
    percentage: 0,
    successNo: 0,
    failedNo: 0,
    newNo: 0
  }
  public componentWillMount () {
    bus.on('end-upload', this.onEndUpload.bind(this))
    bus.on('percentage', this.onPercentage.bind(this))
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
      this.filterRepeatFile()
    })
  }
  // 过滤文件
  public filterRepeatFile () {
    const accept = this.props.accept || this.defaultAccpet
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
            message: `${item.name} 格式不符，已被忽略掉！`
          })
        }
      }
    })
    this.files = files
    this.setState({
      files: this.files,
      initShow: this.files.length === 0
    })
    this.reckonNewNo()
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
    bus.trigger('remove', index)
    this.files.splice(index, 1)
    this.uploadedInfo.splice(index, 1)
    this.percentages.splice(index, 1)
    this.setState({
      files: this.files,
      initShow: this.files.length === 0
    })
    this.reckonFilesNo()
    this.reckonPercentage()
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
  // 处理上传
  public handleUpload () {
    bus.trigger('start-upload', this.state.uploadStatus)
    let status = 'start'
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
    case 'finish':
      status = 'finish'
      this.uploadSuccess()
      break
    }
    this.setState({
      newNo: status === 'finish' ? this.state.newNo : 0,
      uploadStatus: status
    })
  }
  // 监听上传进度
  public onPercentage (item: {index: number, percentage: number}) {
    this.percentages[item.index] = item.percentage
    this.reckonPercentage()
  }
  // 计算总体进度
  public reckonPercentage () {
    let sum = 0
    this.percentages.map((v) => {
      sum += v
    })
    this.setState({
      percentage: Math.round((sum / this.files.length) * 100) || 0
    })
  }
  // 计算新增的文件数目
  public reckonNewNo () {
    const { successNo, failedNo } = this.state
    const sum = this.files.length
    const newNo = sum - successNo - failedNo
    this.setState({
      newNo,
      uploadStatus: newNo > 0 ? 'continue' : this.state.uploadStatus
    })
  }
  // 计算成功失败的文件数目
  public reckonFilesNo () {
    let successNo = 0
    let uploadStatus = 'finish'
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
      if (successNo !== this.files.length || this.files.length === 0) {
        uploadStatus = 'continue'
      }
      this.setState({
        uploadStatus
      })
    }
  }
  // 监听上传结束
  public onEndUpload (item: {index: number, status: 'success' | 'failed', url: string}) {
    this.uploadedInfo[item.index] = item.status
    this.uploadedUrls[item.index] = item.url
    this.reckonFilesNo()
  }
  public uploadSuccess () {
    console.log(this.uploadedUrls, 'uploadedUrls')
    this.trigger('upload-success', null)
  }
  // 手动添加文件
  public toAddFile () {
    const file: any = $(this.refs.file)
    file.attr('multiple', 'multiple')
    file.off('change').on('change', () => {
      const files = file[0].files
      for (const item of files) {
        if (item) {
          this.files.push(item)
        }
      }
      this.filterRepeatFile()
      file[0].value = ''
    })
    file.trigger('click')
  }
  // 忽略未上传的
  public toIgnore () {
    this.setState({
      uploadStatus: 'finish'
    })
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
        {
          this.state.files.length > 0 &&
          <div className='pilipa-web-uploader-footer'>
            {
              this.state.uploadStatus !== 'start' &&
              <div className='pilipa-web-uploader-info'>
                <div className='pilipa-web-uploader-percentage'>
                  <span>{this.state.percentage}%</span>
                  <div
                    className='pilipa-web-uploader-percentage-solid'
                    style={{width: `${this.state.percentage}%`}}
                  >
                  </div>
                </div>
                <p style={{marginLeft: '15px'}}>
                  共<b>{this.state.files.length}</b>张(100MB),
                  成功<b style={{color: '#52c41a'}}>{this.state.successNo}</b>张,
                  失败<b style={{color: '#cf1322'}}>{this.state.failedNo}</b>张,
                  新增<b style={{color: '#0050b3'}}>
                    {this.state.newNo}
                  </b>张
                </p>
                {
                  this.state.uploadStatus !== 'finish' &&
                  <p style={{marginLeft: '15px'}}>
                    上传失败请点击
                    <span className='clickabled' onClick={this.handleUpload.bind(this)}>继续上传</span>
                    或
                    <span className='clickabled' onClick={this.toIgnore.bind(this)}>忽略</span>
                  </p>
                }
              </div>
            }
            <div className='pilipa-web-uploader-operate'>
              <div className='pilipa-web-uploader-operate'>
                <div
                  onClick={this.toAddFile.bind(this)}
                  className='pilipa-web-uploader-btn-default mr-10'
                >
                  继续添加
                </div>
                <div
                  className='pilipa-web-uploader-btn-primary'
                  onClick={this.handleUpload.bind(this)}
                >
                  {this.allUploadStatus[this.state.uploadStatus]}
                </div>
              </div>
            </div>
          </div>
        }
        <input type='file' ref='file' style={{display: 'none'}} />
      </div>
    )
  }
}
export default WebUploader
