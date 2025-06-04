// --- Theme Toggler ---
const themeToggle = document.getElementById('theme-toggle-checkbox');

themeToggle.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

// --- Calculator Class (The "Engine") ---
class Calculator {
    constructor(historyElement, inputElement) {
        this.historyElement = historyElement;
        this.inputElement = inputElement;
        this.calculationHistory = [];
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === 'Error') { this.clear(); return; }
        if (this.currentOperand.length > 1) {
             this.currentOperand = this.currentOperand.toString().slice(0, -1);
        } else {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        const currentDigits = this.currentOperand.replace('.', '');
        if (currentDigits.length >= 12) return; 

        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === 'Error') return;
        if (this.currentOperand === '' && this.previousOperand === '') return;
        if (this.previousOperand !== '' && this.currentOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        const fullCalculation = `${this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.getDisplayNumber(current)}`;

        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '×': computation = prev * current; break;
            case '÷': 
                if(current === 0) {
                    this.currentOperand = "Error";
                    this.previousOperand = '';
                    this.operation = undefined;
                    this.updateDisplay();
                    return;
                }
                computation = prev / current; 
                break;
            case '%': computation = prev % current; break;
            default: return;
        }

        const limit = 999999999999;
        if (Math.abs(computation) > limit) {
            this.currentOperand = computation.toExponential(4);
        } else {
            this.currentOperand = computation.toString();
        }
        
        this.saveToHistory(`${fullCalculation} = ${this.getDisplayNumber(this.currentOperand)}`);
        
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }
    
    saveToHistory(calculation) {
        this.calculationHistory.unshift(calculation);
        if (this.calculationHistory.length > 20) { this.calculationHistory.pop(); }
    }
    
    toggleSign() {
        if (this.currentOperand === '' || this.currentOperand === '0') return;
        const num = parseFloat(this.currentOperand);
        this.currentOperand = (num * -1).toString();
        this.updateDisplay();
    }

    getDisplayNumber(number) {
        if (number === 'Error') return 'Error';
        if (number === null || number === undefined || number === '') return '0';
        const stringNumber = number.toString();
        if (stringNumber.includes('e')) { return stringNumber; }
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) { integerDisplay = ''; } 
        else { integerDisplay = integerDigits.toLocaleString('en-US', { maximumFractionDigits: 0 }); }
        if (decimalDigits != null) { return `${integerDisplay}.${decimalDigits}`; } 
        else { return integerDisplay; }
    }

    updateDisplay() {
        this.inputElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.historyElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.historyElement.innerText = '';
        }
        this.adjustFontSize();
    }

    adjustFontSize() {
        const inputDisplay = this.inputElement;
        const numberLength = inputDisplay.innerText.length;
        if (numberLength > 13) { inputDisplay.style.fontSize = "2.4rem"; } 
        else if (numberLength > 10) { inputDisplay.style.fontSize = "2.8rem"; } 
        else if (numberLength > 8) { inputDisplay.style.fontSize = "3.4rem"; } 
        else if (numberLength > 6) { inputDisplay.style.fontSize = "4.0rem"; } 
        else { inputDisplay.style.fontSize = "4.5rem"; }
    }
}


// --- DOM Element Selection & Event Listeners ---
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('C');
const backspaceButton = document.getElementById('CE');
const plusmnButton = document.getElementById('plusmn');
const decimalButton = document.getElementById('decimal');
const historyElement = document.getElementById('history');
const inputElement = document.getElementById('input');
const copyDisplayBtn = document.getElementById('copy-display-btn'); // <-- ADDED

const calculator = new Calculator(historyElement, inputElement);

digitButtons.forEach(button => { button.addEventListener('click', () => { calculator.appendNumber(button.innerText); }); });
operatorButtons.forEach(button => { button.addEventListener('click', () => { calculator.chooseOperation(button.innerText); }); });
decimalButton.addEventListener('click', () => { calculator.appendNumber('.'); });
equalsButton.addEventListener('click', button => { calculator.compute(); });
clearButton.addEventListener('click', button => { calculator.clear(); });
backspaceButton.addEventListener('click', button => { calculator.delete(); });
plusmnButton.addEventListener('click', button => { calculator.toggleSign(); });

// --- ADDED: Event listener for the main display copy button ---
copyDisplayBtn.addEventListener('click', () => {
  const textToCopy = calculator.currentOperand;

  navigator.clipboard.writeText(textToCopy).then(() => {
    copyDisplayBtn.textContent = 'done';
    copyDisplayBtn.classList.add('copied');
    
    setTimeout(() => {
      copyDisplayBtn.textContent = 'content_copy';
      copyDisplayBtn.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
});


// --- History Modal Logic ---
const historyBtn = document.getElementById('history-btn');
const historyModal = document.getElementById('history-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const historyList = document.getElementById('history-list');

function showHistory() {
  historyList.innerHTML = '';
  const calculations = calculator.calculationHistory;

  if (calculations.length === 0) {
    historyList.innerHTML = '<li>No history yet.</li>';
  } else {
    calculations.forEach(calc => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="history-text">${calc}</span>
        <button class="copy-btn material-symbols-outlined">content_copy</button>
      `;
      historyList.appendChild(li);
    });
  }
  
  historyModal.style.display = 'block';
}

function closeHistory() { historyModal.style.display = 'none'; }

historyBtn.addEventListener('click', showHistory);
closeModalBtn.addEventListener('click', closeHistory);
window.addEventListener('click', (event) => { if (event.target == historyModal) { closeHistory(); }});

historyList.addEventListener('click', function(event) {
  if (event.target.classList.contains('copy-btn')) {
    const copyBtn = event.target;
    const textToCopy = copyBtn.previousElementSibling.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
      copyBtn.textContent = 'done';
      copyBtn.classList.add('copied');
      
      setTimeout(() => {
        copyBtn.textContent = 'content_copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
});


// --- Keyboard Support ---
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) { calculator.appendNumber(e.key); return; }
    if (e.key === ".") { calculator.appendNumber(e.key); return; }
    switch (e.key) {
        case "c": case "C": calculator.clear(); break;
        case "Backspace": calculator.delete(); break;
        case "Enter": case "=": calculator.compute(); break;
        case "+": case "-": case "%": calculator.chooseOperation(e.key); break;
        case "*": calculator.chooseOperation("×"); break;
        case "/": calculator.chooseOperation("÷"); break;
    }
});