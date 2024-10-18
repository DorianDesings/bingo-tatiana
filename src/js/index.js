// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const cardNumbersElement = document.getElementById('card-numbers');
const cardUserElement = document.getElementById('user-numbers');
const cardPcElement = document.getElementById('pc-numbers');
const fragmentUser = document.createDocumentFragment();
const fragmentNumbers = document.createDocumentFragment();
const fragmentPc = document.createDocumentFragment();

const numbersBingoElement = document.querySelectorAll('.numbers__number');
const numbersUserElement = document.querySelectorAll('.user__number');
const numbersPcElement = document.querySelectorAll('.pc__number');
let userNumbers = [];
let pcNumbers = [];
let allowedNumbers = [];
let intervalId;

const printNumbers = () => {
  for (let i = 1; i < 100; i++) {
    allowedNumbers.push(i);
    const newNumber = document.createElement('span');
    newNumber.classList.add('numbers__number');
    newNumber.textContent = i;
    newNumber.dataset.number = i;
    fragmentNumbers.append(newNumber);
  }
  cardNumbersElement.append(fragmentNumbers);
};
printNumbers();

const generateUserNumbers = () => {
  if (userNumbers.length > 14) return;

  const randomNumber = Math.ceil(Math.random() * 99);

  if (!userNumbers.includes(randomNumber)) {
    userNumbers.push(randomNumber);
  }

  return generateUserNumbers();
};

const generatePcNumbers = () => {
  if (pcNumbers.length > 14) return;

  const randomNumber = Math.ceil(Math.random() * 99);

  if (!pcNumbers.includes(randomNumber)) {
    pcNumbers.push(randomNumber);
  }

  return generatePcNumbers();
};

const printUser = () => {
  generateUserNumbers();

  userNumbers.forEach(number => {
    const newNumber = document.createElement('span');
    newNumber.textContent = number;
    newNumber.dataset.number = number;
    newNumber.classList.add('user__number');
    fragmentUser.append(newNumber);
  });

  cardUserElement.append(fragmentUser);
};
printUser();

const printPc = () => {
  generatePcNumbers();

  pcNumbers.forEach(number => {
    const newNumber = document.createElement('span');
    newNumber.textContent = number;
    newNumber.dataset.number = number;
    newNumber.classList.add('pc__number');
    fragmentPc.append(newNumber);
  });

  cardPcElement.append(fragmentPc);
};
printPc();

const checkUser = winNumber => {
  if (userNumbers.includes(winNumber)) {
    let winPosition = userNumbers.indexOf(winNumber);
    cardUserElement.querySelector(`[data-number = '${winNumber}']`).classList.add('color-user');
    userNumbers.splice(winPosition, 1);
  }
};

const checkPc = winNumber => {
  if (pcNumbers.includes(winNumber)) {
    let winPosition = pcNumbers.indexOf(winNumber);
    cardPcElement.querySelector(`[data-number = '${winNumber}']`).classList.add('color-pc');
    pcNumbers.splice(winPosition, 1);
  }
};

console.log(userNumbers, pcNumbers);

const bingoNumber = () => {
  intervalId = setInterval(() => {
    if (allowedNumbers.length === 0 || pcNumbers.length === 0 || userNumbers === 0) {
      return;
    }
    const randomPosition = Math.floor(Math.random() * allowedNumbers.length);
    let winNumber = allowedNumbers[randomPosition];

    cardNumbersElement.querySelector(`[data-number = '${winNumber}']`).classList.add('color-numbers');

    allowedNumbers.splice(randomPosition, 1);

    checkUser(winNumber);
    checkPc(winNumber);
  }, 200);
};
bingoNumber();
