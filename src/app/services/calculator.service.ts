import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('123.45');

  public subResultText = signal('2');

  public lastOperator = signal('+');

  public constructNumber(value: string) {
    if (!this.isInputValid(value)) {
      return;
    }

    if (value === '=') {
      this.calculateResult();
      return;
    }

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');

      return;
    }

    if (value === 'Backspace') {
      if (this.resultText() === '0') return;

      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 2 && this.resultText().includes('-')) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update(prev => prev.slice(0, -1));
      return;
    }

    if (ALLOWED_OPERATORS.includes(value)) {
      this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');

      return;
    }

    // Limitar número de caracteres
    if (this.resultText().length > 9) {
      return;
    }

    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }

      this.resultText.update(text => text + '.');
      return;
    }

    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(text => text.slice(1));

        return;
      }

      this.resultText.update(text => '-' + text);
      return;
    }

    if (ALLOWED_NUMBERS.includes(value)) {
      if (this.resultText() === '0') {
        if (this.resultText() === '-0') {
          this.resultText.set('-' + value);
          return;
        }

        this.resultText.set(value);
        return;
      }

      this.resultText.update(text => text + value);
    }
  }

  private isInputValid(value: string) {
    return (
      ALLOWED_NUMBERS.includes(value) ||
      ALLOWED_OPERATORS.includes(value) ||
      SPECIAL_OPERATORS.includes(value)
    );
  }

  public calculateResult() {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;
    }

    let formattedResult = parseFloat(result.toFixed(4)).toString();
    this.resultText.set(formattedResult);
    this.subResultText.set('0');
  }
}

const ALLOWED_NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const ALLOWED_OPERATORS = ['+', '-', 'x', '/'];

const SPECIAL_OPERATORS = ['C', 'CE', '=', '%', '.', 'Backspace', '+/-'];
