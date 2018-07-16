// @flow

import * as React from 'react'

type Props = {
  children: React.Node,
}

type State = {
  error: any,
  errorInfo: any,
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state = {
    error: null,
    errorInfo: null,
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="page--info">
          <h1>{this.state.error && this.state.error.toString()}</h1>

          <p style={{ whiteSpace: 'pre-wrap' }}>
            {(this.state.errorInfo: any).componentStack}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
