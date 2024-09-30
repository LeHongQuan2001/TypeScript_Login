import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivePageComponent } from './inactive-page.component';

describe('InactivePageComponent', () => {
  let component: InactivePageComponent;
  let fixture: ComponentFixture<InactivePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InactivePageComponent]
    });
    fixture = TestBed.createComponent(InactivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
