class Boid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(2, 4));
        this.acc = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 5;
        this.perceptionRadius = 100;
    }

    flock(boids, qt) {
        this.fullBehaviourQT(boids, qt);
    }

    fullBehaviourQT(boids, qt) {
        const steering = createVector();
        const align = createVector();
        const cohesion = createVector();
        const seperation = createVector();
        let range = new Rectangle(this.pos.x, this.pos.y, this.perceptionRadius / 2, this.perceptionRadius / 2);
        const boidsInRange = qt.query(range);
        for (const boid of boidsInRange) {
            if (boid !== this) {
                align.add(boid.vel);
                cohesion.add(boid.pos);

                const d = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
                const diff = p5.Vector.sub(this.pos, boid.pos);
                diff.div(d);
                seperation.add(diff);
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

            seperation.div(boidsInRange.length - 1);
            seperation.setMag(this.maxSpeed);
            seperation.sub(this.vel);
            seperation.limit(this.maxForce);
        }
        align.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        seperation.mult(seperationSlider.value());
        this.acc.add(align);
        this.acc.add(cohesion);
        this.acc.add(seperation);
    }

    fullBehaviour(boids) {
        let boidsInRange = 0;
        const steering = createVector();
        const align = createVector();
        const cohesion = createVector();
        const seperation = createVector();
        for (const boid of boids) {
            let d = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
            if (boid !== this && d < this.perceptionRadius) {
                boidsInRange++;
                align.add(boid.vel);
                cohesion.add(boid.pos);

                const diff = p5.Vector.sub(this.pos, boid.pos);
                diff.div(d);
                seperation.add(diff);
            }
        }
        if (boidsInRange > 0) {
            align.div(boidsInRange);
            align.setMag(this.maxSpeed);
            align.sub(this.vel);
            align.limit(this.maxForce);

            cohesion.div(boidsInRange);
            cohesion.sub(this.pos);
            cohesion.setMag(this.maxSpeed);
            cohesion.sub(this.vel);
            cohesion.limit(this.maxForce);

            seperation.div(boidsInRange);
            seperation.setMag(this.maxSpeed);
            seperation.sub(this.vel);
            seperation.limit(this.maxForce);
        }
        align.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        seperation.mult(seperationSlider.value());
        steering.add(align);
        steering.add(cohesion);
        steering.add(seperation);
        return steering;
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
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.pos.x, this.pos.y);
    }
}