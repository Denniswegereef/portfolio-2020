// First key needs regex pattern, second what it needs to be replaced with

function wrapElements (elements, replaceArray) {
  for (let i = 0; i < elements.length; i++) for (let j = 0; j < replaceArray.length; j++) elements[i].innerHTML = elements[i].innerHTML.replace(replaceArray[j].regex, replaceArray[j].tag)
}

module.exports = wrapElements
