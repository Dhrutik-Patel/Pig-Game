'use strict';

const scoreZero = document.querySelector('#score--0');
const scoreOne = document.querySelector('#score--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const currentZero = document.querySelector('#current--0');
const currentOne = document.querySelector('#current--1');
const playerZero = document.querySelector('.player--0');
const playerOne = document.querySelector('.player--1');

scoreZero.textContent = 0;
scoreOne.textContent = 0;
diceImg.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;

  playerZero.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
};

btnRoll.addEventListener('click', e => {
  if (playing) {
    e.preventDefault();

    const dice = Math.trunc(Math.random() * 6) + 1;

    diceImg.classList.remove('hidden');
    diceImg.src = `/img/dice-${dice}.png`;

    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', e => {
  if (playing) {
    e.preventDefault();

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', e => {
  e.preventDefault();

  scoreZero.textContent = 0;
  scoreOne.textContent = 0;

  currentZero.textContent = 0;
  currentOne.textContent = 0;

  playerZero.classList.remove('player--winner');
  playerOne.classList.remove('player--winner');

  playerZero.classList.remove('player--active');
  playerOne.classList.remove('player--active');

  playerZero.classList.add('player--active');

  diceImg.classList.add('hidden');

  scores[0] = 0;
  scores[1] = 0;

  currentScore = 0;
  activePlayer = 0;
  playing = true;
});
