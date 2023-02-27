import {setCanvasSize} from './utilities'
import {Player} from './domain'
import {CANVAS} from './constants'

export const initialize = async () => {
  document.body.appendChild(CANVAS)
  onresize = setCanvasSize
  setCanvasSize()

  const player = new Player()

  return player
}
