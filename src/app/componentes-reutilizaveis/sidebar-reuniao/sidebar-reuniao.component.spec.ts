import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarReuniaoComponent } from './sidebar-reuniao.component';

describe('SidebarReuniaoComponent', () => {
  let component: SidebarReuniaoComponent;
  let fixture: ComponentFixture<SidebarReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarReuniaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
