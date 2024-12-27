import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@app/services/calculator.service';

@Component({
  selector: 'app-calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  private calculatorButtons = viewChildren(CalculatorButtonComponent);

  private calculatorService = inject(CalculatorService);

  public resultText = computed(() => this.calculatorService.resultText());

  public subResultText = computed(() => this.calculatorService.subResultText());

  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleKeyboardEvent(event: KeyboardEvent) {
    const keyMap: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      Enter: '=',
    };
    const { key } = event;
    const keyValue = keyMap[key] ?? key;

    this.handleClick(keyValue);
    this.calculatorButtons().forEach(button => {
      button.keyboardPressedStyle(keyValue);
    });
  }

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }
}
