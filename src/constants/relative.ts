export const IS_SMALL_SCREEN = () => innerHeight < 1080

export const LEVEL = IS_SMALL_SCREEN() ? 512 : 1024

export const SIZE = IS_SMALL_SCREEN() ? 30 : 60
