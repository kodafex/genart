f=0
setup=draw=_=> {
    createCanvas(300,b=500)
    v=vertex
    f++
    background(0)
    fill(0)
    stroke(500) 
    for(y=100;y<b;y+=5) {
        beginShape()
        for(x=0;x<b;++x)
            v(x,y-80/(1+pow(x-150,4)/8e6)*noise(x/30+f/50+y))
        v(x,1e4)
        endShape()
    }
}