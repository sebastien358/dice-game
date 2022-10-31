let random = 0;
let currentDicePlayer = 0;
let playerRound = 0;
let scorePlayer = [0, 0];
let gameDice = true;

activateGame();

function randomDice() {
  if (gameDice) {
    random = Math.floor(Math.random() * 6) + 1;
    // Modification de l'image avec le random;
    let diceImgHtml = document.querySelector('.dice');
    diceImgHtml.src = 'images/dice-' + random + '.png';
    // Si le chiffre est différent de 1 on ajoute la valeur dans le current du joueur;
    // Si le chiffre tombe à on change de joueur;
    currentDicePlayer += random;
    random !== 1 ? addCurrentPlayer() : playerNext();
  }
};

function addCurrentPlayer() {
  if (gameDice) {
    // On ajoute la valeur du random dans des variables afin de les l'additionnées;
    // Ajout de la valeur du current pour chancun des joueurs;
    document.querySelector('#current-' + playerRound).textContent = currentDicePlayer;
  }
};

function addScorePlayer() {
  if (gameDice) {
    // Récupération de la valeur du score pour les joueurs;
    scorePlayer[playerRound] += currentDicePlayer;
    // Si je score est supérieur ou égale à 100 on affiche le gagnant sinon on passe ou joueur 2;
    document.querySelector('#score-' + playerRound).textContent = scorePlayer[playerRound];
    // Si je score est supérieur ou égale à 100 on affiche le gagnant sinon on passe ou joueur 2;
    scorePlayer[playerRound] >= 10 ? toWinGame() : playerNext();
  }
};

function toWinGame() {
  // Affichage du gagant;
  document.querySelector('#score-' + playerRound).textContent = 'To Win !';
  document.querySelector('#score-' + playerRound).classList.add('to-win');
  document.querySelector('.container-game').classList.add('disappearance-game')
  // Faire disparaitre le Dé lorqu'un joueur a gagné;
  document.querySelector('.dice').classList.add('disappearance');
  // Enpécher l'activation du jeu au moment du gagant;
  gameDice = false;
};

function playerNext() {
  // Création de Player1 et Player2;
  playerRound === 0 ? playerRound = 1 : playerRound = 0;
  currentDicePlayer = 0;
  // Remise à 0 de la valeur du current quand on change de joueur;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  // Toggle pour Player1 et Player2;
  document.querySelector('.player-0').classList.toggle('active');
  document.querySelector('.player-1').classList.toggle('active');
};

function initializedGame() {
  //Initialisation, remise du score et du current à 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  // Initialisation, remettre le background: grey; sur le joueur 1;
  document.querySelector('.player-0').classList.add('active');
  document.querySelector('.player-1').classList.remove('active');
  // Initialisation, faire réapparaitre le Dé;
  document.querySelector('.dice').classList.remove('disappearance');
  document.querySelector('#score-0').classList.remove('to-win');
  document.querySelector('#score-1').classList.remove('to-win');
  // Initialisation, remise en position du chiffre 5 sur du Dé;
  document.querySelector('.dice').src = 'images/dice-5.png';
  // Initiatialisation de toutes les valeurs à 0;
  random = 0;
  currentDicePlayer = 0;
  playerRound = 0;
  scorePlayer = [0, 0];
  gameDice = true;
};

function activateGame() {
  // Liste des boutons du Game;
  document.querySelector('.btn-roll').addEventListener('click', randomDice);
  document.querySelector('.btn-hold').addEventListener('click', addScorePlayer);
  document.querySelector('.btn-new').addEventListener('click', initializedGame);
};