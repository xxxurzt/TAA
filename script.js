let secretNumber;
let attempts = 0;
let minRange = 1;
let maxRange = 100;

const userGuessInput = document.getElementById('userGuess');
const submitButton = document.getElementById('submitGuess');
const hintButton = document.getElementById('hintButton');
const feedbackText = document.getElementById('feedback');
const attemptsText = document.getElementById('attempts');
const newGameButton = document.getElementById('newGame');
const startGameButton = document.getElementById('startGame');
const minRangeInput = document.getElementById('minRange');
const maxRangeInput = document.getElementById('maxRange');
const rangeChoiceCheckbox = document.getElementById('rangeChoice');
const customRangeDiv = document.getElementById('customRange');
const rangeText = document.getElementById('rangeText');

// Функция для начала новой игры
function startNewGame() {
  if (rangeChoiceCheckbox.checked) {
    // Используем стандартный диапазон 1-100
    minRange = 1;
    maxRange = 100;
  } else {
    // Используем пользовательский диапазон
    minRange = parseInt(minRangeInput.value);
    maxRange = parseInt(maxRangeInput.value);
  }

  secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  attempts = 0;

  userGuessInput.value = '';
  feedbackText.textContent = '';
  attemptsText.textContent = '';
  submitButton.disabled = false;
  hintButton.disabled = false;
  newGameButton.style.display = 'none';

  rangeText.textContent = `${minRange} до ${maxRange}`;

  // Разрешаем ввод угаданного числа только после начала игры
  userGuessInput.disabled = false;
}

// Функция для проверки попытки пользователя
function checkGuess() {
  const userGuess = parseInt(userGuessInput.value);
  attempts++;

  if (isNaN(userGuess) || userGuess < minRange || userGuess > maxRange) {
    feedbackText.textContent = `Введите число от ${minRange} до ${maxRange}`;
    feedbackText.style.color = "red";
    return;
  }

  if (userGuess < secretNumber) {
    feedbackText.textContent = "Слишком низкое число!";
    feedbackText.style.color = "orange";
  } else if (userGuess > secretNumber) {
    feedbackText.textContent = "Слишком высокое число!";
    feedbackText.style.color = "orange";
  } else {
    feedbackText.textContent = `Поздравляем! Вы угадали число ${secretNumber} за ${attempts} попыток!`;
    feedbackText.style.color = "green";
    submitButton.disabled = true;
    hintButton.disabled = true;
    newGameButton.style.display = 'block';
  }

  attemptsText.textContent = `Количество попыток: ${attempts}`;
}

// Функция для подсказки
function giveHint() {
  feedbackText.textContent = `Загаданное число: ${secretNumber}`;
  feedbackText.style.color = "blue";
}

// Обработчики событий
startGameButton.addEventListener('click', startNewGame);
submitButton.addEventListener('click', checkGuess);
hintButton.addEventListener('click', giveHint);
newGameButton.addEventListener('click', startNewGame);

// Скрыть или показать поля  для пользовательского диапазона в зависимости от состояния чекбокса
rangeChoiceCheckbox.addEventListener('change', function() {
  if (this.checked) {
    customRangeDiv.style.display = 'none';
  } else {
    customRangeDiv.style.display = 'block';
  }
});

// Инициализация игры с выбранным диапазоном
startNewGame();