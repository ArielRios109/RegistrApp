import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenidoQrPage } from './contenido-qr.page';

describe('ContenidoQrPage', () => {
  let component: ContenidoQrPage;
  let fixture: ComponentFixture<ContenidoQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContenidoQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
