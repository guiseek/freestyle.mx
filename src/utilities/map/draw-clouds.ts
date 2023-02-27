import {CANVAS, CONTEXT} from '../../constants'
import {Offscreen} from '../../core'

interface Dimensions {
  width: number
  height: number
}

interface CanvasExtra {
  main: HTMLCanvasElement
  os: Offscreen
}
interface ContextExtra {
  main: CanvasRenderingContext2D
  os: Offscreen['context']
}

let canvas: CanvasExtra,
  ctx: ContextExtra,
  dimensions: Dimensions,
  center: Vector2,
  background: CanvasGradient,
  clouds: Cloud[],
  cloudCount = 100,
  transparency = 0.35,
  imgs: HTMLImageElement[] = [],
  counter = 1

class Vector2 {
  //2-dimensional vector object for movement/position
  constructor(public x = 0, public y = 0) {}

  add(vec: Vector2) {
    //add passed vector object
    this.x += vec.x
    this.y += vec.y
  }
}

class Cloud {
  ready = false
  sprite!: HTMLImageElement
  scale = 1
  width = 0
  height = 0
  position = new Vector2()
  velocity = new Vector2()

  constructor() {
    this.init()
    setTimeout(() => {
      //set ready after random amount of time between 0 and 5 seconds to avoid sending all clouds across the screen on initialization
      this.ready = true
    }, Math.random() * 5000)
  }

  init() {
    this.sprite = imgs[Math.floor(Math.random() * imgs.length)] //choose a random imge/sprite from the image array
    this.scale = Math.round(1 + Math.random() * 4) //random scale between 1 and 5
    this.width = this.sprite.width / this.scale //divide width/height by scale
    this.height = this.sprite.height / this.scale
    const center = new Vector2()
    this.position = new Vector2(
      -this.width,
      center.y - this.height / 2 + Math.round(200 - Math.random() * 400)
    ) //position offscreen left, center on y axis, add random y offset between -200 and 200
    this.velocity = new Vector2(1 + Math.random() * 1, 0)
  }

  update() {
    if (this.position.x > dimensions.width) {
      this.init() //reset when cloud is offscreen right
    } else {
      this.position.add(this.velocity) //move cloud across the screen
    }
  }
}

// var Cloud2 = (function () {
//   function Cloud() {
//     var self = this
//     self.ready = false
//     self.init()
//     window.setTimeout(function () {
//       //set ready after random amount of time between 0 and 5 seconds to avoid sending all clouds across the screen on initialization
//       self.ready = true
//     }, Math.random() * 5000)
//   }
//   return Cloud
// })()

// Cloud.prototype.init = function () {
//   this.sprite = imgs[Math.floor(Math.random() * imgs.length)] //choose a random imge/sprite from the image array
//   this.scale = Math.round(1 + Math.random() * 4) //random scale between 1 and 5
//   this.width = this.sprite.width / this.scale //divide width/height by scale
//   this.height = this.sprite.height / this.scale
//   this.position = new Vector2(
//     -this.width,
//     center.y - this.height / 2 + Math.round(200 - Math.random() * 400)
//   ) //position offscreen left, center on y axis, add random y offset between -200 and 200
//   this.velocity = new Vector2(1 + Math.random() * 1, 0)
// }

// Cloud.prototype.update = function () {
//   if (this.position.x > dimensions.width) {
//     this.init() //reset when cloud is offscreen right
//   } else {
//     this.position.add(this.velocity) //move cloud across the screen
//   }
// }

function populate() {
  clouds = [] //make the clouds
  for (let i = 0; i < cloudCount; i++) {
    clouds.push(new Cloud())
  }
}

function getImages() {
  var URLs = [
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/cloud1.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/cloud2.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/cloud3.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/cloud4.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/544318/cloud5.png',
  ]
  URLs.forEach((url) => {
    const img = new Image()
    img.onload = () => {
      //when the image loads
      imgs.push(img)
      if (counter < URLs.length) {
        //add to counter while less than total images
        counter++
      } else {
        //populate the clouds array and start animation loop after all images are loaded
        populate()
        loop()
      }
    }
    img.src = url
  })
  // $.each(URLs, function (key, url) {
  //   var img = new Image()
  //   img.src = url
  //   img.onload = function () {
  //     //when the image loads
  //     imgs.push(img)
  //     if (counter < URLs.length) {
  //       //add to counter while less than total images
  //       counter++
  //     } else {
  //       //populate the clouds array and start animation loop after all images are loaded
  //       populate()
  //       loop()
  //     }
  //   }
  // })
}

function resize() {
  dimensions = {
    //window dimensions
    width: window.innerWidth,
    height: window.innerHeight,
  }
  center = new Vector2(dimensions.width / 2, dimensions.height / 2) //center of window
  canvas.main.width = canvas.os.width = dimensions.width
  canvas.main.height = canvas.os.height = dimensions.height
  background = ctx.os.createLinearGradient(
    center.x,
    0,
    center.x,
    dimensions.height
  ) //light blue to lighter blue gradient, top to bottom of screen
  background.addColorStop(0, '#90caf9')
  background.addColorStop(1, '#bbdefb')
}

function draw() {
  ctx.os.clearRect(0, 0, dimensions.width, dimensions.height) //clear previous frame from offscreen canvas
  for (var i = 0; i < cloudCount; i++) {
    var cloud = clouds[i]
    ctx.os.globalAlpha = transparency //having lower transparency makes the cloud detail more visible since we redraw the canvas more than once
    if (cloud.ready) {
      ctx.os.globalCompositeOperation = 'difference' //difference composite adds 'shading' to edges of cloud overlap
      ctx.os.drawImage(
        cloud.sprite,
        cloud.position.x,
        cloud.position.y,
        cloud.width,
        cloud.height
      )
      ctx.os.globalCompositeOperation = 'lighter' //lighter composite operation brightens areas where the clouds overlap
      ctx.os.drawImage(
        cloud.sprite,
        cloud.position.x,
        cloud.position.y,
        cloud.width,
        cloud.height
      )
      cloud.update()
    }
  }
  ctx.main.fillStyle = background //fill main canvas with gradient
  ctx.main.fillRect(0, 0, dimensions.width, dimensions.height)
  ctx.main.drawImage(canvas.os.canvas, 0, 0) //draw the composited offscreen frame to onscreen canvas
}

function loop() {
  //do a barrel roll
  draw()
  window.requestAnimationFrame(loop)
}

window.onresize = resize

onload = () => {
  canvas = {
    //get things
    main: CANVAS,
    os: new Offscreen(innerWidth, innerHeight),
  }
  ctx = {
    main: CONTEXT,
    os: canvas.os.context,
  }
  resize() //do stuff
  getImages()
}

// window.requestAnimationFrame = (function () {
//   return (
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     function (callback) {
//       window.setTimeout(callback, 1000 / 60)
//     }
//   )
// })()
