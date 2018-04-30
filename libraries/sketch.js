let qtree
let count = 0 // variable global para que contará las verificacione en el rectangulo
function setup() {
  let width = 1450
  let height = 850
  createCanvas(width, height) //crea el frame

  let boundary = new Rectangle(width/2, width/2, width/2, width/2) //crea el rectangulo
  qtree = new Quadtree(boundary,4) //crea la primera fase del quadtree
  console.log(qtree)

  for(let i = 0; i < 300; i++) {
    let x = randomGaussian(width/2, width/8)
    let y = randomGaussian(height/2, height/8)
    let p = new Point(x,y)
    qtree.insert(p)
  }
}

function draw() {
  if (mouseIsPressed) { //funcion de javascript
    for (let i = 0; i < 1; ++i ) {
    let m = new Point(mouseX + random(-5,5),mouseY + random(-5,5))
    qtree.insert(m)
    }
  }

  background(0)
  qtree.show()

  stroke(0,255,0) // stroke del rectangulo re revision
  rectMode(CENTER)
  let range = new Rectangle(mouseX, mouseY,90,50) // le dá las coordenadas del mouse y el tamano
  rect(range.x, range.y, range.w * 2, range.h * 2)
  let points = qtree.query(range)
  for (let p of points) {
    strokeWeight(4)
    point(p.x, p.y)
  }
  console.log(count)
}
