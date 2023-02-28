import {BehaviorSubject, distinctUntilChanged, map} from 'rxjs'
import {freeze} from './freeze'

export const useState = <T extends object>(initialState: T) => {
  const _state = new BehaviorSubject(freeze(initialState))
  const onChange = _state.asObservable()
  const state = () => _state.getValue()
  let lastValue = initialState

  const pickLast = <K extends keyof T>(key: K) => lastValue[key]
  const pick = <K extends keyof T>(key: K) => _state.value[key]

  const select = <K>(mapFn: (state: T) => K) => {
    return onChange.pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    )
  }

  const setState = (newState: Partial<T>) => {
    lastValue = _state.getValue()
    _state.next({..._state.value, ...newState})
  }

  return {select, onChange, setState, pick, pickLast, state}
}
