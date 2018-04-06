import React from 'react'
import WebUploader from '../components/web-uploader'
import { webUploader } from '../components'
/* eslint quotes: 0, no-useless-escape: 0, no-template-curly-in-string: 0 */
let ossCfg = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.Dfsy2f1B2YxqdYXZ4gd3Ffp2U\\\",\\\"AccessKeySecret\\\":\\\"GAeggdsRo9bvvVfEf25r547rLxkocTe6hgBs4yUYSK1m\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIpaXGMojS3J0T7rqaZn\/pvjQyaLxqibWZtzz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutSDAVnZkXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAGcOZ9Dt3tc8AYgB8FsNILR5zmLbWFq72pdu2jM9lsTMAGZMUs0Gk1eOzzD2Qge89Md14v+qfTJft8vJ6pw0cv9mltL3sdu6C\/DXQXqtZTQ2bsfhnAToRySzI+arPYuLvWyesBqjxFUDgMM4enO5JaCPqNZRj3\/1eMdXG+yjI9W2w==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7398\/2018-03-31\\\"}\"}")
ossCfg = JSON.parse(ossCfg.data)

let newOssCfg = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.JyvWiP77tt9a7zoCCYTnPm5XW\\\",\\\"AccessKeySecret\\\":\\\"C51wFBCWq4hs2XGRL6DSPWcxEx43Q8Z2FfgXUQRefquc\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIq7rDHNPk2uhVw\/uKNVzep0MMWOF8gvDztTz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutQi0BFRkXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAGRuD1tUXPQUI9vIoOXl9oZYpLX\/m3Gxc2QqpBmemKcXCGCjMx7Wa9wibzce3yejw8UL+QJhG1KotQUwwR8q9RlUz2DV3nJFICf1yQ0o3jvnJ3UHDNjO6ZZEMpY\/qrrOIlKT+KBGFR6NHLtLCelaidy4Y82UQNjsXPGKVcgMBkAaA==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7398\/2018-03-31\\\"}\"}")
newOssCfg = JSON.parse(newOssCfg.data)

export default class extends React.Component {
  componentDidMount () {
    const uploader = webUploader({
      accessKeyId: ossCfg.AccessKeyId,
      accessKeySecret: ossCfg.AccessKeySecret,
      stsToken: ossCfg.SecurityToken,
      bucket: ossCfg.bucketName,
      region: 'oss-cn-beijing',
      dir: ossCfg.dir,
      accept: ossCfg.accept
    })
    uploader.on('error', (err) => {
      if (err) {
        uploader.trigger('oss-update', {
          accessKeyId: newOssCfg.AccessKeyId,
          accessKeySecret: newOssCfg.AccessKeySecret,
          stsToken: newOssCfg.SecurityToken,
          bucket: newOssCfg.bucketName,
          region: 'oss-cn-beijing',
          dir: newOssCfg.dir
        })
      }
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
