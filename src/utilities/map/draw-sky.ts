import {CANVAS} from '../../constants'
import {Offscreen} from '../../core'

const starSizes = [2, 1, 1.5, 0.8]
const starColors = ['#f1f1f1', '#FFDCD4', '#7AEFFF', '#FFF385']

export function drawSky() {
  const offscreen = new Offscreen(CANVAS.width, CANVAS.height)

  offscreen.context.fillStyle = '#0f336c'
  offscreen.context.fillRect(0, 0, CANVAS.width, CANVAS.height)

  for (let i = 0; i < 150; i++) {
    const starSize = Math.floor(Math.random() * starSizes.length)

    offscreen.context.fillStyle = starColors[starSize]
    offscreen.context.beginPath()
    offscreen.context.arc(
      Math.floor(Math.random() * CANVAS.width),
      Math.floor(Math.random() * CANVAS.height),
      starSizes[starSize],
      0,
      2 * Math.PI
    )
    offscreen.context.fill()
  }

  return offscreen
}
