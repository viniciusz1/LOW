import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParecerComissaoPropostaComponent } from './modal-parecer-comissao-proposta.component';

describe('ModalParecerComissaoPropostaComponent', () => {
  let component: ModalParecerComissaoPropostaComponent;
  let fixture: ComponentFixture<ModalParecerComissaoPropostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParecerComissaoPropostaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalParecerComissaoPropostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
