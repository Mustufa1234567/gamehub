const playerScoreElem = document.getElementById('playerScore');
const computerScoreElem = document.getElementById('computerScore');
const resultElem = document.getElementById('result');
const playerWinsElem = document.getElementById('playerWins');
const drawsElem = document.getElementById('draws');
const popupMessageElem = document.getElementById('popupMessage');
const outcomeScreenElem = document.getElementById('outcomeScreen');
const instructionPopupElem = document.getElementById('instructionPopup');

let playerScore = 0;
let computerScore = 0;
let playerWins = 0;
let draws = 0;

const choices = document.querySelectorAll('.choices button');

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    playRound(choice.getAttribute('data-choice'));
  });
});

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  updateScore(result);
  displayResult(result, playerChoice, computerChoice);
  checkGameOver();
}

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'draw';
  }
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    return 'player';
  }
  return 'computer';
}

function updateScore(result) {
  if (result === 'player') {
    playerScore++;
  } else if (result === 'computer') {
    computerScore++;
  }
}

function displayResult(result, playerChoice, computerChoice) {
  if (result === 'player') {
    resultElem.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
  } else if (result === 'computer') {
    resultElem.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
  } else {
    resultElem.textContent = `It's a draw! You both chose ${playerChoice}.`;
  }
  playerScoreElem.textContent = playerScore;
  computerScoreElem.textContent = computerScore;
}

function checkGameOver() {
  if (playerScore === 3 || computerScore === 3) {
    outcomeScreenElem.classList.remove('hidden');
    if (playerScore === 3) {
      popupMessageElem.textContent = 'Congratulations! You won the game!';
      playerWins++;
    } else {
      popupMessageElem.textContent = 'Game Over! The computer won the game.';
    }
    playerWinsElem.textContent = playerWins;
    drawsElem.textContent = draws;
  }
}

function restart() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElem.textContent = playerScore;
  computerScoreElem.textContent = computerScore;
  resultElem.textContent = '';
  outcomeScreenElem.classList.add('hidden');
}

function showInstructionPopup() {
  instructionPopupElem.classList.remove('hidden');
}

function closeInstructionPopup() {
  instructionPopupElem.classList.add('hidden');
}
