/// <reference types="vite/client" />

type PlayerKeyFrame = 'waiting' | 'running' | 'backFlip' | 'frontFlip'

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

type OffscreenRenderingContext2 = OffscreenRenderingContext & {
  drawImage(
    image: CanvasImageSource,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void
}
