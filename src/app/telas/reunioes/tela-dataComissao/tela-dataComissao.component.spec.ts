import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaDataComissaoComponent } from './tela-dataComissao.component';

describe('TelaDataComissaoComponent', () => {
  let component: TelaDataComissaoComponent;
  let fixture: ComponentFixture<TelaDataComissaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaDataComissaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaDataComissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});