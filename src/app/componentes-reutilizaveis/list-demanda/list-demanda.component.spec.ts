import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandaComponent } from './list-demanda.component';

describe('ListDemandaComponent', () => {
  let component: ListDemandaComponent;
  let fixture: ComponentFixture<ListDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
