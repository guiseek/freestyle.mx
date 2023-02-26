import {CANVAS, CONTEXT, VELOCITY} from '../../constants'
import {control, store} from '../../data'
import {Player} from '../entities/player'
import {noise} from '../../utilities'

export class GameLoop {
  constructor(private player: Player) {}

  execute = () => {
    let t = store.pick('t')
    let speed = store.pick('speed')

    speed -=
      (speed - (control.pick('ArrowUp') - control.pick('ArrowDown'))) * 0.1

    t += VELOCITY * speed

    store.setState({t, speed})

    /**
     * Cor do céu
     */
    CONTEXT.fillStyle = '#8ee5ff'
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height)

    /**
     * Cor da terra
     */
    CONTEXT.fillStyle = '#c55e1a'

    CONTEXT.beginPath()
    CONTEXT.moveTo(0, CANVAS.height)

    for (let i = 0; i < CANVAS.width; i++) {
      CONTEXT.lineTo(i, CANVAS.height - noise(t + i) * 0.25)
    }

    CONTEXT.lineTo(CANVAS.width, CANVAS.height)

    CONTEXT.fill()

    this.player.draw()
    requestAnimationFrame(this.execute)
  }
}
