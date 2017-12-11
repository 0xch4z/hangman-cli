'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('./');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = function (_Component) {
  (0, _inherits3.default)(Game, _Component);

  function Game(props) {
    (0, _classCallCheck3.default)(this, Game);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this.timer = null;
    _this.messageTimeout = null;
    _this.state = {
      seconds: 30,
      lives: 0,
      active: false,
      word: null,
      fetchingWord: true,
      guessVector: [],
      message: null
    };
    return _this;
  }

  (0, _createClass3.default)(Game, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.registerKeyListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.screen.off('keypress', this.keyListener);
      clearInterval(this.timer);
      clearTimeout(this.messageTimeout);
    }
  }, {
    key: 'getRandomWord',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var word;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({ fetchingWord: true });
                _context.next = 3;
                return (0, _utils.getRandomWord)();

              case 3:
                word = _context.sent;

                this.setState({ word: word, fetchingWord: false });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getRandomWord() {
        return _ref.apply(this, arguments);
      }

      return getRandomWord;
    }()
  }, {
    key: 'registerKeyListener',
    value: function registerKeyListener() {
      var _this2 = this;

      this.keyListener = this.props.screen.on('keypress', function (char, key) {
        var active = _this2.state.active;

        if (char === 'escape' || key.full === 'C-c') {
          // exit
          _this2.props.screen.leave();
          process.exit(0);
        } else if (char === ' ' && !active) {
          // start round
          _this2.startRound();
        } else if (/[a-z]/i.test(char) && active) {
          // make guess
          _this2.makeGuess(char);
        }
      });
    }
  }, {
    key: 'startRound',
    value: function startRound() {
      // fetch random word
      this.getRandomWord();
      // init game state
      this.setState({
        seconds: 30,
        active: true,
        lives: 10
      });
      // init timer
      this.timer = setInterval(this.onTick.bind(this), 1000);
    }
  }, {
    key: 'endRound',
    value: function endRound(didWin) {
      var word = this.state.word;
      // deinit timer

      clearInterval(this.timer);
      // reset game state
      this.setState({
        active: false,
        word: null,
        guessVector: []
      });
      // display
      this.showMessage(didWin ? 'You won!' : 'You lost. The word was "' + word + '"...', 5);
    }
  }, {
    key: 'onTick',
    value: function onTick() {
      var seconds = this.state.seconds;

      if (!seconds > 0) {
        this.endRound();
      } else {
        this.setState({
          seconds: seconds - 1
        });
      }
    }
  }, {
    key: 'showMessage',
    value: function showMessage(message, seconds) {
      // cancel existing timeouts
      clearTimeout(this.messageTimeout);
      this.hideMessage();
      // show next message
      this.setState({ message: message });
      this.messageTimeout = setTimeout(this.hideMessage.bind(this), seconds * 1000);
    }
  }, {
    key: 'hideMessage',
    value: function hideMessage() {
      this.setState({ message: '' });
    }
  }, {
    key: 'makeGuess',
    value: function makeGuess(char) {
      var _state = this.state,
          guessVector = _state.guessVector,
          word = _state.word,
          lives = _state.lives;

      if (guessVector.includes(char)) {
        return this.showMessage('You\'ve already tried ' + char + '!', 2);
      }
      // add new char
      this.setState({ guessVector: [].concat((0, _toConsumableArray3.default)(guessVector), [char]) });
      // increment score | decrement lives
      if (!word.includes()) {
        return lives > 0 ? this.setState({ lives: lives - 1 }) : this.endRound();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          active = _state2.active,
          word = _state2.word,
          fetchingWord = _state2.fetchingWord,
          seconds = _state2.seconds,
          guessVector = _state2.guessVector,
          lives = _state2.lives,
          message = _state2.message;

      return _react2.default.createElement(
        'box',
        {
          top: 'center',
          left: 'center',
          height: '95%',
          width: '95%'
        },
        _react2.default.createElement(
          'text',
          {
            top: '5%',
            left: '1%'
          },
          active ? '\u23F0  ' + seconds : null
        ),
        _react2.default.createElement(
          'text',
          {
            top: '5%',
            left: '96%'
          },
          active ? lives + ' \u2764\uFE0F' : null
        ),
        _react2.default.createElement(
          'text',
          {
            top: '5%',
            left: 'center',
            style: { fg: 'red' }
          },
          message
        ),
        _react2.default.createElement(
          'text',
          {
            top: 'center',
            left: 'center'
          },
          !active ? 'press space to start...' : fetchingWord ? 'fetching word...' : word.split('').map(function (c) {
            return guessVector.includes(c) ? ' ' + c + ' ' : ' _ ';
          })
        ),
        _react2.default.createElement(
          'box',
          { top: '80%', height: '20%', width: '60%', left: 'center' },
          _react2.default.createElement(_.GuessBox, {
            guessVector: guessVector,
            word: word
          })
        )
      );
    }
  }]);
  return Game;
}(_react.Component);

Game.propTypes = {
  screen: _propTypes2.default.object.isRequired
};
exports.default = Game;