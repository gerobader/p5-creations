class Boid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(1.5, 3));
        this.acc = createVector();
        this.maxForce = 0.4;
        this.maxSpeed = 7;
        this.perceptionRadius = 40;
        this.alignValue = 2;
        this.separationValue = 2;
        this.attractionValue = 1.6;
    }

    flock(qt) {
        this.fullBehaviourQT(qt);
    }

    attraction(attractor) {
        const steering = createVector();
        const direction = p5.Vector.sub(attractor, this.pos);
        direction.setMag(0.2);
        steering.add(direction);
        steering.mult(this.attractionValue);
        this.acc.add(steering);
    }

    flight() {
        const flight = createVector();
        for (const predator of predators) {
            const direction = p5.Vector.sub(this.pos, predator.pos);
            if (direction.mag() < 100) {
                flight.add(direction);
                flight.limit(8);
                this.acc.add(flight);
                this.maxSpeed = 10;
            }
        }
    }

    fullBehaviourQT(qt) {
        const align = createVector();
        const cohesion = createVector();
        const separation = createVector();
        let range = new Rectangle(this.pos.x, this.pos.y, this.perceptionRadius / 2, this.perceptionRadius / 2);
        const boidsInRange = qt.query(range);
        for (const boid of boidsInRange) {
            if (boid !== this) {
                align.add(boid.vel);
                cohesion.add(boid.pos);

                const d = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
                const diff = p5.Vector.sub(this.pos, boid.pos);
                diff.div(d);
                separation.add(diff);
            }
        }
        if (boidsInRange.length > 1) {
            align.div(boidsInRange.length - 1);
            align.setMag(this.maxSpeed);
            align.sub(this.vel);
            align.limit(this.maxForce);

            cohesion.div(boidsInRange.length - 1);
            cohesion.sub(this.pos);
            cohesion.setMag(this.maxSpeed);
            cohesion.sub(this.vel);
            cohesion.limit(this.maxForce);

            separation.div(boidsInRange.length - 1);
            separation.setMag(this.maxSpeed);
            separation.sub(this.vel);
            separation.limit(this.maxForce);
        }
        align.mult(this.alignValue);
        separation.mult(this.separationValue);
        this.acc.add(align);
        this.acc.add(cohesion);
        this.acc.add(separation);
    }

    avoidEdges() {
        if (this.pos.x > width - 10) {
            this.acc.add(createVector(random(-0.5, -3.5), 0));
        }
        if (this.pos.x < 10) {
            //this.pos.x = width;
            this.acc.add(createVector(random(0.5, 3.5), 0));
        }
        if (this.pos.y > height - 10) {
            this.acc.add(createVector(0, random(-0.5, -3.5)));
        }
        if (this.pos.y < 10) {
            this.acc.add(createVector(0, random(0.5, 3.5)));
        }
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.maxSpeed = 7;
    }

    show() {
        fill(11, 63, 74);
        stroke(11, 63, 74);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        strokeWeight(3);
        line(-7, 0, -13, 0);
        strokeWeight(1);
        ellipse(0, 0, 15, 5);
        pop();
    }
}