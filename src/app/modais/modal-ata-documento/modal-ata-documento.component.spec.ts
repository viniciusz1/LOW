import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtaDocumentoComponent } from './modal-ata-documento.component';

describe('ModalAtaDocumentoComponent', () => {
  let component: ModalAtaDocumentoComponent;
  let fixture: ComponentFixture<ModalAtaDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtaDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAtaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
