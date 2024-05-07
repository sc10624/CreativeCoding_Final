// USING P5PLAY

//put keys in an array and randomly assign them to fuctionalities (ex. move left, right, etc.) each time the character gets damaged (shuffle without overlapping)
//make obstacles & items
//build the map more (want to make multiple rounds but don't know how to have separate maps for each round)
//turn hard numbers into variables
//add more functionalities (crouching, etc.)
//add visual effect for dying


//********LOCK THE ROTATION OF THE PLAYER SQUARE*********
//******************CONTROL KEYS NOT WORKING IN THE SECOND ROUND AFTER TOUCHING THE 1ST ROUND ENDPOINT (works when I switched to the second round with mouse tho)**********************
//******SOMETIMES PLAYER RANDOMLY ACCELERATES?******

//----screens---
//let screens = ["start", "menu", "roundComplete", "gameOver", "endScreen"];

//----camera----
let camHeight = 40;

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
//let keys = ['a', 'd', 'space']; // maybe I need to convert these into keycodes



//=================================== S E T U P =====================================

function setup() {
	createCanvas(800,600);
	world.gravity.y = 10;
	
	//----setting the shape drawing modes----
	rectMode(CORNER);
	
	//----initial round----
	round = 1;
	
	//----player----
	player = new Sprite(20,50,5,5);
	player.color = "yellow";

	//-----round 1 ground tiles---- (separate ground tiles for each round bc of colliding detection (ground tiles from other round should have 'none' collider))
	r1ground = new Group();
	r1ground.w = 10;
	r1ground.h = 10;
	r1ground.color = "green";
	r1ground.tile = "=";
	r1ground.collider = "static";
	
	r1map = new Tiles(
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
		['.....................................................................................',
		 '.....................................................................................',
		 '.....................................................................................',
		 '.....................................................................................',
		 '.....................................................................................',
		 '.....................................................................................',
		 '---------..--------...---..-------------..-------...------------...---..--....---..-',
		 '---------..--------...---..-------------..-------...------------...---..--....---..-',
		 '---------..--------...---..-------------..-------...------------...---..--....---..-',
		 '---------..--------...---..-------------..-------...------------...---..--....---..-',
		 '---------..--------...---..-------------..-------...------------...---..--....---..-',
		 '---------..--------...---..-------------..-------...------------...---..--....---..-',
		 '---------..--------...---..-------------..-------...------------...---..--....---..-',
		 ],
		0, //top left corner
		0,
		r2ground.w, //spacing
		r2ground.h
	)
	
	
	
	//----platforms----
	let platforms = new Group();
	platforms.width = 25;
	platforms.height = 5;
	platforms.color = "orange";
	platforms.collider = "static";
	
	let p1 = new platforms.Sprite(160,30); //just testing
	
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
	endPoint = new Sprite(790,30,10,10);
	endPoint.color = "purple";
	endPoint.collider = 'static';
	
}// setup ends




//=================================== D R A W =====================================

function draw() {
	clear();
	background("skyblue"); //will change later
	
	// ROUND 1
	if(round == 1){
		r1ground.collider = "static";
		r1map.visible = true;
		
		r2ground.collider = "none";
		r2map.visible = false;
		
    //works, but TOO LAGGY
		/*
		new Tiles(
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
		0, //top left corner
		0,
		ground.w, //spacing
		ground.h
	)
	*/
		setCam();
		leftLimit();
		movePlayer();
		resetPlayer();
		endRound();
	}
	
	
	// ROUND 2 (somehow round is set to 3 & player control doesn't work after 1st round is cleared... but then round 2 gets displayed??)
	if(round == 2){
		r1ground.collider = "none";
		r1map.visible = false;
		
		r2ground.collider = "static";
		r2map.visible = true;
		
		setCam();
		leftLimit();
		movePlayer();
		resetPlayer();
		endRound();

		//print(kb.pressing('a')); seems like 'a' key is not even "pressed"? (but works when I switched to round 2 with mouse click)
	}

	print(round);
	
}// draw ends





////=================================== CUSTOM FUNCTIONS =====================================

function setCam(){ //set the camera **maybe constrain cam x so there's no visible void on the left end
	
	camera.zoom = 6;
	camera.x = player.x + 45;
	camera.y = camHeight;
	
}//setCam ends


function movePlayer(){ //move player with keyboard ***PLAYER CAN JUMP WHEN TOUCHING THE SIDEs OF THE GROUND BLOCKS***
	
	if (round == 1){
	//----round 1----
		if(kb.pressing('a')){ // nested jump function inside left/right movements for multiple keys working together
			if(kb.pressing('space') && player.colliding(r1ground)){
				player.vel.y = -3;
				player.x -= 1.5;
			}
			else{
				player.x -= 1.5;
			}
		}
		else if(kb.pressing('d')){
				if(kb.pressing('space') && player.colliding(r1ground)){
					player.vel.y = -3;
					player.x -= 1.5;
				}
			else{
			player.x += 1.5;
			}
		}
		else if(kb.pressing('space') && player.colliding(r1ground)){ //for vertical jump
				player.vel.y = -3;
		}
	}
	
	//----round 2----
	if (round == 2){
		if(kb.pressing('a')){ // nested jump function inside left/right movements for multiple keys working together
			if(kb.pressing('space') && player.colliding(r2ground)){
				player.vel.y = -3;
				player.x -= 1.5;
			}
			else{
				player.x -= 1.5;
			}
		}
		else if(kb.pressing('d')){
			if(kb.pressing('space') && player.colliding(r2ground)){
				player.vel.y = -3;
				player.x -= 1.5;
			}
			else{
			player.x += 1.5;
			}
		}
		else if(kb.pressing('space') && player.colliding(r2ground)){ //for vertical jump
				player.vel.y = -3;
		}
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


function endRound(){ // end game when reached endpoint (display a screen indicating round completed)
	
	if(player.collided(endPoint)){ //set it to original point for now just to check
		
		//****also set the turnback point to round 1 just for checking how the code works, make it display ending screen later
		
		/*
		round++;
	
		if(round > roundMax){
			round = 1;
		}
		*/
		
		///*
		if(round <= roundMax){
		  round += 1;
		}
		else{
			round = 1;
		}
		//*/

		player.x = 20;
		player.y = 50;
		player.vel.x = 0;
		player.vel.y = 0;
	}
	
}//endRound ends


function leftLimit(){ // player can't go beyond the left end of the screen (it kinda prevens the weird gravity when the player position is reset)
	
	if(player.x < 0){
		player.x = 0;
	}
	
}//leftLimit ends



// ** for checking real quick if showing/removing of r1map works properly
function mousePressed(){
	///*
	round++;
	
	if(round > roundMax){
	  round = 1;
	}
	//*/
	
	print(round);
}