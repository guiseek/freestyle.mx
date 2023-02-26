import {setCanvasSize} from './utilities'
import {GameLoop, Player} from './domain'
import {CANVAS} from './constants'

export const initialize = async () => {
  document.body.appendChild(CANVAS)
  onresize = setCanvasSize
  setCanvasSize()

  const player = new Player()
  const gameLoop = new GameLoop(player)
  gameLoop.execute()

  return player
}
