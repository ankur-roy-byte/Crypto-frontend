import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterComponent1 } from './login-register.component';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent1;
  let fixture: ComponentFixture<LoginRegisterComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterComponent1 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
