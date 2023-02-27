import {CANVAS, CONTEXT, GRAVITY, SIZE} from '../../constants'
import {loadFrames} from '../usecases/load-frames'
import {GameLoop} from '../usecases/game-loop'
import {control, frame, store} from '../../data'
import {noise} from '../../utilities'

const PLAYER_FRAMES: PlayerFrames = [
  ['./player/waiting.png', 'waiting', 0],
  ['./player/running.png', 'running', 0],
  ['./player/back-flip.png', 'backFlip', 0],
  ['./player/front-flip.png', 'frontFlip', 0],
]

export class Player {
  reloading = false
  position: Position = {
    x: CANVAS.width / 2,
    y: 0,
    r: 0,
  }
  speed: Speed = {
    y: 0,
    r: 0,
  }
  t = 0

  img = new Image()

  frame: PlayerKeyFrame = 'waiting'

  constructor() {
    this.img.src = 'rider.svg'

    Promise.allSettled(loadFrames(frame, PLAYER_FRAMES)).then(() => {
      console.log(frame.state())

      const gameLoop = new GameLoop(this)
      gameLoop.execute()
      console.log(frame.state())
    })
  }

  restart() {
    store.setState({playing: true, speed: 0, t: 0})
    this.reloading = false
    this.position = {
      x: CANVAS.width / 2,
      y: 0,
      r: 0,
    }

    this.speed = {
      y: 0,
      r: 0,
    }
  }

  draw() {
    const t = store.pick('t')
    const speed = store.pick('speed')
    const playing = store.pick('playing')

    const p1 = CANVAS.height - noise(t + this.position.x) * 0.3
    const p2 = CANVAS.height - noise(t + 5 + this.position.x) * 0.3

    let grounded = 0

    if (p1 - SIZE > this.position.y) {
      this.speed.y += GRAVITY
      // console.log('VOANDO')
    } else {
      // console.log('CHAO')
      this.speed.y -= this.position.y - (p1 - SIZE)
      this.position.y = p1 - SIZE

      grounded = 1
    }

    if (!playing || (grounded && Math.abs(this.position.r) > Math.PI * 0.5)) {
      this.speed.r = 3
      store.setState({playing: false})
      control.setState({ArrowUp: 1})
      this.position.x -= speed

      if (!this.reloading) {
        setTimeout(() => this.restart(), 1000)
        this.reloading = true
      }
    }

    const angle = Math.atan2(
      p2 - SIZE - this.position.y,
      this.position.x + 3 - this.position.x
    )

    this.position.y += this.speed.y

    if (grounded && playing) {
      this.position.r -= (this.position.r - angle) * 0.9
      this.speed.r = this.speed.r - (angle - this.position.r)
    }

    this.speed.r +=
      (control.pick('ArrowLeft') - control.pick('ArrowRight')) * 0.02

    this.position.r -= this.speed.r * 0.1

    if (this.position.r > Math.PI) this.position.r = -Math.PI
    if (this.position.r < -Math.PI) this.position.r = Math.PI

    CONTEXT.save()
    CONTEXT.translate(this.position.x, this.position.y)
    CONTEXT.rotate(this.position.r)

    let state: PlayerKeyFrame

    if (control.pick('ArrowLeft')) state = 'backFlip'
    else if (control.pick('ArrowRight')) state = 'frontFlip'
    else if (control.pick('ArrowUp')) state = 'running'
    else state = 'waiting'

    // const state = control.pick('ArrowUp') ? 'running' : 'waiting'
    const [currentFrame] = frame.pick(state)
    CONTEXT.drawImage(currentFrame, -SIZE, -SIZE, SIZE * 2, SIZE * 2)
    // CONTEXT.drawImage(this.img, -SIZE, -SIZE, SIZE * 2, SIZE * 2)

    CONTEXT.restore()
  }
}
