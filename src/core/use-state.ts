import {BehaviorSubject, distinctUntilChanged, map} from 'rxjs'

export const useState = <T extends object>(initialState: T) => {
  const _state = new BehaviorSubject<T>(initialState)
  const state$ = _state.asObservable()

  const pick = <K extends keyof T>(key: K) => _state.value[key]

  const select = <K>(mapFn: (state: T) => K) => {
    return state$.pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    )
  }

  const setState = (newState: Partial<T>) => {
    _state.next({
      ..._state.value,
      ...newState,
    })
  }

  return {select, setState, pick}
}