import React from 'react'
import notification from '../components/notification'
// notification.config({
//   duration: 000
// })
export default class extends React.Component {
  toClick (type) {
    notification[type]({
      title: '22',
      message: `半个月时间内，利用微信介绍3名卖淫女在写字楼内从事卖淫活动多达242次。日前，上海市金山区检察院以介绍卖淫罪对犯罪嫌疑人万某提起公诉。
2017年12月，上海市金山区的胡某用微信添加了“附近的人”万某，万某给他发了一些色情服务报价。在得知交易地点就在单位附近某写字楼内后，胡某欣然下单，并于当天19时许来到约定地点。
“上19楼，到了之后用手机拍楼层照片给我看。”万某提示。胡某发送照片后，万某就告诉了他房间号。敲门后，一名长发女子四下张望后将胡某带进了房间。
当晚，民警闻风出动，将该写字楼内的犯罪嫌疑人万某、3名卖淫人员和5名嫖客一举抓获。
今年1月，犯罪嫌疑人万某被批准逮捕。据万某交代，2017年11月，一名网友告诉了他通过微信添加“附近的人”等方式介绍卖淫活动的发财“捷径”。没有多加考虑的万某就答应了下来，主动加了胡某、龚某以及傅某3名卖淫女子的微信，开始了“业务工作”。根据事先约定，万某负责安排卖淫人员至金山某写字楼出租屋内从事卖淫活动，嫖资双方五五分成。
半个月时间内，万某介绍卖淫242次，非法获利48400余元。日前，金山区检察院依法对犯罪嫌疑人万某以介绍卖淫罪提起公诉。被抓获的5名嫖客以及3名卖淫人员均被公安机关行政拘留`
    })
  }
  toClick2 (type) {
    notification[type]({
      message: 'ceshisdfdsfdsfsfdsfdsfdsfdsfdsfdsfdsfdsffsdfdsf'
    })
  }
  render () {
    return (
      <div>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick.bind(this, 'warning')}
        >
          warning
        </button>
        <button
          style={{marginRight: '10px'}}
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick2.bind(this, 'success')}
        >
          success
        </button>
        <button
          className="pilipa-btn pilipa-btn-warning"
          onClick={this.toClick.bind(this, 'error')}
        >
          error
        </button>
      </div>
    )
  }
}
