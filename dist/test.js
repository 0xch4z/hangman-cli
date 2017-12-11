'use strict';

var _require = require('querystring'),
    stringify = _require.stringify;

var url = '\n  http://api.wordnik.com:80/v4/words.json/\n  randomWord?hasDictionaryDef=false\n  &excludePartOfSpeech=idiom\n  &minCorpusCount=100000\n  &maxCorpusCount=-1\n  &minDictionaryCount=1\n  &maxDictionaryCount=-1\n  &minLength=3&maxLength=7\n  &api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5\n';

var BASE_URL = 'http://api.wordnik.com/v4/words.json/randomWord';

var query = stringify({
  hasDicitonaryDef: true,
  excludePartOfSpeech: 'idiom',
  minCorpusCount: 100000,
  maxCorpusCount: -1,
  minDictionaryCount: 1,
  maxDictionaryCount: 1,
  minLength: 3,
  maxLength: 7,
  api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
});

console.log(BASE_URL + '?' + query);