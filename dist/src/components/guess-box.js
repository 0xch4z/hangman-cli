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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GuessBox = function (_Component) {
  (0, _inherits3.default)(GuessBox, _Component);

  function GuessBox() {
    (0, _classCallCheck3.default)(this, GuessBox);
    return (0, _possibleConstructorReturn3.default)(this, (GuessBox.__proto__ || Object.getPrototypeOf(GuessBox)).apply(this, arguments));
  }

  (0, _createClass3.default)(GuessBox, [{
    key: 'render',
    value: function render() {
      var guessVector = this.props.guessVector;

      return _react2.default.createElement(
        'box',
        {
          label: 'Guesses',
          border: { type: 'line' }
        },
        guessVector.join(' ')
      );
    }
  }]);
  return GuessBox;
}(_react.Component);

GuessBox.propTypes = {
  guessVector: _propTypes2.default.array.isRequired,
  word: _propTypes2.default.string.isRequired
};
exports.default = GuessBox;