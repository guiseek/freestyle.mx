import {useState} from '../../core'

export const frame = useState<PlayerFrame>({
  waiting: [],
  running: [],
  backFlip: [],
  frontFlip: [],
  superMan: [],
  hartAttack: [],
  landing: []
})
