import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('12');

  public subResultText = signal('0');

  public lastOperator = signal('+');
}
