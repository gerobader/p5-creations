class Boid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(1.5, 3));
        this.acc = createVector();
        this.maxForce = 0.4;
        this.maxSpeed = 7;
        this.perceptionRadius = 50;
        this.alignValue = 2;
        this.separationValue = 2;
        this.attractionValue = 2;
    }

    flock(boids, qt) {
        this.fullBehaviourQT(boids, qt);
    }

    attraction() {
        const steering = createVector();
        const attractorPos = createVector(width / 2, height / 2);
        const direction = p5.Vector.sub(attractorPos, this.pos);
        // line(this.pos.x, this.pos.y, direction.pos.x, direction.pos.y);
        direction.setMag(0.2);
        steering.add(direction);
        steering.mult(attractionSlider.value());
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

    fullBehaviourQT(boids, qt) {
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
        align.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(seperationSlider.value());
        this.acc.add(align);
        this.acc.add(cohesion);
        this.acc.add(separation);
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
        strokeWeight(1);
        fill(68, 75, 87);
        stroke(68, 75, 87);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        ellipse(0, 0, 15, 5);
        pop();
    }
}