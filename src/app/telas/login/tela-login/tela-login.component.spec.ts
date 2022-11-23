import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaLoginComponent } from './tela-login.component';
import {InputTextModule} from 'primeng/inputtext';

describe('TelaLoginComponent', () => {
  let component: TelaLoginComponent;
  let fixture: ComponentFixture<TelaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
