import React, { Component } from 'react'
import PropTypes from 'prop-types'

class GuessBox extends Component {
  static propTypes = {
    guessVector: PropTypes.array.isRequired,
    word: PropTypes.string.isRequired,
  }

  render() {
    const { guessVector } = this.props
    return (
      <box
        label="Guesses"
        border={{ type: 'line' }}
      >
        {guessVector.join(' ')}
      </box>
    )
  }
}

export default GuessBox
