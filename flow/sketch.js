//https://www.openprocessing.org/sketch/157576

var cols = 0
var rows = 0
var res = 0
var c = 0
var noise_scale = 0.2
var xoff = 0
var yoff = 100
var zoff = 0
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
  inc = 0.003
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

function drawRocket(c, w, h) {
  fill(255)
  stroke(0)
  strokeWeight(1)
  push()
  translate(c.x, c.y)
  rotate(c.v.heading())
  t = -h*0.5
  b = h*0.5

  beginShape()
  vertex(0, b)
  bezierVertex(0, b, w*0.5, b*2, w, 0)
  bezierVertex(w*0.5, t*2, 0, t, 0, t);
  endShape();

  // // Outer Exhaust
  // fill(255,0,0)
  // tail_end = map(noise(zoff+inc), 0, 1, b, t)*2
  // beginShape()
  // vertex(-w*1.5, tail_end)
  // bezierVertex(-w*1.2, t*0.2*-tail_end, -w*0.2, t*2, 0, 0)
  // bezierVertex(-w*0.2, b*2, -w*1.2, b*0.2*tail_end, -w*1.5, tail_end)
  // endShape()

  // // Inner Exhaust
  // fill(255,100,0)
  // beginShape()
  // vertex(-w*0.5, 0)
  // bezierVertex(-w*0.3, 0, -w*0.1, t, 0, 0)
  // bezierVertex(-w*0.1, b, -w*0.3, 0, -w*0.5, 0)
  // endShape()

  fill(255)
  beginShape()
  inner = 0.01
  outer = 0.3
  vertex(-w*outer, b*2)
  bezierVertex(w*outer, b, w*outer, t, -w*outer, t*2)
  bezierVertex(-w*inner, t, -w*inner, b, -w*outer, b*2)
  endShape()
  // bezier(0, t, w*0.6, t*0.9, w*0.9, t*0.8, w, 0)
  // bezier(0, b, w*0.6, b*0.9, w*0.9, b*0.8, w, 0)
  
  // bezier(-w*0.5, t*1.5, -w*0.1, t*1.4, -w*0.05, t*1.2, 0, t)
  // bezier(-w*0.5, t*1.5, -w*0.35, t*1, -w*0.25, t*0.5, -w*0.2, 0)
  
  // bezier(-w*0.5, b*1.5, -w*0.1, b*1.4, -w*0.05, b*1.2, 0, b)
  // bezier(-w*0.5, b*1.5, -w*0.35, b*1, -w*0.25, b*0.5, -w*.2, 0)
  
  // fill(255)
  // beginShape()
  // vertex(-w,0)
  // bezierVertex(-w, 0, 0, 0, -w*0.5, t*1)
  // bezierVertex(-w, 0, 0, 0, -w*0.5, b*1)
  // endShape()
  // bezier(-w, 0, -w*0.5, t*0.001, -w*0.6, t*0.8, 0, 0)
  // bezier(-w, 0, -w*0.5, b*0.001, -w*0.6, b*0.8, 0, 0)
  pop()
}

function draw() {
  background(50)
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
  cometloc = cols*noise(zoff)

  comet = {
    x: pxloc(c, cometloc).x,
    y: altitude
  }
  comet.v = prev_comet == 0 ? createVector(1, 0) : createVector(1, (height*noise(zoff+inc) - comet.y)/4)
  fill(255)
  cw = width*0.2*noise(zoff)
  ch = cw*0.3  
  // drawComet(comet, cw, ch)

  tailstart = cometloc - noise(zoff)*res*4

  // stroke(255)
  // noFill()
  fill(255, 0, 0)
  stroke(255, 100, 0, 50)
  // beginShape()
  // off = zoff-inc*cometloc+inc*tailstart
  // for (x = tailstart; x < cometloc; x++) {
  //   vertex(pxloc(c, x, 0).x, height*1*noise(off))
  //   off += inc
  // }
  // endShape()

  // noFill()
  // stroke(255)
  trails = 8
  for (i = 1; i <= trails; i++) {
    fill(255, i*40, 0)
    // stroke(255, i*40, 0)
    offset = i / trails - map(random(), 0, 1, 0, 0.2)
    ts = tailstart+(cometloc-tailstart)*offset*0.8
    beginShape()
    off = zoff-inc*cometloc+inc*ts
    for (x = ts; x < cometloc; x++) {
      vertex(pxloc(c, x, 0).x, height*1*noise(off)+ch*0.5*offset)
      off += inc
    }
    endShape()
    beginShape()
    off = zoff-inc*cometloc+inc*ts
    for (x = ts; x < cometloc; x++) {
      vertex(pxloc(c, x, 0).x, height*1*noise(off)-ch*0.5*offset)
      off += inc
    }
    endShape()
  }

  drawRocket(comet, cw, ch)

  fill(255)
  noStroke()
  randomSeed(123)
  for (i = 0; i < 100; i++) {
    s = noise(i+xoff)*6
    ellipse(random() * width, random() * height, s, s)
    xoff += .0002
  }
  zoff += inc
}