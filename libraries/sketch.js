//let qtree // -----------3
//let count = 0 // variable global para que contará las verificacione en el rectangulo
let particles =[]

function setup() {
  let width = 1450
  let height = 850
  createCanvas(width, height) //crea el frame
  for (let i = 0; i < 500; ++i) {
    particles[i] = new Particle(random(width), random(height))
  }


  /*let boundary = new Rectangle(width/2, width/2, width/2, width/2) //crea el rectangulo
  qtree = new Quadtree(boundary,1) //crea la primera fase del quadtree
  console.log(qtree)

  for(let i = 0; i < 0; i++) {
    let x = randomGaussian(width/2, width/8)
    let y = randomGaussian(height/2, height/8)
    let p = new Point(x,y)
    qtree.insert(p)
  }*/
}

function draw() {

  background(0)

  let boundary = new Rectangle(725, 425, 1450, 850)
  let qtree = new Quadtree(boundary, 1)

  for (let p of particles) {
    let point = new Point(p.x, p.y, p)// p como argumento es la referencia userDta que pide la clase poit para su optimizacion
    qtree.insert(point)

    p.move()
    p.render()
    p.setHighlight(false)
  }

  for (let p of particles) {
    let range = new Circle(p.x, p.y, p.r * 2)//array circular que contiene la posicion de una particula
    let points = qtree.query(range)
    for (let point of points) {
      let other = point.userData
//  for (let other of particles) {
      if (p !== other && p.intersects(other)) {
        p.setHighlight(true)
      }
    }
  }

  if (mouseIsPressed) { //funcion de javascript
    for (let i = 0; i < 1; ++i ) {
    let m = new Point(mouseX + random(-5,5),mouseY + random(-5,5))
    qtree.insert(m)
    }
  }

//  stroke(0,255,0) // stroke del rectangulo re revision
//  rectMode(CENTER)
//  let range = new Rectangle(mouseX, mouseY,90,50) // le dá las coordenadas del mouse y el tamano
//  rect(range.x, range.y, range.w * 2, range.h * 2)
//  let points = qtree.query(range)
//  for (let p of points) {
//    strokeWeight(4)
//    point(p.x, p.y)
//  }
  qtree.show() // imprime la matriz del qtree
}
