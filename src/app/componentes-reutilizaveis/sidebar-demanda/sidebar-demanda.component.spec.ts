import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDemandaComponent } from './sidebar-demanda.component';

describe('SidebarDemandaComponent', () => {
  let component: SidebarDemandaComponent;
  let fixture: ComponentFixture<SidebarDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarDemandaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
