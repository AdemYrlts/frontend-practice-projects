var gamePattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var userClickedPattern = []
var level = 0

function nextSequance() {
   userClickedPattern = []
   var randomNumber = Math.round(Math.random() * 3)
   var randomChosenColour = buttonColors[randomNumber]
   gamePattern.push(randomChosenColour)
   $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour)
   level++
   $("h1").text("Level " + level)


}

$(".btn").on("click", function (event) {
   var userChosenColour = event.target.id
   userClickedPattern.push(userChosenColour)
   playSound(event.target.id)
   animatePress(event.target.id)
   checkAnswer(userClickedPattern.length - 1)
})
function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}
function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed")
   setTimeout(function () {
      $("#" + currentColour).removeClass("pressed")
   }, 100)
}
keyPress();
function keyPress() {
   $(document).on("keypress", function () {
      nextSequance();
      $(document).unbind("keypress")

   })
}
function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");


      if (userClickedPattern.length === gamePattern.length) {


         setTimeout(function () {
            nextSequance();
         }, 1000);

      }
      else console.log("contiunes");
   } else {

      console.log("wrong");
      $("body").addClass("game-over")
      var audio = new Audio("sounds/wrong.mp3")
      audio.play();
      setTimeout(function () {
         $("body").removeClass("game-over")
      }, 200)
      $("h1").text("Game Over, Press Any Key to Restart")
      startOver()

   }

}
function startOver() {
   level = 0
   gamePattern = []
   keyPress()
}