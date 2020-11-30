var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


// Pressing Any Button Starts the Game
$(document).on('keydown', function() {
    if (!started){
        $('#level-title').text('Level 0'); 
        nextSequence();
    }
});

// Records the Pattern that the User Plays
$('.btn').click(function(){ 
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    
    checkAnswer(userClickedPattern.length-1);
}); 


// Functions

function nextSequence(){
    // Vor jeder neuen Runde die Nutzeingabe zurücksetzen
    userClickedPattern = [];
    
    // Changes the Title to the corresonding Level Number
    level++;
    $('#level-title').text('Level ' + level);
    
    // Generates a random number between 0 and 3
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    // Uses the random number to choose one of the 4 colors and adds it to the gamePattern
    var randomChosenColor = buttonColors[randomNumber]; 
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    // Animates the Next Color
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor); 
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
        console.log('success!');

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }    
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout (function(){
            $('body').removeClass('game-over');
        }, 2000);
        $('#level-title').text('Game Over, Press Any Key to Restart!');
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern =[];
    started = false;
}

// Plays the sound of the corresponding color
function playSound(color){
    var sound = new Audio ('sounds/' + color + '.mp3');
    sound.play();
}

// Animation when Button is Clicked
function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed');
    });
}