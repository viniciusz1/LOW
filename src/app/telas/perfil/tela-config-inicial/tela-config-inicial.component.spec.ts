import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaConfigInicialComponent } from './tela-config-inicial.component';

describe('TelaConfigInicialComponent', () => {
  let component: TelaConfigInicialComponent;
  let fixture: ComponentFixture<TelaConfigInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaConfigInicialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaConfigInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
