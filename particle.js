function Particle(r, g, b)
{
  this.r = r;
  this.g = g;
  this.b = b;
  this.pos = createVector(random(width),random(height));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxspeed = 2;
  this.prevPos = this.pos.copy();

  this.update = function()
  {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.applyForce = function(force)
  {
    this.acc.add(force);
  }

  this.show = function()
  {
    stroke(this.r, this.g, this.b);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function()
  {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
  this.edges = function()
  {
    if(this.pos.x > width)
    {
       this.pos.x = 0;
       this.updatePrev();
    }
    if(this.pos.x < 0)
    {
       this.pos.x = width;
       this.updatePrev();
    }
    if(this.pos.y > height)
    {
      this.pos.y = 0;
      this.updatePrev();
    }
    if(this.pos.y < 0)
    {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  this.follow = function(vectors)
  {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  this.updateGradient = function()
  {
    this.r += random(gradient) * rDirection;
    this.g += random(gradient) * gDirection;
    this.b += random(gradient) * bDirection;
    if(this.r > 255 || this.r < 0)
    {
      if(this.r > 255)
      {
        this.r = 255 - random(gradient);
      }
      if(this.r < 0)
      {
        this.r = 0 + random(gradient);
      }
      rDirection = rDirection * -1;
    }
    if(this.g > 255 || this.g < 0)
    {
      if(this.g > 255)
      {
        this.g = 255 - random(gradient);
      }
      if(this.g < 0)
      {
        this.g = 0 + random(gradient);
      }
      gDirection = gDirection * -1;
    }
    if(this.b > 255 || this.b < 0)
    {
      if(this.b > 255)
      {
        this.b = 255 - random(gradient);
      }
      if(this.b < 0)
      {
        this.b = 0 + random(gradient);
      }
      bDirection = bDirection * -1;
    }
  }
}
