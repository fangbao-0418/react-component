import classNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import { getCapital } from '../_util'
export interface T {
  title: string
  key: number | ''
  capital?: string[]
}
export interface MyProps {
  data: any[]
  onSelect?: (value: string) => any
  className?: string
  placeholder?: string
  style?: React.CSSProperties
  setFields?: {key: string, title: string}
}
export interface MyStates {
  data: T[]
  dataTmp: T[]
  page: number
  visible: boolean
  hover: boolean
}

class AutoComplete extends React.Component<MyProps, MyStates> {
  public pageNum = 20
  public allData: T[] = []
  public defaultCls = 'pilipa-auto-complete'
  constructor (props: MyProps) {
    super(props)
    this.handleAllData(this.props.data)
    this.state = {
      data: this.allData.slice(0, this.pageNum),
      dataTmp: this.allData,
      page: 1,
      visible: false,
      hover: false
    }
  }
  public componentWillReceiveProps (props: MyProps) {
    if (props.data.length) {
      this.handleAllData(props.data)
      this.setState({
        data: props.data.slice(0, this.pageNum),
        dataTmp: props.data
      })
    }
  }
  public componentDidMount () {
    $(this.refs.input).off('click')
    $(this.refs.input).click(() => {
      this.searchShow()
    })
  }
  public handleAllData (data: any[]) {
    const { key, title } = this.props.setFields || {key: '', title: ''}
    this.allData = []
    data.map((item, index) => {
      const newItem: T = {
        key: item[key || 'key'],
        title: item[title || 'title'],
        capital: getCapital<string>(item[title || 'title']) || ['']
      }
      this.allData[index] = newItem
    })
  }
  public searchChange () {
    const el = $(this.refs.input)
    const value: string = el.val().toString() || ''
    if (!value) {
      this.setState({
        visible: false
      })
    } else {
      this.searchShow()
    }
  }
  public searchShow () {
    const { allData } = this
    const el = $(this.refs.input)
    const value: string = el.val().toString() || ''
    const pattern = new RegExp(value, 'i')
    const res = allData.filter((item: T): boolean => {
      if (pattern.test(item.title) || pattern.test(item.capital.join(','))) {
        return true
      }
    })
    this.setState({
      data: res.slice(0, this.pageNum),
      dataTmp: res,
      visible: true
    }, () => {
      this.listenScroll()
      const results = this.refs.results
      $(results).addClass('custom-slide-up-enter')
      setTimeout(() => {
        $(results).addClass('custom-slide-up-enter')
      }, 300)
      el.off('blur')
      $(results).off('blur')
      $(results).hover(() => {
        this.setState({
          hover: true
        })
      }, () => {
        this.setState({
          hover: false
        })
      })
      el.blur(() => {
        if (!this.state.hover) {
          $(results).addClass('custom-slide-up-leave')
          setTimeout(() => {
            $(results).removeClass('custom-slide-up-leave')
            this.setState({
              visible: false
            })
          }, 300)
        }
      })
    })
  }
  public handleSelect (item: any) {
    $(this.refs.input).val(item.title)
    const results = this.refs.results
    $(results).addClass('custom-slide-up-leave')
    setTimeout(() => {
      $(results).removeClass('custom-slide-up-leave')
      this.setState({
        visible: false
      })
    }, 300)
    if (this.props.onSelect) {
      this.props.onSelect(item)
    }
  }
  public listenScroll () {
    const results = this.refs.results
    $(results).children('.items').off('scroll')
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
  }
  public render () {
    const { data, visible } = this.state
    const { className, placeholder } = this.props
    return (
      <div className={classNames(this.defaultCls, className)} style={this.props.style}>
        <input type='text' placeholder={placeholder} onChange={this.searchChange.bind(this)} ref='input' />
        {visible &&
          <div className='results' ref='results'>
            {data.length === 0 && <p>未搜到结果</p>}
            <div className='items'>
              <ul>
                {
                  data && data.map((item, index) => {
                    return (
                      <li
                        onClick={this.handleSelect.bind(this, item)}
                        key={'auto-complete-' + index}
                      >
                        {item.title}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default AutoComplete
