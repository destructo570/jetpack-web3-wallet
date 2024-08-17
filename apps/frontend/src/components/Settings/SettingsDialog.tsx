import React from 'react'
import ViewPrivateKeys from './ViewPrivateKeys'

const SettingsDialog = (props) => {
  const { wallets } = props;
  return (
    <div>
      <ViewPrivateKeys wallets={wallets}/>
    </div>
  )
}

export default SettingsDialog