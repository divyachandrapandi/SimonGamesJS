var gamePattern =[];

var userClickedPattern=[];

var buttonColours = ["red","blue","green","yellow"];

// 1.  GENERATE RANDOM NUMBER from 0-3
// 2.  PICK UP RANDOM COLOR FROM buttonColours
// 3.  SELECT BUTTON USINF ID #randomChosenColour
// 4.  USE ANIMATION EFFECT LIKE FLASH
// 5.  PLAY SOUNDS ACCCORDING TO COLOURS NAME
// 6.  AUDIO WILL PLAY ONLY ON INTERACTION --> EVENTS LIKE CLICK, KEYDOWN ETC
// USER INTREACTION
// 7.  TO DETEcT THE BUTTON CLICKED BY USER, USE btn CLASS TO CATCH TOR CLICKED
// 8.  FOR CALLBACK FUNCTION USE this TO CAPTURE THE BUTTON CLICKED and
// 9.  OBTAIN ID OF THAT BUTTON USING attr METHOD IN jquery
// 10. CREATE EMPTY ARRAY userClickedPattern
// 10. TO PUSH COLOUR THAT ARE USER CLICKED TO userClickedPattern
// 10. TO CREATE A FUNCTION playSound TAKING name AS INPUT parameter
// 10. PLAY AUDIO ACCORDING TO THE NAME AND USE IT IN nextSequence AND IN USERSEQUENCE



//11. You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//12. Create a new variable called level and start at level 0.
var level = 0;

//13. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (!started) {

    //14. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("level: "+ level);
  var  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  var activeButton =$("#"+randomChosenColour);


  activeButton.fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log(gamePattern);
  console.log(userClickedPattern);

}

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  var userLength = userClickedPattern.length -1;
  userClickedPattern.push(userChosenColour);
  $(this).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userLength);
});

function playSound(name)
{
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed")}, 100);
}

// 15. check whether user and game patern remain same if so correct else wrong

function checkAnswer(currentlevel){

  if (userClickedPattern[currentlevel] == gamePattern[currentlevel]){
    console.log("correct");
    // 16. to make sure, all length have been clicked by user, then 1s nextSequence
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }

    }
    // 17.if wrong, play bangg, add flash style to body and change h1
    // 19, call startover when wrong
  else{
    console.log("wrong");
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('body').addClass("game-over");
    setTimeout(function(){
      $('body').removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
// 18. to reset level, gamepattern, start variable
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
