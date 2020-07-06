class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  /**
   * check if boid is within boundary
   * @param boid
   * @returns {boolean|boolean}
   */
  contains(boid) {
    return (
        boid.pos.x >= this.x - this.w
        && boid.pos.x < this.x + this.w
        && boid.pos.y > this.y - this.h
        && boid.pos.y < this.y + this.h
    );
  }

  intersects(range) {
    return !(range.x - range.w > this.x + this.w
    || range.x + range.w < this.x - this.w
    || range.y - range.h > this.y + this.h
    || range.y + range.h < this.y - this.h);
  }
}


class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.boids = [];
    this.divided = false;
  }

  subdivide() {
    const newHeight = this.boundary.h / 2;
    const newWidth = this.boundary.w / 2;
    const nwRect = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, newWidth, newHeight);
    const noRect = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, newWidth, newHeight);
    const swRect = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, newWidth, newHeight);
    const soRect = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, newWidth, newHeight);

    this.nw = new QuadTree(nwRect, this.capacity);
    this.no = new QuadTree(noRect, this.capacity);
    this.sw = new QuadTree(swRect, this.capacity);
    this.so = new QuadTree(soRect, this.capacity);
    this.divided = true;
  }

  insert(boid) {
    if (!this.boundary.contains(boid)) {
      return false;
    }
    if (this.boids.length < this.capacity) {
      this.boids.push(boid);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      if (this.nw.insert(boid)) {
        return true;
      } else if (this.no.insert(boid)) {
        return true;
      } else if (this.sw.insert(boid)) {
        return true;
      } else if (this.so.insert(boid)) {
        return true;
      }
    }
  }

  query(range, found = []) {
    if (this.boundary.intersects(range)){
      for (const boid of this.boids) {
        if (range.contains(boid)) {
          found.push(boid);
        }
      }
      if (this.divided) {
        this.nw.query(range, found);
        this.no.query(range, found);
        this.sw.query(range, found);
        this.so.query(range, found);
      }
    }
    return found;
  }

  show() {
    stroke(100);
    strokeWeight(1);
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
    if (this.divided) {
      this.nw.show();
      this.no.show();
      this.sw.show();
      this.so.show();
    }
  }
}
