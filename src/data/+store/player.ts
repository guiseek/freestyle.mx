import {freeze} from '../../core'
import {State} from './state'

interface Vector {
  x: number
  y: number
  r: number
}

interface PlayerState {
  position: Vector
  speed: Vector
  jumpingDown: boolean
  jumpingUp: boolean
  paused: boolean
}

const initialState = freeze<PlayerState>({
  position: {x: 0, y: 0, r: 0},
  speed: {x: 0, y: 0, r: 0},
  jumpingDown: false,
  jumpingUp: false,
  paused: false,
})

export class Player extends State<PlayerState> {
  position$ = this.select((state) => state.position)

  speed$ = this.select((state) => state.position)

  jumpingDown$ = this.select((state) => state.jumpingDown)

  jumpingUp$ = this.select((state) => state.jumpingUp)

  paused$ = this.select((state) => state.paused)

  constructor() {
    super(initialState)
  }

  jump(direction: 'up' | 'down') {
    if (this.state.paused) this.resume()

    const jumpingUp = direction === 'up'
    const jumpingDown = direction === 'down'

    this.setState({jumpingUp, jumpingDown})
  }

  pause() {
    this.setState({paused: true})
  }

  resume() {
    this.setState({paused: false})
  }
}
