import {useState} from '../../core'

interface TrickState {
  currentName: PlayerKeyFrame
  currentIndex: number
  frames: PlayerFrame[PlayerKeyFrame]
  skipTimes: number
}

export const trick = useState<TrickState>({
  currentName: 'waiting',
  currentIndex: 0,
  frames: [],
  skipTimes: 0,
})
