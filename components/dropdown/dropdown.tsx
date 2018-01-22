import ClassNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import { getCapital } from '../_util'
interface T {
  title: string
  key: number | ''
  capital?: string[]
}
interface MyProps {
  data: any[]
  className?: string
  style?: React.CSSProperties
  filter?: boolean
  callBack?: (item: T) => void
  setFields?: {key: string, title: string}
  prePend?: object
  title?: string
}

interface MyStates {
  visible: boolean
  data: T[]
  dataTmp: T[]
  title?: string
  page: number
}
export default class extends React.Component<MyProps, MyStates> {
  public pageNum = 20
  public t: any
  public allData: T[]
  public defaultCls = 'pilipa-dropdown'
  public constructor (props: MyProps) {
    super(props)
    this.handleAllData(this.props.data)
    this.state = {
      page: 1,
      visible: false,
      title: this.props.title || '',
      data: this.allData.slice(0, this.pageNum),
      dataTmp: this.allData
    }
  }
  public componentWillReceiveProps (props: MyProps) {
    if (props.data) {
      this.handleAllData(props.data)
      this.setState({
        data: this.allData.slice(0, this.pageNum),
        dataTmp: this.allData
      })
    }
  }
  public componentDidMount () {
    const { button } = this.refs
    $(button).hover(() => {
      this.handleEnter()
    }, (e) => {
      this.handleLeave()
    })
  }
  public handleAllData (data: any[]) {
    const { key, title } = this.props.setFields || {key: '', title: ''}
    data = this.props.prePend === undefined ? data : [this.props.prePend].concat(data)
    this.allData = []
    data.map((item, index) => {
      const newItem: T = {
        key: item[key || 'key'],
        title: item[title || 'title'],
        capital: getCapital(item[title || 'title']) || ['']
      }
      this.allData[index] = newItem
    })
  }
  public handleEnter () {
    if (this.t) {
      clearTimeout(this.t)
    }
    let { results } = this.refs
    if (results) {
      $(results).removeClass('custom-slide-up-leave')
      $(results).one('mouseover', () => {
        if (this.t) {
          clearTimeout(this.t)
        }
      })
      $(results).one('mouseleave', () => {
        this.handleLeave()
      })
      return
    }
    this.setState({
      visible: true
    }, () => {
      results = this.refs.results
      $(results).removeClass('custom-slide-up-leave')
      $(results).addClass('custom-slide-up-enter')
      this.t = setTimeout(() => {
        $(results).removeClass('custom-slide-up-enter')
      }, 200)
      $(results).one('mouseover', () => {
        clearTimeout(this.t)
      })
      $(results).one('mouseleave', () => {
        this.handleLeave()
      })
      $(results).children('.items').scroll((e) => {
        const scrollTop = e.target.scrollTop
        const h = $(results).find('ul').height()
        const ch = e.target.clientHeight
        if (scrollTop + ch > h - 10) {
          if (this.state.page < Math.ceil(this.state.dataTmp.length / this.pageNum)) {
            this.setState({
              page: this.state.page + 1,
              data: this.state.dataTmp.slice(0, this.pageNum * (this.state.page + 1))
            })
          }
        }
      })
    })
  }
  public handleLeave () {
    if (this.t) {
      clearTimeout(this.t)
    }
    const { button, results } = this.refs
    this.t = setTimeout(() => {
      $(results).addClass('custom-slide-up-leave')
      this.t = setTimeout(() => {
        $(results).removeClass('custom-slide-up-leave')
        $(results).addClass('hidden')
        this.setState({
          visible: false,
          page: 1,
          data: this.allData.slice(0, this.pageNum),
          dataTmp: this.allData
        })
      }, 200)
    }, 100)
  }
  public handleClick (item: {key: number, title: string}) {
    this.handleLeave()
    const { callBack } = this.props
    this.setState({
      title: item.title
    })
    if (callBack) {
      setTimeout(() => {
        callBack(item)
      }, 301)
    }
  }
  public handleChange () {
    const { allData } = this
    const value: string = $(this.refs.input).val().toString()
    const pattern = new RegExp(value, 'i')
    const res = allData.filter((item: T): boolean => {
      if (pattern.test(item.title) || pattern.test(item.capital.join(','))) {
        return true
      }
    })
    this.setState({
      data: res.slice(0, this.pageNum),
      dataTmp: res
    })
  }
  public render () {
    const { className, style, filter } = this.props
    const { visible, data } = this.state
    let { title } = this.state
    title = title || this.allData.length && this.allData[0].title || ''
    return (
      <div className={ClassNames(this.defaultCls, className)} style={style}>
        <div className='costom-btn-group' ref='button'>
          <div className='btn-left'><span title={title}>{title}</span></div>
          <div className='btn-right'>
            <i className='fa fa-chevron-down' aria-hidden='true'></i>
          </div>
        </div>
        {visible && <div className='results' ref='results'>
          {filter && <input className='input' onChange={this.handleChange.bind(this)} ref='input'/>}
          {data.length === 0 && <p>未搜到结果</p>}
          <div className='items'>
            <ul>
              {data.length > 0 && data.map((item: T, key: number) => {
                return (<li key={key} title={item.title} onClick={this.handleClick.bind(this, item)}>{item.title}</li>)
              })}
            </ul>
          </div>
        </div>}
      </div>
    )
  }
}
