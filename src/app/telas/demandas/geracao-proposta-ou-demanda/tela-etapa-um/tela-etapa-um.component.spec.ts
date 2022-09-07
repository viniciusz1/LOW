import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEtapaUmComponent } from './tela-etapa-um.component';

describe('TelaEtapaUmComponent', () => {
  let component: TelaEtapaUmComponent;
  let fixture: ComponentFixture<TelaEtapaUmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaEtapaUmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaEtapaUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
