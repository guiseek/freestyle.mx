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
  const {x} = new Vector2(CANVAS.width / 2, CANVAS.height / 2)
  const bg = offscreen.context.createLinearGradient(x, 0, x, CANVAS.height)

  bg.addColorStop(0, '#90caf9')
  bg.addColorStop(1, '#bbdefb')

  offscreen.context.fillStyle = bg
  offscreen.context.fillRect(0, 0, CANVAS.width, CANVAS.height)

  const r = between(0, CANVAS.width)
  clouds.forEach(async ([src, width, height], i) => {
    await loadImage(src, width, height).then((cloud) => {
      const center = {x: i * r - width / 1.2, y: i * r - height / 1.2}
      offscreen.context.globalAlpha = 0.35
      offscreen.context.globalCompositeOperation = 'difference'
      offscreen.context.drawImage(cloud, center.x, center.y, width, height)
      offscreen.context.globalCompositeOperation = 'lighter'
      offscreen.context.drawImage(cloud, center.x, center.y, width, height)
    })
  })

  return offscreen.canvas
}
