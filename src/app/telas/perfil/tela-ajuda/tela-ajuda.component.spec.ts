import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaAjudaComponent } from './tela-ajuda.component';

describe('TelaAjudaComponent', () => {
  let component: TelaAjudaComponent;
  let fixture: ComponentFixture<TelaAjudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaAjudaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
