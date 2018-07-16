// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pipe } from 'ramda'
import { translate } from 'react-i18next'

import type { TranslatorProps } from '../../lib/types'
import type { State } from './reducer'

import Button from '../../components/Button'
import IconTick from '../../assets/svg/icon-tick.svg'

import * as actions from './actions'

type OwnProps = {
  config: Config,
}

type ActionProps = {
  fetchExampleData: () => any,
}

type Props = State & OwnProps & ActionProps & TranslatorProps

class Example extends Component<Props> {
  componentDidMount = () => {
    this.props.fetchExampleData()
  }

  render() {
    const { title, text, t } = this.props

    return (
      <div style={{ marginTop: '40px' }}>
        <h1>{title}</h1>

        <p>{text}</p>

        <Button
          onClick={() => {
            console.log('Button clicked')
          }}
        >
          <span className="icon--baseline icon--left">
            <IconTick />
          </span>
          {t('button')}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ example }) => example

export default pipe(
  translate('example'),
  connect(
    mapStateToProps,
    actions,
  ),
)(Example)
