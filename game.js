function fromInput (elementId) {
  return Number(document.getElementById(elementId).value)
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const info = document.getElementById('info')

let trace = true
let gravity = 9.8

let ball = {
  init () {
    this.x = canvas.width / 8 * 1
    this.y = canvas.height / 8 * 1.5
    this.mass = 2
    this.speedX = fromInput('speedX')
    this.speedY = fromInput('speedY')
    this.accY = 0
    this.draw()
  },

  draw () {
    ctx.beginPath();
    ctx.fillStyle = 'red'
    if (trace)
      ctx.moveTo(this.x, this.y)
    ctx.arc(this.x, this.y, 5, 0, Math.PI*2, true);
    ctx.fill()
  },

  update (timeInterval) {
    this.accY = this.mass * gravity
    this.speedY += this.accY
    
    this.x += timeInterval * this.speedX
    this.y += timeInterval * this.speedY

    if (this.x > canvas.width) {
      this.speedX *= -0.8
      this.speedY *= 0.99
      this.x = canvas.width + timeInterval * this.speedX
    } else if (this.x < 0) {
      this.speedX *= -0.8
      this.speedY *= 0.99
      this.x = 1.0 + timeInterval * this.speedX
    }
    if (this.y > canvas.height) {
      this.speedX *= 0.99
      this.speedY *= -0.8
      this.y = canvas.height + timeInterval * this.speedY
    } else if (this.y < 0) {
      this.speedX *= 0.99
      this.speedY *= -0.8
      this.y = 1.0 + timeInterval * this.speedY
    }
    this.draw()
  }
}

ball.init()

function status (ball) {
  let info = String()
  ;['x', 'y', 'speedX', 'speedY', 'accY'].forEach(function(value) {
      info += `${value}: ${ball[value].toFixed(2)}\n`
  });
  return info
}

const fps = 100
const timeInterval = 0.01 / fps
setInterval(function(){
  if (trace) {
    ctx.fillStyle = 'rgba(255, 255, 255, .03)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  } else ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  ball.update(timeInterval)

  info.innerText = status(ball)
}, 0.1)
