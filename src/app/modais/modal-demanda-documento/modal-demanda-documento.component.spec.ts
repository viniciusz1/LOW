import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDemandaDocumentoComponent } from './modal-demanda-documento.component';

describe('ModalDemandaDocumentoComponent', () => {
  let component: ModalDemandaDocumentoComponent;
  let fixture: ComponentFixture<ModalDemandaDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDemandaDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDemandaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
