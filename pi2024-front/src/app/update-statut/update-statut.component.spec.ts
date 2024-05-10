import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatutComponent } from './update-statut.component';

describe('UpdateStatutComponent', () => {
  let component: UpdateStatutComponent;
  let fixture: ComponentFixture<UpdateStatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStatutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
