import React from 'react'

import Button from '../../components/Button'
import IconTick from '../../assets/svg/icon-tick.svg'

const Example = () => (
  <div style={{ marginTop: '40px' }}>
    <Button
      onClick={() => {
        console.log('Button clicked')
      }}
    >
      <span className="icon--baseline icon--left">
        <IconTick />
      </span>
      Click me
    </Button>
  </div>
)

export default Example
