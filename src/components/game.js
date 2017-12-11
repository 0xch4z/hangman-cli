import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GuessBox } from './'
import { getRandomWord } from '../utils'

class Game extends Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.messageTimeout = null
    this.state = {
      seconds: 30,
      lives: 0,
      active: false,
      word: null,
      fetchingWord: true,
      guessVector: [],
      message: null,
      messageColor: null,
    }
  }

  static propTypes = {
    screen: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.registerKeyListener()
  }

  componentWillUnmount() {
    this.props.screen.off('keypress', this.keyListener)
    clearInterval(this.timer)
    clearTimeout(this.messageTimeout)
  }

  async getRandomWord() {
    this.setState({ fetchingWord: true })
    const word = await getRandomWord()
    this.setState({ word, fetchingWord: false })
  }

  registerKeyListener() {
    this.keyListener = this.props.screen.on('keypress', (char, key) => {
      const { active } = this.state
      if (char === 'escape' || key.full === 'C-c') {
        // exit
        this.props.screen.leave()
        process.exit(0)
      } else if (char === ' ' && !active) {
        // start round
        this.startRound()
      } else if (/[a-z]/i.test(char) && active) {
        // make guess
        this.makeGuess(char)
      }
    })
  }

  startRound() {
    // fetch random word
    this.getRandomWord()
    // init game state
    this.setState({
      seconds: 30,
      active: true,
      lives: 10,
    })
    // init timer
    this.timer = setInterval(
      this.onTick.bind(this), 1000
    )
  }

  endRound(didWin) {
    const { word } = this.state
    // deinit timer
    clearInterval(this.timer)    
    // reset game state
    this.setState({
      active: false,
      word: null,
      guessVector: [],
    })
    // display
    if (didWin) {
      this.showMessage('You won!', 5, 'green')
    } else {
      this.showMessage(`You lost. The word was "${word}"...`, 5, 'red')
    }
  }

  onTick() {
    const { seconds } = this.state
    if (!seconds > 0) {
      this.endRound()
    } else {
      this.setState({
        seconds: seconds - 1
      })
    }
  }

  showMessage(message, seconds, messageColor) {
    // cancel existing timeouts
    clearTimeout(this.messageTimeout)
    this.hideMessage()
    // show next message
    this.setState({ message, messageColor })
    this.messageTimeout = setTimeout(
      this.hideMessage.bind(this), seconds * 1000
    )
  }

  hideMessage() {
    this.setState({ message: '' })
  }

  makeGuess(char) {
    const { guessVector, word, lives } = this.state
    if (guessVector.includes(char)) {
      return this.showMessage(`You've already tried ${char}!`, 2, 'yellow')
    }
    // add new char
    this.setState({ guessVector: [...guessVector, char] })
    // increment score | decrement lives
    if (!word.includes(char)) {
      return lives > 0 ? this.setState({ lives: lives - 1 }) :
        this.endRound()
    } else if (word.split('').every(c => this.state.guessVector.includes(c))) {
      this.endRound(true)
    }
  }

  render() {
    const {
      active,
      word,
      fetchingWord,
      seconds,
      guessVector,
      lives,
      message,
      messageColor,
    } = this.state
    return(
      <box
        top="center"
        left="center"
        height="95%"
        width="95%"
      >
        <text
          top="5%"
          left="1%"
        >
          {active ? `⏰  ${seconds}` : null}
        </text>
        <text
          top="5%"
          left="96%"
        >
          {active ? `${lives} ❤️` : null}
        </text>
        <text
          top="5%"
          left="center"
          style={{ fg: messageColor }}
        >
          {message}
        </text>
        <text
          top="center" 
          left="center"
        >
          { 
            !active ? 'press space to start...' : ( fetchingWord ? 
            'fetching word...' : word.split('').map(c =>
              (guessVector.includes(c)) ? ` ${c} ` : ` _ `
            )
          )}
        </text>
        <box top="80%" height="20%" width="60%" left="center">
          <GuessBox
            guessVector={guessVector}
            word={word}
          />
        </box>
      </box>
    )
  }

}

export default Game
