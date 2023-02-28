import {CANVAS, CONTEXT, VELOCITY} from '../../constants'
import {noise, createSky} from '../../utilities'
import {control, store} from '../../data'
import {Player} from '../entities/player'

export class GameLoop {
  sky = createSky()

  constructor(private player: Player) {}

  execute = () => {
    let t = store.pick('t')
    let speed = store.pick('speed')

    speed -= (speed - control.pick('ArrowUp')) * 0.1
    // speed -=
    //   (speed - (control.pick('ArrowUp') - control.pick('ArrowDown'))) * 0.1

    t += VELOCITY * speed

    store.setState({t, speed})

    CONTEXT.drawImage(this.sky, 0, 0, CANVAS.width, CANVAS.height)

    CONTEXT.fillStyle = '#764015'
    CONTEXT.beginPath()
    CONTEXT.moveTo(0, CANVAS.height)
    for (let i = 0; i < CANVAS.width; i++) {
      CONTEXT.lineTo(i, CANVAS.height - noise(t + i) * 0.3)
    }
    CONTEXT.lineTo(CANVAS.width, CANVAS.height)
    CONTEXT.fill()
    this.player.draw()
    requestAnimationFrame(this.execute)
  }
}
