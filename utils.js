function toggleTrace () {
  trace = !trace
}

function restart () {
  if (trace)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  ball.init()
}

function fromInput (elementId) {
  return Number(document.getElementById(elementId).value)
}

function loadInput () {
  ball.speedX = fromInput('speedX')
  ball.speedY = fromInput('speedY')
}
