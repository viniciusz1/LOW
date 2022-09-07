import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEtapaDoisComponent } from './tela-etapa-dois.component';

describe('TelaEtapaDoisComponent', () => {
  let component: TelaEtapaDoisComponent;
  let fixture: ComponentFixture<TelaEtapaDoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaEtapaDoisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaEtapaDoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
