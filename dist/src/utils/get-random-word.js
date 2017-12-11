'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _querystring = require('querystring');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = 'http://api.wordnik.com/v4/words.json/randomWord';

var query = (0, _querystring.stringify)({
  hasDicitonaryDef: true,
  includePartOfSpeech: 'verb',
  minCorpusCount: 1000,
  maxCorpusCount: -1,
  minDictionaryCount: 1,
  maxDictionaryCount: 1,
  minLength: 3,
  maxLength: 7,
  api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
});

var apiUrl = BASE_URL + '?' + query;

exports.default = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var _ref2, data, message;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _axios2.default.get(apiUrl);

        case 3:
          _ref2 = _context.sent;
          data = _ref2.data;
          return _context.abrupt('return', data.word);

        case 8:
          _context.prev = 8;
          _context.t0 = _context['catch'](0);
          message = _context.t0.message;

          console.error('Error fetching random word: ' + message);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[0, 8]]);
}));