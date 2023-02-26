import {CANVAS, CONTEXT, GRAVITY, SIZE} from '../../constants'
import {control, store} from '../../data'
import {noise} from '../../utilities'

export class Player {
  reloading = false
  x = CANVAS.width / 2
  ySpeed = 0
  rSpeed = 0
  rot = 0
  y = 0
  t = 0

  img = new Image()

  constructor() {
    this.img.src = 'rider.svg'
  }

  draw() {
    const t = store.pick('t')
    const speed = store.pick('speed')
    const playing = store.pick('playing')

    const p1 = CANVAS.height - noise(t + this.x) * 0.25
    const p2 = CANVAS.height - noise(t + 5 + this.x) * 0.25

    let grounded = 0

    if (p1 - SIZE > this.y) {
      this.ySpeed += GRAVITY
      // console.log('VOANDO')
    } else {
      // console.log('CHAO')
      this.ySpeed -= this.y - (p1 - SIZE)
      this.y = p1 - SIZE

      grounded = 1
    }

    if (!playing || (grounded && Math.abs(this.rot) > Math.PI * 0.5)) {
      this.rSpeed = 3
      store.setState({playing: false})
      control.setState({ArrowUp: 1})
      this.x -= speed

      /**
       * @TODO reload is wrong :/ improve this!
       */
      if (!this.reloading) {
        setTimeout(() => {
          this.reloading = true
          location.reload()
        }, 1000)
      }
    }

    const angle = Math.atan2(p2 - SIZE - this.y, this.x + 3 - this.x)

    this.y += this.ySpeed

    if (grounded && playing) {
      this.rot -= (this.rot - angle) * 0.9
      this.rSpeed = this.rSpeed - (angle - this.rot)
    }

    this.rSpeed +=
      (control.pick('ArrowLeft') - control.pick('ArrowRight')) * 0.02

    this.rot -= this.rSpeed * 0.1

    if (this.rot > Math.PI) this.rot = -Math.PI
    if (this.rot < -Math.PI) this.rot = Math.PI

    CONTEXT.save()
    CONTEXT.translate(this.x, this.y)
    CONTEXT.rotate(this.rot)
    CONTEXT.drawImage(this.img, -SIZE, -SIZE, SIZE * 2, SIZE * 2)

    CONTEXT.restore()
  }
}
