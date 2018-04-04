import React from 'react'
import WebUploader from '../components/web-uploader'
import { webUploader } from '../components'
/* eslint quotes: 0, no-useless-escape: 0, no-template-curly-in-string: 0 */
let ossCfg = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.Dfsy2f1B2YxqdYXZ4gd3Ffp2U\\\",\\\"AccessKeySecret\\\":\\\"GAeggdsRo9bvvVfEf25r547rLxkocTe6hgBs4yUYSK1m\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIpaXGMojS3J0T7rqaZn\/pvjQyaLxqibWZtzz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutSDAVnZkXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAGcOZ9Dt3tc8AYgB8FsNILR5zmLbWFq72pdu2jM9lsTMAGZMUs0Gk1eOzzD2Qge89Md14v+qfTJft8vJ6pw0cv9mltL3sdu6C\/DXQXqtZTQ2bsfhnAToRySzI+arPYuLvWyesBqjxFUDgMM4enO5JaCPqNZRj3\/1eMdXG+yjI9W2w==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7398\/2018-03-31\\\"}\"}")
ossCfg = JSON.parse(ossCfg.data)
// ossCfg.accept = 'png,jpeg'
export default class extends React.Component {
  componentDidMount () {
    webUploader({
      accessKeyId: ossCfg.AccessKeyId,
      accessKeySecret: ossCfg.AccessKeySecret,
      stsToken: ossCfg.SecurityToken,
      bucket: ossCfg.bucketName,
      region: 'oss-cn-beijing',
      dir: ossCfg.dir,
      accept: ossCfg.accept
    })
  }
  render () {
    return (
      // <div>
      //   <WebUploader
      //     accessKeyId={ossCfg.AccessKeyId}
      //     accessKeySecret={ossCfg.AccessKeySecret}
      //     stsToken={ossCfg.SecurityToken}
      //     bucket={ossCfg.bucketName}
      //     region='oss-cn-beijing'
      //     dir={ossCfg.dir}
      //     accept={accept}
      //   />
      // </div>
      null
    )
  }
}
