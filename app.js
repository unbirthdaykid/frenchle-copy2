const menu = document.querySelector("#mobile-menu")
const menuLinks = document.querySelector(".navbar__menu")

menu.addEventListener("click", function(){
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");

});



var tabs = document.getElementsByClassName('tab');
var navItems = document.getElementsByClassName('nav-item');

// --------------------------------------------------------------------------------------------------
let selectedAnswers = {};

function resetQuiz() {
  selectedAnswers = {};

  const questions = document.querySelectorAll('.question');
  questions.forEach((questionDiv, index) => {
    const circles = questionDiv.querySelectorAll('.circle');
    circles.forEach(circle => circle.classList.remove('selected'));
    
    const answerButtons = questionDiv.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
      btn.classList.remove('user-correct');
      btn.classList.remove('user-wrong');
    });
      
    questionDiv.querySelector('.answer').style.display = 'none';
  });

  const scoreElements = document.querySelectorAll('.score');
  scoreElements.forEach(scoreElement => {
  let totalQuestions = scoreElement.getAttribute('data-total');
  scoreElement.textContent = `Score: 0/${totalQuestions}`; 
  scoreElement.classList.remove('score-style'); 
  });

}

function changeTab(index) {
  resetQuiz();

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display = 'none';
    navItems[i].classList.remove('active');
  }

  tabs[index].style.display = 'block';
  navItems[index].classList.add('active');
}

function selectAnswer(element, choiceIndex) {
  const questionDiv = element.closest('.question');
  const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(questionDiv);

  selectedAnswers[questionIndex] = choiceIndex;

  const circles = questionDiv.querySelectorAll('.circle');
  circles.forEach(circle => circle.classList.remove('selected'));
  element.querySelector('.circle').classList.add('selected');
}

function submitQuiz() {
  let score = 0;

  const questions = document.querySelectorAll('.question');
  questions.forEach((questionDiv, index) => {
    const correctAnswer = parseInt(questionDiv.getAttribute('data-answer'));
    const answerButtons = questionDiv.querySelectorAll('.answer-btn');
    
    if (selectedAnswers[index] === correctAnswer) {
      score++;
      answerButtons[correctAnswer].classList.add('user-correct');
    } else if (selectedAnswers[index] !== undefined) {
      answerButtons[selectedAnswers[index]].classList.add('user-wrong');
    }

    questionDiv.querySelector('.answer').style.display = 'block';
  });

  const firstTabScoreElement = document.querySelector('#tab0 .score');
  firstTabScoreElement.textContent = `Score: ${score}`; 
  firstTabScoreElement.classList.add('score-style'); 

  // Get the score element of the currently selected tab
  const currentTabScoreElement = document.querySelector('.tab[style="display: block;"] .score');
  if (currentTabScoreElement) {
    const totalQuestionsForCurrentTab = currentTabScoreElement.getAttribute('data-total');
    currentTabScoreElement.textContent = firstTabScoreElement.textContent + `/${totalQuestionsForCurrentTab}`;
    currentTabScoreElement.classList.add('score-style');
  }
}

changeTab(0);


// -------------------------------------writing page-------------------------------------------------------------
function adjustTextareaHeight(textarea) {
  let lines = textarea.value.split('\n').length;
  let requiredRows = lines + 2; 
  
  if (requiredRows < 10) {
      textarea.rows = 10; 
  } else {
      textarea.rows = requiredRows;
  }
}

function toggleMarkscheme(element) {
  const tabNumber = element.getAttribute("data-tab");

  const markscheme = document.querySelector(`.markscheme[data-tab='${tabNumber}']`);
  const toggleText = element.querySelector(".toggleText");
  const arrow = element.querySelector(".arrow");

  if (markscheme.style.display === "none" || !markscheme.style.display) {
      markscheme.style.display = "block";
      toggleText.textContent = "Collapse Markscheme";
      arrow.innerHTML = "&#8965;";
  } else {
      markscheme.style.display = "none";
      toggleText.textContent = "Toggle Markscheme";
      arrow.innerHTML = "&#8964;";
  }
}




