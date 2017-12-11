import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Game } from './'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      width: 0,
    }
  }

  static propTypes = {
    screen: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.initScreen()
  }

  updateFrame() {
    const { height, width } = this.props.screen
    this.setState({ height, width })
  }

  initScreen() {
    this.updateFrame()
    this.props.screen.on('resize', () => this.updateFrame())
  }

  render() {
    const { height, width } = this.state
    return (
      <box
        label="Hangman CLI"
        border={{ type: 'line', fg: 'blue' }}
      >
        { height < 30 || width < 100 ? 
          <box
            top="center"
            left="center"
            style={{ fg: 'yellow' }}
          >
            ✨ Please make your terminal {height < 30 ? 'tall' : 'wid' }er!
          </box> : <Game screen={this.props.screen} />
        }
      </box>
    )
  }
}

export default App
