import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteReuniaoComponent } from './parte-reuniao.component';

describe('ParteReuniaoComponent', () => {
  let component: ParteReuniaoComponent;
  let fixture: ComponentFixture<ParteReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParteReuniaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParteReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
