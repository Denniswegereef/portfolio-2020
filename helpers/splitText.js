function splitText (container, opentag, closingtag) {
  const spans = container.children
  let top = 0
  let tmp = ''

  container.innerHTML = container.textContent.replace(/\S+/g, '<n>$&</n>')

  for (let i = 0; i < spans.length; i++) {
    const rect = spans[i].getBoundingClientRect().top
    if (top < rect) tmp += closingtag + opentag
    top = rect
    tmp += spans[i].textContent + ' '
  }

  container.innerHTML = tmp += closingtag
}

module.exports = splitText
