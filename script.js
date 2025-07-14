const outputScreen = document.querySelector('.outputScreen');
const numbersPanel = document.querySelector('.numbers');
const operatorsPanel = document.querySelector('.operators');

let operation = {
    firstValue: null,
    secondValue: null,
    operator: null,
    result: null
};

function add(a, b) {
    let sum = a + b;
    operation.result = sum;
    outputScreen.textContent = operation.result;
    operation.firstValue = sum;
    operation.secondValue = null;
    return sum;
}
function subtract(a, b) {
    let diff = a - b;
    operation.result = diff;
    outputScreen.textContent = operation.result;
    operation.firstValue = diff;
    operation.secondValue = null;
    return diff;
}
function multiply(a, b) {
    let product = a * b;
    operation.result = product;
    outputScreen.textContent = operation.result;
    operation.firstValue = product;
    operation.secondValue = null;
    return product;
}
function division(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    } else {
        let divisionResult = a / b;
        operation.result = divisionResult;
        outputScreen.textContent = operation.result;
        operation.firstValue = divisionResult;
        operation.secondValue = null;
        return divisionResult;
    }
}
function del() {
    if(outputScreen.textContent.length > 0) {
        if(operation.secondValue !== null) {
            operation.secondValue = operation.secondValue.slice(0, -1);
        }
        else if(operation.operator !== null)
            operation.opeartor = null;
    
        else if(operation.firstValue !== null) 
            {
                if(operation.firstValue !== null)
                    operation.firstValue = operation.firstValue.slice(0, -1);
            }
            outputScreen.textContent = outputScreen.textContent.slice(0, -1);
        }
}


function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return division(a, b);
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
}
function render() {
    outputScreen.textContent =
        (operation.firstValue ?? '') +
        (operation.operator ?? '') +
        (operation.secondValue ?? '');
}
function clear() {
    operation.firstValue = null;
    operation.secondValue = null;
    operation.operator = null;
    operation.result = null;
    outputScreen.textContent = '';
}

for (let i = 1; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.className = 'number';
    btn.textContent = i;
    btn.dataset.value = i;
    btn.style.borderRadius = '40%';
    btn.style.backgroundColor = 'darkorange';
    numbersPanel.appendChild(btn);
}
/* ---- create 0 and . ---- */                    // ★ NEW
['0', '.'].forEach(ch => {                        // ★ NEW
    const btn = document.createElement('button');   // ★ NEW
    btn.className     = 'number';                   // ★ NEW
    btn.dataset.value = btn.textContent = ch;       // ★ NEW
    btn.id = ch;
    btn.style.borderRadius  = '40%';                // ★ NEW
    btn.style.backgroundColor = 'darkorange';       // ★ NEW
    numbersPanel.appendChild(btn);                  // ★ NEW
  });  




  numbersPanel.addEventListener('click', e => {
    if (!e.target.classList.contains('number')) return;
  
    const digit = e.target.dataset.value;                     // "0"–"9" or "."
    const ref   = operation.operator === null                // which operand?
                  ? 'firstValue'
                  : 'secondValue';
  
    /* ignore a second decimal point */
    if (digit === '.' && String(operation[ref]).includes('.')) return;
  
    operation[ref] = (operation[ref] ?? '') + digit;          // build the string
    render();
  });

operatorsPanel.addEventListener('click', e => {
    console.log("The id is " + e.target.id);
    if (e.target.id === 'equals') {
        if (
            operation.firstValue === null ||
            operation.secondValue === null ||
            operation.operator === null
        )
            return;
        operate(
            parseFloat(operation.firstValue),
            parseFloat(operation.secondValue),
            operation.operator
        );
        operation.secondValue = null;
        operation.operator = null;
        render();
    } else if (e.target.id === 'clear') {
        clear();
    }
    else if (e.target.id === 'del') {
        del();
    }
        else {
        const val = e.target.textContent;
        if (operation.firstValue === null) return;

        if (operation.operator === null) {
            operation.operator = val;
        } else if (operation.secondValue === null) {
            operation.operator = val;
        } else {
            operate(
                parseFloat(operation.firstValue),
                parseFloat(operation.secondValue),
                operation.operator
            );
            operation.operator = val;
            operation.secondValue = null;
        }
        render();
    }
});


window.addEventListener('keydown', e => {
    const k = e.key;
  
    if (/^[0-9]$/.test(k) || k === '.') {
      const btn = numbersPanel.querySelector(`[data-value="${k}"]`);
      if (btn) btn.click();
      return;
    }
  
    const keyToId = {
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
      Enter: 'equals',
      '=': 'equals',
      c: 'clear',         
      C: 'clear',
      delete: 'del',
      Backspace: 'del',           
    };
    const id = keyToId[k];
    if (id) {
      const btn = operatorsPanel.querySelector(`#${id}`);
      if (btn) btn.click();
      return;
    }
  });
