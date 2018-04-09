import React from 'react'
import { webUploader } from '../components'
/* tslint:disable:max-line-length quotemark */
let ossCfg: any = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.EPg1BY4rwKVQtgyfXm3auTC6S\\\",\\\"AccessKeySecret\\\":\\\"Du3LCsKhK6ZkymxPEaJxPfY32ykDM6edYk2kQV4mAXPT\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIpJPSevjt2a1W\/JS6dkHIglg4P+5Zu4adsTz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutSHRWCNnXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAEFYoqpNJ+XtBrhi9bp1x7zMl7rKpWL7WBHdh2D1jaStnACE1qaR1R\/LVO\/QXoTQwPtaLV3v3Vmj9RthooNBluchRpTtq5y7817bwX3LqBlc+NEttGyun8ZO\/KyvyQDEkQrrxodlnaIYDTrZOz4xCmEaVoxvJbWyV6yZlwJQ5IxTQ==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7333\/2018-03-31\\\",\\\"regionId\\\":\\\"cn-beijing\\\"}\"}")
ossCfg = JSON.parse(ossCfg.data)
let newOssCfg = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.ExktwxNAfHFTuDdQe7jYpNuJC\\\",\\\"AccessKeySecret\\\":\\\"6SM4rH2tKY7jHFxAQNmFKVeSiYxPzjnu9nipAjjbyDSH\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIpLveP83Mo55H\/4S\/d2LVtWViZtZcobDhoTz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutTypJTJkXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAGnltJKHhRGsKYnzxIXvNESsKZ5ehEwpxf4kcAUTE0m2YhdVx8iZqZtxKmVVXmE9M9DEkT3kPQxgV8rRE1d4OGludNmLmwN6pxoCd02duzdQ\/15yXPuDVd3zRiWDG397C0KMhDGZaLRpZEIIIQl4DF6OsHYxWS3NbWc8PtN9l3H2Q==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7333\/2018-03-31\\\"}\"}")
newOssCfg = JSON.parse(newOssCfg.data)
export default class extends React.Component {
  public componentDidMount () {
    const uploader = webUploader({
      accessKeyId: ossCfg.AccessKeyId,
      accessKeySecret: ossCfg.AccessKeySecret,
      stsToken: ossCfg.SecurityToken,
      bucket: ossCfg.bucketName,
      region: 'oss-cn-beijing',
      dir: ossCfg.dir,
      accept: ossCfg.accept,
      uploadTarget: '票据',
      // maxUploadNum: 19,
      mark: '西藏山峰广告装饰有限公司',
      callback: {
        url: "https://x-agent.i-counting.cn/api/v1/OSSCallBack.ashx",
        host: "x-agent.i-counting.cn",
        body: "filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&receiptid=0&typeid=1&companyid=7048&userid=665&self=0&companycode=5a93be1a85effd0001e7f7d0&origanl=${file.name}",
        contentType: "application/x-www-form-urlencoded"
      }
    })
    uploader.on('error', () => {
      uploader.trigger('oss-update', {
        accessKeyId: newOssCfg.AccessKeyId,
        accessKeySecret: newOssCfg.AccessKeySecret,
        stsToken: newOssCfg.SecurityToken,
        bucket: newOssCfg.bucketName,
        region: 'oss-cn-beijing',
        dir: newOssCfg.dir
      })
    })
    uploader.on('complete', (urls) => {
      console.log(urls, '上传成功')
    })
    uploader.on('close', (urls) => {
      console.log(urls, '上传成功')
    })
  }
  public render () {
    return (
      <div>xxx</div>
    )
  }
}
