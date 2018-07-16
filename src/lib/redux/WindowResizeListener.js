// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { always } from 'ramda'
import { breakpoints } from '../../lib/constants'
import * as actions from './contextActions'
import type { ChangeMediaBreakpointAction } from './contextActions'

type Props = {
  children?: React.Node,
  changeMediaBreakpoint: ChangeMediaBreakpointAction,
}

class WindowResizeListener extends React.PureComponent<Props> {
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    const ranges = {
      SM: [0, breakpoints.MD],
      MD: [breakpoints.MD, breakpoints.LG],
      LG: [breakpoints.LG, breakpoints.XL],
      XL: [breakpoints.XL, Infinity],
    }

    this.props.changeMediaBreakpoint({
      breakpoint: (Object.keys(ranges).find((key) => {
        const [min, max] = ranges[key]
        return window.innerWidth >= min && window.innerWidth < max
      }): any),
    })
  }

  render() {
    return this.props.children
  }
}

export default connect(
  always({}),
  { ...actions },
)(WindowResizeListener)
