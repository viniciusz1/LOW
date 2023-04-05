import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelamentoReuniaoComponent } from './modal-cancelamento-reuniao.component';

describe('ModalCancelamentoReuniaoComponent', () => {
  let component: ModalCancelamentoReuniaoComponent;
  let fixture: ComponentFixture<ModalCancelamentoReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCancelamentoReuniaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCancelamentoReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
