export const loadImage = async (src: string, width = 0, height = width) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image(width, height)
    image.onload = () => resolve(image)
    image.src = src
  })
}
