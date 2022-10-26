import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaReuniaoComponent } from './tela-reuniao.component';


describe('TelaDataComissaoComponent', () => {
  let component: TelaReuniaoComponent;
  let fixture: ComponentFixture<TelaReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaReuniaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});