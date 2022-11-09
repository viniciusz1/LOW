import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReprovacaoDemandaComponent } from './modal-reprovacao-demanda.component';

describe('ModalReprovacaoDemandaComponent', () => {
  let component: ModalReprovacaoDemandaComponent;
  let fixture: ComponentFixture<ModalReprovacaoDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReprovacaoDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReprovacaoDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
