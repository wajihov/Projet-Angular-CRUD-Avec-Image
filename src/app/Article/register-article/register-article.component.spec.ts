import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterArticleComponent } from './register-article.component';

describe('RegisterArticleComponent', () => {
  let component: RegisterArticleComponent;
  let fixture: ComponentFixture<RegisterArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
