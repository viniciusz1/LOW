import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMotivoDevolucaoComponent } from './modal-motivo-devolucao.component';

describe('ModalMotivoDevolucaoComponent', () => {
  let component: ModalMotivoDevolucaoComponent;
  let fixture: ComponentFixture<ModalMotivoDevolucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMotivoDevolucaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMotivoDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
