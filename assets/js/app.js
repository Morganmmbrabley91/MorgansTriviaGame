
function Question (question, a1, a2, a3, a4, correctAnswer) {
  this.question      = question;
  this.a1            = a1;
  this.a2            = a2;
  this.a3            = a3;
  this.a4            = a4;
  this.correctAnswer = correctAnswer;
}

Question.prototype.checkAnswer = function(userAnswer) {
  if(userAnswer===this.correctAnswer) {
    
    return true;
  } else {
   
    return false;
  }
};


var questions = [
    new Question(
      "What CalArts classroom number appears in nearly every Pixar film?",
      "221B",
      "A113",
      "5.124",
      "113B",
      "a2"),
    new Question(
      "What's the name of the lamp featured in the Pixar logo animation?",
      "Luxo",
      "Henry",
      "Johnny",
      "Luxo Jr.",
      "a4"),
    new Question(
      "Before becoming Pixar, the founding team was known as The Graphics Group and was owned by what company?",
      "Apple",
      "Lucasfilm",
      "Industrial Light & Magic",
      "Disney",
      "a2"),
    new Question(
      "Pixar was originally formed to create and sell what?",
      "high-end computers",
      "toys",
      "computer games",
      "stuffed animals",
      "a1"),
    new Question(
      "In 2006, Pixar was purchased by...",
      "George Lucas",
      "Steve Jobs",
      "Apple",
      "Disney",
      "a4")
];

var questionCounter = 0;

var questionTimer;
var answerTimer;
var questionDuration = 10;
var answerDuration = 3;

var correct = 0;
var incorrect = 0;
var unanswered = 0;

function startGame() {
  var startButton = $("<button>");
  $(startButton).addClass(".start");
  $(startButton).html("LET'S GET STARTED!");
  $(".stage").html("<h2>HEY BUDDY!</h2> <p>Think you got what it takes to beat this quiz?</p>");
  $(".stage").append(startButton);

  $(startButton).click(function(){
    askQuestion();
  });
}

function reset() {
  questionCounter = 0;
 
  correct = 0;
  incorrect = 0;
  unanswered = 0;
 
  clearTimeout(answerTimer);
  clearInterval(questionTimer);
  startGame();
}

function startQuestionTimer(t, q) {
  
  questionTimer = setInterval(function(){
    if (t <= 0) {
      renderWrong(q, true);
      return;
    } else {
      $("h4.timer span").text(t);
      t--;
    }
  }, 4000);
}

function startAnswerTimer(){
  console.log(answerDuration);
  answerTimer = setTimeout(function(){
    askQuestion();
  },answerDuration*1000);
}

function renderGameOver() {
  var output = "<h2>Do you think you did well?...</h2>";
  output += "<table><tbody><tr><td class='left'>";
  output += "Correct:</td><td class='left'>  "+correct+"</td></tr><tr><td class='left'>";
  output += "Incorrect:</td><td class='left'>  "+incorrect+"</td></tr><tr><td class='left'>";
  output += "Unanswered:</td><td class='left'>  "+unanswered+"</td></tr></tbody></table>";
  output += "<button class='reset'>Go again</button>";
  $(".stage").html(output);
  $(".reset").click(function(){
    reset();
  });
}

function askQuestion() {
  
  $(".stage").empty();
 
  clearTimeout(answerTimer);
  if(questionCounter < questions.length) {
    
    var q = questions[questionCounter];
   
    var currentQuestion = new Question(q);
    
    var output = "<h4 class='timer'> Time remaining: <span>"+questionDuration+"</span></h4>";
    output += "<h3>"+q.question+"</h3>";
    output += "<ul class='answers'>";
    output += "<li id='a1'>"+q.a1+"</li>";
    output += "<li id='a2'>"+q.a2+"</li>";
    output += "<li id='a3'>"+q.a3+"</li>";
    output += "<li id='a4'>"+q.a4+"</li>";
    output += "</ul>";

    
    $(".stage").html(output);

    
    startQuestionTimer(questionDuration, q);

  
    questionCounter++;

   
    $("li").click(function(){
      $(this).addClass('selected');
      if(q.checkAnswer($(this).attr("id"))) {
        renderCorrect(q);
        
      } else {
        renderWrong(q);
        
      }
    });
  } else {
    
    renderGameOver();
}

} 

function renderCorrect(q) {
  
  correct++;
  
  clearInterval(questionTimer);
  
  startAnswerTimer();
  // Congratulations message + correct answer for 5 seconds
  var output = "<h3>RIGHT YOU ARE!</h3>";
  output += "<img src='./assets/images/win"+questionCounter+".gif'>";
  $(".stage").html(output);
}

function renderWrong(q, ranOutofTime) {
  
  clearInterval(questionTimer);
 
  startAnswerTimer();

  var correct = q[q.correctAnswer];
 
  var output;
  if (ranOutofTime === true) {
    output = "<h3>YOU RAN OUT OF TIME.</h3>";
    unanswered++;
  } else {
    output = "<h3>NOPE THATS NOT RIGHT.</h3>";
    incorrect++;
  }
  output += "<h4 class='correction'>The correct answer was "+correct+".</h4>";
  output += "<img src='./assets/images/fail"+questionCounter+".gif'>";
  $(".stage").html(output);

}

$(document).ready(function(){

  startGame();


});
