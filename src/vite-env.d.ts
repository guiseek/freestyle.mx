/// <reference types="vite/client" />

type Binary = 0 | 1

type Key = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 's' | 'h'

type ControlKeys = Record<Key, Binary>

type PlayerKeyFrame =
  | 'waiting'
  | 'landing'
  | 'running'
  | 'backFlip'
  | 'frontFlip'
  | 'superMan'
  | 'hartAttack'
  | 'tilt'

type PlayerFrame = Record<
  PlayerKeyFrame,
  (HTMLCanvasElement | OffscreenCanvas)[]
>

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

type Platform = 'apple' | 'pc'
type TransformMap = Record<string, string>
