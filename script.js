document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const fullscreenButton = document.getElementById('fullscreen'); // tambahan
    let currentInput = '0';
    let operator = '';
    let previousInput = '0';
  
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        handleButtonClick(button.innerText);
      });
    });
  
    document.addEventListener('keydown', function (event) {
      const key = event.key;
      handleKeyboardInput(key);
    });
  
    // Tambahan: event listener untuk tombol fullscreen
    fullscreenButton.addEventListener('click', function () {
      toggleFullscreen();
    });
  
    function handleButtonClick(value) {
      if (isDigit(value)) {
        handleDigit(value);
      } else if (isOperator(value)) {
        handleOperator(value);
      } else if (value === '=') {
        calculateResult();
      } else if (value === 'C') {
        clearCalculator();
      } else if (value === '⌫') {
        handleBackspace();
      }
      updateDisplay();
    }
  
    function handleKeyboardInput(key) {
      if (isDigit(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        handleButtonClick('=');
      } else if (key === 'Escape') {
        handleButtonClick('C');
      } else if (key === 'Backspace') {
        handleButtonClick('⌫');
      }
    }
  
    function isDigit(value) {
      return /\d/.test(value);
    }
  
    function isOperator(value) {
      return /[\+\-\*\/]/.test(value);
    }
  
    function handleDigit(value) {
      if (currentInput === '0') {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }
  
    function handleOperator(value) {
      if (operator && currentInput !== '0') {
        calculateResult();
      }
      operator = value;
      previousInput = currentInput;
      currentInput = '0';
    }
  
    function calculateResult() {
      const num1 = parseFloat(previousInput);
      const num2 = parseFloat(currentInput);
  
      switch (operator) {
        case '+':
          currentInput = (num1 + num2).toString();
          break;
        case '-':
          currentInput = (num1 - num2).toString();
          break;
        case '*':
          currentInput = (num1 * num2).toString();
          break;
        case '/':
          currentInput = (num1 / num2).toString();
          break;
        default:
          break;
      }
  
      operator = '';
      previousInput = '0';
    }
  
    function clearCalculator() {
      currentInput = '0';
      operator = '';
      previousInput = '0';
    }
  
    function handleBackspace() {
      currentInput = currentInput.slice(0, -1);
      if (currentInput === '') {
        currentInput = '0';
      }
    }
  
    function updateDisplay() {
      display.textContent = currentInput;
    }
  
    // Tambahan: fungsi untuk memperbesar atau keluar dari fullscreen
    function toggleFullscreen() {
      const doc = window.document;
      const docEl = doc.documentElement;
  
      const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      } else {
        cancelFullScreen.call(doc);
      }
    }
  });
  