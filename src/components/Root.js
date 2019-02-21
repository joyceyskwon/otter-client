import React from 'react';
// import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { ActionCableProvider } from 'react-actioncable-provider'
import App from './App'

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
