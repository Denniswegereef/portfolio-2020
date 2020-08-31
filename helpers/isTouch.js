function isTouch () {
  // https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')

  function mq (query) {
    return window.matchMedia(query).matches
  }

  if ('ontouchstart' in window || window.DocumentTouch) return true

  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}

module.exports = isTouch
