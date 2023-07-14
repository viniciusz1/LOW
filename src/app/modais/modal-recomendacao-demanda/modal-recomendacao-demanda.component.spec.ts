import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecomendacaoDemandaComponent } from './modal-recomendacao-demanda.component';

describe('ModalRecomendacaoDemandaComponent', () => {
  let component: ModalRecomendacaoDemandaComponent;
  let fixture: ComponentFixture<ModalRecomendacaoDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRecomendacaoDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRecomendacaoDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
