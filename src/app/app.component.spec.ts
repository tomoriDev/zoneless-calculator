import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render router-outlet wrapped with CSS classes', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses = 'min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5';

    expect(divElement).not.toBeNull();
    divElement?.classList.forEach(className => {
      expect(mustHaveClasses.split(" ")).toContain(className);
    });
  });

  it('should contain the "buy me a beer" text', () => {
    fixture.detectChanges();
    const beerLink = compiled.querySelector('a[title="Buy me a beer"]');

    console.log(beerLink)
    
    expect(beerLink).not.toBeNull();
    expect(beerLink?.getAttribute('title')).toBe('Buy me a beer');
  });
});
