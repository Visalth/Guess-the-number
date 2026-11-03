const Game = require('../game');

describe('checkGuess', () => {
  test('returns "win" when guess equals secret', () => {
    expect(Game.checkGuess(7, 7)).toBe('win');
  });

  test('returns "high" when guess is bigger than secret', () => {
    expect(Game.checkGuess(15, 7)).toBe('high');
  });

  test('returns "low" when guess is smaller than secret', () => {
    expect(Game.checkGuess(3, 7)).toBe('low');
  });

  test('returns "empty" when no number is given', () => {
    expect(Game.checkGuess(0, 7)).toBe('empty');
    expect(Game.checkGuess(NaN, 7)).toBe('empty');
  });

  test('returns "invalid" for numbers outside 1-20 or decimals', () => {
    expect(Game.checkGuess(25, 7)).toBe('invalid');
    expect(Game.checkGuess(-3, 7)).toBe('invalid');
    expect(Game.checkGuess(2.5, 7)).toBe('invalid');
  });
});

describe('randomNumber', () => {
  test('always stays between 1 and 20', () => {
    for (let i = 0; i < 1000; i++) {
      const n = Game.randomNumber();
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(20);
      expect(Number.isInteger(n)).toBe(true);
    }
  });

  test('uses edges correctly with a fake random generator', () => {
    expect(Game.randomNumber(1, 20, () => 0)).toBe(1);
    expect(Game.randomNumber(1, 20, () => 0.9999)).toBe(20);
  });
});

describe('score logic', () => {
  test('nextScore decreases score by 1', () => {
    expect(Game.nextScore(20)).toBe(19);
  });

  test('nextScore goes to 0 on the last try (lose)', () => {
    expect(Game.nextScore(1)).toBe(0);
  });

  test('nextHighscore keeps the best score', () => {
    expect(Game.nextHighscore(15, 10)).toBe(15);
    expect(Game.nextHighscore(5, 10)).toBe(10);
  });
});
