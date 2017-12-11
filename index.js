import React from 'react'
import { render } from 'react-blessed'
import { log, clear } from 'console'

import { App } from './src/components'
import screen from './src/screen'

render(
  <App screen={screen} />,
  screen
)

process.on('exit', () =>
  !clear() && log('Thanks for playing! ✨')
)
