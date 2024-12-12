import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  },
})
export class CalculatorButtonComponent {
  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubledSize();
  }

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
    const keyValue: string = this.contentValue()?.nativeElement.textContent;

    if (!keyValue) return;

    this.onClick.emit(keyValue.trim());
  }
}
