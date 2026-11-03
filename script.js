'use strict';

let secretNumber = Game.randomNumber();
let highscore = 0;
let score = Game.START_SCORE;

const display = function (message) {
  document.querySelector('.message').textContent = message;
};
const updateScore = function () {
  document.querySelector('.score').textContent = score;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  const result = Game.checkGuess(guess, secretNumber);

  if (result === 'empty' || result === 'invalid') {
    display(Game.messages[result]);
  } else if (result === 'win') {
    display(Game.messages.win);
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '25rem';
    document.querySelector('.number').textContent = secretNumber;
    highscore = Game.nextHighscore(score, highscore);
    document.querySelector('.highscore').textContent = highscore;
  } else {
    score = Game.nextScore(score);
    updateScore();
    if (score > 0) {
      display(Game.messages[result]);
    } else {
      display(Game.messages.lose);
      document.querySelector('body').style.backgroundColor = '#8B0000';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = Game.START_SCORE;
  updateScore();
  secretNumber = Game.randomNumber();
  display('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
});
