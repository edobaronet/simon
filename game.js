
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var startGame = false; //to play only the first time the user hits a key
var level = 0; //starting level


// when the user presses a key for the first time the game starts
$(document).keypress(function(event) { 
    if (!startGame) {
        //console.log("key pressed " + event.key);
        //$("#level-title").text("Level " + level);
        setTimeout(function(){
            nextSequence();
            startGame = true;
        }, 500);
    }
});


// system creates random pattern after key pressing 
function nextSequence() {
    userClickedPattern = [];

    level = level + 1;
    $("#level-title").text("Level " + level);
    // console.log("current level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    // console.log("game pattern " + gamePattern);

    $("div #" + randomChosenColour).fadeOut(100).fadeIn(100); //highlight button when selected
    
    playSound(randomChosenColour);
};


// user creates a pattern clicking on colored buttons
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    var currentLevel = (userClickedPattern.length)-1;


    playSound(userChosenColour);
    
    animatePress(userChosenColour);
    
    checkAnswer(currentLevel);
})


// play sounds when a button is clicked or when the user makes a wrong pattern
function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}


// highlight the button when pressed
function animatePress(colour) {
    $("div #"+ colour).addClass("pressed");
    setTimeout(function() {
        $("div #"+ colour).removeClass("pressed");
    }, 100);
}


// check if the user provides the correct pattern 
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        //console.log("user pattern: " + userClickedPattern);
        //console.log("game pattern: " + gamePattern);

        if (userClickedPattern.length === gamePattern.length) {
            $("#level-title").text("Correct! Level up!");
            console.log('success');
            setTimeout(function (){
                nextSequence();
            }, 1200);
        }    
    } else {
        console.log('wrong');
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key To Restart");

        startOver();
    }
}


// restart the game and reset the values
function startOver() {
    level = 0;
    gamePattern = [];
    startGame = false;
}