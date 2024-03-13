import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDropDownComponent } from './component-drop-down.component';

describe('ComponentDropDownComponent', () => {
  let component: ComponentDropDownComponent;
  let fixture: ComponentFixture<ComponentDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDropDownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
