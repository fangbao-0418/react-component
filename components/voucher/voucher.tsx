import ClassNames from 'classnames'
import $ from 'jquery'
import React, { SyntheticEvent } from 'react'
export interface MyProps {
  className?: string
  style?: React.CSSProperties
  items?: any[]
  companyName: string
  date: string
  voucherNo: string
  treasurer: string
  reviewer: string
  originator: string
  fieldCfg?: {
    abstract: string
    subjectName: string
    debitMoney: string
    creditMoney: string
    taxRate: string
  }
  isShowTaxRate?: boolean // 是否显示税率
  onTd?: (event: JQuery.Event, items: any[], index: number) => void
}
export interface MyStates {
  items: any[]
}
class Voucher extends React.Component<MyProps, MyStates> {
  public state = {
    items: this.props.items
  }
  public defaultCls = 'pilipa-voucher'
  public componentDidMount () {
    this.setTrHover()
    this.initOperate()
  }
  public setTrHover () {
    const el = $(this.refs.voucher)
    el.find('table tbody tr').hover((event) => {
      $(event.currentTarget).find('.fa').css({opacity: 1})
    }, (event) => {
      $(event.currentTarget).find('.fa').css({opacity: 0})
    })
  }
  public initOperate () {
    const el = $(this.refs.voucher)
    const { items } = this.state
    el.find('table tbody tr td:nth-child(1) .fa').unbind('click').click((item) => {
      const target = item.target
      const index = $(item.target).parent().parent().index()
      if (target.className === 'fa fa-plus') {
        items.splice(index + 1, 0, {})
      } else if (target.className === 'fa fa-minus') {
        items.splice(index, 1)
      }
      this.setState({
        items
      }, () => {
        this.initOperate()
        this.setTrHover()
      })
    })
    this.setTdClick()
  }
  public setTdClick () {
    const el = $(this.refs.voucher)
    el.find('table tbody tr td').unbind('click').click((event) => {
      const index = $(event.currentTarget).parent().index()
      if (this.props.onTd) {
        this.props.onTd(event, this.state.items, index)
      }
    })
  }
  public moneyUnitNode () {
    const str = '亿千百十万千百十元角分'
    const node: JSX.Element[] = []
    str.split('').forEach((item, index) => {
      node.push(<span key={this.defaultCls + '-money-unit-' + index}>{item}</span>)
    })
    return node
  }
  public mapTrNode () {
    const { fieldCfg, isShowTaxRate } = this.props
    const { items } = this.state
    const node: JSX.Element[] = []
    items.map((item, index) => {
      node.push(
        <tr key={this.defaultCls + '-tr-' + index}>
          <td>
            <i className='fa fa-plus' aria-hidden='true'></i>
            <i className='fa fa-minus' aria-hidden='true'></i>
          </td>
          <td>{item[fieldCfg.abstract]}</td>
          <td>{item[fieldCfg.subjectName]}</td>
          { isShowTaxRate ?
            <td>
              <input
                onChange={this.onTaxRateChange.bind(this, index)}
                value={item[fieldCfg.taxRate] || ''}
                maxLength={5}
              />
            </td>
            :
            null
          }
          <td>{this.convertMoney(item[fieldCfg.debitMoney])}</td>
          <td>{this.convertMoney(item[fieldCfg.creditMoney])}</td>
        </tr>
      )
    })
    return node
  }
  public onTaxRateChange (index: number, event: SyntheticEvent<{value: number}>) {
    const value = event.currentTarget.value
    const { items } = this.state
    const { fieldCfg } = this.props
    items[index][fieldCfg.taxRate] = value
    this.setState({
      items
    })
  }
  public convertMoney (num: number) {
    if (!num) {
      num = 0
    }
    const node: JSX.Element[] = []
    let money = (Math.round(Math.abs(num)) * 100).toString()
    const maxNum = Math.pow(10, 11)
    if (parseFloat(money) > maxNum) {
      money = (maxNum - 1).toString()
    }
    const arr = (' '.repeat((11 - money.length)) + money).split('')
    arr.map((item, index) => {
      node.push(
        <span
          style={{color: num < 0 ? 'red' : null}}
          key={this.defaultCls + '-money-' + index}
        >
          {item}
        </span>)
    })
    return <div className='money-unit'>{node}</div>
  }
  public getTotal (): {debitMoney: number, creditMoney: number} {
    const { fieldCfg } = this.props
    const { items } = this.state
    let debitMoney = 0
    let creditMoney = 0
    items.map((item: any) => {
      debitMoney += item[fieldCfg.debitMoney]
      creditMoney += item[fieldCfg.creditMoney]
    })
    return {
      debitMoney,
      creditMoney
    }
  }
  public render () {
    const {
      className, style, companyName, date, voucherNo, treasurer, reviewer, originator, isShowTaxRate
    } = this.props
    const total = this.getTotal()
    return (
      <div ref='voucher' className={ClassNames(this.defaultCls, className)} style={style}>
        <div className={this.defaultCls + '-header'}>
          <h3>记账凭证</h3>
          <p>
            <span>单位名称：{companyName}</span>
            <span>日期：{date}</span>
            <span>凭证字号：{voucherNo}</span>
          </p>
        </div>
        <table className={ClassNames(this.defaultCls + '-table' + (isShowTaxRate ? 2 : 1))}>
          <thead>
            <tr>
              <th rowSpan={2}></th>
              <th rowSpan={2}>摘要</th>
              <th rowSpan={2}>会计科目</th>
              {isShowTaxRate ? <th rowSpan={2}>税率(%)</th> : null}
              <th>借方金额</th>
              <th>贷方金额</th>
            </tr>
            <tr>
              <th>
                <div className='money-unit'>
                  {this.moneyUnitNode()}
                </div>
              </th>
              <th>
                <div className='money-unit'>
                  {this.moneyUnitNode()}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.mapTrNode()}
            <tr>
              <td></td>
              <td colSpan={!isShowTaxRate ? 2 : 3}>
                合计：
              </td>
              <td>{this.convertMoney(total.debitMoney)}</td>
              <td>{this.convertMoney(total.creditMoney)}</td>
            </tr>
          </tbody>
        </table>
        <div className={this.defaultCls + '-footer'}>
          <p>
            <span>会计主管：{treasurer}</span>
            <span>审核人：{reviewer}</span>
            <span>制单人：{originator}</span>
          </p>
        </div>
      </div>
    )
  }
}
export default Voucher
