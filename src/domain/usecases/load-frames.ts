import {Offscreen} from '../../core'

export const loadFrames = (state: State<PlayerFrame>, frames: PlayerFrames) => {
  return frames.map(([src, key, index]) => {
    return new Promise<PlayerKeyFrame>((resolve) => {
      const offscreen = new Offscreen(1000, 1000)

      if (offscreen.context) {
        const image = new Image()
        image.onerror = console.log

        image.onload = () => {
          console.log(image);
          
          offscreen.context.drawImage(image, 0, 0, 1000, 1000)
          const animation = state.pick(key)
          animation[index] = offscreen.canvas
          state.setState({[key]: animation})
          resolve(key)
        }
        image.src = src
      }
    })
  })
}
