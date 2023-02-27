export function hostPlatform(): Platform {
  const appleDevices = ['Mac', 'iPhone', 'iPad', 'iPhone']
  return appleDevices.some((d) => navigator.platform.includes(d))
    ? 'apple'
    : 'pc'
}

export function normalizeKeys(keys: string, platform: Platform): string {
  const transformMap: TransformMap = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
  }

  function transform(key: keyof TransformMap) {
    if (platform === 'pc' && key === 'meta') {
      key = 'control'
    }

    if (key in transformMap) {
      key = transformMap[key]
    }

    return key
  }

  return keys
    .toLowerCase()
    .split('>')
    .map((s) => s.split('.').map(transform).join('.'))
    .join('>')
}
