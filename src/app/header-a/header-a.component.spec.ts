import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAComponent } from './header-a.component';

describe('HeaderAComponent', () => {
  let component: HeaderAComponent;
  let fixture: ComponentFixture<HeaderAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
