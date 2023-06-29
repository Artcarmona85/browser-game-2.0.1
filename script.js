
// Array of code memes
const codeMemes = ['Python', 'Code', 'Node', 'VSCode', 'HTML', 'CSS', 'JS', 'Error', 'GitHub'];

// Object for each codeMeme
const imageUrls = {
  Python: 'https://media.giphy.com/media/KAq5w47R9rmTuvWOWa/giphy.gif',
  Code: 'https://media.giphy.com/media/26n7b7PjSOZJwVCmY/giphy.gif',
  Node: 'https://media.giphy.com/media/kdFc8fubgS31b8DsVu/giphy.gif',
  VSCode: 'https://media.giphy.com/media/SS8CV2rQdlYNLtBCiF/giphy.gif',
  HTML: 'https://media.giphy.com/media/XAxylRMCdpbEWUAvr8/giphy.gif',
  CSS: 'https://media.giphy.com/media/fsEaZldNC8A1PJ3mwp/giphy.gif',
  JS: 'https://media.giphy.com/media/ln7z2eWriiQAllfVcn/giphy.gif',
  Error: 'https://media.giphy.com/media/JsE9qckiYyVClQ5bY2/giphy.gif',
  GitHub: 'https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif'
};

window.addEventListener('DOMContentLoaded', () => {
  const box1 = document.getElementById('box1');
  const box2 = document.getElementById('box2');
  const box3 = document.getElementById('box3');

  box1.style.backgroundImage = `url('https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif')`;
  box2.style.backgroundImage = `url('https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif')`;
  box3.style.backgroundImage = `url('https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif')`;
});

function getRandomCodeMeme() {
  const randomIndex = Math.floor(Math.random() * codeMemes.length);
  return codeMemes[randomIndex];
}

// Function to calculate the winnings based on the code memes
//No payout for all different code memes or symbols including "Error" or "GitHub"
  
function getWinnings(codeMemes) {
  const uniqueCodeMemes = [...new Set(codeMemes)];

  if (uniqueCodeMemes.length === 1 && !codeMemes.includes('Error') && !codeMemes.includes('GitHub')) {
    return 100; 
  } else if (uniqueCodeMemes.length === 2 && !codeMemes.includes('Error') && !codeMemes.includes('GitHub')) {
    return 30; 
  } else {
    return 0;
  }
}

// Get the DOM elements for various UI elements
const spinButton = document.getElementById('spin-btn');
const cashoutButton = document.getElementById('cashout-btn');
const balanceDisplay = document.getElementById('balance');
const amountInput = document.getElementById('amount-input');
const messageDisplay = document.getElementById('message-display');

// Initialize the balance and maximum payout
let balance = 100;
const maxPayout = 10000;

balanceDisplay.textContent = balance;

// Event listener for the spin button
spinButton.addEventListener('click', () => {
  const amount = parseInt(amountInput.value);

  if (isNaN(amount) || amount <= 0 || amount > balance) {
    messageDisplay.textContent = 'Invalid amount';
    return;
  }

  const box1 = document.getElementById('box1');
  const box2 = document.getElementById('box2');
  const box3 = document.getElementById('box3');

  const symbol1 = getRandomCodeMeme();
  const symbol2 = getRandomCodeMeme();
  const symbol3 = getRandomCodeMeme();

  box1.style.backgroundImage = `url(${imageUrls[symbol1]})`;
  box2.style.backgroundImage = `url(${imageUrls[symbol2]})`;
  box3.style.backgroundImage = `url(${imageUrls[symbol3]})`;

  const symbols = [symbol1, symbol2, symbol3];
  const winnings = getWinnings(symbols);

// Player won money and Game over condition
  if (winnings === -1) {
    balance = 0;
    balanceDisplay.textContent = balance;
    messageDisplay.textContent = 'Game Over! Somehow You Deleted Your Terminal >_';
    spinButton.disabled = true;
    amountInput.disabled = true;
    cashoutButton.disabled = true;
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Nodemon';
    resetButton.addEventListener('click', resetGame);
    messageDisplay.appendChild(resetButton);
  } else if (winnings > 0) {
    const totalWinnings = winnings * amount;
    balance += totalWinnings;
    balanceDisplay.textContent = balance;
    messageDisplay.textContent = `Congratulations Coder! You won $${totalWinnings}`;
  } else {
    balance -= amount;
    balanceDisplay.textContent = balance;
    messageDisplay.textContent = 'Almost There, Check Your Code!';
  }

  if (balance >= maxPayout) {
    balance = maxPayout;
    balanceDisplay.textContent = balance;
    messageDisplay.textContent = 'Congratulations! You have reached the maximum payout. Game Over!';
    spinButton.disabled = true;
    cashoutButton.disabled = true;
    amountInput.disabled = true;
  }

   // Player game over
  if (balance <= 0) {
    spinButton.disabled = true;
    amountInput.disabled = true;
    cashoutButton.disabled = true;
    messageDisplay.textContent = 'Game Over! Somehow You Deleted Your Terminal >_';
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Nodemon';
    resetButton.addEventListener('click', resetGame);
    messageDisplay.appendChild(resetButton);
  }
});

// Event listener for the cashout button
cashoutButton.addEventListener('click', () => {
  balance = 0;
  balanceDisplay.textContent = balance;
  messageDisplay.textContent = 'Game Over! You cashed out.';
  spinButton.disabled = true;
  cashoutButton.disabled = true;
  amountInput.disabled = true;
});

// Function to reset the game
function resetGame() {
  balance = 100;
  balanceDisplay.textContent = balance;
  messageDisplay.textContent = 'Welcome to the CodeMeme Slot Machine!';
  spinButton.disabled = false;
  cashoutButton.disabled = false;
  amountInput.disabled = false;
  const resetButton = document.querySelector('button');
  resetButton.parentNode.removeChild(resetButton);
}
