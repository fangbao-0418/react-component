import React from 'react'
import WebUploader from '../components/web-uploader'
import { webUploader } from '../components'
/* eslint quotes: 0, no-useless-escape: 0, no-template-curly-in-string: 0 */
let ossCfg = JSON.parse("{\"status\":true,\"errorcode\":\"\",\"message\":\"\",\"data\":\"{\\\"AccessKeyId\\\":\\\"STS.G4JNvDHEFampQwqpcUJstpZgS\\\",\\\"AccessKeySecret\\\":\\\"FtpQtgT9tLARGyD4mfuExdA4c1qpnJv98kK58dVVMxid\\\",\\\"SecurityToken\\\":\\\"CAISiwJ1q6Ft5B2yfSjIpvf\/BczwpZpn1q+bU1HAlGMARvxYn5\/MsTz2IHlNfHVsBeEbtPQznWFZ7\/gflr90UIQAXU3AbNN5q5pK9QfkaoHKtteutR2jAi9lXTr9MQXy+eOPScebJYqvV5XAQlTAkTAJstmeXD6+XlujHISUgJp8FLo+VRW5ajw0b7U\/ZHEVyqkgOGDWKOymPzPzn2PUFzAIgAdnjn5l4qnNqa\/1qDim1Qanlb5O+d2ufcP7NZAwY60SCYnlgLZEEYPayzNV5hRw86N7sbdJ4z+vvKvGWgAJv0naYreOooE2fV4gOPUgZalft73klPl5ouWWmZnzz1NENupYSD\/P318jEzFNxIkagAFl0BsdZSmORDLS\/V853tL9LcgTu53GhSJPk7t\/vi+IWeh1pqoFfRQ9TZBLIZBrOOWrjdQwIT\/PrUupmL\/sz6498uxvfWG6yYGPmXe0yEuYB1E93tAWojZ7n8ydWK\/xmWHQ79p4id8drc6+5C+QTJ9D8zaxm\/I04Pt4I2QvltOgGg==\\\",\\\"bucketName\\\":\\\"pilipa\\\",\\\"dir\\\":\\\"pilipa\/375\/7048\/2018-03-31\\\"}\"}")
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
