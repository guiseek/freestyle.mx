import {Offscreen, Vector2, loadImage} from '../../core'
import {between} from '../math/between'
import {CANVAS} from '../../constants'

const clouds: [string, number, number][] = [
  ['./sky/cloud1.png', 900, 384],
  ['./sky/cloud2.png', 900, 491],
  ['./sky/cloud3.png', 900, 532],
  ['./sky/cloud4.png', 900, 482],
]

export function createSky() {
  const offscreen = new Offscreen(CANVAS.width, CANVAS.height)
  const {x, y} = new Vector2(CANVAS.width / 2, CANVAS.height / 2)
  const bg = offscreen.context.createLinearGradient(x, 0, x, CANVAS.height)

  bg.addColorStop(0, '#90caf9')
  bg.addColorStop(1, '#bbdefb')

  offscreen.context.fillStyle = bg
  offscreen.context.fillRect(0, 0, CANVAS.width, CANVAS.height)

  const r = between(0, clouds.length - 1)
  const [src, width, height] = clouds[r]
  loadImage(src, width, height).then((cloud) => {
    const center = {x: x - width / r, y: y - height / r}
    offscreen.context.drawImage(cloud, center.x, center.y, width, height)
  })

  return offscreen.canvas
}
