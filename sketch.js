// USING P5PLAY
//just started from scratch bc the errors were too much & wanted to re-organize code

let currentTime;

let round;
let roundMax;

let camHeight;
let camZoom;

let player;

let initialKeys;
let currentKeys;

let walls;

let r1ground;
let r2ground;
let r3ground;

let r1map;
let r2map;
let r3map;

let fallingBalls;
let lastBallTime;
let ballInterval;
//let fallingBallList;

let endPoint;

let endIsReached
let roundChanged;

let r1Clear;
let r2Clear;
let r3Clear;



//============================ S E T U P ===============================

function setup(){
	createCanvas(800,600);
	world.gravity.y = 10;
	
	rectMode(CORNER);
	
	round = 1;
	roundMax = 3;

	camHeight = 40;
	camZoom = 8;

	initialKeys = ['a','d','space'];
	currentKeys = initialKeys;

	r1Clear = false;
	r2Clear = false;
	r3Clear = false;
	
	player = new Sprite;
	player.x = 20;
	player.y = 50;
	player.w = 3;
	player.h = 3;
	player.color = "yellow";
	player.collider = "dynamic";
	
	walls = new Group();
	walls.w = 10;
	walls.h = 10;
	walls.color = "black";
	walls.tile = "|";
	walls.collider = "static";
	
	r1ground = new Group();
	r1ground.w = 10;
	r1ground.h = 10;
	r1ground.color = "green";
	r1ground.tile = "=";
	r1ground.collider = "static";
	
	r1map = new Tiles(
		['||.............................................................................||',
		 '||.............................................................................||',
		 '||.............................................................................||',
		 '||.............................................................................||',
		 '||.............................................................................||',
		 '||.............................................................................||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||',
		 '||=====...===..=======...===..=======...===..=======...===..=======...=========||'
		 ],
		0, //top left corner
		0,
		r1ground.w, //spacing
		r1ground.h
	)
	
	r2ground = new Group();
	r2ground.w = 10;
	r2ground.h = 10;
	r2ground.color = "brown";
	r2ground.tile = "-";
	r2ground.collider = "static";
	
	r2map = new Tiles(
		['||.............................................................................||',
		 '||.............................................................................||',
		 '||.............................................................................||',
		 '||...........................................................-----.............||',
		 '||...........................................................-----.............||',
		 '||............-------......................................-------.............||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------.....----...---............---..-------...----------||',
		 '||----------..-------...........----...---............---..-------...----------||',
		 '||----------..-------------..-..............-------...---..-------...----------||',
		 '||----------..-------------..-.........---..-------...---..-------...----------||',
		 '||----------..-------------..-.........---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||',
		 '||----------..-------------..-------...---..-------...---..-------...----------||'
		 ],
		0, //top left corner
		0,
		r2ground.w, //spacing
		r2ground.h
	)
	
	r3ground = new Group();
	r3ground.w = 10;
	r3ground.h = 10;
	r3ground.color = "red";
	r3ground.tile = "+";
	r3ground.collider = "static";
	
	r3map = new Tiles(
		['||.............................................................................||',
		 '||.............................................................................||',
		 '||.............................................................................||',
		 '||.............................................................................||',
		 '||............+..+....++.......................................................||',
		 '||.............................................................................||',
		 '||++++...+++.................+++++++++++++..++++++++........+++++++...+++++++++||',
		 '||++++...+++.................+++++++++++++..++++++++........+++++++...+++++++++||',
		 '||++++...+++.................+++++++++++++..+++++......+++..+++++++...+++++++++||',
		 '||++++...+++.................+++++++++++++.............+++..+++++++...+++++++++||',
		 '||++++...+++.....................................+++...+++..+++++++...+++++++++||',
		 '||++++...+++..................+..+..+..+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||',
		 '||++++...+++..+++++++...+++............+++..++++++++...+++..+++++++...+++++++++||'
		 ],
		0, //top left corner
		0,
		r3ground.w, //spacing
		r3ground.h
	)
	
	fallingBalls = new Group();
	fallingBalls.diameter = 5;
	fallingBalls.color = red;
	fallingBalls.collider = "dynamic";
	
	lastBallTime = millis();
	ballInterval =2500;
	
	endPoint = new Sprite();
	endPoint.x = 760;
	endPoint.y = 35;
	endPoint.w = 10;
	endPoint.h = 10;
	endPoint.color = "purple";
	endPoint.collider = "static";
	
	endIsReached = false;
	
}// setup ends





//============================ D R A W ===============================

function draw() {
	
	currentTime = millis();
	
	clear();
	background("skyblue");
	
	if(round == 1){
		
		r1ground.collider = "static";
		r1map.visible = true;
		r2ground.collider = "none";
		r2map.visible = false;
		r3ground.collider = "none";
		r3map.visible = false;
		
		generateBalls(135);
		generateBalls(200);
		
		setCam();
		/*
		camera.zoom = 1;
		camera.x = width/2;
		camera.y = height/2;
		*/
		leftLimit();
		movePlayer();
		//resetPlayer();
		fallOrigin();
		endReached();

	}
	
	
	
	if(round == 2){
		
		r1ground.collider = "none";
		r1map.visible = false;
		r2ground.collider = "static";
		r2map.visible = true;
		r3ground.collider = "none";
		r3map.visible = false;
		
		setCam();
		leftLimit();
		movePlayer();
		//resetPlayer();
		fallOrigin();
		endReached();

	}
		
		
		
	if(round == 3){
	
		r1ground.collider = "none";
		r1map.visible = false;
		r2ground.collider = "none";
		r2map.visible = false;
		r3ground.collider = "static";
		r3map.visible = true;

		setCam();
		leftLimit();
		movePlayer();
		//resetPlayer();
		fallOrigin();
		endReached();

	}
	
	
	//print(currentTime - lastBallTime);
	
	
}// draw ends





//============================ Custom Functions ===============================

function setCam(){
	camera.zoom = camZoom;
	camera.x = player.x + 35;
	//camera.y = camHeight;
	camera.y = player.y;
}// setCam ends


function leftLimit(){
	
	if(player.x < 0){
		player.x = 0;
	}
	
}// leftLimit ends


function movePlayer(){
	
if(kb.pressing(currentKeys[0])){
	player.x -= 1.5;
}
else if(kb.pressing(currentKeys[1])){
	player.x += 1.5;
	
	if(kb.pressing('control')){ //additional velocity when pressing control (dashing)
		player.x += 0.5;
	}
	
}
	
if(kb.pressing(currentKeys[2]) && (player.colliding(r1ground) || player.colliding(r2ground) || player.colliding(r3ground))){ // diff grounds will never be colliding player at the same time so only one of the three will be true
	player.vel.y = -3;
}

}// movePlayer ends


function resetPlayer(){
	
		//if(player.y > height){
	  player.x = 20;
		player.y = 50;
		player.vel.x = 0; // sets the velocity to 0 each time, preventing the sprite from gaining too much force
		player.vel.y = 0;
	//}
	
}// resetPlayer ends


function fallOrigin(){
	
	if(player.y > height){
		resetPlayer();
	}
	
}// fallOrigin ends


function endReached(){
	
	if(player.colliding(endPoint) && !endIsReached){ //set it to original point for now just to check
			
		endIsReached = true;
		
		if(round == 1){
			r1Clear = true;
		} else if(round == 2){
			r2Clear = true;
		} else if (round == 3){
			r3Clear = true;
		}
		
		changeRound();
	}
	else{
		endIsReached = false;
	}

}// endReached ends


function changeRound(){

	if(!roundChanged){ //preventing rounds from keep changing when endpoint is reached
	if(round == 1 && r1Clear){
		round = 2;
		
		resetPlayer();
		resetKeys();
		changeKeys();

		r1Clear = false;
	}
	else if(round == 2 && r2Clear){
		round = 3;
		
		resetPlayer();
		resetKeys();
		changeKeys();
		
		r2Clear = false;
	}
	else if(round == 3 && r3Clear){
		round = 1;
		
		resetPlayer();
		resetKeys();
		changeKeys();
		
		r3Clear = false;
	}
	}
	
	//if (r1Clear && r2Clear && r3Clear){
	//r1Clear = false;
	//r2Clear = false;
	//r3Clear = false;
	//}
	
roundChanged = false;

}// changeRound ends


function changeKeys(){
	
	let previousKeys = currentKeys;
	
	//if(player.collides(obstacles)){ // ** obstacles (group) or o1 (an object) don't work ("not defined")
		currentKeys = shuffle(currentKeys);
	//}
	
	// if any of the keys are the same shuffle again
	// WORKS (had to use while instead of if)
	while(JSON.stringify(currentKeys) == JSON.stringify(previousKeys)){
		currentKeys = shuffle(currentKeys);
	}	
	
}// changeKeys ends


function resetKeys(){
	
	currentKeys = initialKeys;
	
}// resetKeys ends


function generateBalls(x){
	
	let fallingBallsList = [];
	
	if(currentTime - lastBallTime > ballInterval){
		fallingBall = new fallingBalls.Sprite(x,0);
		fallingBall.vel.y = 2.5;
		
		fallingBallsList.push(fallingBall);
		
	  lastBallTime = currentTime;
	}
	
	for (let i = 0; i < fallingBallsList.length; i++){
		
		if(player.colliding(fallingBallsList[0])){
			player.vel.x -= 2;
		}
		
	}
	

	
	
}





function mousePressed(){
	
	/*
	round++;
	
	if(round > roundMax){
	  round = 1;
	}
	*/
	
	changeKeys();
	
	
	//print(round);
	print("current: " + currentKeys);	
}
