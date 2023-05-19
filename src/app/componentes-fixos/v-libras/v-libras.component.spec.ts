import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VLibrasComponent } from './v-libras.component';

describe('VLibrasComponent', () => {
  let component: VLibrasComponent;
  let fixture: ComponentFixture<VLibrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VLibrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VLibrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
