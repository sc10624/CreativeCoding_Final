//put keys in an array and randomly assign them to fuctionalities (ex. move left, right, etc.) each time the character gets damaged (shuffle without overlapping)
//make obstacles & items
//build the map more
//turn hard numbers into variables

//----screen----
let screen;

//----entities----
let player;
let ground;
let deathPoint;
let endPoint;

function setup() {
	createCanvas(800,600);
	world.gravity.y = 10;
	
	//----player----
	player = new Sprite(20,100,5,5);
	player.color = "yellow";

	//-----group for ground tiles (map)----
	ground = new Group();
	ground.w = 10;
	ground.h = 10;
	ground.color = "green";
	ground.tile = "=";
	ground.collider = 'static';
	
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
		0,
		50,
		ground.w,
		ground.h
	)
	
	//----deathPoint---- **MAYBE MAKE THIS INVISIBLE? IF IT STILL WORKS
	deathPoint = new Sprite(0, 350, width, height-350); //???? width not properly set
	deathPoint.color = "black";
	deathPoint.collider = 'static';
	
	//----endPoint----
	endPoint = new Sprite(780,90,10,10);
	endPoint.color = "purple";
	endPoint.collider = 'static';
	
}

function draw() {
	clear();
	background("skyblue"); //will change later
	
	setCam();
	leftLimit();
	movePlayer();
	resetPlayer();
  endGame();

}


function setCam(){ //set the camera **maybe constrain cam x so there's no visible void on the left end
	camera.zoom = 6;
	camera.x = player.x + 45;
	camera.y = player.y - 10;
}


function movePlayer(){ //move player with keyboard
	
		if(kb.pressing('a')){
		player.x -= 2;
	}
	else if(kb.pressing('d')){
		player.x += 2;
	}
	else if(kb.pressing('space') && player.colliding(ground)){ //can't simultaneously jump while moving left/right (use keyDown?)
		player.vel.y = -3; //just teleports when player.y += 5, properly goes up and down when using velocity
	}
	
}


function resetPlayer(){ //return player to origin if fell down
// player gains too much gravitational force each time it falls and comes back to original position -- need a "buffer"
	
	if(player.y > height || player.colliding(deathPoint)){ // OR because deathPoint doesn't cover the entire screen width
	  player.x = 20;
		player.y = 50;
	}	
	
/*
	if(player.colliding(deathPoint)){
		player.x = 20;
		player.y = 50;
	}
*/
	
}


function endGame(){ // end game when reached endpoint (make a separate screen later)
	if(player.colliding(endPoint)){ //set it to original point for now just to check
		player.x = 20;
		player.y = 50;
	}
}


function leftLimit(){ // player can't go beyond the left end of the screen (it kinda prevens the weird gravity when the player position is reset)
	if(player.x < 0){
		player.x = 0;
	}
}