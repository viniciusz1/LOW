import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltroDemandasComponent } from './modal-filtro-demandas.component';

describe('ModalFiltroDemandasComponent', () => {
  let component: ModalFiltroDemandasComponent;
  let fixture: ComponentFixture<ModalFiltroDemandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFiltroDemandasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFiltroDemandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
