import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscopoPerfilComponent } from './escopo-perfil.component';

describe('EscopoPerfilComponent', () => {
  let component: EscopoPerfilComponent;
  let fixture: ComponentFixture<EscopoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscopoPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscopoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
