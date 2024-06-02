import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandeUserComponent } from './details-demande-user.component';

describe('DetailsDemandeUserComponent', () => {
  let component: DetailsDemandeUserComponent;
  let fixture: ComponentFixture<DetailsDemandeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsDemandeUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsDemandeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
