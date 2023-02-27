import {BehaviorSubject, distinctUntilChanged, map} from 'rxjs'
import {freeze} from './freeze'

export const useState = <T extends object>(initialState: T) => {
  const _state = new BehaviorSubject(freeze(initialState))
  const state$ = _state.asObservable()
  const state = () => _state.getValue()
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

  return {select, setState, pick, state}
}
