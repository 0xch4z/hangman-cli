'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getRandomWord = require('./get-random-word');

Object.defineProperty(exports, 'getRandomWord', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_getRandomWord).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }