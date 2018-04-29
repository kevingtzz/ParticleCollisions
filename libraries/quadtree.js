/**
*This function make the points into the quadtree.
*@param {Integer} x this parameter represent the cartesian x position.
*@param {Integer} y this parameter represent the cartesian y position.
*/
class Point {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
}

class Rectangle {
  //Esta clase es para los rectangulos que se generarán en el quadtree
  constructor(x,y,w,h) {
    this.x = x //referencia de posicion en x
    this.y = y
    this.w = w//referencia el ancho del rectangulo en el quadtree
    this.h = h
  }

  contains(point) {
    return (point.x >= this.x - this.w &&// esto verifica que la coordenada de este punto este destro de los limites del rectangulo actual
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h)
  }

  intersects(range) { // preguntar video 2
    return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h)
  }
}

class Quadtree {
  constructor(boundary, capacity) {
    this.boundary = boundary // este limite es un rectangulo
    this.capacity = capacity //esto determina el limite de puntos que determinan cuando hay una divicion
    this.points   = [] //guarda las coordenadas de los puntos
    this.divided  = false
  }

  subdivide() {
    let x = this.boundary.x //lo que se necesita es la coordenada x del quadtree a dividir
    let y = this.boundary.y//lo mismo para las demas
    let w = this.boundary.w
    let h = this.boundary.h
    let nw = new Rectangle(x - w/2, y + h/2, w/2, h/2)//la coordenada x se encuetra en el centro del rectangulo por lo tanto la nueva x será x - el ancho del rectangulo a dividir divido 2
    this.northwest = new Quadtree(nw, this.capacity)
    let ne = new Rectangle(x + w/2, y + h/2, w/2, h/2)
    this.northeast = new Quadtree(ne, this.capacity)
    let sw = new Rectangle(x - w/2, y - h/2, w/2, h/2)
    this.southwest = new Quadtree(sw, this.capacity)
    let se = new Rectangle(x + w/2, y - h/2, w/2, h/2)
    this.southeast = new Quadtree(se, this.capacity)
    this.divided = true
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false// este condicional verifica si el rectangulo generado por la divicion contiene puntos, si no lo contiene no hay necesidad de insertar puesto que solo se debe insertar en uno de los rectangos generados en la divicion
    }
    if (this.points.length < this.capacity) {
      this.points.push(point)
      return true
    } else {
      if (!this.divided) {
        this.subdivide()
      }
      if (this.northwest.insert(point)) {
        return true
      }//el punto se insertará en uno de estos rectangulos
      else if (this.northeast.insert(point)) {
        return true
      }
      else if (this.southwest.insert(point)) {
        return true
      }
      else if (this.southeast.insert(point)) {
        return true
      }
    }
  }

  query(range, found) { // esta funcion consulta la cantidad de puntos que hay en el rectangulo de verificaciones
    if (!found) {
      found = []
    }
    if (!this.boundary.intersects(range)) {
      return
    } else {
      for (let p of this.points) {
        //count++ se usaba para contar la cantidad de verificaciones necesarias
        if (range.contains(p)) {
          found.push(p)
        }
      }
      if (this.divided) {
        this.northwest.query(range, found)
        this.northeast.query(range, found)
        this.southwest.query(range, found)
        this.southeast.query(range, found)
      }
    }
    return found
  }
//preguntar por la funcion show
  show() { // este metodo dibuja el quadtree los siguietes son metodos de la libreria P5
    stroke(255)
    strokeWeight(1)
    noFill()
    rectMode(CENTER)
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2) //dibula los rectangulos
    if (this.divided) {
      this.northwest.show()
      this.northeast.show()
      this.southwest.show()
      this.southeast.show()
    }
    for (let p of this.points) {// visualizacion de los puntos
      strokeWeight(4)
      point(p.x, p.y)
    }
  }
}
