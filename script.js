'use strict';

//Selecionando elementos
const player0El = document.querySelector('.player--0');

const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();
//Funcionalidade rolar dados
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Gerar um número aleatório
    const dice = Math.trunc(Math.random() * 6) + 1;
    //Mostrar o dado

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Checar se rolou um número 1: se for verdadeiro
    if (dice !== 1) {
      //adicionar valor do dado rolado para o score atual
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //muda de jogador
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. adicionar a pontuação atual para a pontuação total do jogador ativo
    scores[activePlayer] += currentScore;
    //score[1] = score[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. checar se a pontuação do jogador é >=100
    // Finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      //Troca de jogador.
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
