import blessed from 'blessed'

export default blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Hangman!',
})
