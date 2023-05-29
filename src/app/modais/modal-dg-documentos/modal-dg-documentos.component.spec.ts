import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDgDocumentosComponent } from './modal-dg-documentos.component';

describe('ModalDgDocumentosComponent', () => {
  let component: ModalDgDocumentosComponent;
  let fixture: ComponentFixture<ModalDgDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDgDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDgDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
