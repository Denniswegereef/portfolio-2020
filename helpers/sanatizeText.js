function sanatizeText (container) {
  const string = container.innerHTML
  container.innerHTML = string.replace(/(<([^>]+)>)/gi, '')
}

module.exports = sanatizeText
