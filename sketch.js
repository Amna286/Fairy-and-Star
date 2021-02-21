var starImg, fairyImg, bgImg;
var fairy , fairyVoice;
var star, starBody;
var star_options;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	starImg = loadImage("images/star.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgImg = loadImage("images/starNight.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");
}

function setup() {
	createCanvas(800, 750);

	fairyVoice.play();

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying", fairyImg);  
	fairy.scale = 0.25;

	star = createSprite(650, 30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	star_options = {
		restitution: 0.5, isStatic: true
	}

	starBody = Bodies.circle(650, 30, 5, star_options);
	World.add(world, starBody);
	
	Engine.run(engine);

}


function draw() {
	Engine.update(engine);
	
	background(bgImg);
	
	keyPressed();

	if(star.isTouching(fairy)) {
		Matter.Body.setStatic(starBody, true);
	}

	fairy.debug = true;
	fairy.setCollider("rectangle", 0, 0, 1000, 250);
	
	drawSprites();
}

function keyPressed() {
	if(keyDown(LEFT_ARROW)) {
		fairy.x = fairy.x - 5;
	}
	if(keyDown(RIGHT_ARROW)) {
		fairy.x = fairy.x + 5;
	}
	if(keyDown(DOWN_ARROW)) {
		star.x = starBody.position.x;
		star.y = starBody.position.y;
		Matter.Body.setStatic(starBody, false);
	}
}
