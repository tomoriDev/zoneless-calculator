import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubledSize()',
    '[class.w-1/4]': '!isDoubledSize()',
  },
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);

  onClick = output<string>();

  contentValue = viewChild<ElementRef>('button');

  isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  isDoubledSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  handleClick() {
    const keyValue: string = this.contentValue()?.nativeElement.innerText;

    if (!keyValue) return;

    this.onClick.emit(keyValue.trim());
  }

  keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()?.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
