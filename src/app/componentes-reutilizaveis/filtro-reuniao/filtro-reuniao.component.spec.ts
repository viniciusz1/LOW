import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroReuniaoComponent } from './filtro-reuniao.component';

describe('FiltroReuniaoComponent', () => {
  let component: FiltroReuniaoComponent;
  let fixture: ComponentFixture<FiltroReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroReuniaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
