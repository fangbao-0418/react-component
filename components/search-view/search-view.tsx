import classNames from 'classnames'
import $ from 'jquery'
import React from 'react'
import event from '../decorations/event'
export interface Props {
  title?: string
  content?: any
  init?: any
  mounted?: any
  destroy?: any
}
@event()
class SearchView extends React.Component<Props, {}> {
  public trigger: any
  public on: any
  public off: any
  constructor (props: Props) {
    super(props)
    if (this.props.init) {
      this.props.init.call(this, this)
    }
  }
  public componentDidMount () {
    if (this.props.content && (typeof this.props.content === 'string' || this.props.content.__proto__.jquery)) {
      $(this.refs.panel).find('.pilipa-search-view-panel-body').html(this.props.content)
    }
    this.on('panel-up', () => {
      $(this.refs.panel).slideUp(30)
    })
    this.on('panel-down', () => {
      $(this.refs.panel).slideDown(30)
    })
    if (this.props.mounted) {
      this.props.mounted.call(this, this)
    }
  }
  public componentWillUnmount () {
    if (this.props.destroy) {
      this.props.destroy.call(this, this)
    }
  }
  public toClick () {
    $(this.refs.panel).slideDown(30)
  }
  public toRefresh () {
    this.trigger('refresh')
  }
  public render () {
    console.log(this.props.content instanceof $, 'render')
    return (
      <div className={classNames('pilipa-search-view')}>
        <div className='pilipa-search-view-input' onClick={this.toClick.bind(this)}>{this.props.title}</div>
        <div className='pilipa-search-view-refresh' onClick={this.toRefresh.bind(this)}>
          <i className='fa fa-refresh' aria-hidden='true'></i>
        </div>
        <div className='pilipa-search-view-panel' ref='panel'>
          <div className='pilipa-search-view-panel-body'>
            {this.props.content && this.props.content.$$typeof && this.props.content.$$typeof.toString()
              === 'Symbol(react.element)' ? this.props.content : null}
          </div>
        </div>
      </div>
    )
  }
}
export default SearchView
