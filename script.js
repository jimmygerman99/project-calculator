const outputScreen   = document.querySelector('.outputScreen');
const numbersPanel   = document.querySelector('.numbers');
const operatorsPanel = document.querySelector('.operators');

let operation = {
  firstValue  : '',
  secondValue : '',
  operator    : null,
  result      : null
};

function add(a, b)      { operation.result = a + b; return operation.result; }
function subtract(a, b) { operation.result = a - b; return operation.result; }
function multiply(a, b) { operation.result = a * b; return operation.result; }
function division(a, b) { if (b === 0) throw Error('÷0'); operation.result = a / b; return operation.result; }

function operate(a, b, operator) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return division(a, b);
  }
}

function render() {
  outputScreen.textContent = operation.firstValue + (operation.operator || '') + operation.secondValue;
}

function clear() {
  operation.firstValue = operation.secondValue = '';
  operation.operator = operation.result = null;
  render();
}

for (let i = 1; i <= 9; i++) {
  const btn = document.createElement('button');
  btn.className = 'number';
  btn.dataset.value = btn.textContent = i;
  btn.style.cssText = 'border-radius:40%;background:darkorange';
  numbersPanel.appendChild(btn);
}

numbersPanel.addEventListener('click', e => {
  const btn = e.target.closest('.number');
  if (!btn) return;

  if (!operation.operator) {
    operation.firstValue += btn.dataset.value;
  } else {
    operation.secondValue += btn.dataset.value;
  }
  render();
});

operatorsPanel.addEventListener('click', e => {
  const btn = e.target.closest('.operator');
  if (!btn) return;

  switch (btn.id) {
    case 'clear':
      clear();
      break;

    case 'equals':
      if (!operation.operator || !operation.secondValue) return;
      const res = operate(
        parseFloat(operation.firstValue),
        parseFloat(operation.secondValue),
        operation.operator
      );
      operation.firstValue = String(res);
      operation.secondValue = '';
      operation.operator = null;
      render();
      break;

    default:
      const sym = { add: '+', subtract: '-', multiply: '*', divide: '/' }[btn.id];
      if (!sym) return;

      if (!operation.operator) {
        operation.operator = sym;
      } else if (!operation.secondValue) {
        operation.operator = sym;
      } else {
        const interim = operate(
          parseFloat(operation.firstValue),
          parseFloat(operation.secondValue),
          operation.operator
        );
        operation.firstValue = String(interim);
        operation.secondValue = '';
        operation.operator = sym;
      }
      render();
  }
});
