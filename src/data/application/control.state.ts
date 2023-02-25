import {useState, freeze} from '../../core'

export const controlState = useState(
  freeze({
    ArrowUp: 0,
    ArrowDown: 0,
    ArrowLeft: 0,
    ArrowRight: 0,
  })
)
