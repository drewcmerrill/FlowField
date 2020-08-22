var inc = .1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
var gradient = 10;
var rDirection = 1;
var gDirection = 1;
var bDirection = 1;

function setup() {
	createCanvas(400, 400);
	cols = floor(width/scl);
	rows = floor(height/scl);
	fr = createP('');

	flowfield = new Array(cols * rows);

	for(var i = 0; i < 1000; i++)
	{
		particles[i] = new Particle(random(255),random(255),random(255));
	}
background(0);

}

function draw()
{

	var yoff = 0;
	for(var y = 0; y < rows; y++)
	{
		xoff = 0;
		for(var x = 0; x < cols; x++)
		{
			var index = (x + y * cols);
			var angle = noise(xoff, yoff, zoff) * TWO_PI*4;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(.5);
			flowfield[index] = v;
			xoff += inc;
			// stroke(0, 50);
			// push();
			// translate(x*scl, y*scl);
			// rotate(v.heading());
			// strokeWeight(1);
			// line(0,0, scl, 0);
			// pop();
		}
		yoff += inc;
		zoff += .0001;
	}
	for(var i = 0; i < particles.length; i++)
	{
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].edges();
		particles[i].show();
		particles[i].updateGradient();
	}

	fr.html("FPS: " + floor(frameRate()));
}
