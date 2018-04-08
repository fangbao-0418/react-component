import ClassNames from 'classnames'
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
  className?: string
  style?: React.CSSProperties
  filter?: boolean
  callBack?: (item: T) => void
  setFields?: {key: string, title: string}
  prePend?: object
  title?: string
}

export interface MyStates {
  visible: boolean
  data: T[]
  dataTmp: T[]
  title?: string
  page: number
  selectedIndex: number
}
export default class extends React.Component<MyProps, MyStates> {
  public pageNum = 20
  public t: any
  public allData: T[]
  public defaultCls = 'pilipa-dropdown'
  public defaultPage = 1
  public selectedIndex = 0
  public seleted = false
  public constructor (props: MyProps) {
    super(props)
    this.handleAllData(this.props.data)
    this.state = {
      page: this.defaultPage,
      visible: false,
      title: this.props.title || '',
      data: this.allData.slice(0, this.pageNum * this.defaultPage),
      dataTmp: this.allData,
      selectedIndex: this.selectedIndex
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
    const $dropdowm = $(this.refs.dropdown)
    const { button } = this.refs
    $(button).hover(() => {
      this.handleEnter()
    }, (e) => {
      // this.handleLeave()
    })
    $('html').on('click', (event) => {
      console.log('click')
      if($dropdowm.find(event.target).length === 0) {
        this.handleLeave()
      }
    })
    $(document).keydown((event) => {
      const keyCode = event.keyCode
      let { selectedIndex } = this.state
      const $items = $dropdowm.find('.results .items')
      const scrollTop = $items.scrollTop()
      const itemsHeight = $items.height()
      let liOffsetTop = 0
      if ($items.length === 0) {
        return
      }
      $items.find('li').eq(selectedIndex).trigger('mouseleave')
      switch (keyCode) {
      // 回车
      case 13:
        console.log(this.state.selectedIndex, '13')
        $items.find('li').eq(this.state.selectedIndex).trigger('click')
        break
      // ↑
      case 38:
        selectedIndex = selectedIndex <= 0 ? 0 : selectedIndex - 1
        liOffsetTop = $items.find('li').eq(selectedIndex)[0].offsetTop
        if (scrollTop > liOffsetTop) {
          $items.scrollTop(liOffsetTop)
        }
        this.setState({
          selectedIndex
        })
        break
      // ↓
      case 40:
        selectedIndex = selectedIndex >= this.allData.length - 1 ? this.allData.length - 1 : selectedIndex + 1
        liOffsetTop = $items.find('li').eq(selectedIndex)[0].offsetTop
        if (scrollTop + itemsHeight - $items.find('li').eq(selectedIndex).height() < liOffsetTop) {
          $items.scrollTop(liOffsetTop - itemsHeight + $items.find('li').eq(selectedIndex).height())
        }
        this.setState({
          selectedIndex
        })
        // scrollTop += 34
        // $items.scrollTop(scrollTop)
        break
      }
    })
  }
  public handleAllData (data: any[]) {
    const { key, title } = this.props.setFields || {key: '', title: ''}
    const selectTitle = this.props.title
    data = this.props.prePend === undefined ? data : [this.props.prePend].concat(data)
    this.allData = []
    data.map((item, index) => {
      const newItem: T = {
        key: item[key || 'key'],
        title: item[title || 'title'],
        capital: getCapital(item[title || 'title']) || ['']
      }
      if (this.props.title === item[title || 'title']) {
        this.defaultPage = Math.ceil(index / this.pageNum)
        this.selectedIndex = index
      }
      this.allData[index] = newItem
    })
  }
  // 滚动到选中的位置
  public scrollToSelectedPos () {
    const $dropdowm = $(this.refs.dropdown)
    const $items = $dropdowm.find('.results .items')
    console.log(this.selectedIndex, 's')
    const scrollTop = $items.find('li').eq(this.selectedIndex)[0].offsetTop
    console.log($items.find('li').eq(this.selectedIndex)[0].offsetTop)
    $items.scrollTop(scrollTop - $items.find('li').eq(this.selectedIndex).height() * 3)
  }
  public handleEnter () {
    if (this.t) {
      clearTimeout(this.t)
    }
    let { results } = this.refs
    if (results) {
      this.scrollToSelectedPos()
      $(results).removeClass('custom-slide-up-leave')
      $(results).one('mouseover', () => {
        if (this.t) {
          clearTimeout(this.t)
        }
      })
      $(results).one('mouseleave', () => {
        // this.handleLeave()
      })
      return
    }
    this.setState({
      visible: true
    }, () => {
      this.scrollToSelectedPos()
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
        // this.handleLeave()
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
          selectedIndex: this.selectedIndex
          // page: 1,
          // data: this.allData.slice(0, this.pageNum),
          // dataTmp: this.allData
        })
        this.seleted = false
      }, 200)
    }, 100)
  }
  public handleClick (item: {key: number, title: string}, index: number) {
    this.seleted = true
    this.selectedIndex = index
    const { callBack } = this.props
    this.setState({
      title: item.title,
      selectedIndex: index
    })
    this.handleLeave()
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
  public onMouseEnter (key: number) {
    if (this.seleted) {
      return
    }
    this.setState({
      selectedIndex: key
    })
  }
  public render () {
    const { className, style, filter } = this.props
    const { visible, data } = this.state
    let { title } = this.state
    title = title || this.allData.length && this.allData[0].title || ''
    return (
      <div className={ClassNames(this.defaultCls, className)} style={style} ref='dropdown'>
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
                return (
                  <li
                    key={key}
                    className={ClassNames({
                      active: key === this.state.selectedIndex
                    })}
                    title={item.title}
                    onClick={this.handleClick.bind(this, item, key)}
                    onMouseEnter={this.onMouseEnter.bind(this, key)}
                  >
                    {item.title}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>}
      </div>
    )
  }
}
