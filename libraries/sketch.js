let qtree
function setup() {
  let width = 1450
  let height = 850
  createCanvas(width, height) //crea el frame

  let boundary = new Rectangle(width/2, width/2, width/2, width/2) //crea el rectangulo
  qtree = new Quadtree(boundary,4) //crea la primera fase del quadtree
  console.log(qtree)

/*  for(let i = 0; i < 200; i++) {
    let p = new Point(random(width), random(height))
    qt.insert(p)
    */
}


function draw() {
  if (mouseIsPressed) { //funcion de javascript
    for (let i = 0; i < 5; ++i ) {
    let m = new Point(mouseX + random(-5,5),mouseY + random(-5,5))
    qtree.insert(m)
    }
  }
  background(0)
  qtree.show()
}
