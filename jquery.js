var playing = false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana' ,'orange' , 'grapes' , 'strawberry' , 'mango' , 'pear' , 'peach' , 'pineapple' , 'watermelon' , 'cherry'];
var step;
var action; // set for setIntervAal function

$(function() {

	//click on start/reset button

	$("#startreset").click(function() {

		 	//are we playing
		 	if(playing == true) {

		 		//reload page
		 		location.reload();
		 	}else {

		 		//we r not playing
		 		playing = true; // game initiated

		 		score = 0; // set score to 0
		 		$("#scorevalue").html(score);

		 		//show trials left 
		 		$("#trialsLeft").show();
		 		trialsLeft = 3;
		 		addHearts();

		 		//hide the game over box
		 		$("#gameover").hide();

		 		//change button text to "reset game"
		 		$("#startreset").html("Reset Game");

		 		//start sending fruits
		 		startAction();
		 	}
	});

	//slice a fruit
	$("#fruit1").mouseover(function() {
	score++;
	$("#scorevalue").html(score); //update score value
	document.getElementById("slicesound").play(); // play sound

	//stop fruit
	clearInterval(action);

	//hide fruit
	$("#fruit1").hide("explode", 500); //slicing the fruits

	//send new fruit
	setTimeout(startAction, 500);

});
 			
//functions

//fill trialLeft box with hearts

function addHearts() {
	$("#trialsLeft").empty();
	for(var i = 0; i < trialsLeft ; i++) {
		$("#trialsLeft").append('<img src="img/heart.png" class="life">');
	}
}

//start sending fruits

function startAction() {

	//generate a fruit
	$("#fruit1").show();
	chooseFruit(); // choose a random fruit
	$("#fruit1").css({
		'left' : Math.round(500*Math.random()),
		'top' : -50
	}); // random position

	//generate a random step
	step = 1 + Math.random(5 * Math.random());// change step

	//move fruit down by one step every 10ms
	action = setInterval(function() {

	// move fruit by one step
	$("#fruit1").css('top',$("#fruit1").position().top + step); 
		
	// check if the fruit is too low
	if($("#fruit1").position().top > $("#fruitcontainer").height()) {
			// check if any trials left
				if(trialsLeft > 1) {
					//generate a fruit
					$("#fruit1").show();
					chooseFruit(); // choose a random fruit
					$("#fruit1").css({
					'left' : Math.round(500*Math.random()),
					'top' : -50
					}); // random position

					//generate a random step
					step = 1 + Math.random(5 * Math.random());// change step
					
					//reduce trials by 1
					trialsLeft--;

					//populate trialsleft box
					addHearts();
				} else { // game over
					playing = false; //we  r not playing anymore
					$("#startreset").html("Start Game");// change button to Start Game
					$("#gameover").show(); 
					$("#gameover").html('<p>Game Over!</p><p>Your Score is ' + score + '</p>'); 
					$("#trialsLeft").hide();
					stopAction();
				}
			}
	},10);
}


//generate a random fruit
function chooseFruit()  {
	$("#fruit1").attr('src','img/' + fruits[Math.round(6*Math.random())] + '.jpg');
}

//stop dropping food

function stopAction() {
	clearInterval(action);
	$("#fruit1").hide();
}
});