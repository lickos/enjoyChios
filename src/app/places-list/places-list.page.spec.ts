import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesListPage } from './places-list.page';

describe('PlacesListPage', () => {
  let component: PlacesListPage;
  let fixture: ComponentFixture<PlacesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
