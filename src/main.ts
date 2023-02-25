import {controlState} from './data'
import './style.scss'

const isSmallScreen = () => innerHeight < 800

const c = document.createElement('canvas'),
  ctx = c.getContext('2d') as CanvasRenderingContext2D,
  size = isSmallScreen() ? 30 : 60,
  perm: number[] = [],
  LEVEL = isSmallScreen() ? 512 : 1024,
  GRAVITY = 0.2,
  VELOCITY = 10

let t = 0,
  speed = 0,
  playing = true,
  reloading = false,
  fullscreen = false,
  val

while (perm.length < LEVEL) {
  while (perm.includes((val = Math.floor(Math.random() * LEVEL))));
  perm.push(val)
}

const setSizes = (canvas: HTMLCanvasElement) => {
  return () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
  }
}

const adjust = setSizes(c)

document.body.appendChild(c)
onresize = setSizes(c)
adjust()

const lerp = (a: number, b: number, t: number) =>
  a + ((b - a) * (1 - Math.cos(t * Math.PI))) / 2

const noise = (x: number) => {
  x = (x * 0.005) % LEVEL
  return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x))
}

class Player {
  ySpeed = 0
  rSpeed = 0
  x = c.width / 2
  y = 0
  rot = 0

  img = new Image()

  constructor() {
    this.img.src = 'rider.svg'
  }

  draw() {
    const p1 = c.height - noise(t + this.x) * 0.25
    const p2 = c.height - noise(t + 5 + this.x) * 0.25

    let grounded = 0

    if (p1 - size > this.y) {
      this.ySpeed += GRAVITY
      // console.log('VOANDO')
    } else {
      // console.log('CHAO')
      this.ySpeed -= this.y - (p1 - size)
      this.y = p1 - size

      grounded = 1
    }

    if (!playing || (grounded && Math.abs(this.rot) > Math.PI * 0.5)) {
      playing = false
      this.rSpeed = 3
      // key.ArrowUp = 1
      controlState.setState({ArrowUp: 1})
      this.x -= speed
      if (!reloading) {
        setTimeout(() => {
          reloading = true
          console.log('reload')
          location.reload()
        }, 1000)
      }
    }

    const angle = Math.atan2(p2 - size - this.y, this.x + 3 - this.x)

    this.y += this.ySpeed

    if (grounded && playing) {
      this.rot -= (this.rot - angle) * 0.9
      this.rSpeed = this.rSpeed - (angle - this.rot)
    }

    this.rSpeed +=
      (controlState.pick('ArrowLeft') - controlState.pick('ArrowRight')) * 0.02

    this.rot -= this.rSpeed * 0.1

    if (this.rot > Math.PI) this.rot = -Math.PI
    if (this.rot < -Math.PI) this.rot = Math.PI

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rot)
    ctx.drawImage(this.img, -size, -size, size * 2, size * 2)

    ctx.restore()
  }
}

const player = new Player()

function loop() {
  speed -=
    (speed - (controlState.pick('ArrowUp') - controlState.pick('ArrowDown'))) *
    0.1
  t += VELOCITY * speed
  /**
   * Cor do céu
   */
  ctx.fillStyle = '#8ee5ff'
  ctx.fillRect(0, 0, c.width, c.height)

  /**
   * Cor da terra
   */
  ctx.fillStyle = '#c55e1a'

  ctx.beginPath()
  ctx.moveTo(0, c.height)

  for (var i = 0; i < c.width; i++) {
    ctx.lineTo(i, c.height - noise(t + i) * 0.25)
  }

  ctx.lineTo(c.width, c.height)

  ctx.fill()

  player.draw()
  requestAnimationFrame(loop)
}

const backFlipButton = document.querySelector<HTMLButtonElement>('#back-flip')
const frontFlipButton = document.querySelector<HTMLButtonElement>('#front-flip')
const runButton = document.querySelector<HTMLButtonElement>('#run')
const backButton = document.querySelector<HTMLButtonElement>('#back')

if (backFlipButton && frontFlipButton && runButton && backButton) {
  backFlipButton.ontouchstart = () => controlState.setState({ArrowLeft: 1})
  backFlipButton.ontouchend = () => controlState.setState({ArrowLeft: 0})

  frontFlipButton.ontouchstart = () => controlState.setState({ArrowRight: 1})
  frontFlipButton.ontouchend = () => controlState.setState({ArrowRight: 0})

  runButton.ontouchstart = () => controlState.setState({ArrowUp: 1})
  runButton.ontouchend = () => controlState.setState({ArrowUp: 0})

  backButton.ontouchstart = () => controlState.setState({ArrowDown: 1})
  backButton.ontouchend = () => controlState.setState({ArrowDown: 0})
}

document.body.ondblclick = () => {
  console.log('dbl');
  if (fullscreen) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen({
      navigationUI: 'hide',
    })
  }
  fullscreen = !fullscreen
  
}

onkeydown = (ev) => controlState.setState({[ev.key]: 1})
onkeyup = (ev) => controlState.setState({[ev.key]: 0})

loop()
