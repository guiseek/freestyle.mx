import {initialize} from './initialize'
import {control} from './data'
import './style.scss'

document.querySelectorAll('button').forEach((button) => {
  button.ontouchstart = () => control.setState({[button.dataset.key as Key]: 1})
  button.ontouchend = () => control.setState({[button.dataset.key as Key]: 0})
})

document.body.ondblclick = () => {
  if (document.fullscreenElement) document.exitFullscreen()
  else document.documentElement.requestFullscreen({navigationUI: 'hide'})
}

onkeydown = (ev) => control.setState({[ev.key]: 1})
onkeyup = (ev) => control.setState({[ev.key]: 0})

initialize()
