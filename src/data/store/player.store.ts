import {Store} from './store'

interface PlayerState {
  position: Position
  speed: Speed
}


export class PlayerStore extends Store<PlayerState> {
  position$ = this.select((state) => state.position)
  speed$ = this.select((state) => state.speed)

  setSpeed(speed: Speed) {
    this.setState({speed})
  }

  setPosition(position: Position) {
    this.setState({position})
  }
}
