import './style.scss'

type Arrow<Event extends KeyboardEvent | TouchEvent> =
  Event extends KeyboardEvent
    ? Event['key']
    : 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

type Keys<Event extends KeyboardEvent | TouchEvent = KeyboardEvent> = Record<
  Arrow<Event>,
  number
>

const c = document.createElement('canvas'),
  ctx = c.getContext('2d') as CanvasRenderingContext2D,
  size = 50,
  key: Keys = {
    ArrowUp: 0,
    ArrowDown: 0,
    ArrowLeft: 0,
    ArrowRight: 0,
  },
  perm: number[] = [],
  LEVEL = innerHeight > 800 ? 1024 : 256

let t = 0,
  speed = 0,
  playing = true,
  reloading = false,
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
    this.img.src = 'viniktm.png'
  }

  draw() {
    const p1 = c.height - noise(t + this.x) * 0.25
    const p2 = c.height - noise(t + 5 + this.x) * 0.25

    let grounded = 0

    if (p1 - size > this.y) {
      this.ySpeed += 0.08
    } else {
      this.ySpeed -= this.y - (p1 - size)
      this.y = p1 - size

      grounded = 1
    }

    if (!playing || (grounded && Math.abs(this.rot) > Math.PI * 0.5)) {
      playing = false
      this.rSpeed = 3
      key.ArrowUp = 1
      this.x -= speed * 5
      if (!reloading) {
        setTimeout(() => {
          reloading = true
          console.log('reload')
          location.reload()
        }, 3000)
      }
    }

    const angle = Math.atan2(p2 - size - this.y, this.x + 3 - this.x)

    this.y += this.ySpeed

    if (grounded && playing) {
      this.rot -= (this.rot - angle) * 0.9
      this.rSpeed = this.rSpeed - (angle - this.rot)
    }

    this.rSpeed += (key.ArrowLeft - key.ArrowRight) * 0.02
    this.rot -= this.rSpeed * 0.1

    if (this.rot > Math.PI) this.rot = -Math.PI
    if (this.rot < -Math.PI) this.rot = Math.PI

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rot)
    ctx.drawImage(this.img, -size, -size, 100, 100)

    ctx.restore()
  }
}

const player = new Player()

function loop() {
  speed -= (speed - (key.ArrowUp - key.ArrowDown)) * 0.1
  t += 10 * speed
  ctx.fillStyle = '#8ee5ff'
  ctx.fillRect(0, 0, c.width, c.height)

  ctx.fillStyle = '#f97f2d'

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

const leftTop = document.querySelector<HTMLElement>('main #left .top')
const leftBottom = document.querySelector<HTMLElement>('main #left .bottom')
const rightTop = document.querySelector<HTMLElement>('main #right .top')
const rightBottom = document.querySelector<HTMLElement>('main #right .bottom')

if (leftTop && leftBottom && rightTop && rightBottom) {
  leftTop.ontouchstart = () => {
    const direction = key as Keys<TouchEvent>
    direction.ArrowLeft = 1
  }
  leftTop.ontouchend = () => {
    const direction = key as Keys<TouchEvent>
    direction.ArrowLeft = 0
  }
  leftBottom.ontouchstart = () => {
    const direction = key as Keys<TouchEvent>
    direction.ArrowDown = 1
  }
  leftBottom.ontouchend = () => {
    const direction = key as Keys<TouchEvent>
    direction.ArrowDown = 0
  }
  rightTop.ontouchstart = () => {
    const direction = key as Keys<TouchEvent>
    direction.ArrowRight = 1
  }
  rightTop.ontouchend = () => {
    const direction = key as Keys<TouchEvent>
    direction.ArrowRight = 0
  }
  rightBottom.ontouchstart = () => {
    const direction = key as Keys<TouchEvent>
    direction.ArrowUp = 1
  }
  rightBottom.ontouchend = () => {
    const direction = key as Keys<TouchEvent>
    direction.ArrowUp = 0
  }
}

onkeydown = (d) => (key[d.key] = 1)
onkeyup = (d) => (key[d.key] = 0)

loop()
