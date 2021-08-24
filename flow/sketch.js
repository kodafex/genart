//https://www.openprocessing.org/sketch/157576

var cols = 0
var rows = 0
var res = 0
var c = 0
var noise_scale = 0.2
var xoff = yoff = zoff = 0
var inc = 0
var prev_comet = coment = {
  x: 0,
  y: 0,
  v: 0
}

function pxloc(canvas, x, y) {
  return {
    x: canvas.left + x*res + res/2,
    y: canvas.top + y*res + res/2
  }
}

function Canvas(xoff, yoff, scale) {
  return {
    left: floor(xoff + (width - width*scale) / 2),
    top: floor(yoff + (height - height*scale) / 2),
    width: width * scale,
    height: height * scale
  }
}

function Grid(width, height, default_value) {
  a = Array(width*height).fill(default_value)

  const get = (x, y) => {
    i = y*width + x
    return a[i]
  }

  const set = (x, y, val) => {
    i = y*width + x
    a[i] = val
  }

  return {
    width,
    height,
    get,
    set
  }
}

function setup() {
  createCanvas(800, 400);
  c = Canvas(0, 0, 1)
  res = int(c.width * 0.01) 
  cols = floor(c.width / res)
  rows = floor(c.height / res)
  default_angle = PI
  flow_grid = Grid(cols, rows, default_angle)
  for (x = 0; x < cols; x++) {
    for (y = 0; y < rows; y++) {
      flow_grid.set(x, y, noise(x, y) * 2 * PI)
    }
  }
  inc = 0.005
}

function drawComet(c, w, h) {
  push()
  translate(c.x, c.y)
  rotate(c.v.heading())
  ellipse(0, 0, w, h)
  // line(0, 0, -w*2, 0)
  // line(0, h/4, -w*1.5, h/4)
  // line(0, h/2, -w*1, h/2)
  // line(0, -h/4, -w*1.5, -h/4)
  // line(0, -h/2, -w*1, -h/2)
  pop()
}

function draw() {
  background(0,10)
  stroke(255)
  // for (x = 0; x < cols; x++) {
  //   for (y = 0; y < rows; y++) {
  //     flow_grid.set(x, y, noise(x*noise_scale, y*noise_scale, zoff) * TWO_PI * 2)
  //     loc = pxloc(c, x, y)
  //     push()
  //     translate(loc.x, loc.y)
  //     // ellipse(0, 0, 1, 1)
  //     rotate(p5.Vector.fromAngle(flow_grid.get(x,y)).heading())
  //     line(0, 0, res/2, 0)
  //     pop()
  //   }
  // }

  altitude = height*1*noise(zoff)
  tailstart = cols*.1
  cometloc = cols*.3

  comet = {
    x: pxloc(c, cometloc).x,
    y: altitude
  }
  comet.v = prev_comet == 0 ? createVector(1, 0) : createVector(1, (height*noise(zoff+inc) - comet.y)/4)
  fill(255)
  cw = noise(zoff)*80
  ch = cw*1.0
  drawComet(comet, cw, ch)

  stroke(255)
  noFill()

  beginShape()
  off = zoff-inc*cometloc+inc*tailstart
  for (x = tailstart; x < cometloc; x++) {
    vertex(pxloc(c, x, 0).x, height*1*noise(off))
    off += inc
  }
  endShape()

  // trails = 4
  // for (i = 1; i <= trails; i++) {
  //   offset = i / trails
  //   ts = tailstart+(cometloc-tailstart)*offset*0.8
  //   beginShape()
  //   off = zoff-inc*cometloc+inc*ts
  //   for (x = ts; x < cometloc; x++) {
  //     vertex(pxloc(c, x, 0).x, height*1*noise(off)+ch*0.5*offset)
  //     off += inc
  //   }
  //   endShape()
  //   beginShape()
  //   off = zoff-inc*cometloc+inc*ts
  //   for (x = ts; x < cometloc; x++) {
  //     vertex(pxloc(c, x, 0).x, height*1*noise(off)-ch*0.5*offset)
  //     off += inc
  //   }
  //   endShape()
  // }

  zoff += inc
}