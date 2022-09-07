import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDemandaComponent } from './card-demanda.component';

describe('CardDemandaComponent', () => {
  let component: CardDemandaComponent;
  let fixture: ComponentFixture<CardDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
