import {LEVEL} from '../../constants'
import {lerp} from './lerp'

const perm: number[] = []
let value

while (perm.length < LEVEL) {
  while (perm.includes((value = Math.floor(Math.random() * LEVEL))));
  perm.push(value)
}

export const noise = (x: number) => {
  x = (x * 0.004) % LEVEL
  return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x))
}
