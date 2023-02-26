import {CANVAS} from '../../constants'

const starSizes = [2, 1, 1.5, 0.8]
const starColors = ['#f1f1f1', '#FFDCD4', '#7AEFFF', '#FFF385']

export function drawSky() {
  const offscreen = new OffscreenCanvas(CANVAS.width, CANVAS.height)
  const ctx = offscreen.getContext('2d') as OffscreenCanvasRenderingContext2D

  ctx.fillStyle = '#0f336c'
  ctx.fillRect(0, 0, CANVAS.width, CANVAS.height)

  for (let i = 0; i < 150; i++) {
    const starSize = Math.floor(Math.random() * starSizes.length)

    ctx.fillStyle = starColors[starSize]
    ctx.beginPath()
    ctx.arc(
      Math.floor(Math.random() * CANVAS.width),
      Math.floor(Math.random() * CANVAS.height),
      starSizes[starSize],
      0,
      2 * Math.PI
    )
    ctx.fill()
  }

  return offscreen
}
