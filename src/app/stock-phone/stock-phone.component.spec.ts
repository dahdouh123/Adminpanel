import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPhoneComponent } from './stock-phone.component';

describe('StockPhoneComponent', () => {
  let component: StockPhoneComponent;
  let fixture: ComponentFixture<StockPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
