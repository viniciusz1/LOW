import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoModalDemandaComponent } from './info-modal-demanda.component';

describe('InfoModalDemandaComponent', () => {
  let component: InfoModalDemandaComponent;
  let fixture: ComponentFixture<InfoModalDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoModalDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoModalDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
