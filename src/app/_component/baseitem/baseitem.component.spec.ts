import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseitemComponent } from './baseitem.component';

describe('BaseitemComponent', () => {
  let component: BaseitemComponent;
  let fixture: ComponentFixture<BaseitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
