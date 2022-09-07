import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaClassificarDemandaComponent } from './tela-classificar-demanda.component';

describe('TelaClassificarDemandaComponent', () => {
  let component: TelaClassificarDemandaComponent;
  let fixture: ComponentFixture<TelaClassificarDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaClassificarDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaClassificarDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
