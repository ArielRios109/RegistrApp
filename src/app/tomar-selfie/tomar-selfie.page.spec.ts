import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TomarSelfiePage } from './tomar-selfie.page';

describe('TomarSelfiePage', () => {
  let component: TomarSelfiePage;
  let fixture: ComponentFixture<TomarSelfiePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TomarSelfiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
