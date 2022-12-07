import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarReuniaoComponent } from './modal-criar-reuniao.component';

describe('CriarReuniaoComponent', () => {
  let component: ModalCriarReuniaoComponent;
  let fixture: ComponentFixture<ModalCriarReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCriarReuniaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCriarReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
