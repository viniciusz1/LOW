import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEtapaCincoComponent } from './tela-etapa-cinco.component';

describe('TelaEtapaCincoComponent', () => {
  let component: TelaEtapaCincoComponent;
  let fixture: ComponentFixture<TelaEtapaCincoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaEtapaCincoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaEtapaCincoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
