import React from 'react'
import { webUploader } from '../components'
/* tslint:disable:max-line-length quotemark */
let ossCfg: any = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.H5kzrK5Nt3DZ3uQqDnR8V31Rx\\\",\\\"AccessKeySecret\\\":\\\"DUxsbkBT6DmkhthzbvZiN4RbXozdSbA5T1fgmwxW656c\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIqfbeMcj\/2JFVhIaxMVPglUQ7Xrd63PT5mjz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutTiuZwFmXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAFq+\/nGHlR\/rnWjBHncCqIMYETyVm5nJhNaL\/9GMadE7bq0wJ8cWQ+x1N1TOY6B3GjjohI7mSEb+kLQ4Bd4OFo4w+s+AYCUMdGrNi80JcgflqSdZMIjoHMD+haFhvxuhGYlIAicNuEa8VCq6yO6z2qWuclIdy2TMDSyEL6s6bZHkw==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7333\/2018-03-31\\\",\\\"regionId\\\":\\\"cn-beijing\\\"}\"}")
ossCfg = JSON.parse(ossCfg.data)
let newOssCfg = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.KEWh2rrjqR9MyZzJJddoQnTyw\\\",\\\"AccessKeySecret\\\":\\\"77qFXr4MpW6tRfzWr4Sejw2kiHT9HVKT6rdf67QK1jr3\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIqobiI4jGn7VQ5fume3zLrkoxaOB9gZHSlTz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutXnSFhhmXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAE3mkaYOvo5UAsA2Ra\/7mQ\/GaShROMuoec4+PGFz1XCEeZQFR\/usDuKjCQoeppZ1ZOTfIAZvFCKLNLl873RyHekaRpyoCXQ73aFojexfwgnT7RXXNgIyRNpoUTkZHuoL6LMaJzBN4rmwU62KUZ0KhJ93GjnBhFuSAVY8uD7DOK\/mg==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7333\/2018-03-31\\\",\\\"regionId\\\":\\\"cn-beijing\\\"}\"}")
newOssCfg = JSON.parse(newOssCfg.data)
export default class extends React.Component {
  public componentDidMount () {
    const uploader = new webUploader({
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
        body: "filename=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&receiptid=0&typeid=1&companyid=7048&userid=665&self=0&companycode=5a93be1a85effd0001e7f7d0"
        // contentType: "application/json"
        // body: "filename=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&receiptid=${x:receiptid}&typeid=${x:typeid}&companyid=${x:companyid}&userid=${x:userid}&self=${x:self}&companycode=${x:companycode}",
        // customValue: {
        //   receiptid: "0",
        //   typeid: "1",
        //   companyid: "7048",
        //   userid: "665",
        //   self: "0",
        //   companycode: "5a93be1a85effd0001e7f7d0"
        // }
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
      uploader.destroy()
    })
  }
  public render () {
    return (
      <div>xxx</div>
    )
  }
}
