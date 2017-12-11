'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      height: 0,
      width: 0
    };
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initScreen();
    }
  }, {
    key: 'updateFrame',
    value: function updateFrame() {
      var _props$screen = this.props.screen,
          height = _props$screen.height,
          width = _props$screen.width;

      this.setState({ height: height, width: width });
    }
  }, {
    key: 'initScreen',
    value: function initScreen() {
      var _this2 = this;

      this.updateFrame();
      this.props.screen.on('resize', function () {
        return _this2.updateFrame();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          height = _state.height,
          width = _state.width;

      return _react2.default.createElement(
        'box',
        {
          label: 'Hangman CLI',
          border: { type: 'line', fg: 'blue' }
        },
        height < 30 || width < 100 ? _react2.default.createElement(
          'box',
          {
            top: 'center',
            left: 'center',
            style: { fg: 'yellow' }
          },
          '\u2728 Please make your terminal ',
          height < 30 ? 'tall' : 'wid',
          'er!'
        ) : _react2.default.createElement(_.Game, { screen: this.props.screen })
      );
    }
  }]);
  return App;
}(_react.Component);

App.propTypes = {
  screen: _propTypes2.default.object.isRequired
};
exports.default = App;