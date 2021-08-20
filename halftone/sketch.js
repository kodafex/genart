inc = 0.01
start = 0
off = 0
w = 800
h = 600
scl = 0.1
rows = h * scl
cols = w * scl
rowsize = 0
collsize = 0
ridge1 = [cols]
ridge2 = [cols]
ridge3 = [cols]
dotsize = 4
_h = 119
_s = 99
_l = 24

function setup() {
    createCanvas(w, h)
    colorMode(HSL)
    rowsize = height / rows
    colsize = width / cols
    off = 0
}

function drawRidge(ridge, h, s, l) {
    // stroke(255)
    noStroke()
    fill(h, s, l)
    beginShape()
    vertex(0, height)
    for (x = 0; x < cols; x += 1) {
        vertex(x*colsize + colsize / 2, ridge[x])
    }
    vertex(width, height)
    endShape()
    fill(h, s, l*0.8)
    noStroke()
    for (x = 0; x < cols; x++) {
        r1height = ridge[x]
        for (y = 0; y < rows; y++) {            
            if (y*rowsize > r1height) {
                size = map(y*rowsize-r1height, 0, height-r1height, 2, 16)
                // size = 4
                ellipse(x*colsize + colsize / 2, y*rowsize + rowsize / 2, size, size)
            }
        }
    }
}

function draw() {
    background(0)
    noFill()
    off = start
    for (i = 0; i < cols; i++) {
        ridge1[i] = height - noise(off)*height*0.8
        ridge2[i] = height*0.7 - noise(off+100)*height*0.4
        ridge3[i] = height*0.3 - noise(off+1000)*height*0.2
        off += inc
    }
    start += 0.01
    drawRidge(ridge3, _h, _s*0.6, _l*0.6)
    drawRidge(ridge2, _h, _s*0.8, _l*0.8)
    drawRidge(ridge1, _h, _s, _l)
}