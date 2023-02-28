import {useState} from '../../core'

interface FrameState extends PlayerFrame {
  currentKey: PlayerKeyFrame
  currentIndex: number
  frames: PlayerFrame[PlayerKeyFrame]
  skipTimes: number
}

export const frame = useState<FrameState>({
  waiting: [],
  running: [],
  backFlip: [],
  frontFlip: [],
  superMan: [],
  hartAttack: [],
  landing: [],
  tilt: [],
  currentKey: 'waiting',
  currentIndex: 0,
  frames: [],
  skipTimes: 0,
})
