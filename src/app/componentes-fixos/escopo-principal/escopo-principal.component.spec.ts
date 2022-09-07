import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscopoPrincipalComponent } from './escopo-principal.component';

describe('EscopoPrincipalComponent', () => {
  let component: EscopoPrincipalComponent;
  let fixture: ComponentFixture<EscopoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscopoPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscopoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
