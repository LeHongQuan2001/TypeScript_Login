import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFailedComponent } from './delete-failed.component';

describe('DeleteFailedComponent', () => {
  let component: DeleteFailedComponent;
  let fixture: ComponentFixture<DeleteFailedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFailedComponent]
    });
    fixture = TestBed.createComponent(DeleteFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
