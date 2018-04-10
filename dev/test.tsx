import React from 'react'
import { webUploader } from '../components'
/* tslint:disable:max-line-length quotemark */
let ossCfg: any = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.K1rJDYxhgBBCncqPvUDqWPPkz\\\",\\\"AccessKeySecret\\\":\\\"7Qb5XDy5dCd3nNEn7CeZetKrD8g9wCfRuiw8LwYVLK9C\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIqvLHAf7tlbdG9YCobEXAtHYASP57v5XAmDz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutS6KXQJnXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAGmHpDif30kt\/NvQmQ\/EfhDeFqtzRVN53g+Ov4Cim21ieFqpcJDTDtYuyfeBoZ691Nf6Nmg\/u1M9UtCUDQHYgh9wegltPyl32TzZB23qva5c8qroK1akx81IDuBBdv2YKYXXffPcAfebM1Px\/8\/6rx6Aa2urmidTIaFGMnFQwXx79Q==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7333\/2018-03-31\\\",\\\"regionId\\\":\\\"cn-beijing\\\"}\"}")
ossCfg = JSON.parse(ossCfg.data)
let newOssCfg = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.HhisobVvcpLUd3bAoTz2KEsp9\\\",\\\"AccessKeySecret\\\":\\\"5f1KpoABRPLM7qcjttpHvEKfibcZgjBwutJYjpjLkdTA\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIqavcONXWu6lCx46+ZhXTpW8Bdr1nqrbb2zz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutTe6SQ9nXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAEr4kBWeXzv42a2C34mUuw2r+nf9E0mQZUFMAtioaoBAGlIl8T\/\/e2oEqd286RMR16rAvKPYKgtie0Tr\/+4Y8h8bxw3ZHO0L9hdenq\/2pv6U8IOF6JQjSN99hGWcebzZG+oW4NAGhex0HZuzCfdZgUioDIiHQDM9ODvQ6z3Dd5pFw==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7333\/2018-03-31\\\",\\\"regionId\\\":\\\"cn-beijing\\\"}\"}")
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
        body: "filename=${object}&etag=${etag}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&receiptid=0&typeid=1&companyid=7048&userid=665&self=0&companycode=5a93be1a85effd0001e7f7d0",
        contentType: "application/json"
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
      console.log(urls, '上传成功')
    })
  }
  public render () {
    return (
      <div>xxx</div>
    )
  }
}
