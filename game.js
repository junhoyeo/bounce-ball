const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const info = document.getElementById('info')

let gravity = 9.8
let ball = {
  init () {
    this.x = canvas.width / 8 * 1
    this.y = canvas.height / 8 * 1.5
    this.mass = 2
    this.speedX = 60
    this.speedY = 1
    this.accY = 0
    this.draw()
  },

  draw () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 5, 0, Math.PI*2)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.closePath()
  },

  update (timeInterval) {
    this.accY = this.mass * gravity

    this.speedY += this.accY
    // this.acc += gravity * this.mass
    // this.speedY += this.acc
    // this.x += timeInterval * this.speedX
    this.y += timeInterval * this.speedY

    if (this.y > canvas.height) {
      this.speedY *= -0.8
      this.y = canvas.height + timeInterval * this.speedY
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

const fps = 1000
const timeInterval = 1.0 / fps
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ball.update(timeInterval)
  info.innerText = status(ball)
}, 1)
