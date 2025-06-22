import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridflexControlComponent } from './gridflex-control.component';

describe('GridflexControlComponent', () => {
  let component: GridflexControlComponent;
  let fixture: ComponentFixture<GridflexControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridflexControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridflexControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
