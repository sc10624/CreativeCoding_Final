// USING P5PLAY

//put keys in an array and randomly assign them to fuctionalities (ex. move left, right, etc.) each time the character gets damaged (shuffle without overlapping)
//make obstacles & items
//build the map more (want to make multiple rounds but don't know how to have separate maps for each round)
// **DIFFERENT LEVELS?**
//turn hard numbers into variables
//add more functionalities (crouching, etc.)

//** work on switching between maps of different rounds (somehow make platforms & ground work together to easily switch between rounds)
// + the performance slowed down at some point but don't know why

//********LOCK THE ROTATION OF THE PLAYER SQUARE*********

//----screens---
let screens = ["start", "menu", "roundComplete", "gameOver", "endScreen"];

//----round----
let round;
let roundMax = 2;

//----entities----
let player;
let ground;
//let sideDetectors; **COME BACK TO THIS LATER...**
//let deathPoint;
let endPoint;

//----keys array----
let keys = ['a', 'd', 'space']; // maybe I need to convert these into keycodes



//=================================== S E T U P =====================================

function setup() {
	createCanvas(800,600);
	world.gravity.y = 10;
	
	//----setting the shape drawing modes----
	rectMode(CORNER);
	
	//----initial round----
	round = 1;
	
	//----player----
	player = new Sprite(20,100,5,5);
	player.color = "yellow";

	//-----ROUND 1 group for ground tiles (map)---- //** CHANGE THE WAY THE VARIABLE NAME WORKS
	ground = new Group();
	ground.w = 10;
	ground.h = 10;
	ground.color = "green";
	ground.tile = "=";
	ground.collider = "static";
	
	//----platform side detectors for preventing sprite from jumping off the sides **IFFY (not completely "attached" to the sides, kinda floating in the middle)----
	/*
	sideDetectors = new Group();
	sideDetectors.w = 1;
	sideDetectors.h = 10;
	sideDetectors.visible = false;
	sideDetectors.tile = "|";
	sideDetectors.collider = "static";
	*/
	
	r1map = new Tiles(
		/* (using sideDetectors)
		['.......................................................................................',
		 '.......................................................................................',
		 '.......................................................................................',
		 '.......................................................................................',
		 '.......................................................................................',
		 '.......................................................................................',
		 '=====|...|===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====|...|===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====|...|===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====|...|===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====|...|===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====|...|===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====|...|===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 ],
		 */
		
		//without sideDetectors
		['.....................................................................................',
		 '.....................................................................................',
		 '.....................................................................................',
		 '.....................................................................................',
		 '.....................................................................................',
		 '.....................................................................................',
		 '=====...===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====...===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====...===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====...===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====...===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====...===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 '=====...===..=======...===..=======...===..=======...===..=======...===..==....===..=',
		 ],
		0,
		50,
		ground.w,
		ground.h
	)
	
	//----platforms----
	let platforms = new Group();
	platforms.width = 15;
	platforms.height = 5;
	platforms.color = "orange";
	platforms.collider = "static";
	
	let p1 = new platforms.Sprite(115,80);
	
	//----obstacles----
	let obstacles = new Group();
	
	//----enenies----
	let enemies = new Group();
	
	//----deathPoint---- don't need this bc velocity error solved
	/*
	deathPoint = new Sprite(0, 350, width, height-350); //???? width not properly set
	deathPoint.color = "black";
	deathPoint.collider = 'static';
	*/
	
	//----endPoint----
	endPoint = new Sprite(780,90,10,10);
	endPoint.color = "purple";
	endPoint.collider = 'static';
	
}// setup ends




//=================================== D R A W =====================================

function draw() {
	clear();
	background("skyblue"); //will change later
	
	if(round == 1){
		r1map.visible = true; //** want to make r1map appear again after removeAll() has been called...
		setCam();
		leftLimit();
		movePlayer();
		resetPlayer();
		endGame();
	}
	else{
		r1map.removeAll();
		setCam();
		leftLimit();
		movePlayer();
		resetPlayer();
		endGame();
	}

	
}// draw ends





////=================================== CUSTOM FUNCTIONS =====================================

function setCam(){ //set the camera **maybe constrain cam x so there's no visible void on the left end
	
	camera.zoom = 6;
	camera.x = player.x + 45;
	camera.y = player.y - 10;
	
}//setCam ends


function movePlayer(){ //move player with keyboard ***PLAYER CAN JUMP WHEN TOUCHING THE SIDE OF THE GROUND BLOCKS***
	
		if(kb.pressing('a')){ // nested jump function inside left/right movements for multiple keys working together
			if(kb.pressing('space') && player.colliding(ground)){
				player.vel.y = -3;
				player.x -= 2;
			}
			else{
				player.x -= 2;
			}
	}
	else if(kb.pressing('d')){
			if(kb.pressing('space') && player.colliding(ground)){
				player.vel.y = -3;
				player.x -= 2;
			}
		else{
		player.x += 2;
		}
	}
	else if(kb.pressing('space') && player.colliding(ground)){ //for vertical jump
			player.vel.y = -3;
	}
	
}//movePayer ends


function resetPlayer(){ //return player to origin if fell down
	
	if(player.y > height){
	  player.x = 20;
		player.y = 50;
		player.vel.x = 0; // sets the velocity to 0 each time, preventing the sprite from gaining too much force
		player.vel.y = 0;
	}	
	
	

}//resetPlayer ends


function endGame(){ // end game when reached endpoint (display a screen indicating round completed)
	
	if(player.colliding(endPoint)){ //set it to original point for now just to check
		
		//****also set the turnback point to round 1 just for checking how the code works, make it display ending screen later
		if(round <= roundMax){
		  round += 1;
		}
		else{
			round = 1;
		}

		player.x = 20;
		player.y = 50;
		player.vel.x = 0;
		player.vel.y = 0;
	}
	
}//endGame ends


function leftLimit(){ // player can't go beyond the left end of the screen (it kinda prevens the weird gravity when the player position is reset)
	
	if(player.x < 0){
		player.x = 0;
	}
	
}//leftLimit ends



// ** for checking real quick if showing/removing of r1map works properly
function mousePressed(){
	round++;
	if(round > roundMax){
	  round = 1;
	}
	
	print(round);
}