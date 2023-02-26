export const lerp = (start: number, end: number, t: number) => {
  return start + ((end - start) * (1 - Math.cos(t * Math.PI))) / 2
}