'use strict';

let secretNumber = Math.floor(Math.random() * 20) + 1;
let highscore = 0;
let score = 20;

const display = function (message) {
  document.querySelector('.message').textContent = message;
};
const updateScore = function () {
  document.querySelector('.score').textContent = score;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    display('No Number!');
  } else if (guess === secretNumber) {
    display('You Win!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '25rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highscore) highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  } else if (guess !== secretNumber) {
    if (score > 1) {
      display(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      updateScore();
    } else {
      display('You Lose!');
      score = 0;
      updateScore();
      document.querySelector('body').style.backgroundColor = '#8B0000';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  updateScore();
  secretNumber = Math.floor(Math.random() * 20) + 1;
  display('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
});
