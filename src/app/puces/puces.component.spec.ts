import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PucesComponent } from './puces.component';

describe('PucesComponent', () => {
  let component: PucesComponent;
  let fixture: ComponentFixture<PucesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PucesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PucesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
