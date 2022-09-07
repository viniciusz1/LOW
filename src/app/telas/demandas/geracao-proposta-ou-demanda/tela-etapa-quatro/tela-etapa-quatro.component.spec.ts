import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEtapaQuatroComponent } from './tela-etapa-quatro.component';

describe('TelaEtapaQuatroComponent', () => {
  let component: TelaEtapaQuatroComponent;
  let fixture: ComponentFixture<TelaEtapaQuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaEtapaQuatroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaEtapaQuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
