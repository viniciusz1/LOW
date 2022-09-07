import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEtapaTresComponent } from './tela-etapa-tres.component';

describe('TelaEtapaTresComponent', () => {
  let component: TelaEtapaTresComponent;
  let fixture: ComponentFixture<TelaEtapaTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaEtapaTresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaEtapaTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
