import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RascunhosComponent } from './rascunhos.component';

describe('TelaClassificarDemandaComponent', () => {
  let component: RascunhosComponent;
  let fixture: ComponentFixture<RascunhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RascunhosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RascunhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
