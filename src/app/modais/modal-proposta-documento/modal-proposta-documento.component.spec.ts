import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPropostaDocumentoComponent } from './modal-proposta-documento.component';

describe('ModalPropostaDocumentoComponent', () => {
  let component: ModalPropostaDocumentoComponent;
  let fixture: ComponentFixture<ModalPropostaDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPropostaDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPropostaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
