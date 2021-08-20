function setup() {
    createCanvas(800, 600)
}

function drawHorizon(noiseOffset) {
    beginShape()
    for (x = 0; x < width; x += 1) {
        stroke(255)
        vertex(x, noise(noiseOffset)*height)
        noiseOffset += inc
    }
    endShape()
}

function draw() {
    background(0)
    stroke(255)
    noFill()
    drawHorizon()
    off2 += inc
    // noLoop()
}