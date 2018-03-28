import $ from 'jquery'
import React from 'react'
import { findDOMNode, render } from 'react-dom'
import * as modules from '../index'
const Components: any = modules
let instance: object = null
function init () {
  instance = this
}
function mounted () {
  instance = this
}
function destroy () {
}
export default function <P> (conf: {component: string, props: P,  el: any}) {
  const { component, props } = conf
  let { el } = conf
  if (component) {

  }
  const Component = Components[component]
  if (el instanceof $) {
    el = el[0]
  }
  const promise = new Promise((resolve: any, reject: any) => {
    if (!(el instanceof Element)) {
      throw new Error('el is not a valid element')
    } else {
      const res = render(
        <Component {...props} init={init} mounted={mounted} destroy={destroy}/>,
        el,
        () => {
          resolve(instance)
        }
      )
    }
  })
  return promise
}
