import React from 'react'
import { SearchView } from '../components'
import $ from 'jquery'
export default class extends React.Component {
  render () {
    return (
      <div>
        <SearchView
          content={$('<div>sss22s</div>')}
        />
      </div>
    )
  }
}
