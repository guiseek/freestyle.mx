import {CANVAS, CONTEXT, GRAVITY, SIZE} from '../../constants'
import {loadFrames} from '../usecases/load-frames'
import {GameLoop} from '../usecases/game-loop'
import {control, frame, store, trick} from '../../data'
import {noise} from '../../utilities'

const PLAYER_FRAMES: PlayerFrames = [
  ['./player/waiting.png', 'waiting', 0],
  ['./player/landing.png', 'landing', 0],
  ['./player/running.png', 'running', 0],
  ['./player/back-flip.png', 'backFlip', 0],
  ['./player/front-flip.png', 'frontFlip', 0],
  ['./player/super-man.png', 'superMan', 0],
  ['./player/hart-attack/1.png', 'hartAttack', 0],
  ['./player/hart-attack/2.png', 'hartAttack', 1],
  ['./player/hart-attack/3.png', 'hartAttack', 2],
  ['./player/hart-attack/4.png', 'hartAttack', 3],
  ['./player/hart-attack/5.png', 'hartAttack', 4],
  ['./player/hart-attack/6.png', 'hartAttack', 5],
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

  // state: PlayerKeyFrame = 'waiting'
  // skipLoop = false
  // frameIndex = 0
  // skipTimes = 0

  constructor() {
    this.img.src = 'rider.svg'

    Promise.allSettled(loadFrames(frame, PLAYER_FRAMES)).then(() => {
      const gameLoop = new GameLoop(this)
      gameLoop.execute()
    })

    this.updateFrame('waiting')

    const stateByKey: Record<Key, PlayerKeyFrame> = {
      h: 'hartAttack',
      s: 'superMan',
      ArrowLeft: 'backFlip',
      ArrowRight: 'frontFlip',
      ArrowUp: 'running',
      ArrowDown: 'waiting',
    }

    control.onChange.subscribe((value) => {
      console.log()

      const [current] =
        Object.entries(value).find(([key, value]) => value === 1) ?? []

      if (current) this.updateFrame(stateByKey[current as Key])
    })

    frame
      .select(({currentKey, currentIndex, frames, skipTimes}) => {
        return {currentKey, currentIndex, frames, skipTimes}
      })
      .subscribe(console.log)
    // const s$ = control.select(({s}) => s)
    // s$.subscribe((state) => {
    //   if (state) {
    //     const currentKey = 'superMan'
    //     const frames = frame.pick(currentKey)
    //     frame.setState({
    //       skipTimes: frames.length,
    //       currentIndex: 0,
    //       currentKey,
    //       frames,
    //     })
    //   }
    // })
  }

  updateFrame(currentKey: PlayerKeyFrame) {
    const frames = frame.pick(currentKey)
    frame.setState({
      skipTimes: frames.length,
      currentIndex: 0,
      currentKey,
      frames,
    })
  }

  restart() {
    control.setState({
      ArrowDown: 0,
      ArrowLeft: 0,
      ArrowRight: 0,
      ArrowUp: 0,
    })
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
      // this.skipLoop = true
      // this.skipTimes = 3
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

    let {frames, currentIndex, skipTimes} = frame.state()
    const currentFrame = frames[currentIndex]
    CONTEXT.drawImage(currentFrame, -SIZE, -SIZE, SIZE * 2, SIZE * 2)

    if (skipTimes > 0) {
      if (currentIndex < frames.length - 1) {
        currentIndex++
      }
      skipTimes--
    }
    
    if (!skipTimes) {
      currentIndex = frames.length - 1
    }
    frame.setState({currentIndex, skipTimes})


    // if (control.pick('s')) this.state = 'superMan'
    // else if (control.pick('h')) {
    //   if (this.state != 'hartAttack') {
    //     this.frameIndex = 0
    //     this.skipTimes = 5
    //   }
    //   this.state = 'hartAttack'
    // } else if (control.pick('ArrowLeft')) {
    //   this.state = 'backFlip'
    // } else if (control.pick('ArrowRight')) this.state = 'frontFlip'
    // else if (control.pick('ArrowUp')) this.state = 'running'
    // else state = 'waiting'
    // if (this.skipTimes > 0) {
    //   state = 'landing'
    //   this.skipTimes--
    // }

    // const [currentFrame] = frame.pick('running')
    // const [currentFrame] = frame.pick(this.state)
    // CONTEXT.drawImage(currentFrame, -SIZE, -SIZE, SIZE * 2, SIZE * 2)
    // }

    CONTEXT.restore()
  }
}
