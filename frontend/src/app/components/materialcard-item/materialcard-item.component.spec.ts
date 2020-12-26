import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialcardItemComponent } from './materialcard-item.component';

describe('MaterialcardItemComponent', () => {
  let component: MaterialcardItemComponent;
  let fixture: ComponentFixture<MaterialcardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialcardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialcardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
