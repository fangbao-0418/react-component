import React from 'react'
import modal from '../modal'
import bus, { Bus } from './bus'
import WebUploader from './index'
export interface Options {
  accept?: string
  accessKeyId: string
  accessKeySecret: string
  stsToken: string
  bucket: string
  region: string
  dir: string
  maxUploadNum?: number
  uploadTarget?: string
  mark?: string
}
// events: complete 完成, close 关闭
function webUploader (opts: Options): Bus {
  const m = new modal({
    header: null,
    footer: null,
    mask: false,
    maskClosable: false,
    className: 'pilipa-web-uploader-modal',
    style: 'width: auto;',
    content: (
      <WebUploader
        accessKeyId={opts.accessKeyId}
        accessKeySecret={opts.accessKeySecret}
        stsToken={opts.stsToken}
        bucket={opts.bucket}
        region={opts.region}
        dir={opts.dir}
        accept={opts.accept}
        maxUploadNum={opts.maxUploadNum}
        uploadTarget={opts.uploadTarget}
        mark={opts.mark}
      />
    )
  })
  m.show()
  bus.on('close', () => {
    m.hide()
  })
  bus.on('complete', () => {
    m.hide()
  })
  console.log(m, 'm')
  return bus
}
export default webUploader
