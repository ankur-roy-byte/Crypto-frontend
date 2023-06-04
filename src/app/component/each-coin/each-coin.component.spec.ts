import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachCoinComponent } from './each-coin.component';

describe('EachCoinComponent', () => {
  let component: EachCoinComponent;
  let fixture: ComponentFixture<EachCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachCoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
