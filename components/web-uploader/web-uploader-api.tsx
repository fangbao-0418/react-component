import React from 'react'
import modal from '../modal'
import WebUploader from './index'
export interface Options {
  accept?: string
  accessKeyId: string
  accessKeySecret: string
  stsToken: string
  bucket: string
  region: string
  dir: string
}
function webUploader (opts: Options) {
  const m = new modal({
    header: null,
    footer: null,
    content: (
      <WebUploader
        accessKeyId={opts.accessKeyId}
        accessKeySecret={opts.accessKeySecret}
        stsToken={opts.stsToken}
        bucket={opts.bucket}
        region={opts.region}
        dir={opts.dir}
        accept={opts.accept}
      />
    )
  })
  m.show()
}
export default webUploader
