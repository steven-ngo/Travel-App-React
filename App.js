import React from 'react'
import {Provider} from 'react-redux'
import {Root} from 'native-base'

import reduxStore from './store'
import Menu from './screens/Menu'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <Root>
          <Menu />
        </Root>
      </Provider>
    )
  }
}
