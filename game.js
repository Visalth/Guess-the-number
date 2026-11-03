'use strict';

// Pure game logic. No DOM here, so it can be unit tested in Node.
(function (root) {
  const MIN = 1;
  const MAX = 20;
  const START_SCORE = 20;

  function randomNumber(min = MIN, max = MAX, rng = Math.random) {
    return Math.floor(rng() * (max - min + 1)) + min;
  }

  // Returns one of: 'empty', 'invalid', 'win', 'high', 'low'
  function checkGuess(guess, secret, min = MIN, max = MAX) {
    if (!guess) return 'empty';
    if (!Number.isInteger(guess) || guess < min || guess > max) return 'invalid';
    if (guess === secret) return 'win';
    return guess > secret ? 'high' : 'low';
  }

  function nextScore(score) {
    return score > 1 ? score - 1 : 0;
  }

  function nextHighscore(score, highscore) {
    return score > highscore ? score : highscore;
  }

  const messages = {
    empty: 'No Number!',
    invalid: `Pick ${MIN}-${MAX}!`,
    win: 'You Win!',
    high: 'Too high!',
    low: 'Too low!',
    lose: 'You Lose!',
  };

  const Game = {
    MIN,
    MAX,
    START_SCORE,
    randomNumber,
    checkGuess,
    nextScore,
    nextHighscore,
    messages,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
  } else {
    root.Game = Game;
  }
})(this);
