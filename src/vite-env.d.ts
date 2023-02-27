/// <reference types="vite/client" />

type PlayerKeyFrame = 'waiting' | 'running'

type PlayerFrame = Record<PlayerKeyFrame, OffscreenCanvas[]>

type PlayerFrames = [string, PlayerKeyFrame, number][]

interface Speed {
  y: number
  r: number
}

interface Position {
  x: number
  y: number
  r: number
}

interface State<T> {
  select: <K extends keyof T>(mapFn: (state: T) => K) => Observable<K>
  setState: (newState: Partial<T>) => void
  pick: <K extends keyof T>(key: K) => Readonly<T>[K]
  state: () => Readonly<T>
}
