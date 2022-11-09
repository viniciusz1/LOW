import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaLayoutComponent } from './tela-layout.component';

describe('TelaLayoutComponent', () => {
  let component: TelaLayoutComponent;
  let fixture: ComponentFixture<TelaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
