import {initialize} from './initialize'
import {control} from './data'
import './style.scss'

const backFlipButton = document.querySelector<HTMLButtonElement>('#back-flip')
const frontFlipButton = document.querySelector<HTMLButtonElement>('#front-flip')
const runButton = document.querySelector<HTMLButtonElement>('#run')
const backButton = document.querySelector<HTMLButtonElement>('#back')

if (backFlipButton && frontFlipButton && runButton && backButton) {
  backFlipButton.ontouchstart = () => control.setState({ArrowLeft: 1})
  backFlipButton.ontouchend = () => control.setState({ArrowLeft: 0})

  frontFlipButton.ontouchstart = () => control.setState({ArrowRight: 1})
  frontFlipButton.ontouchend = () => control.setState({ArrowRight: 0})

  runButton.ontouchstart = () => control.setState({ArrowUp: 1})
  runButton.ontouchend = () => control.setState({ArrowUp: 0})

  backButton.ontouchstart = () => control.setState({ArrowDown: 1})
  backButton.ontouchend = () => control.setState({ArrowDown: 0})
}

document.body.ondblclick = () => {
  if (document.fullscreenElement) document.exitFullscreen()
  else document.documentElement.requestFullscreen({navigationUI: 'hide'})
}

onkeydown = (ev) => control.setState({[ev.key]: 1})
onkeyup = (ev) => control.setState({[ev.key]: 0})

initialize()
