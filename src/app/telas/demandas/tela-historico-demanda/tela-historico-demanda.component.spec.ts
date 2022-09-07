import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaHistoricoDemandaComponent } from './tela-historico-demanda.component';

describe('TelaHistoricoDemandaComponent', () => {
  let component: TelaHistoricoDemandaComponent;
  let fixture: ComponentFixture<TelaHistoricoDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaHistoricoDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaHistoricoDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
