import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClassificarDemandaComponent } from './modal-classificar-demanda.component';

describe('ModalClassificarDemandaComponent', () => {
  let component: ModalClassificarDemandaComponent;
  let fixture: ComponentFixture<ModalClassificarDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClassificarDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalClassificarDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
