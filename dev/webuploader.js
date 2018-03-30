import React from 'react'
import WebUploader from '../components/web-uploader'
export default class extends React.Component {
  render () {
    return (
      <div>
        <WebUploader
          accept='png,jpg'
        />
      </div>
    )
  }
}
