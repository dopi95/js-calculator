let expression = '';

const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');

// Add a character to the expression
function input(value) {
  const lastChar = expression.slice(-1);
  const isOperator = v => ['+', '-', '*', '/', '%'].includes(v);

  // Prevent two operators in a row
  if (isOperator(value) && isOperator(lastChar)) {
    expression = expression.slice(0, -1);
  }

  // Prevent starting with an operator (except minus for negatives)
  if (expression === '' && isOperator(value) && value !== '-') return;

  expression += value;
  resultEl.textContent = expression;
  expressionEl.textContent = '';
}

// Evaluate the expression
function calculate() {
  if (!expression) return;

  try {
    const evaluated = Function('"use strict"; return (' + expression + ')')();
    expressionEl.textContent = expression + ' =';
    resultEl.textContent = parseFloat(evaluated.toFixed(10));
    expression = String(parseFloat(evaluated.toFixed(10)));
  } catch {
    resultEl.textContent = 'Error';
    expression = '';
  }
}

// Clear everything
function clearAll() {
  expression = '';
  expressionEl.textContent = '';
  resultEl.textContent = '0';
}

// Delete last character
function deleteLast() {
  expression = expression.slice(0, -1);
  resultEl.textContent = expression || '0';
}

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') input(e.key);
  else if (['+', '-', '*', '/', '%', '.'].includes(e.key)) input(e.key);
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearAll();
});
