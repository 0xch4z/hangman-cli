'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBlessed = require('react-blessed');

var _console = require('console');

var _components = require('./src/components');

var _screen = require('./src/screen');

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactBlessed.render)(_react2.default.createElement(_components.App, { screen: _screen2.default }), _screen2.default);

process.on('exit', function () {
  return !(0, _console.clear)() && (0, _console.log)('Thanks for playing! ✨');
});