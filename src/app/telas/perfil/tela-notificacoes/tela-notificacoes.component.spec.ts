import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNotificacoesComponent } from './tela-notificacoes.component';

describe('TelaNotificacoesComponent', () => {
  let component: TelaNotificacoesComponent;
  let fixture: ComponentFixture<TelaNotificacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaNotificacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaNotificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
