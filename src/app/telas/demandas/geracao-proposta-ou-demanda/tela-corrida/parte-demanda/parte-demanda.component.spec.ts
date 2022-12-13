import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteDemandaComponent } from './parte-demanda.component';

describe('ParteDemandaComponent', () => {
  let component: ParteDemandaComponent;
  let fixture: ComponentFixture<ParteDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParteDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParteDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
