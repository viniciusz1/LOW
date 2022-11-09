import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaAprovarDemandaComponent } from './tela-aprovar-demanda.component';

describe('TelaAprovarDemandaComponent', () => {
  let component: TelaAprovarDemandaComponent;
  let fixture: ComponentFixture<TelaAprovarDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaAprovarDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaAprovarDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
