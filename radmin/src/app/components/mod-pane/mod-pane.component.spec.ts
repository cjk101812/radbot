import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPaneComponent } from './mod-pane.component';

describe('ModPaneComponent', () => {
  let component: ModPaneComponent;
  let fixture: ComponentFixture<ModPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
