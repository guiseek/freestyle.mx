export const loadFrames = (state: State<PlayerFrame>, frames: PlayerFrames) => {
  return frames.map(([src, key, index]) => {
    return new Promise<PlayerKeyFrame>((resolve) => {
      const offscreen = new OffscreenCanvas(1000, 1000)
      const context = offscreen.getContext('2d') as OffscreenRenderingContext2
      if (context) {
        const image = new Image()
        image.onerror = console.log
        image.onload = () => {
          context.drawImage(image, 0, 0, 1000, 1000)
          const animation = state.pick(key)
          animation[index] = offscreen
          state.setState({[key]: animation})
          resolve(key)
        }
        image.src = src
      }
    })
  })
}
