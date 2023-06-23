// Arrays
var gamePattern = [];
// Array to store user clicks
var userClickedPattern = [];
// Array to check against random num generated
var buttonColors = ["green", "red", "yellow", "blue"];
// game level
var level = 0;
// State of game
var started = false;



$(document).ready(function(){
    // Choose the next color in the sequence
    function nextSequence() {
        userClickedPattern = [];
        // Increment the level 
        level++;
        $('#level-title').text('Level ' + level);
        // Choose random color
        var randomNumber = Math.floor(Math.random() * buttonColors.length);
        var randomChosenColour = buttonColors[randomNumber];
        // Add random color to the game array
        gamePattern.push(randomChosenColour);
        console.log("Color chosen by Computer: "+ gamePattern);
        // Show that user clicked on button with small animation
        $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }

    // Animate button
    function animatePress(currentColor) {
        // Animate the button just clicked
        $('#' + currentColor).addClass('pressed');
        setTimeout(function () {
            $('#' + currentColor).removeClass('pressed');
        }, 100);
    }

    // Button click
    $('.btn').click(function () {
        // Button user last clicked
        var userChosenColour = $(this).attr('id');
        // Add it to user choice array
        userClickedPattern.push(userChosenColour);
        // Play sound equal to user choice
        playSound(userChosenColour);
        animatePress(userChosenColour);
        // Check user answer
        checkAnswer(userClickedPattern.length - 1);
        // The new array with new elements
        console.log(userClickedPattern); 
    });

    // Detect key press
    $(document).keydown(function () {
        if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
        }
    });

    // Play Sound
    function playSound(name) {
        var audio = new Audio('sounds/' + name + '.mp3');
        audio.play();
    }

    // Check button clicked
    function checkAnswer(currentLevel) {
        // Compare user array to computer array
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            // If array match move to next level
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
            nextSequence();
            }, 1000);
            console.log("success");
        }
        } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');
    
        // Start the game over
        setTimeout(function () {
            $('body').removeClass('game-over');
            }, 200);
            console.log("wrong");
            startOver();
        }
    }

    // Reset stats
    function startOver() {
        // Reset the stats
        level = 0;
        gamePattern = [];
        started = false;
    }
});