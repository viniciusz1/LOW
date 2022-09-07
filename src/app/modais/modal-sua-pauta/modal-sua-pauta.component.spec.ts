import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuaPautaComponent } from './modal-sua-pauta.component';

describe('ModalSuaPautaComponent', () => {
  let component: ModalSuaPautaComponent;
  let fixture: ComponentFixture<ModalSuaPautaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSuaPautaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSuaPautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
