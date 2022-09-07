import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReuniaoComponent } from './card-reuniao.component';

describe('CardReuniaoComponent', () => {
  let component: CardReuniaoComponent;
  let fixture: ComponentFixture<CardReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardReuniaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
