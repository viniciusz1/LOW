import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCorridaComponent } from './tela-corrida.component';

describe('TelaCorridaComponent', () => {
  let component: TelaCorridaComponent;
  let fixture: ComponentFixture<TelaCorridaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaCorridaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaCorridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
