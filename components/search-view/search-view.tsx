import classNames from 'classnames'
import $ from 'jquery'
import React from 'react'
export interface Props {
  content?: any
}

function decoration (): any {
  console.log(arguments, 'decoration')
  return (target: any, b: any, c: any) => {
    console.log(target)
    target.trigger = (eventName: string) => {

    }
    target.on = (eventName: string, cb: any) => {
      cb()
    }
  }
}

@decoration()
class SearchView extends React.Component<Props, {}> {
  public trigger: any
  public on: any
  public componentDidMount () {
    if (this.props.content && (typeof this.props.content === 'string' || this.props.content instanceof $)) {
      $(this.refs.panel).find('.pilipa-search-view-panel-body').html(this.props.content)
    }
    this.on('xxx', () => {
      console.log('xxx')
    })
  }

  public toClick () {
    $(this.refs.panel).slideToggle(30)
  }
  public toRefresh () {
    console.log(this)
  }
  public render () {
    console.log(this.props.content instanceof $, 'render')
    return (
      <div className={classNames('pilipa-search-view')}>
        <div className='pilipa-search-view-input' onClick={this.toClick.bind(this)}>xxx</div>
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
