import { Wrapper as OSS } from 'ali-oss'
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
 // tslint:disable-next-line:quotemark max-line-length
let ossCfg: any = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.CYMhMo1so6SrTmhqrm7hZtkg2\\\",\\\"AccessKeySecret\\\":\\\"4yQ6DV4oaMviE2RTrudcozG8RWPmcr9gLuSTzQCr6PwX\\\",\\\"SecurityToken\\\":\\\"CAISvAJ1q6Ft5B2yfSjIopr4I\/fb3KxOgZGZVkvZlXI4O+d2m67M0Dz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutTeYEgFqXTr9MQXy+eOPSfabJYqvZJXAQlTAkTAJjtmeXD6+XlujHISUgJp8FLo+VRW5ajw0Y7UzIRB5+vcHKVzbN\/umLmTG4AzqAVFvpxB3hE5m9K272bf80BfFi0DgweJn5+a\/K5O\/Pc53J8U9AZXnxO1yd7LIl3UPtl8Vrfsry\/YcoGeC5orYWABzm0zdbrWFqYM2c1AiOfJjR\/F+waKixaEiiIv6jJ\/qzhtBB+ZRXhnESZqoqMm+Q7rwboplKeemYSSRi4Heb8eoqX0jemleLAJOesIob3FtDRhpQzrRJ7S86MsV4dRZwnTvGoABesiNCKjPgjFvJ\/um+kJqcTXy462gnIQQffduFkqtU7eiRmguj\/cuCOMLEaa15DlQ3jCdywc4VrvmX9NVijiQzxIXlMbmjVscNbdW7pSZauZNlFK7uk0FfOYV0WNXnyCj+eP8RtS77GfSLACFNfFW6nlVmAQIYQoT0zXen0UgujA=\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7145\/2018-03-31\\\"}\"}")
ossCfg = JSON.parse(ossCfg.data)
class WebUploader extends React.Component <Props, States> {
  public files: File[] = []
  public store = OSS({
    accessKeyId: ossCfg.AccessKeyId,
    accessKeySecret: ossCfg.AccessKeySecret,
    // tslint:disable-next-line:quotemark max-line-length
    stsToken: ossCfg.SecurityToken,
    bucket: 'pilipa',
    region: 'oss-cn-beijing'
  })
  public state = {
    initShow: false,
    imgs: ['']
  }
  public componentWillMount () {
    console.log(this.store, 'store')
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
  public * asyncOssFileUpload () {
    // pilipa/132/7019/2017-11-30
    const result: any = []
    for (const item of this.files) {
      const res = yield this.store.multipartUpload<{}, any>(`/${ossCfg.dir}/oss-test.png`, item)
      console.log(res, 'res')
      // res.then((r: any) => {
      //   console.log(r, 'r')
      // })
      result.push(res)
    }
    return result
  }
  public startUpload () {
    const result = this.asyncOssFileUpload()
    console.log(result.next(), 'result')
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
                <div
                  className='pilipa-web-uploader-btn-primary'
                  onClick={this.startUpload.bind(this)}
                >
                  开始上传
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default WebUploader
