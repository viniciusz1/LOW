import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSugestoesComponent } from './tela-sugestoes.component';

describe('TelaSugestoesComponent', () => {
  let component: TelaSugestoesComponent;
  let fixture: ComponentFixture<TelaSugestoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaSugestoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaSugestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
